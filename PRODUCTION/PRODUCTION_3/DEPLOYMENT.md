# 🚀 Deployment Guide - 3Wallet PRODUCTION_3 (Vue.js)

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Git for version control
- Vercel/Netlify account (for deployment)

---

## 📦 Build for Production

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- Alchemy API key
- Infura API key
- OpenSea API key
- Moralis API key

### 3. Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

Visit `http://localhost:4173` to preview the production build.

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add environment variables
7. Click "Deploy"

---

## 🌐 Deploy to Netlify

### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Option 2: Drag & Drop

1. Build the application: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to Netlify

### Option 3: GitHub Integration

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect to GitHub
5. Configure build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
6. Add environment variables
7. Click "Deploy site"

---

## 🐳 Deploy with Docker

### Build Docker Image

```bash
docker build -t 3wallet-production-3 .
```

### Run Docker Container

```bash
docker run -p 8080:80 3wallet-production-3
```

Visit `http://localhost:8080`

### Docker Compose

```bash
docker-compose up -d
```

---

## ☁️ Deploy to AWS S3 + CloudFront

### 1. Build the Application

```bash
npm run build
```

### 2. Upload to S3

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

### 3. Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## 🔧 Environment Variables

Required environment variables for production:

```env
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_OPENSEA_API_KEY=your_opensea_api_key
VITE_MORALIS_API_KEY=your_moralis_api_key
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] All API keys are in environment variables (not hardcoded)
- [ ] `.env` file is in `.gitignore`
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] Security headers are configured
- [ ] Dependencies are up to date

---

## 📊 Performance Optimization

- [ ] Enable gzip compression
- [ ] Configure CDN (CloudFront, Cloudflare)
- [ ] Enable browser caching
- [ ] Optimize images
- [ ] Lazy load components
- [ ] Code splitting enabled
- [ ] Bundle size optimized

---

## 🔍 Monitoring

### Recommended Tools:

- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **Vercel Analytics** - Performance monitoring
- **LogRocket** - Session replay

---

## 🚀 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📝 Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] All pages are accessible
- [ ] Wallet connection works
- [ ] NFT gallery displays
- [ ] Token swap functions
- [ ] DeFi dashboard loads
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SSL certificate valid
- [ ] Analytics tracking works

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`
- Check Vercel/Netlify dashboard for env vars

### Wallet Connection Issues

- Check MetaMask is installed
- Verify network configuration
- Check RPC URLs are correct

---

## 📞 Support

For deployment issues:
- Check documentation: [README.md](./README.md)
- Review status: [STATUS.md](./STATUS.md)
- Contact: hello@3wallet.app

---

**Status:** ✅ Ready for Production Deployment  
**Last Updated:** October 16, 2025

