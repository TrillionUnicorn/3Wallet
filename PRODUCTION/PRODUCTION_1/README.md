# 3Wallet - Production Version 1

A secure, multi-chain cryptocurrency wallet built with Next.js, React, and TypeScript.

## Features

- ✅ Multi-chain support (Ethereum, Bitcoin)
- ✅ Secure wallet creation and import
- ✅ Real blockchain integration
- ✅ Transaction history
- ✅ Balance tracking
- ✅ Encrypted local storage
- ✅ Responsive design

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Blockchain:** ethers.js (Ethereum), bitcoinjs-lib (Bitcoin)
- **State Management:** Zustand
- **Encryption:** crypto-js
- **Icons:** Lucide React

## Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
# Ethereum RPC (use Infura, Alchemy, or public RPC)
NEXT_PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/demo

# Bitcoin RPC (optional, uses public APIs by default)
NEXT_PUBLIC_BITCOIN_RPC=https://blockstream.info/testnet/api
```

## Usage

1. **Create Wallet:**
   - Click "Create New Wallet"
   - Set a strong password
   - Save your recovery phrase securely

2. **Import Wallet:**
   - Click "Import Wallet"
   - Enter your recovery phrase
   - Set a password

3. **View Balance:**
   - Your balances are automatically fetched
   - Supports Ethereum and Bitcoin testnets

4. **Send Transactions:**
   - Enter recipient address
   - Enter amount
   - Confirm transaction

## Security

- 🔐 Private keys never leave your device
- 🔐 AES-256 encryption for local storage
- 🔐 Password-protected wallet access
- 🔐 BIP39 mnemonic generation
- 🔐 No server-side key storage

## Development

```bash
# Run tests
npm test

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Project Structure

```
PRODUCTION_1/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Home page
│   ├── wallet/         # Wallet pages
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # UI components
│   └── wallet/        # Wallet components
├── lib/               # Utilities
│   ├── crypto/        # Encryption utilities
│   ├── blockchain/    # Blockchain integration
│   └── store/         # State management
├── public/            # Static assets
└── styles/            # Global styles
```

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

