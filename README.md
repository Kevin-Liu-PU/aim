# Purdue AIM team page

Weekly assignments for Robotic Cellist and Glockenspiel, a shared Google Drive link, and team member contacts.

## Update the page

Edit `team-data.js` to update assignments, the Drive link, or member details. Each member has a `name`, `team`, `gmail`, and `purdueEmail`. Leave unknown email addresses empty. Assignments are listed for weeks 1–16; an empty string means not posted yet, and `null` leaves a cell blank.

Commit changes to `main` to publish them automatically with GitHub Pages. Pages serves the repository root. No installation or build step is required; `.nojekyll` keeps the files as plain static assets.

The stylesheet and script URLs in `index.html` include `?v=` version parameters to prevent browsers from mixing new pages with cached older content. If you edit an asset directly in this repository, also change its version parameter in `index.html`. The local authoring workspace automates this with `node scripts/prepare-pages.cjs` before copying and publishing the files.

`index.html` contains the page structure, `styles.css` controls appearance, and `app.js` renders the content. All asset URLs are relative so the site works under `/aim/`.
