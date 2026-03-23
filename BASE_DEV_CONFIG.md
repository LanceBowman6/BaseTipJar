# Base.dev Configuration Guide

## App Information

- **Name**: BaseTipJar
- **Description**: Send tips with messages on Base blockchain
- **Category**: DeFi / Social
- **Builder Code**: bc_7teav6vi
- **Contract Address**: 0xd421c2aab26ef7a3324b99bee39fd84b3195fd09
- **Network**: Base Mainnet

## URLs and Metadata

### Production URL
```
https://basetipjar.vercel.app
```
(Update this after Vercel deployment completes)

### Metadata Endpoints

- **App URL**: `https://basetipjar.vercel.app`
- **Icon**: `https://basetipjar.vercel.app/icon.png`
- **Screenshot**: `https://basetipjar.vercel.app/screenshot.png`
- **Splash**: `https://basetipjar.vercel.app/splash.png`
- **Farcaster Manifest**: `https://basetipjar.vercel.app/.well-known/farcaster.json`

## Base.dev Dashboard Setup

### 1. Register App on Base.dev

1. Go to: https://base.org/developers
2. Click "Register App" or "Add Mini App"
3. Fill in the form:

**Basic Information:**
- **App Name**: BaseTipJar
- **App URL**: `https://basetipjar.vercel.app`
- **Description**: Send tips with messages on Base blockchain. Users can tip with ETH and leave messages. Owner can withdraw all tips.
- **Icon URL**: `https://basetipjar.vercel.app/icon.png`
- **Screenshot URL**: `https://basetipjar.vercel.app/screenshot.png`

**Categories:**
- DeFi
- Social
- Creator Tools

**Builder Attribution:**
- **Builder Code**: `bc_7teav6vi`
- **Encoded String**: `0x62635f37746561763676690b0080218021802180218021802180218021`

**Contract Information:**
- **Contract Address**: `0xd421c2aab26ef7a3324b99bee39fd84b3195fd09`
- **Network**: Base Mainnet
- **Contract Type**: Tip Jar / Payment

### 2. Verify Builder Code Attribution

The Builder Code is already integrated in the app via:
- **File**: `app/providers.tsx`
- **Method**: `dataSuffix` in RainbowKit/wagmi config
- **Line**: See `transactionProps.dataSuffix`

All transactions automatically include the attribution suffix.

### 3. Enable Analytics & Tracking

The app includes:
- **Transaction Tracking**: Integrated via `utils/track.js`
- **App ID**: `app-001`
- **Tracking Endpoint**: Dashboard API

### 4. Farcaster Integration (Optional)

Update `public/.well-known/farcaster.json` with your account association:

```json
{
  "accountAssociation": {
    "header": "YOUR_HEADER_HERE",
    "payload": "YOUR_PAYLOAD_HERE",
    "signature": "YOUR_SIGNATURE_HERE"
  },
  "frame": {
    "version": "1",
    "name": "BaseTipJar",
    "iconUrl": "https://basetipjar.vercel.app/icon.png",
    "splashImageUrl": "https://basetipjar.vercel.app/splash.png",
    "splashBackgroundColor": "#6366f1",
    "homeUrl": "https://basetipjar.vercel.app",
    "webhookUrl": "https://basetipjar.vercel.app/api/webhook"
  }
}
```

To generate account association:
1. Go to: https://warpcast.com/~/developers/frames
2. Create new frame
3. Add your domain
4. Sign the message with your Farcaster account
5. Copy the signature components

## Verification Checklist

✅ App metadata includes `base:app_id` tag  
✅ Builder Code integrated via `dataSuffix`  
✅ Transaction tracking enabled  
✅ Contract address specified  
✅ Icon, splash, and screenshot available  
✅ Farcaster manifest present (update signature for full integration)  
✅ Mobile-responsive design  
✅ GitHub repository public  
✅ Vercel deployment configured  

## Expected Base.dev Features

Once registered and verified on Base.dev, your app should display:

- **Pageviews**: Tracked via Base.dev analytics
- **Users**: Unique wallet connections
- **Onchain Activity**: 
  - Tips sent (tracked via contract events)
  - Total value sent
  - Transaction count
  - Builder attribution data

## Monitoring

### Contract Events
Monitor the `Tipped` event:
```solidity
event Tipped(address indexed from, uint256 amount, string message);
```

### BaseScan
https://basescan.org/address/0xd421c2aab26ef7a3324b99bee39fd84b3195fd09

### Analytics Dashboard
Your transactions will be tracked at:
https://base-dashboard-zeta.vercel.app

## Support

- **Base Docs**: https://docs.base.org
- **Builder Docs**: https://docs.base.org/builder
- **Discord**: https://discord.gg/base

---

**Note**: Account Association signature is optional for initial launch. You can add it later without affecting core functionality.
