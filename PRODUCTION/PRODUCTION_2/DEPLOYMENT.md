# PRODUCTION_2 - Deployment Guide

Complete guide for deploying 3Wallet (SvelteKit version) to production.

## Prerequisites

- GitHub account
- Vercel/Netlify account
- Ethereum RPC URL (from Alchemy or Infura)
- Domain name (optional)

---

## Option 1: Deploy to Vercel (Recommended)

### **Step 1: Prepare Repository**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **Step 2: Deploy to Vercel**

**Via Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select `PRODUCTION/PRODUCTION_2` as root directory
5. Framework preset: SvelteKit
6. Configure environment variables:
   - `PUBLIC_ETHEREUM_RPC`: Your Alchemy/Infura URL
   - `PUBLIC_BITCOIN_API`: `https://blockstream.info/testnet/api`
7. Click "Deploy"

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd PRODUCTION/PRODUCTION_2

# Deploy
vercel

# Follow prompts
```

### **Step 3: Verify Deployment**

1. Visit your deployment URL
2. Test all features
3. Check console for errors

---

## Option 2: Deploy to Netlify

### **Step 1: Deploy to Netlify**

**Via Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect to GitHub
4. Select your repository
5. Set build settings:
   - Base directory: `PRODUCTION/PRODUCTION_2`
   - Build command: `npm run build`
   - Publish directory: `build`
6. Add environment variables:
   - `PUBLIC_ETHEREUM_RPC`: Your Alchemy/Infura URL
   - `PUBLIC_BITCOIN_API`: `https://blockstream.info/testnet/api`
7. Click "Deploy site"

**Via Netlify CLI:**
```bash
npm i -g netlify-cli
cd PRODUCTION/PRODUCTION_2
netlify deploy --prod
```

---

## Option 3: Deploy to Cloudflare Pages

### **Step 1: Connect Repository**

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Connect to GitHub
4. Select repository

### **Step 2: Configure Build**

- Framework preset: SvelteKit
- Build command: `npm run build`
- Build output directory: `build`
- Root directory: `PRODUCTION/PRODUCTION_2`

### **Step 3: Add Environment Variables**

- `PUBLIC_ETHEREUM_RPC`
- `PUBLIC_BITCOIN_API`

---

## Option 4: Self-Hosted (Node.js)

### **Step 1: Build for Production**

```bash
cd PRODUCTION/PRODUCTION_2
npm run build
```

### **Step 2: Run Production Server**

```bash
# Using Node adapter
node build

# Or using PM2
npm install -g pm2
pm2 start build/index.js --name 3wallet-prod2
```

### **Step 3: Configure Reverse Proxy (Nginx)**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables

### **Required:**

```env
PUBLIC_ETHEREUM_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PUBLIC_BITCOIN_API=https://blockstream.info/testnet/api
```

### **How to Get Ethereum RPC:**

**Alchemy (Recommended):**
1. Go to [alchemy.com](https://www.alchemy.com/)
2. Sign up for free account
3. Create new app (Ethereum Sepolia)
4. Copy HTTP URL

**Infura:**
1. Go to [infura.io](https://infura.io/)
2. Sign up for free account
3. Create new project (Ethereum Sepolia)
4. Copy HTTPS endpoint

---

## Adapter Configuration

### **For Vercel:**

Already configured with `@sveltejs/adapter-auto`

### **For Netlify:**

```bash
npm install -D @sveltejs/adapter-netlify
```

Update `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-netlify';

export default {
  kit: {
    adapter: adapter()
  }
};
```

### **For Node.js:**

```bash
npm install -D @sveltejs/adapter-node
```

Update `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter()
  }
};
```

### **For Static (Cloudflare Pages):**

```bash
npm install -D @sveltejs/adapter-static
```

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
- [ ] Page load < 2 seconds
- [ ] No layout shifts
- [ ] Bundle size < 200KB
- [ ] Lighthouse score > 90

---

## Performance Optimization

### **Enable Prerendering:**

Add to `+page.ts`:
```typescript
export const prerender = true;
```

### **Enable Compression:**

Already handled by Vercel/Netlify.

For self-hosted:
```bash
npm install compression
```

### **Optimize Bundle:**

```bash
# Analyze bundle
npm run build -- --analyze
```

---

## Monitoring

### **Add Sentry:**

```bash
npm install @sentry/sveltekit
```

Configure in `hooks.client.ts`:
```typescript
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
});
```

### **Add Analytics:**

```bash
npm install @vercel/analytics
```

Add to `+layout.svelte`:
```svelte
<script>
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>
```

---

## Troubleshooting

### **Issue: Build fails**

```bash
rm -rf .svelte-kit node_modules
npm install
npm run build
```

### **Issue: Environment variables not working**

- Ensure variables start with `PUBLIC_`
- Rebuild after adding variables
- Check platform dashboard

### **Issue: Hydration errors**

- Check for SSR/CSR mismatches
- Use `browser` check from `$app/environment`
- Ensure localStorage access is client-side only

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

**Status:** Ready for production deployment ✅  
**Estimated deployment time:** 10-15 minutes  
**Recommended platform:** Vercel

