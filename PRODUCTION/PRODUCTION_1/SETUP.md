# 3Wallet Production Setup Guide

Complete setup instructions for running 3Wallet locally.

## Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- Git

## Quick Start

```bash
# 1. Navigate to the project directory
cd PRODUCTION/PRODUCTION_1

# 2. Install dependencies
npm install
# or
bun install

# 3. Create environment file
cp .env.local.example .env.local

# 4. Run development server
npm run dev
# or
bun dev

# 5. Open browser
# Visit http://localhost:3000
```

## Detailed Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14 (React framework)
- React 18 (UI library)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- ethers.js (Ethereum integration)
- bitcoinjs-lib (Bitcoin integration)
- Zustand (State management)
- crypto-js (Encryption)
- react-hot-toast (Notifications)
- lucide-react (Icons)

### 2. Environment Configuration

Create `.env.local` file:

```env
# Ethereum RPC URL (Sepolia testnet)
NEXT_PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/demo

# Bitcoin API URL (testnet)
NEXT_PUBLIC_BITCOIN_API=https://blockstream.info/testnet/api

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** The demo RPC URLs are rate-limited. For production use:
- Get free Ethereum RPC from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
- Bitcoin API is public (no key needed)

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
PRODUCTION_1/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── wallet/            # Wallet pages
│   │   └── page.tsx       # Wallet dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Alert.tsx
│   └── wallet/           # Wallet components
│       ├── WalletCard.tsx
│       ├── CreateWalletModal.tsx
│       └── UnlockWalletModal.tsx
├── lib/                  # Utilities and logic
│   ├── crypto/          # Encryption utilities
│   │   └── encryption.ts
│   ├── wallet/          # Blockchain integration
│   │   ├── ethereum.ts
│   │   └── bitcoin.ts
│   └── store/           # State management
│       └── wallet-store.ts
├── public/              # Static assets
├── package.json         # Dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Documentation
```

## Features

### ✅ Implemented

- **Wallet Creation:** Generate new wallets with BIP39 mnemonic
- **Wallet Import:** Import existing wallets (coming soon)
- **Multi-Chain:** Support for Ethereum and Bitcoin
- **Balance Tracking:** Real-time balance fetching from testnets
- **Encryption:** AES-256 encryption for local storage
- **Password Protection:** Secure wallet access
- **Responsive Design:** Works on desktop, tablet, and mobile

### 🚧 Coming Soon

- Transaction sending
- Transaction history
- Token support (ERC-20, BEP-20)
- NFT support
- Hardware wallet integration
- Multi-signature support

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

### Manual Testing

1. **Create Wallet:**
   - Click "Create New Wallet"
   - Set a strong password
   - Save recovery phrase
   - Verify wallet is created

2. **Unlock Wallet:**
   - Lock wallet (click "Lock" button)
   - Unlock with password
   - Verify wallets are displayed

3. **Check Balance:**
   - View Ethereum and Bitcoin balances
   - Click refresh to update balances
   - Verify balances are fetched

### Automated Testing (Coming Soon)

```bash
npm test
```

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
2. Verify RPC URLs in `.env.local`
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
3. Test thoroughly
4. Create pull request

### Code Style

- Use TypeScript for type safety
- Follow React best practices
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
- **Self-hosted:** Use `npm run build` and serve `out/` directory

## Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Check browser console for errors
4. Open GitHub issue

## License

MIT License - See LICENSE file for details

