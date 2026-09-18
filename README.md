# Weblino — Website Project

The **Weblino** marketing site (HTML/CSS/JS) plus a small **Node.js + Express + SQLite backend** that powers a real **Admin Panel** and **Customer Panel**, each with its own login and dashboard.

```
weblino/
├── index.html              (public marketing site)
├── css/  js/  assets/
├── admin/
│   ├── login.html
│   └── dashboard.html      (admin-only: stats, messages, customers, projects)
├── customer/
│   ├── login.html
│   ├── register.html
│   └── dashboard.html      (customer-only: their projects, profile)
├── server/
│   ├── server.js           (Express app entry point)
│   ├── db/database.js      (SQLite schema + seeds the first admin account)
│   ├── middleware/auth.js  (JWT auth, role checks)
│   └── routes/             (auth.js, admin.js, customer.js, contact.js)
├── .env                     (secrets — see step 2)
└── README.md
```

## 1. What's included

- **Database** (SQLite, file-based, zero setup) with three tables: `users` (admin + customer accounts), `messages` (contact-form submissions), `projects` (client project tracking).
- **Admin Panel** at `/admin/login.html` — only accounts with `role = 'admin'` can log in or call any `/api/admin/*` endpoint (enforced on the server, not just hidden in the UI). From there an admin can see site stats, read contact-form messages, add/remove customer accounts, and create/update/delete projects per customer.
- **Customer Panel** at `/customer/login.html` — customers can self-register (`register.html`), log in, view their own projects, and update their profile/password. They cannot see admin data even if they try to call an admin API URL directly (server returns 403).
- The homepage **contact form now saves submissions into the database** (visible in the admin panel under "Messages") instead of only simulating success in the browser.

## 2. Run it locally

This now needs Node.js (v18+) since the panels talk to a real backend.

```bash
cd weblino
npm install          # only needed once
node server/server.js
```

Then open:
- **Site:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin/login.html
- **Customer panel:** http://localhost:3000/customer/login.html

On first run, the server prints a **default admin login** in the terminal (from `.env` — see below) and creates `server/db/weblino.db` automatically. No separate database install is needed.

**Change these before going live**, in the `.env` file:
```
PORT=3000
JWT_SECRET=replace-with-a-long-random-string   # used to sign login sessions — make this long & random
ADMIN_EMAIL=admin@weblino.com                  # your real admin email
ADMIN_PASSWORD=ChangeMe123!                    # change this, then log in and it's stored (hashed) in the DB
NODE_ENV=production
```
The admin account is only seeded once (the first time the database is created with no admins yet), so if you already logged in and changed the password from the admin dashboard, editing `.env` afterward won't overwrite it.

## 2. Edit the text

All copy lives directly inside `index.html` — there is no CMS or database. Open `index.html` in any code editor (VS Code recommended) and search for the text you want to change, for example:

- Hero headline: search for `Build a brand`
- Services: search for `Business Websites`, `E-commerce`, `UI / UX Design`, `AI Solutions`
- Pricing: search for `Starter`, `Growth`, `Premium`
- Footer: search for `© 2026 Weblino`

Template Store content (names, descriptions, features) lives in `js/script.js` inside the `templates` array near the top of the file — edit the text fields there and the cards update automatically.

## 3. Replace images

The current version uses CSS gradients and inline SVG instead of photos, so the site works instantly with no missing-image errors. To use real photos:

1. Add image files to `assets/images/`.
2. In `index.html` or `css/style.css`, replace the relevant gradient background (e.g. `.p-fashion::before { background: ... }`) with:
   ```css
   .p-fashion::before { background: url('../assets/images/fashion-cover.jpg') center/cover; }
   ```
3. For the team avatars (`.av-1` to `.av-4` in `style.css`), swap the CSS gradient for a real headshot the same way, or replace the `<div class="team-avatar">` with an `<img>` tag.

Keep images compressed (WebP or optimized JPG) to protect load speed — see Performance below.

## 3a. Template demos (live, clickable)

Every template in the "Template Store" section of the homepage now has a **real, working demo page** under `templates/`. Nothing is a screenshot — you can add items to a cart, book a table, filter a menu, run the finance calculator and submit the (demo) forms.

