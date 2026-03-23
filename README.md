# BaseTipJar

A Base Mini App for sending tips with messages on the Base blockchain.

## Features

- 💸 Send ETH tips with optional messages
- 📊 View tip statistics
- 🔒 Owner-only withdrawal function
- 📱 Mobile-friendly responsive design
- 🎯 Base Builder Code attribution built-in
- 📈 Transaction tracking for analytics

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript**
- **Tailwind CSS**
- **wagmi** for Ethereum interactions
- **RainbowKit** for wallet connection
- **viem** for low-level blockchain operations

## Contract

- **Address**: `0xd421c2aab26ef7a3324b99bee39fd84b3195fd09`
- **Network**: Base
- **Builder Code**: `bc_7teav6vi`

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A wallet with some ETH on Base

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local and add your WalletConnect Project ID (get one at https://cloud.walletconnect.com/)
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_URL=https://your-domain.vercel.app
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The app is configured for automatic deployments on push to main.

## Base.dev Configuration

### App Metadata

- **App URL**: Use your Vercel production URL
- **Name**: BaseTipJar
- **Description**: Send tips with messages on Base blockchain
- **Icon**: `/icon.png` (served from your domain)
- **Screenshot**: `/screenshot.png`

### Farcaster Integration

The app includes:
- Farcaster manifest at `/.well-known/farcaster.json`
- Update the `accountAssociation` section after deploying with your actual signature

### Builder Code Attribution

Builder Code `bc_7teav6vi` is integrated via:
- **File**: `app/providers.tsx`
- **Method**: `dataSuffix` in wagmi config
- **Encoded**: `0x62635f37746561763676690b0080218021802180218021802180218021`

All transactions automatically include the builder attribution suffix.

### Transaction Tracking

Analytics tracking is enabled via:
- **File**: `utils/track.js`
- **App ID**: `app-001`
- **Endpoint**: Dashboard API for usage statistics

Transactions are tracked after successful completion without blocking the user flow.

## Contract Functions

- `tip(string message)` - Send a tip with a message (payable)
- `withdrawAll()` - Owner withdraws all contract balance
- `getTipsCount()` - View total number of tips
- `owner()` - View contract owner address

## Base Mini App Features

✅ Base Builder Code attribution
✅ Transaction tracking for analytics
✅ Mobile-responsive design
✅ Farcaster manifest
✅ Base metadata tags
✅ Production-ready deployment

## Links

- **Live App**: [Deployed URL will be here]
- **Contract**: [BaseScan Link](https://basescan.org/address/0xd421c2aab26ef7a3324b99bee39fd84b3195fd09)
- **Base**: https://base.org
- **Builder Profile**: Built with Builder Code bc_7teav6vi

## License

MIT
