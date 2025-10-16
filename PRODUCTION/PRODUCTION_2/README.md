# 3Wallet - Production Version 2

A secure, multi-chain cryptocurrency wallet built with SvelteKit, Svelte, and TypeScript.

## Features

- ✅ Multi-chain support (Ethereum, Bitcoin)
- ✅ Secure wallet creation and import
- ✅ Real blockchain integration
- ✅ Transaction sending
- ✅ Balance tracking
- ✅ Encrypted local storage
- ✅ Responsive design

## Tech Stack

- **Frontend:** SvelteKit, Svelte 4, TypeScript
- **Styling:** Tailwind CSS
- **Blockchain:** ethers.js (Ethereum), bitcoinjs-lib (Bitcoin)
- **State Management:** Svelte stores
- **Encryption:** crypto-js
- **Notifications:** svelte-french-toast

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

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file:

```env
# Ethereum RPC (use Infura, Alchemy, or public RPC)
PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/demo

# Bitcoin RPC (optional, uses public APIs by default)
PUBLIC_BITCOIN_API=https://blockstream.info/testnet/api
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

# Run tests with UI
npm run test:ui

# Type check
npm run check

# Type check in watch mode
npm run check:watch
```

## Project Structure

```
PRODUCTION_2/
├── src/
│   ├── lib/
│   │   ├── components/    # Svelte components
│   │   ├── stores/        # Svelte stores
│   │   ├── utils/         # Utilities
│   │   └── types/         # TypeScript types
│   ├── routes/            # SvelteKit routes
│   └── app.html           # HTML template
├── static/                # Static assets
└── tests/                 # Test files
```

## Differences from PRODUCTION_1

### **Tech Stack:**
- **Framework:** SvelteKit instead of Next.js
- **UI Library:** Svelte instead of React
- **State:** Svelte stores instead of Zustand
- **Notifications:** svelte-french-toast instead of react-hot-toast

### **Architecture:**
- File-based routing (SvelteKit)
- Reactive stores for state management
- Svelte's built-in reactivity
- Lighter bundle size

### **Advantages:**
- Faster build times
- Smaller bundle size
- Better performance
- Simpler state management
- Less boilerplate

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

