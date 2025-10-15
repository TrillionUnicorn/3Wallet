# 3Wallet Testing Guide

Comprehensive testing guide for 3Wallet Production Version 1.

## Quick Test

```bash
# 1. Verify setup
npm run verify

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000 in browser

# 4. Follow manual test steps below
```

## Manual Testing Checklist

### ✅ Setup Verification

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created
- [ ] Development server starts without errors
- [ ] Application loads at http://localhost:3000

### ✅ Home Page

- [ ] Page loads without errors
- [ ] Header displays "3Wallet" logo
- [ ] Hero section displays correctly
- [ ] Three feature cards are visible
- [ ] "Create New Wallet" button is visible (if no wallet exists)
- [ ] "Unlock Wallet" button is visible (if wallet exists)
- [ ] Responsive design works on mobile/tablet/desktop

### ✅ Wallet Creation Flow

**Step 1: Password Setup**
- [ ] Click "Create New Wallet" button
- [ ] Modal opens with password form
- [ ] Info alert displays security message
- [ ] Password field accepts input
- [ ] Confirm password field accepts input
- [ ] Eye icon toggles password visibility
- [ ] Form validates password length (min 8 characters)
- [ ] Form validates password match
- [ ] Error messages display correctly
- [ ] "Create Wallet" button is clickable

**Step 2: Recovery Phrase**
- [ ] After password submission, recovery phrase displays
- [ ] 12-word mnemonic is shown
- [ ] Warning alert displays security message
- [ ] "Copy to Clipboard" button works
- [ ] Copied state shows briefly
- [ ] "I've Saved My Recovery Phrase" button is clickable
- [ ] Clicking button closes modal and redirects to wallet

### ✅ Wallet Dashboard

**Initial Load**
- [ ] Redirects to /wallet after wallet creation
- [ ] Header displays "3Wallet" logo
- [ ] "Refresh" button is visible
- [ ] "Lock" button is visible
- [ ] "Your Wallets" heading displays
- [ ] Two wallet cards display (Ethereum and Bitcoin)

**Ethereum Wallet Card**
- [ ] Card displays "Ethereum" label
- [ ] Balance shows (may be 0 ETH initially)
- [ ] Address displays in monospace font
- [ ] Address is truncated properly
- [ ] Copy button copies address to clipboard
- [ ] Toast notification shows "Address copied"
- [ ] Refresh button updates balance
- [ ] Loading state shows during refresh

**Bitcoin Wallet Card**
- [ ] Card displays "Bitcoin" label
- [ ] Balance shows (may be 0 BTC initially)
- [ ] Address displays in monospace font
- [ ] Address is truncated properly
- [ ] Copy button copies address to clipboard
- [ ] Toast notification shows "Address copied"
- [ ] Refresh button updates balance
- [ ] Loading state shows during refresh

**Refresh All Balances**
- [ ] Click "Refresh" button in header
- [ ] Loading state shows
- [ ] Both wallet balances update
- [ ] Toast notification shows "Balance updated"

### ✅ Lock/Unlock Flow

**Locking Wallet**
- [ ] Click "Lock" button in header
- [ ] Redirects to home page
- [ ] "Unlock Wallet" button is now visible
- [ ] Wallet data is cleared from memory

**Unlocking Wallet**
- [ ] Click "Unlock Wallet" button
- [ ] Modal opens with password form
- [ ] Info alert displays
- [ ] Password field accepts input
- [ ] Eye icon toggles password visibility
- [ ] Correct password unlocks wallet
- [ ] Incorrect password shows error
- [ ] After unlock, redirects to /wallet
- [ ] Wallet data is restored

### ✅ Error Handling

**Network Errors**
- [ ] Disconnect internet
- [ ] Try refreshing balance
- [ ] Error message displays
- [ ] Application doesn't crash

**Invalid Password**
- [ ] Try unlocking with wrong password
- [ ] Error message displays
- [ ] Can retry with correct password

**Browser Refresh**
- [ ] Refresh page while on /wallet
- [ ] If unlocked, stays on /wallet
- [ ] If locked, redirects to home

### ✅ Security

**Local Storage**
- [ ] Open browser DevTools > Application > Local Storage
- [ ] Verify encrypted data is stored
- [ ] Verify no plain text private keys
- [ ] Verify no plain text mnemonic

**Password Protection**
- [ ] Cannot access wallet without password
- [ ] Password is not stored anywhere
- [ ] Encrypted data cannot be decrypted without password

### ✅ Responsive Design

**Desktop (1920x1080)**
- [ ] Layout looks good
- [ ] All elements are properly sized
- [ ] No horizontal scroll

**Tablet (768x1024)**
- [ ] Layout adapts correctly
- [ ] Cards stack properly
- [ ] Buttons are touch-friendly

**Mobile (375x667)**
- [ ] Layout is mobile-friendly
- [ ] Text is readable
- [ ] Buttons are easily tappable
- [ ] No content overflow

### ✅ Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### ✅ Performance

- [ ] Page loads in < 2 seconds
- [ ] No console errors
- [ ] No console warnings
- [ ] Smooth animations
- [ ] No layout shifts

## Automated Testing (Coming Soon)

### Unit Tests

```bash
npm test
```

Test coverage should include:
- Encryption utilities
- Wallet generation
- Balance fetching
- State management

### Integration Tests

Test user flows:
- Wallet creation
- Wallet unlock
- Balance refresh
- Lock/unlock cycle

### E2E Tests

Full application testing with Playwright or Cypress.

## Test Data

### Testnet Faucets

To test with real balances, get testnet tokens:

**Ethereum Sepolia:**
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia

**Bitcoin Testnet:**
- https://testnet-faucet.com/btc-testnet/
- https://bitcoinfaucet.uo1.net/

### Sample Addresses

After creating a wallet, you can send testnet tokens to your addresses to test balance fetching.

## Known Issues

None currently. Report issues on GitHub.

## Reporting Bugs

When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser and version
5. Console errors (if any)
6. Screenshots (if applicable)

## Test Results Template

```
Date: YYYY-MM-DD
Tester: [Name]
Browser: [Browser + Version]
OS: [Operating System]

Setup Verification: ✅ / ❌
Home Page: ✅ / ❌
Wallet Creation: ✅ / ❌
Wallet Dashboard: ✅ / ❌
Lock/Unlock: ✅ / ❌
Error Handling: ✅ / ❌
Security: ✅ / ❌
Responsive Design: ✅ / ❌
Performance: ✅ / ❌

Notes:
[Any additional notes or issues found]
```

## Next Steps

After testing:
1. Document any bugs found
2. Create GitHub issues for bugs
3. Fix critical bugs
4. Re-test after fixes
5. Deploy to staging
6. Final testing on staging
7. Deploy to production

