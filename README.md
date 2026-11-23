# PlayLab pages

Interactive pages for the PlayLab Google Site (Master of Technological Futures, academyEX). Each page is a single self-contained `index.html` in its own folder. GitHub Pages hosts them and they are embedded in Google Sites.

| Page | Folder | Live link |
|---|---|---|
| Student Journey | `student-journey/` | `https://YOUR-USERNAME.github.io/playlab-pages/student-journey/` |

## Updating a page

All the content you're likely to change (Gens and their dates, key dates, links, contacts, checklist items, how-tos) is in the **DATA** section near the bottom of each `index.html`. Each part has a comment explaining it.

1. Open the file on GitHub, for example `student-journey/index.html`.
2. Click the pencil icon (Edit this file).
3. Press Ctrl+F (Cmd+F on a Mac) and search for what you want to change, for example `const COHORTS`.
4. Make your edit, then click **Commit changes**.
5. The live page updates within a minute or two. If you don't see the change, refresh the Google Site with Ctrl+Shift+R (Cmd+Shift+R on a Mac).

Be careful to keep the quote marks, commas and brackets around anything you edit. If the page goes blank after an edit, a missing comma or quote mark is the usual cause. Open the file's **History** on GitHub to see or undo the last change.

### Student Journey: adding a Gen

In `student-journey/index.html`, find `const COHORTS` and add a line at the top of the list:

```js
{id:"gen32", name:"Gen32", start:"2027-07-05", breaks:[]},
```

- `start` is the Monday of Week 1. Use `null` (no quote marks) if the dates aren't confirmed yet.
- `breaks` lists the Mondays of non-teaching weeks, for example `["2027-09-27","2027-10-04"]`.
- To link straight to a Gen, add `?gen=gen32` to the end of the page's link.

## Adding a new page

1. Make a new folder named after the page, for example `whats-on`, containing an `index.html`.
2. On GitHub, click **Add file → Upload files** and drag the folder in.
3. Add the page to the table above and to the list in the root `index.html`.
4. The page will be live at `https://YOUR-USERNAME.github.io/playlab-pages/FOLDER-NAME/`.
