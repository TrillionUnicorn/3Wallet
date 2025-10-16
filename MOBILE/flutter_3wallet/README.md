# 📱 3Wallet Flutter Mobile App

**Secure Multi-Chain Cryptocurrency Wallet for iOS and Android**

---

## 🌟 Features

### **Wallet Management**
- ✅ Create wallet with BIP39 mnemonic
- ✅ Import existing wallet
- ✅ Password-protected encryption
- ✅ Biometric authentication
- ✅ Multi-chain support (ETH + BTC)

### **Transactions**
- ✅ Send Ethereum (ETH)
- ✅ Send Bitcoin (BTC)
- ✅ QR code scanning
- ✅ Transaction history
- ✅ Real-time balance updates

### **Security**
- ✅ AES-256 encryption
- ✅ Biometric authentication
- ✅ Private keys never leave device
- ✅ Password protection
- ✅ Secure storage

### **User Experience**
- ✅ Native iOS app
- ✅ Native Android app
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Push notifications

---

## 🛠️ Technology Stack

- **Framework:** Flutter 3.x
- **Language:** Dart
- **State Management:** Provider + Riverpod
- **Blockchain:** web3dart, bitcoin_flutter
- **Storage:** Hive, SharedPreferences
- **Biometric:** local_auth
- **Notifications:** Firebase Cloud Messaging

---

## 📦 Installation

### Prerequisites
- Flutter 3.x installed
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS dependencies)

### Setup

```bash
# Clone repository
git clone https://github.com/TrillionUnicorn/3Wallet.git
cd 3Wallet/MOBILE/flutter_3wallet

# Install dependencies
flutter pub get

# Get iOS pods
cd ios
pod install
cd ..
```

---

## 🚀 Development

### Run on iOS
```bash
flutter run -d iphone
```

### Run on Android
```bash
flutter run -d android
```

### Run on specific device
```bash
flutter devices
flutter run -d <device_id>
```

---

## 🧪 Testing

```bash
# Run unit tests
flutter test

# Run integration tests
flutter test integration_test

# Generate coverage
flutter test --coverage
```

---

## 📱 Build

### iOS Build

```bash
# Development build
flutter build ios --debug

# Release build
flutter build ios --release

# Create IPA for App Store
flutter build ipa --release
```

### Android Build

```bash
# Development build
flutter build apk --debug

# Release build
flutter build apk --release

# Create AAB for Play Store
flutter build appbundle --release
```

---

## 📚 Documentation

- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Detailed build instructions
- [APP_STORE_GUIDE.md](./APP_STORE_GUIDE.md) - App Store submission guide
- [PLAY_STORE_GUIDE.md](./PLAY_STORE_GUIDE.md) - Play Store submission guide
- [KEYNOTE_PRESENTATION.md](./KEYNOTE_PRESENTATION.md) - Marketing presentation

---

## 🎨 Assets

### App Icons
- iOS: 1024x1024 (App Store)
- Android: 192x192 (Play Store)
- All sizes included in `assets/icons/`

### Screenshots
- iOS: 6.7" screenshots (App Store)
- Android: 5.5" screenshots (Play Store)
- All screenshots in `assets/screenshots/`

### Fonts
- Poppins (Regular, SemiBold, Bold)
- Located in `assets/fonts/`

---

## 🔒 Security

- AES-256 encryption
- Biometric authentication
- Private keys never leave device
- Secure storage with Hive
- Password protection
- BIP39 standard compliance

---

## 📊 App Store Requirements

### iOS (App Store)
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Screenshots (6.7")
- ✅ App Preview Video (optional)
- ✅ App Icon (1024x1024)
- ✅ Description
- ✅ Keywords
- ✅ Support URL

### Android (Play Store)
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Screenshots (5.5")
- ✅ Feature Graphic (1024x500)
- ✅ App Icon (512x512)
- ✅ Description
- ✅ Short Description
- ✅ Support URL

---

## 🚀 Ready for Production

- ✅ iOS build working
- ✅ Android build working
- ✅ All features implemented
- ✅ All tests passing
- ✅ App Store ready
- ✅ Play Store ready
- ✅ All assets included
- ✅ Documentation complete

---

## 📞 Support

- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Build help
- [APP_STORE_GUIDE.md](./APP_STORE_GUIDE.md) - App Store help
- [PLAY_STORE_GUIDE.md](./PLAY_STORE_GUIDE.md) - Play Store help

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Platforms:** iOS + Android  
**License:** MIT

