// Fetches the Futures PlayLab Google Calendar and tech news feeds, and saves them
// as JSON files the What's On page reads. Run by GitHub Actions on a
// schedule (.github/workflows/update-whats-on.yml). You don't need to run
// it yourself.
//
// To change the news sources, edit FEEDS below.

// Repeating events are only worked out correctly when this runs in UTC.
process.env.TZ = "UTC";

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ical from "node-ical";
import { XMLParser } from "fast-xml-parser";

// ---------------------------------------------------------------
// SETTINGS
// ---------------------------------------------------------------
const CALENDAR_ID = "c_9bb11eed863aae66c00be33d1fcd7f1e28012027822aa68d6f4e66d1cd969b0a@group.calendar.google.com";
// The secret iCal address (set as a repository secret called
// CALENDAR_ICS_URL) is used if present. Otherwise the calendar's public
// address is used, which only works if the calendar is public.
const CALENDAR_URL = process.env.CALENDAR_ICS_URL ||
  `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`;

const FEEDS = [
  { source: "The Verge",       url: "https://www.theverge.com/rss/index.xml" },
  { source: "WIRED",           url: "https://www.wired.com/feed/rss" },
  { source: "MIT Tech Review", url: "https://www.technologyreview.com/feed/" },
  { source: "Ars Technica",    url: "https://feeds.arstechnica.com/arstechnica/index" }
];
const PER_SOURCE = 12;          // stories kept from each source
const DAYS_AHEAD = 365;         // how far ahead to list events
const MAX_EVENTS = 200;

// ---------------------------------------------------------------
const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(here, "..", "data");
const UA = { "User-Agent": "PlayLab-WhatsOn/1.0 (+https://github.com)" };

const stripHTML = s => String(s ?? "")
  .replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&#8217;|&rsquo;/g, "'").replace(/&#8216;|&lsquo;/g, "'")
  .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"').replace(/&#8211;|&ndash;/g, "–").replace(/&#8212;|&mdash;/g, "—")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
const clip = (s, n) => s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s;
const text = v => typeof v === "object" && v !== null ? (v["#text"] ?? v.val ?? "") : (v ?? "");

async function readJSON(file){
  try { return JSON.parse(await fs.readFile(path.join(DATA, file), "utf8")); } catch { return null; }
}
async function writeIfChanged(file, payload, key){
  const old = await readJSON(file);
  if(old && JSON.stringify(old[key]) === JSON.stringify(payload[key])){
    console.log(`${file}: no changes`);
    return;
  }
  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(path.join(DATA, file), JSON.stringify(payload, null, 1) + "\n");
  console.log(`${file}: saved ${payload[key].length} items`);
}

