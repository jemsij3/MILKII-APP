# MILKII APP

MILKII APP is a buy-and-sell marketplace that runs inside Telegram as a Telegram Mini App for all of Ethiopia. Buyers and sellers across every Ethiopian region and city can use it in English, Afaan Oromoo, and Amharic, with prices in Ethiopian Birr, AI translation and search help, manual CBE and Telebirr payment verification, and built-in admin and owner tools.

## Features

### For Buyers
- Browse approved listings from all 14 Ethiopian regions and filter by region, city or town, category, or search keywords.
- View up to 6 photos and a short video per item, along with category details, location, and negotiable status.
- Save favorite items on your device for quick access later.
- Translate any item's title and description into English, Afaan Oromoo, or Amharic using AI.
- Ask the built-in AI assistant to help find listed items anywhere in Ethiopia.
- Message the seller directly on Telegram with one tap.
- Report suspicious or rule-breaking listings to the admins.

### For Sellers
- Post items in 6 categories, each with its own dedicated listing form.
- Upload 1 to 6 photos (compressed automatically) and up to 1 video (10 seconds or less) stored on Cloudinary.
- Choose your region, enter your city or town (with quick-pick suggestions), and optionally add a neighborhood or area.
- Choose between Free, Standard, or Featured listing plans.
- Pay for Standard or Featured plans manually via CBE or Telebirr by entering the transaction reference and uploading a receipt screenshot.
- Track listing status (**pending**, **approved**, **rejected** with reason, or **sold**), mark items as sold, or delete them under **My items**.
- Receive Telegram direct messages when an item is approved or rejected, or if account status changes (when message permission is enabled).

