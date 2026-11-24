# How to update the Resources page

A plain-language guide for the PlayLab team. Everything is done in the browser on GitHub.

Changes go live within about two minutes. If you don't see a change, refresh with **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac).

**Contents**
- [Where everything lives](#where-everything-lives)
- [Editing the page safely](#editing-the-page-safely)
- [Add a guide or tutorial video](#add-a-guide-or-tutorial-video)
- [Add an external resource](#add-an-external-resource)
- [Update tools and software](#update-tools-and-software)
- [Change a policy or add its link](#change-a-policy-or-add-its-link)
- [Add or change an FAQ](#add-or-change-an-faq)
- [Connect the "Ask the PlayLab" form](#connect-the-ask-the-playlab-form)
- [If something goes wrong](#if-something-goes-wrong)

---

## Where everything lives

| Section | Where you change it |
|---|---|
| Guides and tutorials | `resources/index.html`, the `GUIDES` list |
| Tools and software | The **PlayLab Tool Finder** repo (`dvexperiments/PlayLab-Tool-Finder`), using its Excel workbook. Nothing to change here |
| External resources | `resources/index.html`, the `EXTERNAL` list |
| Policies and guidelines | `resources/index.html`, the `POLICIES` list |
| FAQs | `resources/index.html`, the `FAQS` list |
| "Ask the PlayLab" buttons | `resources/index.html`, `requestForm` in `SETTINGS` |

The "What do you want to do?" search on the Resources home page searches all of these automatically.

---

## Editing the page safely

1. On GitHub, open the `resources` folder, then `index.html`.
2. Click the **pencil icon** to edit.
3. Press **Ctrl+F** (Cmd+F on a Mac) and search for the list name, for example `const GUIDES`.
4. Make your change, then click **Commit changes** twice.

Keep the punctuation as it is: text inside straight double quotes `"like this"`, each entry ending with `},`, and the square and curly brackets left in place. Apostrophes inside text are fine (`"Dylan's guide"`).

---

## Add a guide or tutorial video

Guides are videos or documents made by the PlayLab team, usually stored in Google Drive.

### 1. Share the file so students can see it

1. In Google Drive, right-click the video (or doc) and choose **Share → Share**.
2. Under **General access**, choose **academyEX** (anyone signed in with an academyEX account), or **Anyone with the link**.
3. Click **Copy link**, then **Done**.

If you choose **academyEX**, students need to be signed in to their academyEX Google account to watch (they usually are, inside the Google Site). The preview picture on the card only shows for files shared with **Anyone with the link**. Otherwise the card shows a coloured placeholder, which is fine.

### 2. Add it to the page

In `resources/index.html`, search for `const GUIDES = [` and add a line at the top of the list (newest first):

```js
  {title:"Getting started with Miro", summary:"Set up a board and invite your context group.", topic:"Collaboration", type:"video", url:"PASTE THE DRIVE LINK HERE", length:"6 min", added:"2026-11-25", featured:false},
```

| Part | What to put |
|---|---|
| `title` | The guide's name |
| `summary` | One or two sentences about what it covers |
| `topic` | A short topic, e.g. `"Prototyping"`. Use the same spelling to group guides. A new topic becomes a filter button automatically |
| `type` | `"video"` or `"guide"` (a document, slides or web page) |
| `url` | The Drive link. YouTube links and other web links work too |
| `length` | Optional, e.g. `"6 min"`. Use `""` to leave it out |
| `added` | Today's date as year-month-day. The guide shows **New** for 30 days |
| `featured` | `true` to show it in "Featured and new" on the Resources home page |

Drive videos, Google Docs, Slides and YouTube links play inside the page. Other links open in a new tab.

The two starter guides (Prototyping and Google Sites) are there with no link yet and show "Coming soon". Paste their Drive links into `url:""` to switch them on.

---

## Add an external resource

External resources are talks, videos, articles and courses from other websites.

In `resources/index.html`, search for `const EXTERNAL = [` and add a line:

```js
  {title:"Designers: think big!", source:"TED", summary:"Tim Brown on design thinking.", topic:"Design thinking", url:"https://www.ted.com/talks/tim_brown_designers_think_big", length:"16 min", added:"2026-11-25"},
```

- `source` is who made it, e.g. `"TED"`, `"YouTube"`, `"IDEO"`, `"Harvard Business Review"`.
- **YouTube, TED and Vimeo** links play inside the page. YouTube videos get their thumbnail automatically.
- Any other link (articles, courses, websites) opens in a new tab.
- Add `featured:true` to show it on the Resources home page.

The three TED talks in the list are starter suggestions. Keep, change or delete them.

---

## Update tools and software

The Tools section reads its tools straight from the **PlayLab Tool Finder**, so you keep updating tools exactly as before:

1. Edit your `tools.xlsx` workbook.
2. Upload it to the `data` folder of the `PlayLab-Tool-Finder` repo.
3. Wait for its build to finish (Actions tab).

The Resources page picks up the changes automatically, including new categories and cover images. The Tool Finder's own README explains the workbook columns and cover images.

If the Tool Finder ever moves to a new address, change `toolFinder` in `SETTINGS`.

---

## Change a policy or add its link

In `resources/index.html`, search for `const POLICIES = [`.

- Change the `summary` or the `points` (each point is in quotes, separated by commas).
- Paste the full policy's address between the quotes after `link:`. Until then, the card says "Full policy link coming soon".
- Copy a whole entry (from `{title:` to `},`) to add another policy. `ico` can be `spark`, `copy`, `access` or `shield`. `tone` can be `lilac`, `peach`, `mint`, `sky` or `butter`.

These are summaries. Ask the policy owner to check the wording before launch.

---

## Add or change an FAQ

In `resources/index.html`, search for `const FAQS = [`. Questions are grouped (About the PlayLab, Choosing tools, Cost and access). Each question is one line:

```js
    ["Can I borrow equipment?","Yes. Ask the PlayLab team in Slack to book it."],
```

To link to another section in an answer, write the link text in square brackets followed by the section in round brackets: `[Tools and software](#tools)`. Sections are `#overview`, `#guides`, `#tools`, `#external`, `#policies` and `#faqs`.

To add a group, copy a whole group (from `{group:` to `]},`) and change its name and questions.

---

## Connect the "Ask the PlayLab" form

The "Ask the PlayLab" buttons are greyed out until a form is connected. In `SETTINGS`, paste your request form's link between the quotes after `requestForm:` (Google Form → **Send** → link icon).

---

## If something goes wrong

- **The page is blank or a section disappeared after an edit:** usually a missing comma or quote mark. Open `resources/index.html` on GitHub, click **History**, compare with the last version, fix the line and commit again.
- **A Drive video won't play:** check its sharing (step 1 of adding a guide). Students can always use "Open in a new tab".
- **Tools say "The tool list didn't load":** check the Tool Finder site still opens on its own. If it does, check `toolFinder` in `SETTINGS` matches its address exactly.
- **A thumbnail shows a coloured placeholder:** that's expected for Drive files that aren't shared publicly, TED talks and Vimeo videos.