// ---------------- Calendar ----------------
const ymdLocal = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const ymdUTC = d => d.toISOString().slice(0, 10);
function firstLink(s){ const m = String(s || "").match(/https?:\/\/[^\s<>"')]+/); return m ? m[0] : ""; }
// start/end are real moments, or for all-day events "YYYY-MM-DD" strings
function toEvent(ev, start, end, allDay){
  const desc = stripHTML(text(ev.description));
  return {
    id: `${ev.uid}-${start}`,
    title: stripHTML(text(ev.summary)) || "Futures PlayLab event",
    start,
    end: end || null,
    allDay,
    location: stripHTML(text(ev.location)),
    description: clip(desc, 700),
    link: text(ev.url) || firstLink(text(ev.description)) || ""
  };
}
async function calendar(){
  const res = await fetch(CALENDAR_URL, { headers: UA });
  if(!res.ok) throw new Error(`Calendar returned ${res.status}. Is the calendar public, or is the CALENDAR_ICS_URL secret set?`);
  const data = ical.sync.parseICS(await res.text());
  const from = new Date(Date.now() - 24 * 3600e3), to = new Date(Date.now() + DAYS_AHEAD * 24 * 3600e3);
  const out = [];
  for(const ev of Object.values(data)){
    if(ev.type !== "VEVENT" || ev.status === "CANCELLED") continue;
    const allDay = ev.datetype === "date" || ev.start?.dateOnly === true;
    const dur = ev.end ? ev.end - ev.start : 0;
    const days = Math.max(1, Math.round(dur / 864e5));
    const addDays = (ymd, n) => { const t = new Date(ymd + "T00:00:00Z"); t.setUTCDate(t.getUTCDate() + n); return ymdUTC(t); };
    if(ev.rrule){
      const dates = ev.rrule.between(new Date(+from - dur - 864e5), new Date(+to + 864e5), true);
      const ex = ev.exdate || {};
      for(const d of dates){
        // Cancelled and moved weeks: match the exact moment, then the date
        const isoDay = ymdUTC(d);
        const exVals = Object.values(ex).map(x => +new Date(x));
        if(exVals.includes(+d) || (allDay && ex[isoDay])) continue;
        const recs = Object.values(ev.recurrences || {});
        const override = recs.find(r => r.recurrenceid && +new Date(r.recurrenceid) === +d) ||
                         (ev.recurrences && !recs.some(r => r.recurrenceid) ? ev.recurrences[isoDay] : null);
        if(override){
          if(override.status === "CANCELLED") continue;
          const oAll = override.datetype === "date";
          out.push(oAll ? toEvent({ ...ev, ...override }, ymdLocal(override.start), override.end ? ymdLocal(override.end) : null, true)
                        : toEvent({ ...ev, ...override }, override.start.toISOString(), override.end ? override.end.toISOString() : null, false));
        } else if(allDay){
          out.push(toEvent(ev, isoDay, addDays(isoDay, days), true));
        } else {
          out.push(toEvent(ev, d.toISOString(), dur ? new Date(+d + dur).toISOString() : null, false));
        }
      }
    } else if(allDay){
      const s = ymdLocal(ev.start), e = ev.end ? ymdLocal(ev.end) : addDays(s, 1);
      out.push(toEvent(ev, s, e, true));
    } else {
      const end = ev.end || ev.start;
      out.push(toEvent(ev, ev.start.toISOString(), ev.end ? ev.end.toISOString() : null, false));
    }
  }
  // Keep events from yesterday to DAYS_AHEAD (all-day dates compared as NZ-style local dates)
  const fromYMD = ymdUTC(from), toYMD = ymdUTC(to);
  const inRange = e => e.allDay ? ((e.end || e.start) > fromYMD && e.start <= toYMD)
                                : (new Date(e.end || e.start) >= from && new Date(e.start) <= to);
  const sortKey = e => e.allDay ? e.start + "T00:00:00+13:00" : e.start;
  return out.filter(inRange)
    .sort((a, b) => new Date(sortKey(a)) - new Date(sortKey(b)))
    .filter((e, i, a) => a.findIndex(x => x.id === e.id) === i).slice(0, MAX_EVENTS);
}

// ---------------- News ----------------
const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@", textNodeName: "#text", cdataPropName: false, processEntities: true, htmlEntities: true });
const arr = v => v == null ? [] : Array.isArray(v) ? v : [v];
function imageOf(item){
  const cands = [
    ...arr(item["media:content"]).map(m => m?.["@url"]),
    ...arr(item["media:thumbnail"]).map(m => m?.["@url"]),
    ...arr(item["media:group"]).flatMap(g => arr(g?.["media:content"]).map(m => m?.["@url"])),
    ...arr(item.enclosure).filter(e => /image/.test(e?.["@type"] || "image")).map(e => e?.["@url"])
  ].filter(Boolean);
  if(cands.length) return cands[0];
  const html = text(item["content:encoded"]) || text(item.content) || text(item.description) || text(item.summary);
  const m = String(html).match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : "";
}
async function feed({ source, url }){
  const res = await fetch(url, { headers: UA });
  if(!res.ok) throw new Error(`${source} returned ${res.status}`);
  const doc = xml.parse(await res.text());
  const items = doc.rss ? arr(doc.rss.channel?.item) : arr(doc.feed?.entry);
  return items.slice(0, PER_SOURCE).map(it => {
    const link = doc.rss ? text(it.link) : (arr(it.link).find(l => !l["@rel"] || l["@rel"] === "alternate")?.["@href"] || "");
    const date = new Date(text(it.pubDate) || text(it.published) || text(it.updated) || text(it["dc:date"]) || Date.now());
    const summary = clip(stripHTML(text(it.description) || text(it.summary) || text(it["content:encoded"]) || text(it.content)), 220);
    return { title: stripHTML(text(it.title)), link, date: isNaN(date) ? new Date().toISOString() : date.toISOString(), summary, image: imageOf(it), source };
  }).filter(s => s.title && /^https?:\/\//.test(s.link));
}

// ---------------- Run ----------------
let failed = 0;
try {
  const events = await calendar();
  await writeIfChanged("events.json", { updated: new Date().toISOString(), events }, "events");
} catch(e){ failed++; console.error("Calendar:", e.message); }

const previous = (await readJSON("news.json"))?.stories || [];
const stories = [];
for(const f of FEEDS){
  try { stories.push(...await feed(f)); }
  catch(e){ failed++; console.error("News:", e.message, "(keeping the last saved stories)"); stories.push(...previous.filter(s => s.source === f.source)); }
}
stories.sort((a, b) => b.date.localeCompare(a.date));
if(stories.length) await writeIfChanged("news.json", { updated: new Date().toISOString(), sources: FEEDS.map(f => f.source), stories }, "stories");

if(failed) console.log(`Finished with ${failed} problem(s). The page keeps showing the last saved data for anything that failed.`);
