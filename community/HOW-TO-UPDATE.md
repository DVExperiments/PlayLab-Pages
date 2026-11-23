# How to update the Community page

A plain-language guide for the PlayLab team. Everything here is done in the browser on GitHub. You don't need to install anything.

Changes go live within about two minutes. If you don't see a change, refresh the Google Site with **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac).

**Contents**
- [Editing the page safely](#editing-the-page-safely)
- [Add a student project to the Gallery](#add-a-student-project-to-the-gallery)
- [Change or remove a Gallery piece](#change-or-remove-a-gallery-piece)
- [Approve a profile or shout-out](#approve-a-profile-or-shout-out)
- [Add or change links (forms, Slack, FrameVR)](#add-or-change-links-forms-slack-framevr)
- [Add a FrameVR session](#add-a-framevr-session)
- [Change the Slack channels](#change-the-slack-channels)
- [Hide the sample content before launch](#hide-the-sample-content-before-launch)
- [Add a town to the map](#add-a-town-to-the-map)
- [If something goes wrong](#if-something-goes-wrong)

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

If you need an apostrophe inside text, that's fine: `"Aroha's project"` works because the text is wrapped in double quotes. Don't put a double quote mark inside the text.

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

## Approve a profile or shout-out

Profiles (the Lounge and the Map Wall) and shout-outs come from their Google Forms automatically. Nothing appears until you approve it.

1. Open the form's responses sheet.
2. Check the entry is appropriate and the consent box was ticked.
3. Tick the **Approved** checkbox on that row.

It appears on the page within about five minutes. To hide it again, untick the box.

To fix a typo in someone's profile, edit the cell in the responses sheet. To remove someone, untick Approved (or delete their row).

*(Setting the forms and sheets up for the first time is covered in the main README.)*

---

## Add or change links (forms, Slack, FrameVR)

Buttons without a link are greyed out and say "Link coming soon" when you point at them. To switch them on:

1. Open `community/index.html` and click the pencil icon.
2. Search for `const SETTINGS`.
3. Replace the `"#"` (or the existing link) with the full link, keeping the quote marks.

| Setting | Controls | Where to get the link |
|---|---|---|
| `forms: profile` | "Add your profile" and "Add your pin" buttons | Profile Google Form → **Send** → link icon |
| `forms: gallery` | "Send us your work" buttons | Gallery Google Form → **Send** → link icon |
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
