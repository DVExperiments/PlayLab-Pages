# Updating the home page

Everything you can change is in the `<script>` near the bottom of `home/index.html`. On GitHub, open the file, select the pencil icon, make your change, then select **Commit changes**.

## Connect the page links (do this first)

Until this is set, the sidebar and the "Start exploring" tiles are greyed out ("Link coming soon").

1. Publish the Google Site if you haven't already (**Publish** in the top right of the Google Sites editor).
2. Open the published site and go to any page other than Home, e.g. Resources. Copy its address from the browser. It looks like:
   `https://sites.google.com/academyex.ac.nz/futures-playlab/resources`
3. Remove the page name from the end, keeping the slash:
   `https://sites.google.com/academyex.ac.nz/futures-playlab/`
4. Paste that into `siteAddress` in `SETTINGS`:
   ```js
   siteAddress: "https://sites.google.com/academyex.ac.nz/futures-playlab/",
   ```

Each page's address is built from `siteAddress` plus its `slug` in `PAGES`. Google Sites makes the slug from the page name in lower case with dashes, so "What's On" becomes `whats-on` and "My Journey" becomes `my-journey`.

If a page's address doesn't follow that pattern (for example you renamed it, or it sits under another page), open it on the published site, copy its full address, and paste it into that page's `url` field. The `url` is used instead of the slug.

Don't use the links from the Google Sites editor (the ones with `/u/0/d/` and `/preview`). Only people who can edit the site can open those.

### Why the links open in a new tab

Google Sites shows embedded pages in a protected box that isn't allowed to change the page around it. A link that tries to open in the same tab does nothing at all. So links from this page to other pages of the site open in a new tab instead. The site's own menu at the top still moves between pages in the same tab.

## Change a page's description or order

Edit `PAGES`. The order in the list is the order in the sidebar and the tiles. `about` is the description on its tile. Set `tile:false` to show a page in the sidebar only.

## Coming up and In tech news

These lists read the same files as the What's On page (`whats-on/data/events.json` and `news.json`), which update automatically every few hours. There's nothing to do here. If those files don't exist yet, both boxes show a short note pointing to the What's On page instead. Change `showEvents` and `showNews` to show more or fewer.

## Pillars, address and year

`PILLARS` holds the five pillars (keep them the same as the About page). `address` and `year` in `SETTINGS` set the visit panel and the footer.
