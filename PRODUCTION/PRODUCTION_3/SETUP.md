# 🛠️ Setup Guide - 3Wallet PRODUCTION_3 (Vue.js)

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **pnpm** 8+
- **Git** for version control
- **MetaMask** browser extension (for testing)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TrillionUnicorn/3Wallet.git
cd 3Wallet/PRODUCTION/PRODUCTION_3
```

### 2. Install Dependencies

```bash
npm install
```

Or with pnpm:

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_OPENSEA_API_KEY=your_opensea_api_key
```

---

## 🚀 Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5174`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run type-check` - Type check TypeScript

---

## 🏗️ Project Structure

```
PRODUCTION_3/
├── src/
│   ├── components/       # Reusable components
│   ├── views/           # Page components
│   │   ├── Dashboard.vue
│   │   ├── Wallet.vue
│   │   ├── NFTGallery.vue
│   │   ├── TokenSwap.vue
│   │   └── DeFi.vue
│   ├── stores/          # Pinia stores
│   │   └── wallet.ts
│   ├── router/          # Vue Router
│   │   └── index.ts
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── App.vue          # Root component
│   ├── main.ts          # Entry point
│   └── style.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
└── package.json         # Dependencies
```

---

## 🔧 Configuration

### Vite Configuration

The `vite.config.ts` file contains build and development server configuration.

### Tailwind CSS

Tailwind is configured in `tailwind.config.js`. Custom styles are in `src/style.css`.

### TypeScript

TypeScript configuration is in `tsconfig.json` and `tsconfig.node.json`.

---

## 🔌 Wallet Connection

### MetaMask Integration

The application uses MetaMask for wallet connection:

1. Install MetaMask browser extension
2. Create or import a wallet
3. Click "Connect Wallet" in the app
4. Approve the connection in MetaMask

### Supported Networks

- Ethereum Mainnet
- Polygon
- Binance Smart Chain
- (More networks can be added)

---

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS for styling. Custom utilities are defined in `src/style.css`:

- `.card` - Card component style
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.input` - Input field style

### Dark Mode

The application uses a dark theme by default. Colors are defined using Tailwind's slate color palette.

---

## 🧪 Testing

### Unit Tests (Coming Soon)

```bash
npm run test
```

### E2E Tests (Coming Soon)

```bash
npm run test:e2e
```

---

## 📱 Features

### Dashboard
- Portfolio overview
- Recent activity
- Quick actions
- Performance charts (placeholder)

### Wallet
- View balances
- Multi-chain support
- Transaction history

### NFT Gallery
- Browse NFT collection
- View NFT details
- Transfer NFTs

### Token Swap
- Swap tokens
- Real-time rates
- Slippage protection

### DeFi Dashboard
- Yield opportunities
- Active positions
- Staking interface

---

## 🔒 Security

### Best Practices

- Never commit `.env` file
- Keep dependencies updated
- Use environment variables for API keys
- Validate all user inputs
- Implement rate limiting
- Use HTTPS in production

### Private Key Management

- Private keys are stored in browser's local storage (encrypted)
- Never send private keys to any server
- Always verify transaction details before signing

---

## 🐛 Troubleshooting

### Port Already in Use

If port 5174 is already in use:

```bash
npm run dev -- --port 3000
```

### MetaMask Not Detected

1. Ensure MetaMask extension is installed
2. Refresh the page
3. Check browser console for errors

### Build Errors

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [ethers.js Documentation](https://docs.ethers.org/)

---

## 🆘 Support

For setup issues:
- Check [README.md](./README.md)
- Review [DEPLOYMENT.md](./DEPLOYMENT.md)
- Contact: hello@3wallet.app

---

**Status:** ✅ Setup Complete  
**Last Updated:** October 16, 2025

