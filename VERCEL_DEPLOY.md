# Vercel Deployment Instructions

## Automated Setup (CLI Method)

If you have Vercel CLI installed:

```bash
cd C:\A01zw03BaseTipJar
vercel --prod
```

## Manual Setup (Recommended)

### Step 1: Link GitHub Repository

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select the repository: **LanceBowman6/BaseTipJar**
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: (leave default)
   - **Output Directory**: (leave default)

### Step 2: Add Environment Variables

Add these environment variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Get from https://cloud.walletconnect.com/ |
| `NEXT_PUBLIC_URL` | `https://basetipjar.vercel.app` (or your assigned URL) |

### Step 3: Deploy

Click "Deploy" button.

Wait for deployment to complete (usually 2-3 minutes).

### Step 4: Get Production URL

After deployment:
- Copy the production URL (should be like `https://basetipjar.vercel.app` or `https://basetipjar-xxx.vercel.app`)
- If the domain is different, update the `.env.local` and `NEXT_PUBLIC_URL` environment variable

### Step 5: Update Farcaster Manifest

Update the file `public/.well-known/farcaster.json` with your actual domain URL.

## Alternative: Using Vercel API

Use your Vercel token to create and deploy via API (advanced users).

See: https://vercel.com/docs/rest-api
