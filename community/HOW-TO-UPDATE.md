# How to update the Community page

A plain-language guide for the PlayLab team. Everything here is done in the browser on GitHub. You don't need to install anything.

Changes go live within about two minutes. If you don't see a change, refresh the Google Site with **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac).

**Contents**
- [The quick way: the entry helper](#the-quick-way-the-entry-helper)
- [Editing the page safely](#editing-the-page-safely)
- [Add a student project to the Gallery](#add-a-student-project-to-the-gallery)
- [Change or remove a Gallery piece](#change-or-remove-a-gallery-piece)
- [Add pins to the Map Wall](#add-pins-to-the-map-wall)
- [Add profiles and shout-outs](#add-profiles-and-shout-outs)
- [Add or change links (forms, Slack, FrameVR)](#add-or-change-links-forms-slack-framevr)
- [Add a FrameVR session](#add-a-framevr-session)
- [Change the Slack channels](#change-the-slack-channels)
- [Hide the sample content before launch](#hide-the-sample-content-before-launch)
- [Add a town to the map](#add-a-town-to-the-map)
- [If something goes wrong](#if-something-goes-wrong)

---

## The quick way: the entry helper

Every kind of entry (profiles, map pins, Gallery pieces and shout-outs) is added the same way: copy the responses from your private sheet into the **entry helper**, then paste what it gives you into the page.

The helper is at `https://YOUR-USERNAME.github.io/playlab-pages/community/add.html` (bookmark it). It isn't linked from the site. Nothing you paste into it is saved or sent anywhere.

1. **In your responses sheet**, select the heading row and the rows you want to add, and copy them (Ctrl+C or Cmd+C). You can select rows that aren't next to each other by holding Ctrl (Cmd on a Mac).
2. **In the helper**, choose what you're adding (Profile, Map pin, Gallery piece or Shout-out) and paste into the box.
3. **Read the notes** under the result:
   - yellow notes are things to do, like uploading a photo with a given file name
   - orange notes are problems, like a town the map doesn't know, or a row skipped because consent wasn't ticked
4. Click **Copy lines**.
5. **On GitHub**, open `community/index.html`, click the pencil icon, search for the list the helper names (for example `const PEOPLE = [`), paste on the empty line just under it, and click **Commit changes**.

To add one entry without a sheet, use **Type one in** in the helper.

**Keep track of what you've added**, for example with a "On the page" checkbox column in your sheet, so you don't add someone twice.

The sections below explain each kind of entry in more detail, and how to do it by hand.

---

## Editing the page safely

Most changes mean editing one file: `community/index.html`.

1. On GitHub, open the `community` folder, then click `index.html`.
2. Click the **pencil icon** (top right of the file) to edit.
3. Press **Ctrl+F** (Cmd+F on a Mac) and search for the word given in the steps below, for example `const GALLERY`.
4. Make your change.
5. Click **Commit changes** (green button), then **Commit changes** again.

When editing, keep the punctuation exactly as it is:
- Text goes inside straight quote marks: `"like this"`
- Each entry ends with a comma: `},`
- Don't delete square brackets `[ ]` or curly brackets `{ }`

If you need an apostrophe inside text, that's fine: `"Aroha's project"` works because the text is wrapped in double quotes. Don't put a double quote mark inside the text. (The entry helper handles all of this for you.)

---

## Add a student project to the Gallery

Students send their work through the private Gallery Google Form. Only pieces you choose go on the page, and only with the maker's consent.

### 1. Get the image ready

1. Open the Gallery form's responses sheet (private) and find the submission.
2. Download the image they uploaded.
3. Make it smaller so the page loads quickly: about **1600 pixels wide**, saved as a **.jpg**, ideally under **500KB**. Free options: Canva (Resize), squoosh.app, or Preview on a Mac (Tools → Adjust Size).
4. Rename the file simply, in lower case, with dashes instead of spaces. For example `kai-futures-2040.jpg`.

### 2. Upload the image

1. On GitHub, open `community`, then the `gallery` folder.
2. Click **Add file → Upload files**.
3. Drag the image in, then click **Commit changes**.

### 3. Add the piece to the page

The entry helper can write this line for you, and suggests the image file name too (do this before step 2 if you want to use its file name). To do it by hand:

1. Open `community/index.html` and click the pencil icon.
2. Search for `const GALLERY = [`.
3. On the empty line just under it, paste this and fill it in:

```js
  {title:"Kai Futures 2040", maker:"Aroha Tane", gen:"Gen31", type:"Project", course:"Disruption Report", description:"A speculative menu from a 2040 marae kitchen.", image:"gallery/kai-futures-2040.jpg", link:""},
```

| Part | What to put |
|---|---|
| `title` | Name of the piece |
| `maker` | Who made it. For group work, list everyone: `"Aroha Tane and Sione Fifita"` |
| `gen` | Their Gen, e.g. `"Gen31"` |
| `type` | `"Project"` for course work, or `"Community"` for photos of events, onsite days and so on |
| `course` | Course or assessment, e.g. `"Ethical Case Study"`. Use `""` if not relevant |
| `description` | One or two sentences about it |
| `image` | `"gallery/"` followed by the exact file name you uploaded |
| `link` | Optional link to the full piece (video, website, PDF). Use `""` if none |

4. Click **Commit changes**.

Put the newest piece at the **top** of the list. Each piece goes on its own line, and every line ends with `},`

When the first real piece is added, the sample gallery disappears.

---

## Change or remove a Gallery piece

- **Change the details:** search for the piece's title in `community/index.html`, edit the text, and commit.
- **Remove it from the page:** delete its whole line (from `{title:` to `},`) and commit.
- **Delete the image as well:** open `community/gallery`, click the image, click the **…** menu (top right), choose **Delete file**, and commit.

---

## Add pins to the Map Wall

People fill in the **Map Wall Google Form** (the "Drop your pin" buttons open it). Their answers stay private. The PlayLab team then adds pins to the page.

### Option A: add pins to the page (simplest)

The entry helper (Map pin) writes these lines for you from your sheet. To do it by hand:

1. Open `community/index.html` and click the pencil icon.
2. Search for `const PINS = [`.
3. On the empty line under it, add one line per person (newest first):

```js
  {name:"Aroha", role:"Student", city:"Rotorua", country:"New Zealand", from:"Aotearoa"},
```

| Part | What to put |
|---|---|
| `name` | Their first name, or `""` if they didn't give one. Unnamed pins show as "name not shared" |
| `role` | `"Student"` or `"Staff"` |
| `city` | Their answer to "Where do you currently live (Town or City)" |
| `country` | The country they live in. The form doesn't ask this, so add it yourself. It makes sure the pin lands in the right place |
| `from` | Their answer to "Where are you from?", e.g. `"Samoa"` or `"Mumbai, India"` |

4. Click **Commit changes**.

### Option B: point the page at your own sheet

If you keep the responses in a Google Sheet and you're allowed to use **File → Share → Publish to web**:

1. Give the sheet these column headings: `First name`, `Are you a...`, `Town or city`, `Country`, `Where are you from?`
2. Publish just that tab as **Comma-separated values (.csv)** and copy the link.
3. In `community/index.html`, search for `pins: ""` and paste the link between the quote marks.

New rows then appear on the map within about five minutes, without editing the page. Only put rows in this sheet that you're happy to show. Anyone with the published link can read it.

### Tips for the map

- **Where the pin goes:** on the person's town if the page knows it (most towns in Aotearoa and some big cities worldwide), otherwise in the middle of their country.
- **Always fill in `country`** if you can. A town the page doesn't know, with no country, can't be placed.
- **"Where are you from?" answers** can be a country (`"Tonga"`), a town and country (`"Apia, Samoa"`), or a town in Aotearoa (`"Christchurch"`).
- **People with a profile** in the Lounge appear on the map automatically, so you don't need to add them twice.
- **To remove a pin**, delete its line (Option A) or its row (Option B).

---

## Add profiles and shout-outs

Profiles come from the **Join the Lounge** form and shout-outs from the **Send a shout-out** form (questions for both are in `FORMS.md`).

1. Check each response is appropriate and the consent box was ticked.
2. Use the entry helper (Profile or Shout-out) to make the lines.
3. Paste them under `const PEOPLE = [` (profiles) or `const SHOUTOUTS = [` (shout-outs) in `community/index.html` and commit.

**Profile photos:** if someone uploaded a photo, the helper gives you a file name like `aroha-tane.jpg`. Download the photo from the form's upload folder, resize it to about 600px wide, and upload it to the `community/people` folder on GitHub with that name (**Add file → Upload files**). Until the photo is uploaded, their profile shows their initials.

**Map Wall:** profiles appear on the map automatically, unless the person answered "No" to "Show me on the Map Wall?".

**To change or remove someone:** search for their name in `community/index.html`, edit or delete their line, and commit.

*(The README also explains an optional automatic set-up using a published sheet. You don't need it if you add entries with the helper.)*

---

## Add or change links (forms, Slack, FrameVR)

Buttons without a link are greyed out and say "Link coming soon" when you point at them. To switch them on:

1. Open `community/index.html` and click the pencil icon.
2. Search for `const SETTINGS`.
3. Replace the `"#"` (or the existing link) with the full link, keeping the quote marks.

| Setting | Controls | Where to get the link |
|---|---|---|
| `forms: profile` | "Add your profile" buttons | Join the Lounge form → **Send** → link icon |
| `forms: gallery` | "Send us your work" buttons (already added) | Gallery Google Form → **Send** → link icon |
| `forms: pin` | "Drop your pin" buttons (already added) | Map Wall Google Form → **Send** → link icon |
| `forms: shoutout` | "Send a shout-out" buttons | Shout-out Google Form → **Send** → link icon |
| `slackJoin` | "Open PlayLab Slack" and "Join PlayLab Slack" | See below |
| `frame: url` | "Enter the space" in the Portal | Your FrameVR space's address, e.g. `https://framevr.io/playlab` |

**Slack link:** this is set to Slack's sign-in page for now. It's better to use your workspace's own link, so people land straight in PlayLab:
- an **invite link** (in Slack, click the workspace name → **Invite people to PlayLab** → **Copy invite link**). Invite links can expire, so check it every so often, or
- the workspace address, e.g. `https://your-workspace.slack.com`.

Avoid Slack's "get started" or "create new" pages. Those create a brand-new, empty workspace.

---

## Add a FrameVR session

1. In `community/index.html`, search for `sessions: [`.
2. Add a line for each session. The date goes as year-month-day:

```js
      {date:"2027-03-12", title:"Gallery walk-through", detail:"Thursday 7pm, hosted by Kenji"},
```

Past sessions disappear from the page automatically. Use `date:null` (no quote marks) if the date isn't set yet.

---

## Change the Slack channels

1. In `community/index.html`, search for `channels: [`.
2. Each channel is one line. You can change the name, title, description, example and link, delete a line, or copy a line to add a channel.
3. Get a channel's link in Slack: right-click the channel → **Copy** → **Copy link**. Paste it between the quote marks after `url:`.

Until a channel has a link, its card shows "(link to be added)".

---

## Hide the sample content before launch

The page shows made-up people, gallery pieces and shout-outs until real entries arrive. Before students see the page:

1. In `community/index.html`, search for `showSamples`.
2. Change `showSamples: true,` to `showSamples: false,`
3. Commit.

Empty sections will then invite people to add the first entry.

---

## Add a town to the map

Pins go on the person's town when the page knows it, otherwise in the middle of their country. To add a town:

1. In `community/index.html`, search for `const PLACES`.
2. Add a line in the same style, with the town name in lower case and no macrons, then its latitude and longitude:

```js
  "kaikoura":[-42.4,173.68],
```

To find coordinates, right-click the town in Google Maps. The first number shown is latitude, the second is longitude.

---

## If something goes wrong

- **The page is blank or a section disappeared after an edit.** Usually a missing comma or quote mark. On GitHub, open `community/index.html` and click **History** to see what changed. Open the most recent change to compare, fix the line, and commit again. Or ask someone to "revert" the last commit.
- **A Gallery image doesn't show (placeholder artwork appears instead).** Check the file name in `image:"gallery/..."` matches the uploaded file exactly, including capitals and `.jpg` versus `.jpeg`.
- **An approved profile isn't showing.** Wait five minutes, then refresh with Ctrl+Shift+R. Check the Approved box is ticked and the person entered a name.
- **A pin is in the wrong place.** Check the country spelling in the sheet, or add their town to the map (see above).
