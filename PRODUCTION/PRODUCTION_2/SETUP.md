# 3Wallet Production 2 - Setup Guide

Complete setup instructions for running 3Wallet (SvelteKit version) locally.

## Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- Git

## Quick Start

```bash
# 1. Navigate to the project directory
cd PRODUCTION/PRODUCTION_2

# 2. Install dependencies
npm install
# or
bun install

# 3. Create environment file
cp .env.example .env

# 4. Run development server
npm run dev
# or
bun dev

# 5. Open browser
# Visit http://localhost:5173
```

## Detailed Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- SvelteKit (framework)
- Svelte 4 (UI library)
- TypeScript (type safety)
- Tailwind CSS (styling)
- ethers.js (Ethereum integration)
- bitcoinjs-lib (Bitcoin integration)
- svelte-french-toast (notifications)
- Vitest (testing)

### 2. Environment Configuration

Create `.env` file:

```env
# Ethereum RPC URL (Sepolia testnet)
PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/demo

# Bitcoin API URL (testnet)
PUBLIC_BITCOIN_API=https://blockstream.info/testnet/api
```

**Note:** The demo RPC URLs are rate-limited. For production use:
- Get free Ethereum RPC from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
- Bitcoin API is public (no key needed)

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
PRODUCTION_2/
├── src/
│   ├── lib/
│   │   ├── components/        # Svelte components
│   │   │   ├── ui/           # UI components (5)
│   │   │   └── wallet/       # Wallet components (5)
│   │   ├── stores/           # Svelte stores
│   │   │   └── walletStore.ts
│   │   └── utils/            # Utilities
│   │       ├── encryption.ts
│   │       ├── ethereum.ts
│   │       └── bitcoin.ts
│   ├── routes/               # SvelteKit routes
│   │   ├── +layout.svelte
│   │   ├── +page.svelte      # Home page
│   │   └── wallet/
│   │       └── +page.svelte  # Wallet dashboard
│   ├── app.html              # HTML template
│   └── app.css               # Global styles
├── static/                   # Static assets
├── tests/                    # Test files
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Features

### ✅ Implemented

- **Wallet Creation:** Generate new wallets with BIP39 mnemonic
- **Wallet Import:** Import existing wallets from recovery phrase
- **Multi-Chain:** Support for Ethereum and Bitcoin
- **Balance Tracking:** Real-time balance fetching from testnets
- **Transaction Sending:** Send ETH and BTC transactions
- **Encryption:** AES-256 encryption for local storage
- **Password Protection:** Secure wallet access
- **Responsive Design:** Works on desktop, tablet, and mobile

## Security

### Local Storage

- Private keys are encrypted with AES-256
- Password is never stored
- Encrypted data is stored in browser localStorage
- Keys never leave your device

### Best Practices

1. **Strong Password:** Use a password with at least 12 characters
2. **Backup Recovery Phrase:** Write down your 12-word recovery phrase
3. **Secure Storage:** Store recovery phrase in a safe place
4. **Never Share:** Never share your password or recovery phrase
5. **Test First:** Use testnet before mainnet

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:ui

# Run tests with coverage
npm test -- --coverage
```

### Test Files

- `src/lib/utils/encryption.test.ts` - Encryption utilities
- `src/lib/utils/ethereum.test.ts` - Ethereum wallet
- `src/lib/utils/bitcoin.test.ts` - Bitcoin wallet
- `src/lib/components/ui/Button.test.ts` - Button component
- `src/lib/components/ui/Input.test.ts` - Input component

## Troubleshooting

### Issue: Dependencies won't install

**Solution:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm cache clean --force

# Reinstall
npm install
```

### Issue: Build fails

**Solution:**
```bash
# Check Node.js version
node --version  # Should be 18+

# Update dependencies
npm update

# Try building again
npm run build
```

### Issue: Balances not loading

**Solution:**
1. Check internet connection
2. Verify RPC URLs in `.env`
3. Check browser console for errors
4. Try refreshing balances

### Issue: Wallet won't unlock

**Solution:**
1. Verify password is correct
2. Clear browser cache
3. Check browser console for errors

## Development

### Adding New Features

1. Create feature branch
2. Implement feature
3. Write tests
4. Update documentation
5. Create pull request

### Code Style

- Use TypeScript for type safety
- Follow Svelte best practices
- Use Tailwind CSS for styling
- Write clean, readable code
- Add comments for complex logic

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

- **Netlify:** Connect GitHub repo
- **AWS Amplify:** Connect GitHub repo
- **Self-hosted:** Use `npm run build` and serve `build/` directory

## Differences from PRODUCTION_1

### Tech Stack

- **Framework:** SvelteKit instead of Next.js
- **UI Library:** Svelte instead of React
- **State:** Svelte stores instead of Zustand
- **Routing:** File-based routing (SvelteKit)
- **Notifications:** svelte-french-toast instead of react-hot-toast

### Advantages

- **Faster:** Better performance and smaller bundle size
- **Simpler:** Less boilerplate code
- **Reactive:** Built-in reactivity
- **Lighter:** Smaller JavaScript bundle

### Same Features

- All features from PRODUCTION_1
- Same security practices
- Same blockchain integration
- Same user experience

## Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Check browser console for errors
4. Open GitHub issue

## License

MIT License - See LICENSE file for details

