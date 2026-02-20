# Biekie Bos — Website

A production-ready static website for **Biekie Bos**, a family restaurant and party venue in Meyerton, Vaal Triangle, South Africa.

## Tech Stack

- Pure HTML, CSS, Vanilla JavaScript
- No build step required
- No frameworks or dependencies
- Google Fonts loaded via CDN (Playfair Display + Nunito)
- Hosted on GitHub Pages

---

## Deployment to GitHub Pages

### Step 1: Create the Repository
1. Go to [github.com](https://github.com) and log in
2. Click **New repository**
3. Name it: `biekiebos` (or any name you prefer)
4. Set to **Public**
5. Click **Create repository**

### Step 2: Upload Files
**Option A — GitHub web interface (simplest):**
1. Open your repo on GitHub
2. Click **Add file → Upload files**
3. Drag and drop all website files, keeping the folder structure intact
4. Click **Commit changes**

**Option B — Git command line:**
```bash
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/biekiebos.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your repository, click **Settings**
2. In the left sidebar, click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Set Branch to `main`, folder to `/ (root)`
5. Click **Save**

### Step 4: Access Your Site
Your site will be live at:
```
https://YOURUSERNAME.github.io/biekiebos/
```
(Replace `YOURUSERNAME` with your GitHub username)

> **Important:** After enabling Pages, it may take 1–5 minutes for the site to go live. Refresh the Settings → Pages screen to see the live URL.

### Step 5: Update the JSON-LD Schema URL
In `index.html`, find this line and replace the placeholder with your actual GitHub Pages URL:
```json
"url": "https://yourusername.github.io/biekiebos/",
```

---

## Repo File Structure

```
/ (repo root)
  index.html          ← Home page
  about.html          ← About page
  events.html         ← Events & Parties page
  menu.html           ← Menu page
  gallery.html        ← Gallery page
  contact.html        ← Contact page
  /assets
    /css
      styles.css      ← All styles
    /js
      main.js         ← All JavaScript
    /img
      logo.png        ← Upload your logo here
      og-image.jpg    ← Open Graph image (1200×630px recommended)
      hero-bg.jpg     ← Hero background image
    /menu
      menu.pdf        ← Current menu PDF (REPLACE THIS TO UPDATE MENU)
      menu.jpg        ← Menu fallback image (REPLACE THIS TO UPDATE)
  README.md
```

---

## Updating Content

### Update the Menu
To update the menu, simply replace these files:
- `assets/menu/menu.pdf` — The PDF shown inline and available for download
- `assets/menu/menu.jpg` — Fallback image if PDF fails to load

Keep the same filenames. The website will automatically show the updated file.

### Update Phone Numbers or Email
All contact details are defined in **one place** in `assets/js/main.js`:

```javascript
const CONFIG = {
  restaurantPhone: '+27163631602',
  restaurantPhoneDisplay: '016 363 1602',
  eventsPhone: '+27832680984',
  eventsPhoneDisplay: '083 268 0984',
  email: 'info@biekiebos.co.za',
  facebook: 'https://www.facebook.com/BiekieBos/',
  address: 'Donald Rd, Glen Donald AH, Meyerton, 1929, South Africa',
};
```

> **Note:** Phone numbers and email also appear directly in the HTML files (for the `tel:` and `mailto:` links to work without JavaScript). If you change a number, also search-and-replace across the HTML files.

### Add Photos to the Gallery
1. Upload your `.jpg` or `.png` photos to `assets/img/`
2. In `gallery.html`, find a `gallery-full-item` div and replace the emoji with:
```html
<img src="assets/img/your-photo.jpg" alt="Description of photo" />
```

### Update Business Hours
Hours appear in the footer of every page and on `contact.html`. Search for `8am – 5pm` across all HTML files to update.

---

## SEO Notes

Each page has:
- Unique `<title>` and `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- One `<h1>` per page with clean heading structure
- Internal links between pages
- JSON-LD LocalBusiness/Restaurant schema on `index.html`

---

## Brand Colours (CSS Variables)

```css
--bb-cocoa: #5D4639;   /* dark cocoa — primary text */
--bb-taupe: #816E64;   /* warm taupe — buttons, accents */
--bb-stone: #B7AA99;   /* stone beige — secondary text */
--bb-cream: #F4F1EC;   /* cream — backgrounds */
--bb-white: #FFFFFF;   /* white */
--bb-sand:  #C4B6A4;   /* neutral — borders, cards */
--bb-bark:  #52392C;   /* deep — footer, dark CTAs */
```

---

## Browser Support

Works in all modern browsers. No polyfills required. IntersectionObserver (used for scroll animations) falls back gracefully in older browsers.

---

## Support

For technical updates or questions about the website structure, refer to this README or contact your web developer.

For restaurant enquiries: **016 363 1602**  
For party bookings: **Andre Brits — 083 268 0984**
