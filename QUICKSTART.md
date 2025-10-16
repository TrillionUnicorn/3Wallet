# ⚡ 3Wallet Quick Start Guide

Get 3Wallet running in **5 minutes**!

---

## 🚀 Super Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/TrillionUnicorn/3Wallet.git
cd 3Wallet

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:5173
```

That's it! 🎉

---

## 📱 What You Can Do Now

### **1. Explore the Landing Page**
- Visit `http://localhost:5173`
- See the hero section with parallax effect
- Check out the 3-tier pricing
- Try the waitlist form

### **2. Create Your First Wallet**
- Click "Launch Wallet" or visit `/wallet`
- Click "Create New Wallet"
- Enter a wallet name (e.g., "My Test Wallet")
- Enter a strong password (e.g., "TestPassword123!")
- Click "Create Wallet"
- ✅ Your wallet is created with ETH, BTC, and SOL addresses!

### **3. View Your Addresses**
- See your Ethereum (Sepolia) address
- See your Bitcoin (Testnet) address
- See your Solana (Devnet) address
- Click "Copy" to copy any address

### **4. Get Testnet Funds**

**Ethereum Sepolia:**
```
Visit: https://sepoliafaucet.com
Paste your ETH address
Request testnet ETH
Wait 1-2 minutes
Refresh wallet page to see balance
```

**Bitcoin Testnet:**
```
Visit: https://testnet-faucet.mempool.co
Paste your BTC address
Request testnet BTC
Wait 5-10 minutes
Refresh wallet page to see balance
```

**Solana Devnet:**
```
Visit: https://faucet.solana.com
Paste your SOL address
Request devnet SOL
Wait 1 minute
Refresh wallet page to see balance
```

### **5. Check the Pitch Deck**
- Visit `/pitch`
- See market analysis with real data
- Review competitive analysis
- Check the roadmap

### **6. Contact Page**
- Visit `/contact`
- Try the contact form
- See team information
- Check FAQ section

---

## 🎯 Common Tasks

### **Reset Your Wallet**
```javascript
// Open browser console (F12)
localStorage.clear()
// Refresh page
```

### **Change Password**
Currently not implemented - you'll need to create a new wallet.

### **Export Mnemonic**
⚠️ **Security Warning:** Never share your mnemonic!
```javascript
// This feature is in the code but not exposed in UI yet
// For security, mnemonics are encrypted and not easily exportable
```

### **Switch Networks**
Edit `src/lib/config/chains.ts`:
```typescript
// Change DEFAULT_CHAIN from testnet to mainnet
export const DEFAULT_CHAIN = 'ethereum'; // Instead of 'ethereum-sepolia'
```

---

## 🔧 Troubleshooting

### **Port 5173 Already in Use**
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### **Dependencies Won't Install**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### **Wallet Won't Create**
- Check browser console for errors (F12)
- Make sure password is strong (8+ chars, uppercase, lowercase, number, special char)
- Try a different browser (Chrome recommended)
- Clear localStorage and try again

### **Balances Show $0.00**
- This is normal for new wallets
- Get testnet funds (see "Get Testnet Funds" above)
- Wait a few minutes for blockchain confirmation
- Refresh the page

### **TypeScript Errors**
```bash
# Run type check
npm run check

# If errors persist, try:
rm -rf .svelte-kit
npm run dev
```

---

## 📚 Next Steps

### **Learn More**
- Read `README.md` for full documentation
- Check `DEVELOPMENT.md` for architecture details
- Review `TESTING.md` for testing guide
- See `DEPLOYMENT.md` for deployment options

### **Customize**
- Edit colors in `src/app.css`
- Modify chain configs in `src/lib/config/chains.ts`
- Add new components in `src/lib/components/`
- Create new pages in `src/routes/`

### **Deploy**
- See `DEPLOYMENT.md` for full guide
- Quick deploy to Vercel: `vercel`
- Quick deploy to Netlify: `netlify deploy`

---

## 🎨 Customization Examples

### **Change Primary Color**
Edit `src/app.css`:
```css
@theme {
  --color-primary: #059669; /* Change to your color */
}
```

### **Add a New Chain**
Edit `src/lib/config/chains.ts`:
```typescript
export const ARBITRUM_MAINNET: ChainConfig = {
  id: 'arbitrum',
  name: 'Arbitrum',
  type: 'ethereum',
  network: 'mainnet',
  chainId: 42161,
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  explorerUrl: 'https://arbiscan.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  icon: '🔷',
  enabled: true
};
```

### **Modify Pricing Tiers**
Edit `src/routes/+page.svelte`:
```typescript
const tiers = [
  {
    name: 'Personal',
    price: 'Free', // Change this
    // ... rest of config
  }
];
```

---

## 💡 Pro Tips

1. **Use Chrome DevTools**
   - F12 to open
   - Console tab for errors
   - Network tab for API calls
   - Application tab for localStorage

2. **Test on Mobile**
   - Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
   - Test different screen sizes

3. **Check Performance**
   - Chrome DevTools → Lighthouse tab
   - Run audit
   - Aim for 90+ scores

4. **Security First**
   - Never share your password
   - Never share your mnemonic
   - Use testnet for testing
   - Only use mainnet when ready

5. **Keep Updated**
   ```bash
   git pull origin main
   npm install
   npm run dev
   ```

---

## 🆘 Get Help

- **Documentation:** Check all `.md` files in root
- **GitHub Issues:** https://github.com/TrillionUnicorn/3Wallet/issues
- **Email:** support@3wallet.app
- **Discord:** https://discord.gg/3wallet

---

## ✅ Quick Checklist

- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Landing page loads
- [ ] Wallet created successfully
- [ ] Addresses generated (ETH, BTC, SOL)
- [ ] Testnet funds requested
- [ ] Balances showing (after funds arrive)
- [ ] All pages accessible (/, /wallet, /pitch, /contact)
- [ ] No console errors

---

**You're all set! Start building with 3Wallet! 🚀**

**Questions?** Check `README.md` or open an issue on GitHub.

