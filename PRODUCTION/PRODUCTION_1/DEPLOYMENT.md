# PRODUCTION_1 - Deployment Guide

Complete guide for deploying 3Wallet (Next.js version) to production.

## Prerequisites

- GitHub account
- Vercel/Netlify/AWS account
- Ethereum RPC URL (from Alchemy or Infura)
- Domain name (optional)

---

## Option 1: Deploy to Vercel (Recommended)

### **Step 1: Prepare Repository**

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **Step 2: Deploy to Vercel**

**Via Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select `PRODUCTION/PRODUCTION_1` as root directory
5. Configure environment variables:
   - `NEXT_PUBLIC_ETHEREUM_RPC`: Your Alchemy/Infura URL
   - `NEXT_PUBLIC_BITCOIN_API`: `https://blockstream.info/testnet/api`
6. Click "Deploy"

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd PRODUCTION/PRODUCTION_1

# Deploy
vercel

# Follow prompts and set environment variables
```

### **Step 3: Configure Domain (Optional)**

1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### **Step 4: Verify Deployment**

1. Visit your deployment URL
2. Test wallet creation
3. Test wallet unlock
4. Test balance fetching
5. Test transaction sending

---

## Option 2: Deploy to Netlify

### **Step 1: Prepare Repository**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **Step 2: Deploy to Netlify**

**Via Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect to GitHub
4. Select your repository
5. Set build settings:
   - Base directory: `PRODUCTION/PRODUCTION_1`
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables:
   - `NEXT_PUBLIC_ETHEREUM_RPC`: Your Alchemy/Infura URL
   - `NEXT_PUBLIC_BITCOIN_API`: `https://blockstream.info/testnet/api`
7. Click "Deploy site"

**Via Netlify CLI:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to project
cd PRODUCTION/PRODUCTION_1

# Deploy
netlify deploy --prod

# Follow prompts
```

---

## Option 3: Deploy to AWS Amplify

### **Step 1: Install AWS Amplify CLI**

```bash
npm install -g @aws-amplify/cli
amplify configure
```

### **Step 2: Initialize Amplify**

```bash
cd PRODUCTION/PRODUCTION_1
amplify init
```

### **Step 3: Deploy**

```bash
amplify publish
```

### **Step 4: Configure Environment Variables**

1. Go to AWS Amplify Console
2. Select your app
3. Go to "Environment variables"
4. Add:
   - `NEXT_PUBLIC_ETHEREUM_RPC`
   - `NEXT_PUBLIC_BITCOIN_API`

---

## Option 4: Self-Hosted (Docker)

### **Step 1: Create Dockerfile**

Already created in the project root.

### **Step 2: Build Docker Image**

```bash
cd PRODUCTION/PRODUCTION_1
docker build -t 3wallet-prod1 .
```

### **Step 3: Run Container**

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_ETHEREUM_RPC="your-rpc-url" \
  -e NEXT_PUBLIC_BITCOIN_API="https://blockstream.info/testnet/api" \
  3wallet-prod1
```

### **Step 4: Use Docker Compose**

```bash
docker-compose up -d
```

---

## Environment Variables

### **Required:**

```env
NEXT_PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
NEXT_PUBLIC_BITCOIN_API=https://blockstream.info/testnet/api
```

### **How to Get Ethereum RPC:**

**Alchemy (Recommended):**
1. Go to [alchemy.com](https://www.alchemy.com/)
2. Sign up for free account
3. Create new app
4. Select "Ethereum" and "Sepolia" network
5. Copy HTTP URL

**Infura:**
1. Go to [infura.io](https://infura.io/)
2. Sign up for free account
3. Create new project
4. Select "Ethereum" and "Sepolia" network
5. Copy HTTPS endpoint

---

## Post-Deployment Checklist

### **Functionality:**
- [ ] Application loads without errors
- [ ] Can create new wallet
- [ ] Can import existing wallet
- [ ] Can unlock wallet
- [ ] Balances load correctly
- [ ] Can send transactions
- [ ] Can lock wallet
- [ ] All buttons work
- [ ] Responsive on mobile

### **Security:**
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No console errors
- [ ] Private keys encrypted
- [ ] No sensitive data in logs

### **Performance:**
- [ ] Page load < 3 seconds
- [ ] No layout shifts
- [ ] Images optimized
- [ ] Bundle size reasonable

### **SEO:**
- [ ] Meta tags present
- [ ] Title tag set
- [ ] Description tag set
- [ ] Favicon present

---

## Monitoring & Analytics

### **Add Google Analytics:**

1. Get GA tracking ID
2. Add to `app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID`}
  strategy="afterInteractive"
/>
```

### **Add Sentry for Error Tracking:**

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### **Add Vercel Analytics:**

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Troubleshooting

### **Issue: Build fails**

**Solution:**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### **Issue: Environment variables not working**

**Solution:**
- Ensure variables start with `NEXT_PUBLIC_`
- Rebuild after adding variables
- Check Vercel/Netlify dashboard

### **Issue: 404 errors**

**Solution:**
- Check `next.config.js`
- Ensure `output: 'standalone'` is not set
- Check routing configuration

---

## Scaling & Performance

### **Enable Caching:**

Add to `next.config.js`:
```javascript
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}
```

### **Enable Image Optimization:**

Already configured in the project.

### **Enable CDN:**

Vercel and Netlify automatically use CDN.

---

## Maintenance

### **Update Dependencies:**

```bash
npm update
npm audit fix
```

### **Monitor Logs:**

- Vercel: Check deployment logs in dashboard
- Netlify: Check function logs
- Self-hosted: Use `docker logs`

### **Backup:**

- Database: Not applicable (client-side only)
- Code: GitHub repository
- User data: Stored locally on user devices

---

## Production Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Domain configured
- [ ] Performance optimized
- [ ] SEO optimized
- [ ] Monitoring set up

---

## Support

For deployment issues:
1. Check Vercel/Netlify documentation
2. Review build logs
3. Check environment variables
4. Test locally first
5. Contact support if needed

---

**Status:** Ready for production deployment ✅  
**Estimated deployment time:** 10-15 minutes  
**Recommended platform:** Vercel

