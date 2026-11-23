# Community page forms

There are four Google Forms behind the Community page. Students fill them in, the responses stay private, and the PlayLab team chooses what goes on the page.

| Form | Feeds | Status |
|---|---|---|
| 1. Join the Lounge (profile) | The Lounge, Recently joined, the Map Wall | Made and connected |
| 2. Send a shout-out | Shout-outs in the Foyer | Made and connected |
| 3. Map Wall pin | The Map Wall | Made and connected. Two small changes suggested |
| 4. Gallery submission | The Gallery | Made and connected. Check against the list below |

Keep the question wording close to what's shown here. The entry helper (`community/add.html`) recognises these questions when you paste rows from the responses sheet, so it can fill everything in for you.

**Settings for every form**
- **Settings → Responses → Collect email addresses: Off** (unless your form needs sign-in for file uploads, see below).
- Keep each responses sheet **private**. Don't use Publish to web.
- After making a form, click **Send → link icon**, copy the link and paste it into `SETTINGS → forms` in `community/index.html` (see HOW-TO-UPDATE.md). Its buttons on the page then switch on.

---

## 1. Join the Lounge (profile)

**Form title:** Join the PlayLab Community Lounge
**Description:** Add yourself to the PlayLab Community page so others in the MTF can find you. The PlayLab team checks every profile before it appears. Only academyEX staff and students can see the page.

| # | Question | Type | Required | Options / help text |
|---|---|---|---|---|
| 1 | First name | Short answer | Yes | |
| 2 | Last name | Short answer | No | Help text: "Leave blank if you'd rather show your first name only" |
| 3 | Are you a... | Multiple choice | Yes | Current student · Alumni · Future student · Staff |
| 4 | Which Gen are you in? | Short answer | No | Help text: "For example Gen31. Staff can leave this blank" |
| 5 | Town or city you live in | Short answer | Yes | |
| 6 | Country you live in | Short answer | Yes | |
| 7 | Where are you from? | Short answer | No | Help text: "A country, or a place and country, e.g. Apia, Samoa. This adds a second pin on the map" |
| 8 | What do you do? (profession or context) | Short answer | Yes | Help text: "For example: Nurse educator, Te Whatu Ora" |
| 9 | Interests | Short answer | No | Help text: "A few words, separated by commas" |
| 10 | Ask me about | Short answer | No | Help text: "Something you could help others with" |
| 11 | Portfolio or LinkedIn link | Short answer | No | Response validation: Text → URL |
| 12 | Photo | File upload | No | 1 file, images only, max 10MB. Help text: "A head-and-shoulders photo. Optional" |
| 13 | Show me on the Map Wall? | Multiple choice | Yes | Yes · No |
| 14 | I'm happy for this profile to appear on the PlayLab Community page | Checkboxes | Yes | One option: "Yes, I agree" |

**About the photo question:** Google Forms makes people sign in to Google to upload a file, and uploads go into a private folder in the form owner's Drive. That's fine for academyEX accounts. If you'd rather not, leave the photo question out and people show as coloured initials.

---

## 2. Send a shout-out

**Form title:** Send a shout-out
**Description:** Celebrate someone in the MTF community: a finished project, a helping hand, a win. Shout-outs appear in the Foyer of the Community page after the PlayLab team has checked them.

| # | Question | Type | Required | Options / help text |
|---|---|---|---|---|
| 1 | Your shout-out message | Paragraph | Yes | Help text: "Keep it to a sentence or two" |
| 2 | From | Short answer | No | Help text: "Your name, or leave blank to stay anonymous" |

---

## 3. Map Wall pin (already made)

Your current questions work with the page and the helper:
- First name
- Are you a... (Student, Staff)
- Where do you currently live (Town or City)
- Where are you from?

**Suggested changes**
1. **Add "Country you live in"** (short answer, required) after the town question. Without it, pins can only be placed for towns the map already knows, so you'd have to fill in countries by hand.
2. **Add a consent checkbox** at the end: "I'm happy for my pin to appear on the PlayLab Community page" (required, one option "Yes, I agree"). The helper skips rows where it isn't ticked.

Optional extras: add "Alumni" and "Future student" to "Are you a...", add help text to First name ("Optional: leave blank to add an unnamed pin") and make it not required.

---

## 4. Gallery submission (already made)

Check your form has these questions (the wording can vary a little):

| # | Question | Type | Required | Options / help text |
|---|---|---|---|---|
| 1 | Your name | Short answer | Yes | Help text: "For group work, list everyone" |
| 2 | Title of your work | Short answer | Yes | |
| 3 | Which Gen are you in? | Short answer | Yes | |
| 4 | Is this project work or a community moment? | Multiple choice | Yes | Project work · Community moment |
| 5 | Course or assessment | Short answer | No | Help text: "For example Disruption Report" |
| 6 | Tell us about it | Paragraph | Yes | Help text: "One or two sentences for the caption" |
| 7 | Upload your image | File upload | Yes | 1 file, images only, max 10MB |
| 8 | Link to the full piece | Short answer | No | Help text: "A video, website or file link, if you have one" |
| 9 | I agree to this work being shown on the PlayLab Community page | Checkboxes | Yes | One option: "Yes, I agree. Everyone who made it, or appears in it, is happy for it to be shared" |
