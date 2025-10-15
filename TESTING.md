# 🧪 3Wallet Testing Guide

Comprehensive testing guide for the 3Wallet MVP.

---

## 📋 Testing Checklist

### **Pre-Testing Setup**
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Browser DevTools open (Console, Network tabs)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on multiple devices (Desktop, Tablet, Mobile)

---

## 🏠 Home/Landing Page Tests

### **Visual Tests**
- [ ] Hero section displays correctly
- [ ] Parallax background loads
- [ ] Text gradient renders properly
- [ ] Stats section animates on load
- [ ] All sections are responsive (mobile/tablet/desktop)
- [ ] Footer displays all links

### **Functional Tests**
- [ ] "Launch Wallet" button navigates to `/wallet`
- [ ] "Watch Demo" button works (or shows placeholder)
- [ ] Waitlist form accepts valid email
- [ ] Waitlist form rejects invalid email
- [ ] Form shows success message after submission
- [ ] Form clears after successful submission
- [ ] All footer links work
- [ ] Social media links open in new tab

### **Performance Tests**
- [ ] Page loads in < 3 seconds
- [ ] Images load progressively
- [ ] No console errors
- [ ] No layout shift (CLS < 0.1)

---

## 💼 Wallet Page Tests

### **Wallet Creation**
1. **Navigate to `/wallet`**
   - [ ] "Create New Wallet" button displays
   - [ ] Modal opens when clicked

2. **Create Wallet Flow**
   - [ ] Enter wallet name: "Test Wallet"
   - [ ] Enter password: "TestPassword123!"
   - [ ] Click "Create Wallet"
   - [ ] Loading spinner shows
   - [ ] Modal closes after creation
   - [ ] Wallet dashboard displays

3. **Verify Wallet Data**
   - [ ] Portfolio value shows (may be $0.00)
   - [ ] 3 chain cards display (Ethereum, Bitcoin, Solana)
   - [ ] Each card shows balance (may be 0)
   - [ ] Wallet addresses section shows 3 addresses
   - [ ] Security tier displays "Personal"

### **Balance Fetching**
- [ ] Ethereum balance fetches from Sepolia testnet
- [ ] Bitcoin balance fetches from testnet
- [ ] Solana balance fetches from devnet
- [ ] Loading states show during fetch
- [ ] Errors are handled gracefully

### **Address Management**
- [ ] Copy button copies address to clipboard
- [ ] Alert shows "Address copied!"
- [ ] Addresses are properly formatted
- [ ] Addresses are truncated for display

### **Session Persistence**
- [ ] Refresh page - wallet remains loaded
- [ ] Close tab and reopen - wallet requires password
- [ ] Clear localStorage - wallet is removed

### **Error Handling**
- [ ] Invalid password shows error
- [ ] Network errors are caught
- [ ] Empty form fields show validation errors

---

## 📊 Pitch Deck Page Tests

### **Content Tests**
- [ ] All sections render correctly
- [ ] Market data displays (TAM, SAM, SOM)
- [ ] Problem statistics show with sources
- [ ] Competitive analysis table renders
- [ ] Revenue streams display
- [ ] Roadmap phases show

### **Data Accuracy**
- [ ] Market cap: $2.3T
- [ ] Crypto users: 420M
- [ ] Wallet market: $12.6B
- [ ] CAGR: 26.8%
- [ ] All sources cited

### **Interactive Elements**
- [ ] "Download PDF" button works (or placeholder)
- [ ] "Schedule Meeting" button works (or placeholder)
- [ ] Cards have hover effects
- [ ] Responsive on all screen sizes

---

## 📧 Contact Page Tests

### **Form Validation**
1. **Empty Form Submission**
   - [ ] Shows validation errors
   - [ ] Required fields marked with *

2. **Invalid Email**
   - [ ] Enter invalid email: "notanemail"
   - [ ] Shows error message

3. **Valid Submission**
   - [ ] Fill all fields correctly
   - [ ] Click "Send Message"
   - [ ] Loading spinner shows
   - [ ] Success message displays
   - [ ] Form clears after submission

### **Contact Information**
- [ ] Email link opens mail client
- [ ] Discord link opens in new tab
- [ ] Twitter link opens in new tab
- [ ] LinkedIn link opens in new tab

### **Team Section**
- [ ] Founder information displays
- [ ] Avatar/initials show
- [ ] Email link works
- [ ] GitHub link works
- [ ] Portfolio link works

### **FAQ Section**
- [ ] All 4 questions display
- [ ] Answers are readable
- [ ] Cards are responsive

---

## 🔐 Security Tests

### **Encryption**
1. **Create Wallet**
   - [ ] Password is required
   - [ ] Weak passwords are rejected
   - [ ] Strong passwords are accepted

2. **Check localStorage**
   - [ ] Open DevTools → Application → Local Storage
   - [ ] Find `3wallet_wallets` key
   - [ ] Verify data is encrypted (not readable)
   - [ ] Verify IV, salt, ciphertext present

3. **Password Verification**
   - [ ] Correct password decrypts wallet
   - [ ] Incorrect password fails gracefully