### For Admins and Owners
- Review pending and reported listings, inspect payment receipts, view item details, and approve or reject (with an optional reason) or delete items.
- Receive Telegram notifications when a new item is submitted or when a listing reaches 3 reports.
- View the **Users** list, search by username, name, or Telegram ID, filter by All, Sellers, or Banned, and ban or unban users (banning deletes all of the user's listings and media).
- View **Analytics** for the last 7, 30, or 90 days (user counts, approval rate, income in Birr, daily item and income charts, category, region, top cities, and plan breakdowns).
- **Owner only:** View the append-only **Audit** log recording every approval, rejection, item deletion by an admin, ban, unban, settings update, and receipt view.
- **Owner only:** Edit plan fees, CBE and Telebirr payment details, and daily/pending limits in **Admin > Settings** without editing code.

## Categories

Every listing also asks for **Region** (required), **City / Town** (required, 2–40 characters), **Neighborhood / Area** (optional, max 40 characters), **Title** (3–60 characters), **Price in Birr** (whole number), **Price is negotiable** (optional), and **Description** (10–300 characters). Each category adds these specific fields:

| Category | Required fields | Optional fields |
| --- | --- | --- |
| **Phones & Electronics** | Item type, Brand, Model, Condition | Storage, Color, Includes (Charger, Box, Case/cover, Headphones, Receipt/warranty) |
| **Clothes & Shoes** | For (Men, Women, Boys, Girls, Baby, Unisex), Item type, Size, Condition | Brand, Color |
| **Food & Farm Products** | Category (Coffee, Spices, Grains & cereals, Fruits & vegetables, Cooked food, Dairy & eggs, Meat & fish, Honey, Drinks, Other), Quantity, Unit, Pricing, Availability, Delivery | Harvest or production date, Best before |
| **Home & Furniture** | Item type, Condition, Delivery | Size / Dimensions, Material, Quantity |
| **School & Books** | Item type, Education level, Condition | Subject, Author, Edition / Year, Quantity |
| **Services** | Service type, Pricing unit, Areas served, Availability, Service location | Years of experience, Languages spoken |

## How It Works

1. A user opens MILKII APP inside Telegram.
2. A seller taps **Post an item**, chooses a category, uploads 1–6 photos (and optionally 1 short video), fills in the category details, location, title, price, and description, and selects a plan (**Free**, **Standard**, or **Featured**).
3. If the seller picks a paid plan (**Standard** or **Featured**), they send the fee via CBE or Telebirr to the account shown on screen, enter the transaction reference, and upload a receipt screenshot.
4. The listing enters **pending** status and admins with DM access receive a Telegram message.
5. An admin reviews the listing (and verifies any paid transfer in their real bank or Telebirr account), then taps **Approve** or **Reject**.
6. Once approved, the item appears in **Browse** for buyers across Ethiopia (with **Featured** items shown at the top with a star).
7. A buyer finds the item using search or region/city filters, optionally translates the details or asks the AI assistant, and taps **Message seller** to chat directly with the seller on Telegram.

## Roles

| Action | Buyer / Seller | Admin | Owner |
| --- | --- | --- | --- |
| Browse, search, save, report, use AI, message sellers | Yes | Yes | Yes |
| Post, mark own items sold, delete own items | Yes | Yes | Yes |
| See **Admin** tab, view **Items**, **Users**, **Analytics** | No | Yes | Yes |
| Approve, reject, delete any listing, view payment receipts | No | Yes | Yes |
| Ban or unban regular users | No | Yes | Yes |
| View **Settings** | No | Yes (read-only) | Yes (read and edit) |
| Edit plan prices, payment accounts, and limits in **Settings** | No | No | Yes |
| View **Audit** log | No | No | Yes |
| Can be banned | Yes | No | No |

## Project Structure

```text
.
├── public/
│   └── index.html              # Complete frontend (plain HTML, CSS, and vanilla JavaScript)
├── functions/
│   └── api/
│       └── [[route]].js        # Backend API running on Cloudflare Pages Functions
├── schema.sql                  # Database table definitions for Cloudflare D1
└── README.md                   # Setup and operations guide
```

> **Note:** `wrangler.toml` and `package.json` are **NOT** used by MILKII APP. Do not add a build step for Cloudflare Pages.

## Requirements

You need free accounts on these services:

1. **Telegram** — Runs the bot and hosts the Mini App interface inside Telegram.
2. **GitHub** — Stores your repository files so Cloudflare Pages can deploy them.
3. **Cloudflare** — Provides **Cloudflare Pages** (frontend hosting), **Pages Functions** (backend API), **Cloudflare D1** (SQLite database), and **Cloudflare Workers AI** (built-in AI chat and translation with no external AI key).
4. **Cloudinary** — Stores seller photos and videos and delivers resized thumbnails and streams.

## Setup Step by Step

### 1. Create the Telegram bot
1. Open Telegram and search for **@BotFather**.
2. Send `/newbot` and follow the prompts to choose a name and a username ending in `bot`.
3. Send `/setname`, select your new bot, and set the display name to `MILKII APP`.
4. Copy the Bot Token that BotFather gives you and save it in a private place. Never share it.

### 2. Find your Telegram user ID
1. Open Telegram and search for **@userinfobot**.
2. Press **Start** (or send any message).
3. Copy your numeric **Id** (for example `123456789`). You will put this into `TELEGRAM_ADMINS_ID`.

### 3. Create a Cloudinary account
1. Sign up for a free account at Cloudinary.
2. Open the **Dashboard** (or **Settings > Access Keys**).
3. Copy these three values:
   - **Cloud name**
   - **API Key**
   - **API Secret**

### 4. Put the project on GitHub
1. Create a new repository on GitHub (private or public).
2. Upload the project keeping the exact folder structure:
   - `schema.sql` and `README.md` in the main (root) folder
   - `public/index.html` inside the `public` folder
   - `functions/api/[[route]].js` inside `functions/api`
3. Make sure no secrets, tokens, or passwords are inside any file you commit.

### 5. Create the Cloudflare D1 database
1. Log in to the Cloudflare Dashboard.
2. In the left sidebar, go to **Storage & Databases > D1 SQL Database**.
3. Click **Create** (or **Create database**), enter the name `milkii-db`, and create it.
4. You do **not** need to create tables manually in the D1 Console: as soon as you bind `milkii-db` as `DB` and open MILKII APP in Telegram, `functions/api/[[route]].js` automatically creates all required tables, indexes, and missing columns on first run. (`schema.sql` and `migration.sql` are kept in the repository only as reference.)

### 6. Create the Cloudflare Pages project from GitHub
1. In the Cloudflare Dashboard, go to **Workers & Pages**.
2. Click **Create** > select the **Pages** tab > click **Connect to Git**.
3. Connect your GitHub account and choose your MILKII APP repository.
4. On the build setup screen:
   - **Build command:** leave completely **empty**
   - **Build output directory:** type `public`
5. Click **Save and Deploy**. Wait for the first deploy to finish and note your `https://YOUR_PROJECT.pages.dev` URL.

### 7. Bind the D1 database and Workers AI to the Pages project
1. Open your Cloudflare Pages project and go to **Settings > Bindings** (or **Settings > Functions**).
2. Add the D1 database binding:
   - Click **Add** > choose **D1 database**.
   - Set **Variable name** to `DB` (exact capital letters).
   - Select `milkii-db` as the **D1 database** and click **Save**.
3. Add the Workers AI binding:
   - In Cloudflare dashboard, go to **Workers & Pages**, select your project, then **Settings > Bindings > Add > Workers AI**.
   - Set the variable name to `AI` (capital letters) and save, then redeploy.
4. Make sure both bindings (`DB` and `AI`) are added for **Production** (and **Preview** if you use preview links).

### 8. Add environment variables and redeploy
1. Stay in your Pages project and open **Settings > Variables and Secrets** (or **Settings > Environment variables**).
2. Add the variables and secrets listed in Section 9 (**Environment Variables**) for **Production**.
3. Go to the **Deployments** tab, click the three-dot menu on the latest deployment, and click **Retry deployment** so the new bindings and variables take effect.

### 9. Connect the Mini App to your Telegram bot
1. Open **@BotFather** in Telegram.
2. Either create a Web App with `/newapp`, select your bot, set title `MILKII APP`, and enter your `https://YOUR_PROJECT.pages.dev` URL, **or** set the bot Menu Button with `/setmenubutton`, choose your bot, send `https://YOUR_PROJECT.pages.dev`, and set the button text (for example `Open MILKII APP`).

### 10. Open the bot in Telegram, press Start, and test
1. Open your bot in Telegram and press **Start**.
2. Tap the Menu Button (or Mini App link) to open MILKII APP.
3. If prompted to allow messages from the bot, tap **Allow**, then complete the **First Test Checklist** below.

## Environment Variables

Add these variables and secrets in Cloudflare Pages under **Settings > Variables and Secrets**. (Cloudflare requires underscores `_` instead of spaces.) Never put secrets in GitHub or `public/index.html`.

| Name | Where to get it | Secret? | What it is for |
| --- | --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | **@BotFather** in Telegram (`YOUR_BOT_TOKEN`) | Yes | Verifies Telegram user logins on the server and sends Telegram notifications |
| `TELEGRAM_ADMINS_ID` | **@userinfobot** in Telegram (for example `123456789,987654321`) | No | Comma-separated Telegram user IDs that get Admin access |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard (`YOUR_CLOUD_NAME`) | No | Identifies your Cloudinary storage account for uploads and image URLs |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard (`YOUR_API_KEY`) | No (keep server-only in env vars) | Signs upload and verification requests to Cloudinary |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard (`YOUR_API_SECRET`) | Yes | Secret key used on the server to sign uploads and verify/delete media |
| `JWT_SECRET` | Generate a long random string | Yes | Signs and verifies optional HS256 session tokens issued by `/api/me` |
| `TELEGRAM_WEBHOOK_SECRET` | Generate a long random string | Yes | Verifies Telegram Bot API webhook requests at `POST /api/webhook` via `X-Telegram-Bot-Api-Secret-Token` |

- **Multiple IDs:** Separate multiple Telegram IDs with commas and no spaces needed (for example `111222333,444555666`).
- **Owner role:** The **first** ID listed in `TELEGRAM_ADMINS_ID` automatically becomes the Owner (unless optional `OWNER_IDS` is also set). Every Owner also has all Admin permissions.

## First Test Checklist

- [ ] Open MILKII APP from inside Telegram (confirm opening the Pages link directly in a regular browser shows `"Please open MILKII APP from Telegram."`).
- [ ] Configure your real CBE and Telebirr numbers, account holder names, and plan prices under **Admin > Settings** (as Owner) and save.
- [ ] Post a **Free** item with 1 or more photos and a short video (10 seconds or less).
- [ ] Post a **Standard** or **Featured** paid item with a transaction reference and receipt screenshot.
- [ ] Open **Admin > Items**, view the paid item's receipt, and approve both test items.
- [ ] Check Telegram to confirm notifications arrive for new/approved items (after pressing Start and allowing messages).
- [ ] Open **Admin > Settings** as Owner, change a setting (such as a fee or limit), and save it.
- [ ] Open **Admin > Audit** as Owner and confirm the approval, receipt view, and settings update entries appear.

## Manual Payment (CBE and Telebirr)

MILKII APP does not connect directly to any bank or mobile money gateway. Paid plans (**Standard** and **Featured**) work manually:

1. Before sellers can choose a paid plan, the Owner must open **Admin > Settings** inside MILKII APP and save valid **CBE** and **Telebirr** account/phone numbers and account holder names. (Until configured, paid plans show a notice and cannot be submitted.)
2. When posting an item, a seller who selects **Standard** or **Featured** sees your configured CBE or Telebirr account details and the Birr amount to send.
3. The seller transfers the money using their own bank or Telebirr app, enters the transaction reference, and uploads a receipt screenshot (compressed under 700 KB).
4. The listing enters **pending** status and admins receive a notification.
5. In **Admin > Items**, tap **Receipt** to inspect the uploaded screenshot, then check your real account.

**Always check your own bank or Telebirr balance before approving a paid item, because screenshots can be faked.**

## Settings

Plan fees, payment account details, and usage limits are stored in the D1 `settings` table and managed **inside the app** by the Owner (**Admin > Settings**), not by editing code:

- **Plan fees (Birr):** **Free** is always `0` Birr. **Standard** (default `30` Birr) and **Featured** (default `100` Birr) can be set to any whole number from `0` to `100000`.
- **Payment details:** Display label, account/phone number (up to 40 characters), and account holder name (up to 60 characters) for **CBE** and **Telebirr**. Changes apply immediately for sellers.
- **Limits:**
  - Max pending items per seller (default `10`, range `1–1000`)
  - Daily AI requests per user (default `30`, range `1–1000`)
  - Daily uploads per user (default `100`, range `1–1000`)

Non-owner admins can view the **Settings** screen, but only an Owner can save changes.

## Security

- **Telegram login is verified on the server:** Every API request sends Telegram `initData` in a header (or an optional signed Bearer JWT when `JWT_SECRET` is configured), and the backend verifies its HMAC-SHA256 signature using `TELEGRAM_BOT_TOKEN` and rejects expired logins (older than 24 hours).
- **Admin and Owner rights are checked on the server:** Every `/api/admin/*` endpoint verifies `TELEGRAM_ADMINS_ID` (and optional `OWNER_IDS`) on the server. The browser cannot grant itself admin or owner access.
- **Never put secrets in GitHub or `public/index.html`:** Keep `TELEGRAM_BOT_TOKEN`, `CLOUDINARY_API_SECRET`, `JWT_SECRET`, and `TELEGRAM_WEBHOOK_SECRET` only in Cloudflare Pages Secrets. No external AI API key is needed because AI runs through Cloudflare's `AI` binding.
- **Never share `TELEGRAM_BOT_TOKEN`:** Anyone with your Bot Token can control your bot and forge user logins.
- **Ban rules:** Banned users cannot upload files or create listings. Banning a user immediately deletes all of their items and removes their uploaded photos/videos from Cloudinary. Admins and Owners can never be banned.
- **Upload and data limits:** The backend verifies every uploaded file directly against Cloudinary (folder `milkii/items/<user_id>/`, max 10 MB images, max 30 MB and 10s videos) before saving a listing, and rejects malformed receipt images.

## Costs and Limits

### What is free vs. what can cost money
- **Free tiers available:** Telegram Bot/Mini App, GitHub, Cloudflare Pages + D1 + Workers AI free tiers, and Cloudinary free plan.
- **Can cost money:**
  - **Cloudflare Workers AI:** Includes a free daily Neuron allowance; paid Workers usage applies if your AI chat and translation traffic goes above the free tier.
  - **Cloudinary:** Charges apply if your total media storage or bandwidth goes above Cloudinary's free monthly allowance.
  - **Cloudflare Pages / D1:** Charges apply only if traffic or D1 database usage exceeds Cloudflare's free plan limits.

### Limits built into the code
- **Photos per item:** 1 to 6 photos (JPG, PNG, or WEBP; max 10 MB each).
- **Video per item:** At most 1 video (MP4, MOV, or WEBM; max 30 MB; max 10 seconds in the browser, verified up to 10.5 seconds on the server).
- **Receipt screenshot:** Compressed JPEG, PNG, or WEBP under 700 KB.
- **Browse & Admin lists:** Up to 200 live items returned in Browse and up to 300 items per Admin tab.
- **Configurable daily/account limits (defaults, editable by Owner in Settings):**
  - **10** pending listings waiting for review per seller
  - **30** AI requests (chat or translation) per user per UTC day
  - **100** Cloudinary upload signatures per user per UTC day

## Troubleshooting

| Problem | Likely cause | How to fix |
| --- | --- | --- |
| `"Please open MILKII APP from Telegram."` appears in a web browser | The page was opened outside Telegram, so `Telegram.WebApp.initData` is empty | Open the app from your Telegram bot's Menu Button or Mini App link |
| Blank page after deploying to Cloudflare Pages | **Build output directory** was not set to `public` or a build command ran | Set **Build command** to empty and **Build output directory** to `public`, then redeploy |
| `"Server error"` or failed API calls when loading the app | The D1 binding `DB` is missing or named wrong | Bind `milkii-db` to variable name `DB` (all caps) in **Settings > Bindings** and redeploy (tables are created automatically) |
| `"AI is not available right now"` | The Workers AI binding named `AI` is missing or the model name in the code is not in the Cloudflare model list | Go to Cloudflare dashboard > **Workers & Pages** > your project > **Settings > Bindings > Add > Workers AI**, set variable name to `AI` (capital letters), check `TRANSLATE_MODEL` / `CHAT_MODEL` in `functions/api/[[route]].js`, and redeploy |
| **Admin** button does not appear | Your Telegram ID is missing from `TELEGRAM_ADMINS_ID`, or has spaces/typos | Confirm your numeric ID with `@userinfobot`, add it to `TELEGRAM_ADMINS_ID`, and redeploy |
| Video upload is rejected | Video is longer than 10 seconds, larger than 30 MB, or not MP4/MOV/WEBM | Trim the video to 10 seconds or less and keep file size under 30 MB |
| Notifications do not arrive in Telegram | The user or admin never pressed **Start** in the bot or did not allow messages (`can_dm = 0`), or `TELEGRAM_BOT_TOKEN` is wrong | Press **Start** in the bot chat, tap **Allow** if asked for write access, reopen MILKII APP, and check `TELEGRAM_BOT_TOKEN` |
| Photos or videos fail to upload | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, or `CLOUDINARY_API_SECRET` is missing or wrong | Check all three Cloudinary variables in Cloudflare Pages and redeploy |
| Paid plans cannot be submitted in Step 5 | The Owner has not configured real CBE/Telebirr numbers and holder names yet | Open **Admin > Settings** as Owner and save valid CBE and Telebirr payment details |
| Seller sees `"You need a Telegram username"` | The seller's Telegram account does not have a `@username` set | Set a username in Telegram **Settings > Username**, then reopen MILKII APP |
| Old version still shows after a code change | Telegram/browser cache or Cloudflare Pages did not redeploy after env changes | Trigger **Retry deployment** in Cloudflare Pages and reopen the Mini App in Telegram |

## How to Update the App

1. Open your repository on GitHub and edit the file you want to update (for example `public/index.html` or `functions/api/[[route]].js`), or push new commits from your computer.
2. Commit the changes to your production branch (usually `main`).
3. Cloudflare Pages detects the GitHub commit and automatically builds and deploys the new version within about a minute.
4. Any new tables or columns added in the backend are applied automatically on the first request after deploy.

## FAQ

**1. Does MILKII APP work outside Telegram in a normal browser?**
No. If opened outside Telegram, it stops and shows `"Please open MILKII APP from Telegram."` because user login and verification depend on Telegram's `initData`.

**2. Can I add another Admin or Owner?**
Yes. Get their numeric Telegram ID from `@userinfobot`, add it after a comma in `TELEGRAM_ADMINS_ID` (or optional `OWNER_IDS`) in Cloudflare Pages environment variables, and redeploy.

**3. Where are photos, videos, and payment receipts stored?**
Item photos and videos are stored on **Cloudinary** inside `milkii/items/<user_id>/`. Listing text, settings, audit logs, users, and compressed payment receipt screenshots are stored in **Cloudflare D1**.

**4. Can I change the Standard and Featured plan prices later?**
Yes. Open **Admin > Settings** as the Owner inside MILKII APP, update the prices in Birr, and save. The Free plan always stays `0` Birr.

**5. Why can't I delete entries from the Audit log?**
The Audit log is intentionally append-only in the database and backend API so there is always an honest record of admin and owner actions.

**6. How is the Owner chosen?**
The **first** Telegram ID listed in `TELEGRAM_ADMINS_ID` automatically gets Owner permissions (unless you also set optional `OWNER_IDS`).
