# Setting up What's On

The What's On page shows the PlayLab calendar and tech news in the PlayLab style. A small scheduled job on GitHub ("GitHub Actions") keeps them up to date: every 3 hours it reads the PlayLab Google Calendar and four tech news feeds (The Verge, WIRED, MIT Technology Review, Ars Technica) and saves them into `whats-on/data/`. The page reads those files.

You set this up once. After that there's nothing to maintain: new calendar events and news appear on their own.

**Until the job has run**, the page still works. The calendar section shows the normal Google Calendar embed, and Tech news links to the Tech Brief site.

It takes about 10 minutes. Everything is done on github.com.

---

## Before you start: is the calendar OK to share?

The job saves the calendar's upcoming events (titles, times, locations and descriptions) into a file in the repo. **Files in a public repo can be read by anyone who finds them**, even though the Google Site itself needs an academyEX login.

That's fine if the PlayLab calendar only has the kind of events you'd happily list on a public page. If it ever holds private details (people's names for one-to-one meetings, home addresses, private links), keep those in a different calendar.

---

## Step 1. Upload the What's On files

1. Unzip `playlab-pages.zip` on your computer.
2. In your repo on GitHub, click **Add file → Upload files**.
3. Drag in the `whats-on` folder, then click **Commit changes**.

## Step 2. Add the scheduled job

GitHub only runs jobs saved in a folder called `.github/workflows`. Folders starting with a dot are hidden on most computers, so it's easiest to create this file directly on GitHub:

1. In your repo, click **Add file → Create new file**.
2. In the name box, type exactly: `.github/workflows/update-whats-on.yml`
   (GitHub creates the folders as you type each `/`.)
3. Copy everything in the grey box below and paste it into the big editing area.
4. Click **Commit changes**, then **Commit changes** again.

```yaml
# Updates the What's On page's calendar and tech news every few hours.
# It reads the PlayLab Google Calendar and four news feeds, saves them to
# whats-on/data/, and commits only if something changed.
# Setup steps: whats-on/SETUP.md

name: Update What's On

on:
  schedule:
    - cron: "23 */3 * * *"   # every 3 hours (times are UTC)
  workflow_dispatch:          # adds a "Run workflow" button in the Actions tab

permissions:
  contents: write

concurrency:
  group: update-whats-on
  cancel-in-progress: false

jobs:
  update:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    env:
      TZ: UTC
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Fetch calendar and news
        working-directory: whats-on/tools
        env:
          CALENDAR_ICS_URL: ${{ secrets.CALENDAR_ICS_URL }}
        run: |
          npm install --no-audit --no-fund --no-package-lock
          node update-data.mjs

      - name: Save changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898299+github-actions[bot]@users.noreply.github.com"
          git add whats-on/data
          if git diff --cached --quiet; then
            echo "Nothing new."
          else
            git commit -m "Update What's On calendar and news"
            git push
          fi
```

## Step 3. Let the job save its updates

1. In your repo, go to **Settings → Actions → General**.
2. Scroll to **Workflow permissions**, choose **Read and write permissions**, and click **Save**.

(If this option is greyed out, your GitHub organisation controls it. Ask whoever manages academyEX's GitHub to allow it for this repo.)

## Step 4. Give the job access to the calendar

**If the PlayLab calendar is public**, skip this step. The job reads its public address automatically.

**If it isn't public** (or you're not sure), give the job the calendar's private address:

1. Open Google Calendar on a computer. Under **My calendars** (or **Other calendars**), point at the PlayLab calendar, click the **⋮** menu, then **Settings and sharing**.
2. Scroll to **Integrate calendar** and copy the **Secret address in iCal format**. (Only the calendar's owner, or someone allowed to change its settings, can see this.)
3. In your GitHub repo, go to **Settings → Secrets and variables → Actions**.
4. Click **New repository secret**. For **Name**, type `CALENDAR_ICS_URL`. For **Secret**, paste the address. Click **Add secret**.

GitHub keeps the secret hidden. It isn't visible in the repo or on the page.

If you can't see a secret address, your Google Workspace may have turned it off. The alternative is to make the calendar public (Settings and sharing → **Access permissions for events** → **Make available to public**), if the events are OK to share.

## Step 5. Run it for the first time

1. In your repo, click the **Actions** tab. If GitHub asks, click the button to enable workflows.
2. Click **Update What's On** on the left, then **Run workflow → Run workflow**.
3. After about a minute, refresh. A **green tick** means it worked. In the repo, `whats-on/data` now contains `events.json` and `news.json`.
4. GitHub Pages republishes the site within a couple of minutes. Open the What's On page to check the calendar and news.

From now on it runs every 3 hours by itself, and only saves when something has changed.

## Step 6. Embed the page in Google Sites

Embed `https://YOUR-USERNAME.github.io/playlab-pages/whats-on/` in your What's On page (**Insert → Embed → By URL**), about 1,500px tall, the same as the other pages.

---

## Day-to-day

Nothing to do. Add events to the PlayLab Google Calendar as usual and they appear on the page within 3 hours. Repeating events, cancelled occurrences and moved occurrences are all handled.

**Settings you might change**, in `whats-on/index.html` (search for `const SETTINGS`):
- `meetingReasons`: the "Things you might meet about" list on the Book a meeting page (use `[]` to hide it)
- `meetingForm`, `aexEvents`, `calendarSubscribe`: the links used on the page

**To change the news sources**, edit `FEEDS` near the top of `whats-on/tools/update-data.mjs`. Each source needs a name and its RSS feed address.

**To update more or less often**, change the `cron` line in `.github/workflows/update-whats-on.yml`. `"23 */3 * * *"` means every 3 hours. `"23 */6 * * *"` would be every 6 hours.

## If something goes wrong

- **A red cross in the Actions tab:** click the failed run, then the **Fetch calendar and news** step, to see the message.
  - "Calendar returned 404" or "403": the job can't read the calendar. Check the `CALENDAR_ICS_URL` secret (step 4), or that the calendar is public.
  - A news source failing: the page keeps showing that source's last saved stories. It usually fixes itself on the next run. If one keeps failing, its feed address may have changed.
  - "Permission denied" when saving: check step 3.
- **The job stopped running:** GitHub pauses scheduled jobs in repos with no activity for 60 days, and emails the repo owner. Go to **Actions → Update What's On** and click **Enable workflow**.
- **Times look wrong:** the page always shows New Zealand time and says so to visitors in other time zones. Check the event's time zone in Google Calendar.
