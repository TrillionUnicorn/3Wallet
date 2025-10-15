# Contributing to 3Wallet

Thank you for your interest in contributing to 3Wallet! This document provides guidelines for contributing to the project.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Pull Request Process](#pull-request-process)
7. [Issue Reporting](#issue-reporting)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or bun
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/TrillionUnicorn/3Wallet.git
cd 3Wallet

# For PRODUCTION_1 (Next.js)
cd PRODUCTION/PRODUCTION_1
npm install
npm run dev

# For PRODUCTION_2 (SvelteKit)
cd PRODUCTION/PRODUCTION_2
npm install
npm run dev
```

### Project Structure

```
3Wallet/
├── PRODUCTION/
│   ├── PRODUCTION_1/    # Next.js version
│   └── PRODUCTION_2/    # SvelteKit version
├── Documentation/       # Project documentation
└── RESEARCH/           # Market research
```

---

## Development Process

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### 3. Make Changes

- Write clean, readable code
- Follow coding standards
- Add tests for new features
- Update documentation

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

**Commit message format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

**Example:**
```
feat: add wallet import functionality

- Add ImportWalletModal component
- Implement mnemonic validation
- Add error handling

Closes #123
```

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub
- Click "New Pull Request"
- Fill in the template
- Wait for review

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define proper types/interfaces
- Avoid `any` type

**Example:**
```typescript
// Good
interface WalletProps {
  address: string;
  balance: string;
}

// Bad
const wallet: any = { ... };
```

### React/Svelte Components

**PRODUCTION_1 (React):**
```typescript
// Use functional components
export function MyComponent({ prop }: Props) {
  return <div>{prop}</div>;
}

// Use hooks
const [state, setState] = useState('');
```

**PRODUCTION_2 (Svelte):**
```svelte
<script lang="ts">
  export let prop: string;
  let state = '';
</script>

<div>{prop}</div>
```

### Naming Conventions

- **Components:** PascalCase (`WalletCard.tsx`)
- **Files:** kebab-case (`wallet-store.ts`)
- **Functions:** camelCase (`createWallet()`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Interfaces:** PascalCase with `I` prefix (`IWallet`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Max line length: 100 characters
- Use trailing commas

**Example:**
```typescript
const wallet = {
  address: '0x123...',
  balance: '1.5',
};
```

### Comments

- Add JSDoc comments for functions
- Explain complex logic
- Keep comments up-to-date

**Example:**
```typescript
/**
 * Creates a new Ethereum wallet
 * @returns Wallet object with address and private key
 */
export function createEthereumWallet(): EthereumWallet {
  // Implementation
}
```

---

## Testing

### Running Tests

```bash
# PRODUCTION_1
cd PRODUCTION/PRODUCTION_1
npm test

# PRODUCTION_2
cd PRODUCTION/PRODUCTION_2
npm test
```

### Writing Tests

**Unit Tests:**
```typescript
describe('createWallet', () => {
  it('should create a valid wallet', () => {
    const wallet = createWallet();
    expect(wallet.address).toBeDefined();
  });
});
```

**Component Tests:**
```typescript
it('should render button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Test Coverage

- Aim for 80%+ coverage
- Test happy paths
- Test error cases
- Test edge cases

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors
- [ ] Linter passes
- [ ] Type check passes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test the changes

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated checks** run first
2. **Code review** by maintainers
3. **Feedback** addressed
4. **Approval** from 1+ maintainers
5. **Merge** to main branch

### After Merge

- Delete your branch
- Update your fork
- Celebrate! 🎉

---

## Issue Reporting

### Before Creating an Issue

- Search existing issues
- Check documentation
- Try latest version
- Reproduce the bug

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

## Screenshots
If applicable
```

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives
Other solutions considered
```

---

## Development Tips

### Useful Commands

```bash
# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check

# Build for production
npm run build
```

### Debugging

- Use browser DevTools
- Check console for errors
- Use React/Svelte DevTools
- Add console.log strategically
- Use debugger statements

### Performance

- Avoid unnecessary re-renders
- Use React.memo / Svelte reactivity
- Optimize images
- Lazy load components
- Monitor bundle size

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [GitHub Desktop](https://desktop.github.com/)
- [Postman](https://www.postman.com/)

### Community
- GitHub Discussions
- Discord (coming soon)
- Twitter: @3wallet

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## Questions?

- Open a GitHub Discussion
- Email: contribute@3wallet.example.com
- Check FAQ in documentation

---

**Thank you for contributing to 3Wallet!** 🙏

Your contributions make this project better for everyone.