### **Private Key Security**
- [ ] Private keys never appear in console
- [ ] Private keys never appear in network requests
- [ ] Mnemonic is encrypted in storage

---

## 📱 Responsive Design Tests

### **Mobile (375px - 640px)**
- [ ] Navigation is accessible
- [ ] Forms are usable
- [ ] Buttons are touch-friendly (min 44px)
- [ ] Text is readable (min 16px)
- [ ] No horizontal scroll
- [ ] Cards stack vertically

### **Tablet (641px - 1024px)**
- [ ] Grid layouts adapt (2 columns)
- [ ] Images scale properly
- [ ] Navigation remains accessible

### **Desktop (1025px+)**
- [ ] Full grid layouts (3-4 columns)
- [ ] Max-width containers center content
- [ ] Hover effects work

---

## ♿ Accessibility Tests

### **Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Focus indicators visible

### **Screen Reader**
- [ ] All images have alt text
- [ ] Form labels are associated
- [ ] ARIA labels present
- [ ] Headings are hierarchical (h1 → h2 → h3)

### **Color Contrast**
- [ ] Text meets WCAG AA (4.5:1)
- [ ] Interactive elements meet WCAG AA (3:1)
- [ ] Focus indicators are visible

---

## 🌐 Cross-Browser Tests

### **Chrome/Edge (Chromium)**
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### **Firefox**
- [ ] All features work
- [ ] Crypto API works
- [ ] Styles render correctly

### **Safari**
- [ ] All features work
- [ ] Web Crypto API works
- [ ] Backdrop blur works

---

## ⚡ Performance Tests

### **Lighthouse Audit**
Run in Chrome DevTools:
```bash
# Or use CLI
lighthouse http://localhost:5173 --view
```

**Target Scores:**
- [ ] Performance: 90+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

### **Network Performance**
- [ ] Initial load < 3s (3G)
- [ ] Time to Interactive < 5s
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s

### **Bundle Size**
```bash
npm run build
```
- [ ] Total bundle < 500KB (gzipped)
- [ ] JavaScript < 300KB
- [ ] CSS < 50KB

---

## 🔍 Blockchain Integration Tests

### **Ethereum (Sepolia)**
1. **Get Testnet ETH**
   - Visit: https://sepoliafaucet.com
   - Enter your wallet address
   - Request testnet ETH

2. **Verify Balance**
   - [ ] Balance updates in wallet
   - [ ] USD value calculates
   - [ ] Loading state shows during fetch

### **Bitcoin (Testnet)**
1. **Get Testnet BTC**
   - Visit: https://testnet-faucet.mempool.co
   - Enter your wallet address
   - Request testnet BTC

2. **Verify Balance**
   - [ ] Balance updates
   - [ ] Satoshis convert to BTC correctly

### **Solana (Devnet)**
1. **Get Devnet SOL**
   ```bash
   solana airdrop 1 <YOUR_ADDRESS> --url devnet
   ```

2. **Verify Balance**
   - [ ] Balance updates
   - [ ] Lamports convert to SOL correctly

---

## 🐛 Bug Reporting

If you find a bug, report it with:
1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Screenshots/videos**
5. **Browser/device info**
6. **Console errors**

**Report to:**
- GitHub Issues: https://github.com/TrillionUnicorn/3Wallet/issues
- Email: bugs@3wallet.app

---

## ✅ Test Results Template

```markdown
## Test Results - [Date]

**Tester:** [Your Name]
**Environment:** [Browser, OS, Device]

### Home Page
- [ ] Visual: PASS/FAIL
- [ ] Functional: PASS/FAIL
- [ ] Performance: PASS/FAIL

### Wallet Page
- [ ] Creation: PASS/FAIL
- [ ] Balance Fetch: PASS/FAIL
- [ ] Address Management: PASS/FAIL

### Pitch Deck
- [ ] Content: PASS/FAIL
- [ ] Data Accuracy: PASS/FAIL

### Contact Page
- [ ] Form: PASS/FAIL
- [ ] Links: PASS/FAIL

### Security
- [ ] Encryption: PASS/FAIL
- [ ] Private Keys: PASS/FAIL

### Responsive
- [ ] Mobile: PASS/FAIL
- [ ] Tablet: PASS/FAIL
- [ ] Desktop: PASS/FAIL

### Accessibility
- [ ] Keyboard: PASS/FAIL
- [ ] Screen Reader: PASS/FAIL
- [ ] Contrast: PASS/FAIL

### Performance
- [ ] Lighthouse: [Score]
- [ ] Load Time: [Time]
- [ ] Bundle Size: [Size]

**Issues Found:**
1. [Issue description]
2. [Issue description]

**Notes:**
[Additional observations]
```

---

## 🎯 Automated Testing (Future)

### **Unit Tests (Vitest)**
```bash
npm install -D vitest @testing-library/svelte
```

### **E2E Tests (Playwright)**
```bash
npm install -D @playwright/test
```

### **Visual Regression (Percy)**
```bash
npm install -D @percy/cli @percy/playwright
```

---

**Happy Testing! 🧪**

