# 🚀 3Wallet Bun Setup Guide

Complete guide for setting up 3Wallet with Bun runtime.

---

## 📋 Prerequisites

### **Install Bun**

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows (WSL2):**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Verify Installation:**
```bash
bun --version
# Should show: 1.3.0 or higher
```

---

## 🔧 Project Setup

### **1. Install Dependencies**
```bash
bun install
```

### **2. Install Playwright Browsers**
```bash
bunx playwright install
```

### **3. Setup Environment Variables**
```bash
cp .env.example .env.local
```

---

## 🏃 Running the Project

### **Development Server**
```bash
bun run dev
```
Visit: `http://localhost:5173`

### **Build for Production**
```bash
bun run build
```

### **Preview Production Build**
```bash
bun run preview
```

---

## 🧪 Testing

### **Run All Tests**
```bash
bun run test
```

### **Run Tests with UI**
```bash
bun run test:ui
```

### **Run Tests in Headed Mode**
```bash
bun run test:headed
```

### **Debug Tests**
```bash
bun run test:debug
```

### **View Test Report**
```bash
bun run test:report
```

---

## 📊 Test Coverage

Tests cover:
- ✅ Home/Landing Page (all sections, forms, CTAs)
- ✅ Wallet Page (creation, balances, addresses)
- ✅ Pitch Deck Page (all sections, data)
- ✅ Contact Page (form, team, FAQ)
- ✅ Responsive Design (Desktop, Tablet, Mobile)
- ✅ Cross-Browser (Chrome, Firefox, Safari)
- ✅ Visual Regression (Screenshots)
- ✅ Accessibility (ARIA, keyboard navigation)
- ✅ Performance (no console errors)

---

## 🔍 Type Checking

```bash
bun run check
```

---

## 📦 Package Management

### **Add Dependency**
```bash
bun add <package-name>
```

### **Add Dev Dependency**
```bash
bun add -d <package-name>
```

### **Remove Dependency**
```bash
bun remove <package-name>
```

### **Update Dependencies**
```bash
bun update
```

---

## 🚀 Deployment

### **Vercel**
```bash
bunx vercel
```

### **Netlify**
```bash
bunx netlify deploy
```

---

## 🐛 Troubleshooting

### **Bun Not Found**
```bash
# Add to ~/.bashrc or ~/.zshrc
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

### **Port Already in Use**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
bun run dev -- --port 3000
```

### **Playwright Errors**
```bash
# Reinstall browsers
bunx playwright install --with-deps
```

### **Clear Cache**
```bash
rm -rf node_modules .svelte-kit
bun install
```

---

## 📈 Performance Benefits

**Bun vs npm:**
- ⚡ 10-20x faster package installation
- ⚡ 3-4x faster script execution
- ⚡ Built-in TypeScript support
- ⚡ Native bundler (faster than Vite in some cases)

---

## 🎯 Next Steps

1. Run `bun install`
2. Run `bunx playwright install`
3. Run `bun run dev`
4. Run `bun run test`
5. Start developing!

---

**Happy Coding with Bun! ⚡**