```
templates/
├── index.html        gallery page listing all eight demos
├── fashion.html      StyleNest — editorial fashion storefront
├── sneaker.html      KicksZone — sneaker shop, quick view + size picker + cart
├── restaurant.html   Saffron & Sage — filterable menu + reservation form
├── beauty.html       Lumière — skincare routine builder + before/after slider
├── car.html          AUREA Motors — inventory filter, spec table, finance calculator
├── business.html     Northbridge — services, process, case studies, FAQ, quote form
├── personal.html     Rahat Abir — single-page portfolio and rate card
├── landing.html      Pulse — SaaS landing page with monthly/yearly pricing toggle
└── assets/
    ├── demo.css      shared base styles (each page overrides the tokens at the top)
    └── demo.js       shared script: inline SVG art library, cart, filters, forms, accordion
```

Open them at `http://localhost:3000/templates/` (or click **Live Demo** on any card on the homepage).

**How the demos are wired to the homepage:** the `templates` array near the top of `js/script.js` now carries three extra fields per template — `demo` (the page to open), `thumb` (card image) and, for the two designed templates, `full` (the large screenshot shown in the details modal). Change those paths and the cards follow.

**Editing a demo:** each page is self-contained. The design tokens (colors, fonts, radius) live in the `:root{ ... }` block inside that page's own `<style>`; the copy lives directly in the markup. To change the shared behaviour (cart, form handling, reveal animation) edit `templates/assets/demo.js`.

**No photos required.** Product and food visuals are inline SVG drawings from the `art` library in `demo.js` (`data-art="sneaker"`, `data-art="plate"`, and so on), so the demos load instantly and never show a broken image. Swap any of them for a real `<img>` when you have photography.

**Demo bar.** Every demo page carries a fixed bar at the bottom linking back to the template list and the contact form. Delete the `.wb-bar` block from a page if you hand that page to a client as-is.

## 3b. Card previews in the template store

The two designed templates use the images you provided:

- `image/Fashion Store.png` and `image/Sneaker.png` are the original full-page designs (kept untouched).
- `image/previews/` holds the web-optimised versions generated from them — `*-thumb.jpg` for the card, `*-full.jpg` for the details modal.
- The remaining six cards use lightweight SVG mockups in the same folder (`restaurant-thumb.svg`, `beauty-thumb.svg`, `car-thumb.svg`, `business-thumb.svg`, `personal-thumb.svg`, `landing-thumb.svg`). Replace any of them with a real screenshot of the demo page when you want photography-grade previews — just keep the same filename or update the `thumb` path in `js/script.js`.

## 4. Change pricing

Open `index.html`, search for `id="pricing"`. Each plan (`Starter`, `Growth`, `Premium`) has a `.price-tag` (the number) and a `<ul>` list of features — edit the numbers and list items directly. The "Most popular" badge is the `.price-badge` element on the `Growth` card; move the `featured` class to a different `.price-card` if you want to highlight a different plan.

## 5. Change the contact email

The email `rahatabir589@gmail.com` appears in three places in `index.html`:
- The structured data block in `<head>`
- The contact section's "Email" button (`mailto:` link)
- The footer email link

Use your editor's find-and-replace across the file to update all three at once. Also update the WhatsApp link (`https://wa.me/`) with your actual number, e.g. `https://wa.me/8801XXXXXXXXX`, and the Facebook/LinkedIn/GitHub links (currently `#` placeholders) once you have real URLs.

**Note:** the homepage contact form posts to `/api/contact` and the message appears in the admin panel. (The forms inside `templates/*.html` are demo-only and intentionally store nothing.) To make it functional, connect it to a form service such as Formspree, Web3Forms, or your own backend endpoint — update the `<form id="projectForm">` in `index.html` with an `action` URL and adjust the `submit` handler in `js/script.js` accordingly.

## 6. Add or update team members

In `index.html`, search for `id="team"`. Each person is a `.team-card` block with an avatar div, a name (`<h4>`), and a role (`<p>`). Copy an existing `.team-card` block to add a new person, or edit the text in place to update an existing one.

## 7. Deploy — you now need Node.js hosting

Because the admin/customer panels run through a real backend, **plain static hosting (basic cPanel file upload, Netlify/Vercel drag-and-drop, GitHub Pages) will not run the panels** — only the static marketing page would work, and `/admin` or `/customer` would 404.

Pick one of these instead:

**Option A — cPanel with "Setup Node.js App" (many hosts have this)**
1. In cPanel, find **Setup Node.js App** and create a new app pointing at the `weblino` folder, with `server/server.js` as the startup file.
2. Set the environment variables from `.env` (`JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV=production`) in the app's settings instead of relying on the `.env` file, since some hosts don't read it automatically.
3. Run **NPM Install** from the same screen, then **Start/Restart** the app.
4. Point your domain at the app (the panel usually gives you the port/proxy setup automatically).

