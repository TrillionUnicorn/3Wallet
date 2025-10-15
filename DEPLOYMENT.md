# 🚀 3Wallet Deployment Guide

This guide covers deploying 3Wallet to various platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] No console errors or warnings
- [ ] Lighthouse score 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] Security audit passed (Trivy or similar)

---

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended)**

Vercel is the easiest option for SvelteKit apps and offers excellent performance.

#### **Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Configure Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

#### **Automatic Deployments:**
- Connect GitHub repository to Vercel
- Every push to `main` branch auto-deploys
- Pull requests get preview deployments

---

### **Option 2: Netlify**

Netlify is another excellent option with similar features to Vercel.

#### **Steps:**

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize:**
   ```bash
   netlify init
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

#### **Configuration:**
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### **Option 3: VPS (Ubuntu/Debian)**

For full control, deploy to your own VPS.

#### **Prerequisites:**
- Ubuntu 22.04 LTS or Debian 11+
- Root or sudo access
- Domain name (optional)

#### **Steps:**

1. **Update System:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone Repository:**
   ```bash
   git clone https://github.com/TrillionUnicorn/3Wallet.git
   cd 3Wallet
   ```

5. **Install Dependencies:**
   ```bash
   npm install
   ```

6. **Build:**
   ```bash
   npm run build
   ```

7. **Start with PM2:**
   ```bash
   pm2 start npm --name "3wallet" -- run preview -- --host 0.0.0.0 --port 3000
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx (Optional):**
   ```nginx
   server {
       listen 80;
       server_name 3wallet.app;

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

9. **SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d 3wallet.app
   ```

---

### **Option 4: Docker/Podman**

Containerize the application for consistent deployments.

#### **Dockerfile:**
```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --production

EXPOSE 3000

ENV NODE_ENV=production
CMD ["node", "build"]
```

#### **Build and Run:**
```bash
# Build image
docker build -t 3wallet:latest .

# Run container
docker run -d \
  --name 3wallet \
  -p 3000:3000 \
  --env-file .env.local \
  3wallet:latest
```

#### **Docker Compose:**
```yaml
version: '3.8'

services:
  3wallet:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

## 🔒 Security Considerations

### **Environment Variables**
- Never commit `.env.local` to Git
- Use platform-specific secret management (Vercel Secrets, Netlify Environment Variables)
- Rotate API keys regularly

### **HTTPS**
- Always use HTTPS in production
- Configure SSL/TLS certificates (Let's Encrypt is free)
- Enable HSTS headers

### **Content Security Policy**
Add to `svelte.config.js`:
```javascript
export default {
  kit: {
    csp: {
      directives: {
        'default-src': ['self'],
        'script-src': ['self', 'unsafe-inline'],
        'style-src': ['self', 'unsafe-inline'],
        'img-src': ['self', 'data:', 'https:'],
        'connect-src': ['self', 'https://api.*.com']
      }
    }
  }
};
```

### **Rate Limiting**
Implement rate limiting for API endpoints to prevent abuse.

---

## 📊 Monitoring & Analytics

### **Error Tracking (Sentry)**
```bash
npm install @sentry/sveltekit
```

Configure in `hooks.server.ts`:
```typescript
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

### **Analytics (Google Analytics)**
Add to `app.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🧪 Testing Before Deployment

### **Build Test:**
```bash
npm run build
npm run preview
```

### **Lighthouse Audit:**
```bash
npm install -g lighthouse
lighthouse http://localhost:4173 --view
```

### **Security Scan:**
```bash
npm audit
npm audit fix
```

---

## 🔄 CI/CD with GitHub Actions

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
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📈 Performance Optimization

### **Enable Compression:**
```javascript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    sveltekit(),
    compression({ algorithm: 'brotliCompress' })
  ]
});
```

### **Image Optimization:**
- Use WebP format for images
- Implement lazy loading
- Use responsive images with `srcset`

### **Code Splitting:**
- SvelteKit automatically code-splits routes
- Use dynamic imports for heavy components

---

## 🆘 Troubleshooting

### **Build Fails:**
- Check Node.js version (20+ required)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run check`

### **Environment Variables Not Working:**
- Ensure variables start with `VITE_` for client-side access
- Restart dev server after changing `.env.local`
- Check variable names match exactly

### **Deployment Fails:**
- Check build logs for errors
- Verify all dependencies are in `package.json`
- Ensure adapter is configured correctly

---

## 📞 Support

For deployment issues:
- Email: support@3wallet.app
- Discord: https://discord.gg/3wallet
- GitHub Issues: https://github.com/TrillionUnicorn/3Wallet/issues

---

**Happy Deploying! 🚀**

