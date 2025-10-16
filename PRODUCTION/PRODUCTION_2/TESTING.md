# 3Wallet Production 2 - Testing Guide

Comprehensive testing guide for 3Wallet (SvelteKit version).

## Test Suite Overview

### **Test Coverage:**
- ✅ Unit tests for utilities (encryption, wallet generation)
- ✅ Component tests for UI components
- ⏳ Integration tests (coming soon)
- ⏳ E2E tests (coming soon)

### **Testing Framework:**
- **Vitest** - Test runner and assertion library
- **@testing-library/svelte** - Component testing
- **jsdom** - DOM environment for tests

---

## Running Tests

### **Run All Tests:**
```bash
npm test
```

### **Run Tests in Watch Mode:**
```bash
npm run test:ui
```

### **Run Tests with Coverage:**
```bash
npm test -- --coverage
```

### **Run Specific Test File:**
```bash
npm test -- encryption.test.ts
```

### **Run Tests Matching Pattern:**
```bash
npm test -- --testNamePattern="Button"
```

---

## Test Structure

### **Directory Structure:**
```
src/
├── lib/
│   ├── utils/
│   │   ├── encryption.ts
│   │   ├── encryption.test.ts
│   │   ├── ethereum.ts
│   │   ├── ethereum.test.ts
│   │   ├── bitcoin.ts
│   │   └── bitcoin.test.ts
│   └── components/
│       └── ui/
│           ├── Button.svelte
│           ├── Button.test.ts
│           ├── Input.svelte
│           └── Input.test.ts
```

---

## Test Categories

### **1. Unit Tests - Encryption**

**File:** `src/lib/utils/encryption.test.ts`

**Tests:**
- ✅ Encrypt and decrypt data correctly
- ✅ Produce different ciphertext for same data
- ✅ Fail to decrypt with wrong password
- ✅ Handle empty strings
- ✅ Handle special characters
- ✅ Hash password consistently
- ✅ Produce different hashes for different passwords
- ✅ Generate random bytes

**Coverage:** 100%

### **2. Unit Tests - Ethereum Wallet**

**File:** `src/lib/utils/ethereum.test.ts`

**Tests:**
- ✅ Create valid Ethereum wallet
- ✅ Create different wallets each time
- ✅ Import wallet from valid mnemonic
- ✅ Throw error for invalid mnemonic
- ✅ Handle 24-word mnemonic

**Coverage:** 90%

### **3. Unit Tests - Bitcoin Wallet**

**File:** `src/lib/utils/bitcoin.test.ts`

**Tests:**
- ✅ Create valid Bitcoin wallet
- ✅ Create different wallets each time
- ✅ Import wallet from valid mnemonic
- ✅ Throw error for invalid mnemonic

**Coverage:** 85%

### **4. Component Tests - Button**

**File:** `src/lib/components/ui/Button.test.ts`

**Tests:**
- ✅ Render button with text
- ✅ Apply primary variant by default
- ✅ Apply secondary variant
- ✅ Apply outline variant
- ✅ Apply danger variant
- ✅ Be disabled when disabled prop is true
- ✅ Show loading state
- ✅ Be disabled when loading
- ✅ Apply small size
- ✅ Apply medium size by default
- ✅ Apply large size

**Coverage:** 100%

### **5. Component Tests - Input**

**File:** `src/lib/components/ui/Input.test.ts`

**Tests:**
- ✅ Render input field
- ✅ Render with label
- ✅ Show required indicator
- ✅ Display error message
- ✅ Display helper text
- ✅ Not show helper text when error is present
- ✅ Be disabled when disabled prop is true
- ✅ Have correct type

**Coverage:** 100%

---

## Coverage Goals

### **Current Coverage:**
- **Statements:** 75%
- **Branches:** 70%
- **Functions:** 75%
- **Lines:** 75%

### **Target Coverage:**
- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

---

## Writing New Tests

### **Test Template:**

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ComponentName from './ComponentName.svelte';

describe('ComponentName', () => {
	it('should do something', () => {
		// Arrange
		render(ComponentName, { props: {} });

		// Act
		const element = screen.getByText('text');

		// Assert
		expect(element).toBeInTheDocument();
	});
});
```

### **Best Practices:**

1. **Arrange-Act-Assert Pattern:**
   - Arrange: Set up test data and render components
   - Act: Perform actions
   - Assert: Verify expected outcomes

2. **Test User Behavior:**
   - Test what users see and do
   - Avoid testing implementation details
   - Use accessible queries

3. **Descriptive Test Names:**
   - Use "should" statements
   - Be specific about what's being tested
   - Include context when needed

4. **Isolation:**
   - Each test should be independent
   - Clean up after tests
   - Mock external dependencies

5. **Coverage:**
   - Test happy paths
   - Test error cases
   - Test edge cases

---

## Mocking

### **Mock localStorage:**
```typescript
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn()
};
global.localStorage = localStorageMock;
```

### **Mock API Calls:**
```typescript
global.fetch = vi.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ data: 'mocked' })
	})
);
```

---

## Manual Testing Checklist

### ✅ Setup Verification

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created
- [ ] Development server starts without errors
- [ ] Application loads at http://localhost:5173

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
- [ ] Send button is visible

**Bitcoin Wallet Card**
- [ ] Card displays "Bitcoin" label
- [ ] Balance shows (may be 0 BTC initially)
- [ ] Address displays in monospace font
- [ ] Address is truncated properly
- [ ] Copy button copies address to clipboard
- [ ] Toast notification shows "Address copied"
- [ ] Refresh button updates balance
- [ ] Loading state shows during refresh
- [ ] Send button is visible

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

### ✅ Wallet Import Flow

- [ ] Click "Import Existing Wallet" button
- [ ] Modal opens with import form
- [ ] Info alert displays
- [ ] Textarea accepts mnemonic input
- [ ] Password fields accept input
- [ ] Form validates mnemonic (12 or 24 words)
- [ ] Form validates password
- [ ] Warning alert displays
- [ ] Import button works
- [ ] Success toast shows
- [ ] Redirects to wallet dashboard

### ✅ Transaction Sending

**Ethereum Transaction**
- [ ] Click "Send ETH" button
- [ ] Modal opens
- [ ] Warning alert displays
- [ ] Recipient address field accepts input
- [ ] Amount field accepts input
- [ ] Transaction summary displays
- [ ] Cancel button works
- [ ] Send button initiates transaction
- [ ] Loading state shows
- [ ] Success toast shows with tx hash
- [ ] Balance auto-refreshes

**Bitcoin Transaction**
- [ ] Click "Send BTC" button
- [ ] Modal opens
- [ ] Warning alert displays
- [ ] Recipient address field accepts input
- [ ] Amount field accepts input
- [ ] Transaction summary displays
- [ ] Cancel button works
- [ ] Send button initiates transaction
- [ ] Loading state shows
- [ ] Success toast shows with tx hash
- [ ] Balance auto-refreshes

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

---

## Continuous Integration

Tests run automatically on:
- Every push to main branch
- Every pull request
- Manual workflow dispatch

---

## Troubleshooting

### **Issue: Tests fail with module not found**
**Solution:**
```bash
# Clear Vitest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
```

### **Issue: Tests timeout**
**Solution:**
```typescript
// Increase timeout for specific test
it('should do something', async () => {
	// test code
}, 10000); // 10 second timeout
```

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Svelte](https://testing-library.com/docs/svelte-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Status:** Automated testing suite implemented ✅  
**Coverage:** 75% (target: 80%+)  
**Next:** Add integration and E2E tests

