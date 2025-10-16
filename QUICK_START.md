# 🚀 3WALLET - QUICK START GUIDE

Get up and running with 3Wallet in 5 minutes!

---

## ⚡ Super Quick Start

### **Option 1: PRODUCTION_1 (Next.js)**

```bash
cd PRODUCTION/PRODUCTION_1
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### **Option 2: PRODUCTION_2 (SvelteKit)**

```bash
cd PRODUCTION/PRODUCTION_2
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git ([Download](https://git-scm.com/))

---

## 🎯 Step-by-Step Guide

### **Step 1: Clone Repository**

```bash
git clone https://github.com/TrillionUnicorn/3Wallet.git
cd 3Wallet
```

### **Step 2: Choose Version**

**For Next.js (PRODUCTION_1):**
```bash
cd PRODUCTION/PRODUCTION_1
```

**For SvelteKit (PRODUCTION_2):**
```bash
cd PRODUCTION/PRODUCTION_2
```

### **Step 3: Install Dependencies**

```bash
npm install
```

### **Step 4: Create Environment File**

```bash
cp .env.example .env
```

Edit `.env` and add your Ethereum RPC URL (optional for testing):

```env
# PRODUCTION_1
NEXT_PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/demo
NEXT_PUBLIC_BITCOIN_API=https://blockstream.info/testnet/api

# PRODUCTION_2
PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/demo
PUBLIC_BITCOIN_API=https://blockstream.info/testnet/api
```

### **Step 5: Run Development Server**

```bash
npm run dev
```

### **Step 6: Open in Browser**

- **PRODUCTION_1:** [http://localhost:3000](http://localhost:3000)
- **PRODUCTION_2:** [http://localhost:5173](http://localhost:5173)

---

## 🎮 Try It Out

### **1. Create a Wallet**

1. Click "Create New Wallet"
2. Enter a password (min 8 characters)
3. Save your 12-word recovery phrase
4. Click "I've Saved My Recovery Phrase"

### **2. View Your Wallet**

- See your Ethereum and Bitcoin addresses
- View balances (will be 0 initially)
- Copy addresses to clipboard

### **3. Get Test Funds**

**Ethereum (Sepolia):**
- Visit [Sepolia Faucet](https://sepoliafaucet.com/)
- Paste your Ethereum address
- Request test ETH

**Bitcoin (Testnet):**
- Visit [Bitcoin Testnet Faucet](https://testnet-faucet.com/btc-testnet/)
- Paste your Bitcoin address
- Request test BTC

### **4. Send a Transaction**

1. Click "Send ETH" or "Send BTC"
2. Enter recipient address
3. Enter amount
4. Click "Send Transaction"
5. Wait for confirmation

### **5. Lock Wallet**

- Click "Lock" button
- Wallet is now locked

### **6. Unlock Wallet**

- Click "Unlock Wallet"
- Enter your password
- Wallet is now unlocked

---

## 🧪 Run Tests

```bash
npm test
```

---

## 🏗️ Build for Production

```bash
npm run build
```

---

## 🐳 Run with Docker

```bash
docker-compose up -d
```

---

## 📚 Documentation

- **Setup Guide:** See `SETUP.md` in each app folder
- **Testing Guide:** See `TESTING.md` in each app folder
- **Deployment Guide:** See `DEPLOYMENT.md` in each app folder
- **Security Policy:** See `SECURITY.md` in root
- **Contributing:** See `CONTRIBUTING.md` in root

---

## 🆘 Troubleshooting

### **Issue: npm install fails**

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### **Issue: Port already in use**

**PRODUCTION_1:**
```bash
# Change port in package.json
"dev": "next dev -p 3001"
```

**PRODUCTION_2:**
```bash
# Change port in package.json
"dev": "vite dev --port 5174"
```

### **Issue: Balances not loading**

1. Check internet connection
2. Verify RPC URL in `.env`
3. Check browser console for errors
4. Try refreshing balances

---

## 🎯 Next Steps

1. **Read Documentation:**
   - `SETUP.md` - Detailed setup instructions
   - `TESTING.md` - Testing guide
   - `DEPLOYMENT.md` - Deployment guide

2. **Explore Code:**
   - Check `components/` folder
   - Review `lib/` utilities
   - Look at test files

3. **Deploy:**
   - Deploy to Vercel
   - Deploy to Netlify
   - Use Docker

4. **Contribute:**
   - Read `CONTRIBUTING.md`
   - Open issues
   - Submit pull requests

---

## 🌟 Features to Try

- ✅ Create wallet
- ✅ Import wallet
- ✅ Send transactions
- ✅ View balances
- ✅ Lock/unlock
- ✅ Copy addresses
- ✅ Refresh balances

---

## 📞 Get Help

- **Documentation:** Check docs in app folders
- **Issues:** [GitHub Issues](https://github.com/TrillionUnicorn/3Wallet/issues)
- **Security:** See `SECURITY.md`
- **Contributing:** See `CONTRIBUTING.md`

---

## 🎉 You're Ready!

You now have a fully functional crypto wallet running locally!

**What you can do:**
- Create and manage wallets
- Send/receive crypto
- Import existing wallets
- Test all features

**What's next:**
- Deploy to production
- Add more features
- Contribute to the project
- Share with others

---

**Happy coding! 🚀**

---

**Status:** ✅ Ready to use  
**Time to start:** < 5 minutes  
**Difficulty:** Easy  

**Enjoy 3Wallet!** 🎉

