# 🍎 App Store Submission Guide

Complete guide for submitting 3Wallet to Apple App Store.

---

## Prerequisites

- Apple Developer Account ($99/year)
- Xcode 14+
- Built IPA file
- App Store Connect access

---

## Step 1: Prepare App Store Connect

### Create App

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click "My Apps"
3. Click "+"
4. Select "New App"
5. Fill in:
   - Platform: iOS
   - Name: 3Wallet
   - Primary Language: English
   - Bundle ID: com.3wallet.app
   - SKU: 3WALLET001

### Configure App Information

1. Go to "App Information"
2. Set:
   - Category: Finance
   - Subcategory: Cryptocurrency
   - Content Rating: 4+
   - Privacy Policy URL: https://3wallet.example.com/privacy

---

## Step 2: Prepare Screenshots

### iOS Screenshots Required

**6.7" Display (iPhone 14 Pro Max):**
- 1290 x 2796 pixels
- 5 screenshots minimum
- PNG or JPG format

**Screenshots to Include:**
1. Home screen
2. Wallet creation
3. Transaction sending
4. Balance view
5. Settings

**Location:** `assets/screenshots/ios/`

---

## Step 3: Prepare App Icon

### App Icon Requirements

- **Size:** 1024 x 1024 pixels
- **Format:** PNG
- **No transparency:** Solid background
- **No rounded corners:** iOS adds them

**Location:** `assets/icons/app_icon_1024.png`

---

## Step 4: Prepare Description

### App Description

```
3Wallet - Secure Multi-Chain Cryptocurrency Wallet

Manage your Ethereum and Bitcoin securely on your iPhone.

Features:
- Create and import wallets
- Send and receive crypto
- View real-time balances
- Biometric authentication
- AES-256 encryption
- No server storage

Your private keys, your crypto.
```

### Keywords

```
wallet, cryptocurrency, ethereum, bitcoin, crypto, blockchain, defi, secure
```

### Support URL

```
https://3wallet.example.com/support
```

---

## Step 5: Build and Upload

### Build IPA

```bash
flutter build ipa --release
```

### Upload with Xcode

1. Open Xcode
2. Go to "Window" → "Organizer"
3. Select your app
4. Click "Distribute App"
5. Select "App Store Connect"
6. Follow prompts

### Upload with Transporter

```bash
# Download Transporter from App Store
# Or use xcrun

xcrun altool --upload-app \
  -f build/ios/ipa/Runner.ipa \
  -t ios \
  -u your-apple-id@example.com \
  -p your-app-specific-password
```

---

## Step 6: Submit for Review

### Complete App Review Information

1. Go to "App Review Information"
2. Fill in:
   - Contact Email
   - Demo Account (if needed)
   - Notes for Reviewer
   - Encryption: Yes (AES-256)

### Example Notes

```
3Wallet is a cryptocurrency wallet application that allows users to securely manage their digital assets.

The app uses AES-256 encryption for local storage and does not transmit private keys to any server.

Demo Account:
Email: demo@example.com
Password: DemoPassword123!

The app requires internet connection to fetch blockchain data.
```

### Submit

1. Click "Submit for Review"
2. Confirm submission
3. Wait for review (typically 24-48 hours)

---

## Step 7: Monitor Review

### Check Status

1. Go to App Store Connect
2. Check "App Review Information"
3. Status updates via email

### Common Rejection Reasons

- **Cryptocurrency:** Ensure compliance with App Store guidelines
- **Permissions:** Justify all requested permissions
- **Security:** Clearly explain encryption methods
- **Testing:** Provide demo account if needed

---

## Step 8: Release

### After Approval

1. Go to "App Store" tab
2. Select version
3. Click "Release This Version"
4. Confirm release

### Monitor Release

- Check "Pricing and Availability"
- Monitor "Sales and Trends"
- Check user reviews

---

## Checklist

- [ ] Apple Developer Account active
- [ ] App created in App Store Connect
- [ ] Screenshots prepared (1290x2796)
- [ ] App icon prepared (1024x1024)
- [ ] Description written
- [ ] Keywords added
- [ ] Privacy policy URL set
- [ ] Support URL set
- [ ] IPA built and tested
- [ ] IPA uploaded
- [ ] App Review Information completed
- [ ] Submitted for review
- [ ] Approved and released

---

## Support

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Xcode Help](https://help.apple.com/xcode/)

---

**Status:** ✅ Ready for Submission  
**Version:** 1.0.0

