# Updating the Play page

Everything you can change is in the `<script>` near the bottom of `play/index.html`. On GitHub, open the file, select the pencil icon to edit, make your change, then select **Commit changes**. The page updates within a minute or two.

## Add a tool

1. Find `const TOOLS = [`.
2. Copy an existing tool, from `{id:` to the closing `},`, and paste it where you want the new tool to appear. The order in the list is the order on the page.
3. Change the details:

| Field | What to put |
|---|---|
| `id` | A short name in lower case with dashes, e.g. `"sound-garden"`. It becomes the page address (`#tool-sound-garden`), so don't change it once people have shared links. |
| `name` | The tool's name. |
| `theme` | `"systems"`, `"signals"` or `"make"` (see **Themes** below). |
| `image` | A cover picture, e.g. `"images/sound-garden.jpg"`. Optional. |
| `url` | The tool's web address. It opens inside the page and also in a new tab with **Open full page**. |
| `tagline` | One short line for the tool's card. |
| `about` | A sentence or two shown under the name on the tool's own page. |
| `ideas` | Things to try, each one a short sentence in quotes, separated by commas. |
| `know` | Good to know: how work is saved, privacy, limits. |
| `pairs` | The `id`s of tools that go well with this one, e.g. `["ripple-map","formicarium"]`. Optional. |
| `allow` | Browser permissions the tool needs to work inside the page, e.g. `"geolocation"` or `"camera; microphone"`. Optional. |

The tool appears automatically on the Start here page, in the Playground and in the sidebar.

To remove a tool, delete everything from its `{id:` to its closing `},`.

### Will the tool work inside the page?

Tools hosted on GitHub Pages work. Some other websites refuse to be shown inside another page. If you see a blank box or a "refused to connect" message, that site doesn't allow it. Link to it from the Resources page instead.

## Cover pictures

Upload a picture to the `play/images` folder (**Add file → Upload files**) and put its name in the tool's `image` field. A screenshot of the tool's opening screen works best, 16:10 and about 800 × 500 pixels. If there's no picture, or it can't load, the card shows a coloured tile with the theme's icon instead.

## Themes

The three themes are in `const THEMES = [`. Each one has a `name`, a short `about` line and a colour (`tone`: `sky`, `lilac`, `mint`, `butter`, `peach` or `blue`). To add a theme, copy one, give it a new `id`, then use that `id` in a tool's `theme`.

## The Studio Card

The Studio Card's address is `studioCard` in `SETTINGS`. **Reflect on this** on a tool's page opens the Studio Card with the tool's name already in its **Tools** field. That only works with the updated Studio Card (`Studio-Card/index.html`, which reads `?tools=` from its address). Without it, the Studio Card still opens, just with that field empty.

## Good to know

- Only one tool runs at a time. Leaving a tool's page stops it, including any sound.
- Some browsers don't keep work saved inside an embedded tool. That's why every tool has **Open full page**, and the Studio Card tips suggest saving a draft.
- On phones, each tool's page suggests opening the full page, since there's more room.
