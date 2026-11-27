# MILKII APP Phone Setup Guide

MILKII APP is a marketplace inside Telegram for all of Ethiopia. Follow these steps on your phone to set it up.

## Before You Start

Save these details from your free accounts (never share secrets with anyone):
- From Telegram **@BotFather**: create a bot (`/newbot`), set its name (`/setname`) to **MILKII APP**, and copy your `YOUR_BOT_TOKEN`.
- From Telegram **@userinfobot**: press **Start** and copy your numeric user ID (example: `123456789`).
- From **Cloudinary** Dashboard: copy your **Cloud name**, **API Key**, and **API Secret**.

## Step-by-Step Setup

1. **Create an empty database named `milkii-db`**
   - Open the Cloudflare Dashboard on your phone browser.
   - Tap the menu icon > **Storage & Databases** > **D1 SQL Database**.
   - Tap **Create**, name it `milkii-db`, and create it. Leave it completely empty (do not run any SQL—MILKII APP creates its own tables automatically).

2. **Create the Cloudflare Pages project from GitHub**
   - Tap **Workers & Pages** > **Create** > go to the **Pages** section at the bottom ("Looking to deploy Pages? Get started") > **Import an existing Git repository**.
   - Choose your GitHub repository.
   - Set **Build command** to empty (delete anything inside it).
   - Set **Build output directory** to `public`.
   - Tap **Save and Deploy**. Note your link (for example `https://YOUR-LINK.pages.dev`).

3. **Add the two bindings (`DB` and `AI`)**
   - Open your new Pages project > **Settings** > **Bindings**.
   - Tap **Add** > **D1 database**, set the name to `DB`, choose `milkii-db`, and save.
   - Tap **Add** > **Workers AI**, set the name to `AI`, and save.

4. **Add your 7 variables and secrets**
   - Go to **Settings** > **Variables and Secrets** and add all 7 items for **Production** (mark tokens and secrets as **Secret**):
     - `TELEGRAM_BOT_TOKEN` = `YOUR_BOT_TOKEN` (Secret)
     - `TELEGRAM_ADMINS_ID` = your Telegram ID from `@userinfobot` (Variable — the first ID is automatically the Owner)
     - `CLOUDINARY_CLOUD_NAME` = `YOUR_CLOUD_NAME` (Variable)
     - `CLOUDINARY_API_KEY` = `YOUR_API_KEY` (Variable)
     - `CLOUDINARY_API_SECRET` = `YOUR_API_SECRET` (Secret)
     - `JWT_SECRET` = any long random text you type, e.g. `YOUR_RANDOM_JWT_SECRET` (Secret)
     - `TELEGRAM_WEBHOOK_SECRET` = any long random text you type, e.g. `YOUR_RANDOM_WEBHOOK_SECRET` (Secret)

5. **Redeploy once**
   - Go to the **Deployments** tab, tap the three dots (`...`) on the newest deploy, and tap **Retry deployment**.

6. **Check your setup on your phone**
   - Open `https://YOUR-LINK.pages.dev/api/health` in your phone browser.
   - If `"ok": true` appears, everything is ready.
   - If `"ok": false` appears, read the `"missing"` list and `"hints"` lines, fix those items in Cloudflare **Settings**, and retry the deployment.

7. **Connect your link to your Telegram bot**
   - Open **@BotFather** in Telegram.
   - Send `/setmenubutton`, choose your bot, paste `https://YOUR-LINK.pages.dev`, and set button text to `Open MILKII APP`.
   - Open your bot, press **Start**, and tap the menu button to launch MILKII APP.

## Common Problems

| Problem | What to do |
| --- | --- |
| **Blank page** | Check step 2: **Build command** must be empty and **Build output directory** must be `public`. Make sure you used **Pages**, not **Workers**. |
| **Server error** | Open `YOUR-LINK/api/health` in your browser and fix anything shown under `"missing"`, then tap **Retry deployment**. |
| **Database is not connected** | Go to **Settings > Bindings**, make sure your D1 database `milkii-db` is added with the exact capital name `DB`, then tap **Retry deployment**. |
| **Admin button missing** | Check `TELEGRAM_ADMINS_ID` in **Settings > Variables and Secrets**. Use your numeric ID from `@userinfobot` with no spaces, then redeploy. |
| **AI not available** | Go to **Settings > Bindings**, add **Workers AI** with the exact capital name `AI`, then tap **Retry deployment**. |
