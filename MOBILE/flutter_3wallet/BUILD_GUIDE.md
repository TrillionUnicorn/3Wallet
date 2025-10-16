# 🏗️ Flutter App Build Guide

Complete guide for building 3Wallet Flutter app for iOS and Android.

---

## Prerequisites

### System Requirements
- macOS 12+ (for iOS builds)
- 10GB free disk space
- Xcode 14+ (for iOS)
- Android Studio 2022+ (for Android)
- Flutter 3.x

### Install Flutter

```bash
# Download Flutter
git clone https://github.com/flutter/flutter.git -b stable

# Add to PATH
export PATH="$PATH:`pwd`/flutter/bin"

# Verify installation
flutter doctor
```

---

## iOS Build

### Step 1: Setup iOS

```bash
cd ios
pod install
cd ..
```

### Step 2: Configure Signing

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select "Runner" project
3. Go to "Signing & Capabilities"
4. Select your team
5. Update bundle identifier

### Step 3: Build for Development

```bash
flutter build ios --debug
```

### Step 4: Build for Release

```bash
flutter build ios --release
```

### Step 5: Create IPA for App Store

```bash
flutter build ipa --release
```

This creates `build/ios/ipa/Runner.ipa`

---

## Android Build

### Step 1: Setup Android

```bash
# Create keystore
keytool -genkey -v -keystore ~/key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload
```

### Step 2: Configure Signing

Create `android/key.properties`:

```properties
storePassword=<password>
keyPassword=<password>
keyAlias=upload
storeFile=<path-to-key.jks>
```

### Step 3: Build for Development

```bash
flutter build apk --debug
```

### Step 4: Build for Release

```bash
flutter build apk --release
```

### Step 5: Create AAB for Play Store

```bash
flutter build appbundle --release
```

This creates `build/app/outputs/bundle/release/app-release.aab`

---

## Testing Before Release

### Run Tests

```bash
flutter test
```

### Run Integration Tests

```bash
flutter test integration_test
```

### Manual Testing

1. **iOS:**
   ```bash
   flutter run -d iphone
   ```

2. **Android:**
   ```bash
   flutter run -d android
   ```

### Test Checklist

- [ ] App launches without errors
- [ ] Can create wallet
- [ ] Can import wallet
- [ ] Can view balances
- [ ] Can send transactions
- [ ] Biometric auth works
- [ ] QR scanning works
- [ ] Dark mode works
- [ ] All pages load
- [ ] No console errors

---

## Build Troubleshooting

### iOS Issues

**Pod install fails:**
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

**Xcode build fails:**
```bash
flutter clean
flutter pub get
flutter build ios --release
```

### Android Issues

**Gradle build fails:**
```bash
flutter clean
flutter pub get
flutter build apk --release
```

**Keystore issues:**
```bash
# Verify keystore
keytool -list -v -keystore ~/key.jks
```

---

## Build Outputs

### iOS
- **Debug:** `build/ios/iphoneos/Runner.app`
- **Release:** `build/ios/iphoneos/Runner.app`
- **IPA:** `build/ios/ipa/Runner.ipa`

### Android
- **Debug APK:** `build/app/outputs/apk/debug/app-debug.apk`
- **Release APK:** `build/app/outputs/apk/release/app-release.apk`
- **AAB:** `build/app/outputs/bundle/release/app-release.aab`

---

## Next Steps

1. **For App Store:** See [APP_STORE_GUIDE.md](./APP_STORE_GUIDE.md)
2. **For Play Store:** See [PLAY_STORE_GUIDE.md](./PLAY_STORE_GUIDE.md)
3. **For Marketing:** See [KEYNOTE_PRESENTATION.md](./KEYNOTE_PRESENTATION.md)

---

**Status:** ✅ Build Ready  
**Version:** 1.0.0