**Option B — Render, Railway, or Fly.io (simple, free/cheap tiers)**
1. Push this folder to a GitHub repo (the included `.gitignore` keeps `node_modules`, `.env`, and the database file out of git).
2. Create a new **Web Service** on Render/Railway/Fly, connect the repo.
3. Start command: `node server/server.js`. Build command: `npm install`.
4. Add the same environment variables as above in the host's dashboard (don't commit real secrets to git).
5. Attach your custom domain from the host's dashboard once it's live.

**Option C — a VPS (DigitalOcean, Linode, etc.)**
1. Install Node.js, copy the project over, run `npm install`.
2. Use `pm2` (`npm i -g pm2; pm2 start server/server.js --name weblino`) to keep it running and restart on crashes/reboots.
3. Put Nginx in front as a reverse proxy to the Node port, and use Certbot for free HTTPS.

Whichever option you pick, the SQLite database file (`server/db/weblino.db`) lives on that server's disk — make sure your host's plan persists disk storage (some free serverless tiers wipe the filesystem on redeploy, which would lose your data).

## 9. Connect a custom domain

- **cPanel hosting:** point your domain's nameservers to your host (your hosting provider gives you these), or add an A record pointing to your server's IP address.
- **Netlify/Vercel:** add your domain in their dashboard, then update your domain registrar's DNS records with the values they provide (usually a CNAME or A record).
- DNS changes can take a few hours to propagate worldwide.

## 10. Enable HTTPS

- **cPanel:** most hosts offer a free **AutoSSL / Let's Encrypt** option under **Security → SSL/TLS Status** in cPanel — enable it for your domain.
- **Netlify/Vercel:** HTTPS certificates are provisioned and renewed automatically once your domain is connected — no action needed.

## 11. Performance notes

- Images aren't included by default — when you add real photos, compress them (TinyPNG, Squoosh, or export as WebP) and keep hero/cover images under ~200KB where possible.
- The 3D hero visual is a lightweight inline SVG (no Three.js, no 3D model files), so it loads instantly and works the same on mobile.
- Animations respect `prefers-reduced-motion` and are CSS-driven where possible to keep JavaScript light.
- Google Fonts (`Space Grotesk`, `Inter`) are loaded via `<link>` in `index.html`; you can self-host them later for one less external request if you want to push performance further.

## 12. Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`) and heading order are already in place.
- All interactive elements (nav toggle, filters, modal, form) are keyboard-operable, and the template preview modal traps focus on open and returns focus on close.
- Colors meet reasonable contrast against the dark background; adjust `--gray` in `css/style.css` if you introduce new text on a lighter surface.

## 13. What's a placeholder right now

Marked clearly in the code and copy so nothing here is presented as more real than it is:
- **Case studies** are labeled "Concept Project" / "Weblino Demo".
- **Testimonials** are labeled "Sample testimonial" under the heading "What businesses should expect."
- The **"Your website. One simple dashboard."** section (with the "Coming to Weblino" tag) is a marketing mock-up of a *future* client analytics dashboard (visitor counts, orders, revenue) — this is separate from the real Customer Panel described above, which already works today for project tracking.
- **Weblino AI** section is labeled "Coming Soon."
- **LinkedIn / GitHub** links are still `#` placeholders — update them once you have real profile URLs. **Facebook** is now linked to your real page.

Replace the remaining ones as soon as you have real client work, testimonials, or live products to show.

## 14. Admin & Customer panel quick reference

| | URL | Notes |
|---|---|---|
| Admin login | `/admin/login.html` | Only `role = 'admin'` accounts can sign in here. |
| Admin dashboard | `/admin/dashboard.html` | Stats, contact messages, manage customers, manage projects. |
| Customer login | `/customer/login.html` | For accounts created via self-registration or by an admin. |
| Customer register | `/customer/register.html` | Public — anyone can create a customer account. |
| Customer dashboard | `/customer/dashboard.html` | Shows only that customer's own projects and profile. |

Security notes:
- Passwords are hashed with bcrypt before being stored — never stored in plain text.
- Sessions use an httpOnly JWT cookie, so it can't be read or stolen via JavaScript.
- Role checks happen **on the server** for every admin/customer API call, so a customer can't get admin data even by guessing API URLs — this was tested directly (customer calls to admin endpoints correctly return `403 Forbidden`).
- `admin/login.html` and `admin/dashboard.html` are marked `noindex, nofollow` so search engines won't list them, and there's no public link to them anywhere on the homepage — treat the URL itself as something you only share with admins.
