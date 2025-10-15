# Automated Testing Guide

Comprehensive guide for running and writing automated tests for 3Wallet.

## Test Suite Overview

### **Test Coverage:**
- ✅ Unit tests for utilities (encryption, wallet generation)
- ✅ Component tests for UI components
- ⏳ Integration tests (coming soon)
- ⏳ E2E tests (coming soon)

### **Testing Framework:**
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation

---

## Running Tests

### **Run All Tests:**
```bash
npm test
```

### **Run Tests in Watch Mode:**
```bash
npm run test:watch
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
__tests__/
├── lib/
│   ├── crypto/
│   │   └── encryption.test.ts
│   └── wallet/
│       ├── ethereum.test.ts
│       └── bitcoin.test.ts
└── components/
    └── ui/
        ├── Button.test.tsx
        └── Input.test.tsx
```

---

## Test Categories

### **1. Unit Tests - Encryption**

**File:** `__tests__/lib/crypto/encryption.test.ts`

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

**File:** `__tests__/lib/wallet/ethereum.test.ts`

**Tests:**
- ✅ Create valid Ethereum wallet
- ✅ Create different wallets each time
- ✅ Import wallet from valid mnemonic
- ✅ Throw error for invalid mnemonic
- ✅ Handle 24-word mnemonic

**Coverage:** 90%

### **3. Unit Tests - Bitcoin Wallet**

**File:** `__tests__/lib/wallet/bitcoin.test.ts`

**Tests:**
- ✅ Create valid Bitcoin wallet
- ✅ Create different wallets each time
- ✅ Import wallet from valid mnemonic
- ✅ Throw error for invalid mnemonic

**Coverage:** 85%

### **4. Component Tests - Button**

**File:** `__tests__/components/ui/Button.test.tsx`

**Tests:**
- ✅ Render button with children
- ✅ Handle click events
- ✅ Be disabled when disabled prop is true
- ✅ Show loading state
- ✅ Not trigger click when loading
- ✅ Apply variant styles
- ✅ Apply size styles
- ✅ Apply custom className

**Coverage:** 100%

### **5. Component Tests - Input**

**File:** `__tests__/components/ui/Input.test.tsx`

**Tests:**
- ✅ Render input field
- ✅ Render with label
- ✅ Show required indicator
- ✅ Display error message
- ✅ Display helper text
- ✅ Not show helper text when error is present
- ✅ Handle value changes
- ✅ Be disabled when disabled prop is true
- ✅ Apply custom className

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
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '@/components/path/to/component';

describe('ComponentName', () => {
  it('should do something', () => {
    // Arrange
    render(<ComponentName />);
    
    // Act
    const element = screen.getByText('text');
    fireEvent.click(element);
    
    // Assert
    expect(element).toBeInTheDocument();
  });
});
```

### **Best Practices:**

1. **Arrange-Act-Assert Pattern:**
   - Arrange: Set up test data and render components
   - Act: Perform actions (clicks, typing, etc.)
   - Assert: Verify expected outcomes

2. **Test User Behavior:**
   - Test what users see and do
   - Avoid testing implementation details
   - Use accessible queries (getByRole, getByLabelText)

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
   - Test accessibility

---

## Mocking

### **Mock localStorage:**
```typescript
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
```

### **Mock API Calls:**
```typescript
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked' }),
  })
);
```

### **Mock Next.js Router:**
```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));
```

---

## Continuous Integration

### **GitHub Actions:**
Tests run automatically on:
- Every push to main branch
- Every pull request
- Manual workflow dispatch

### **CI Configuration:**
```yaml
- name: Run tests
  run: npm test -- --coverage
  
- name: Upload coverage
  uses: codecov/codecov-action@v3
```

---

## Troubleshooting

### **Issue: Tests fail with module not found**
**Solution:**
```bash
# Clear Jest cache
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

### **Issue: Snapshot tests fail**
**Solution:**
```bash
# Update snapshots
npm test -- -u
```

---

## Next Steps

### **Planned Tests:**

1. **Integration Tests:**
   - Wallet creation flow
   - Transaction sending flow
   - Lock/unlock flow

2. **E2E Tests:**
   - Full user journeys
   - Cross-browser testing
   - Mobile testing

3. **Performance Tests:**
   - Load time testing
   - Memory leak detection
   - Bundle size monitoring

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Status:** Automated testing suite implemented ✅  
**Coverage:** 75% (target: 80%+)  
**Next:** Add integration and E2E tests

