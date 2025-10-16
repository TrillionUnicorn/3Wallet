# 🏗️ Flutter App Implementation Guide - 3Wallet Mobile

**Status:** ⚠️ SCAFFOLD ONLY - NEEDS IMPLEMENTATION  
**Framework:** Flutter 3.16+  
**Platforms:** iOS & Android  
**Estimated Time:** 120-180 hours  
**Priority:** High

---

## 📋 What Needs to Be Built

### 1. Flutter Project Initialization

```bash
# Install Flutter (if not already installed)
# Visit: https://flutter.dev/docs/get-started/install

# Create new Flutter project
flutter create 3wallet_mobile

# Navigate to project
cd 3wallet_mobile

# Run on device/emulator
flutter run
```

### 2. Required Dependencies

Add to `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.1.0
  riverpod: ^2.4.0
  
  # Blockchain
  web3dart: ^2.7.0
  bip39: ^1.0.6
  bip32: ^2.0.0
  
  # Biometric Authentication
  local_auth: ^2.1.0
  flutter_secure_storage: ^9.0.0
  
  # QR Code
  qr_code_scanner: ^1.0.1
  qr_flutter: ^4.1.0
  
  # Push Notifications
  firebase_messaging: ^14.7.0
  firebase_core: ^2.24.0
  
  # UI
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  
  # HTTP
  dio: ^5.4.0
  
  # Storage
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # Utils
  intl: ^0.18.1
  url_launcher: ^6.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  build_runner: ^2.4.7
  hive_generator: ^2.0.1
```

---

## 🏗️ Project Structure

```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── constants/
│   │   ├── app_constants.dart
│   │   ├── colors.dart
│   │   └── strings.dart
│   ├── services/
│   │   ├── wallet_service.dart
│   │   ├── biometric_service.dart
│   │   ├── storage_service.dart
│   │   └── notification_service.dart
│   ├── utils/
│   │   ├── crypto_utils.dart
│   │   ├── validators.dart
│   │   └── formatters.dart
│   └── models/
│       ├── wallet.dart
│       ├── transaction.dart
│       └── token.dart
├── features/
│   ├── onboarding/
│   │   ├── screens/
│   │   │   ├── splash_screen.dart
│   │   │   ├── welcome_screen.dart
│   │   │   └── create_wallet_screen.dart
│   │   └── widgets/
│   ├── home/
│   │   ├── screens/
│   │   │   └── home_screen.dart
│   │   └── widgets/
│   │       ├── balance_card.dart
│   │       ├── token_list.dart
│   │       └── recent_transactions.dart
│   ├── wallet/
│   │   ├── screens/
│   │   │   ├── wallet_screen.dart
│   │   │   ├── send_screen.dart
│   │   │   └── receive_screen.dart
│   │   └── widgets/
│   ├── settings/
│   │   ├── screens/
│   │   │   ├── settings_screen.dart
│   │   │   ├── security_screen.dart
│   │   │   └── backup_screen.dart
│   │   └── widgets/
│   └── scan/
│       └── screens/
│           └── qr_scan_screen.dart
├── providers/
│   ├── wallet_provider.dart
│   ├── auth_provider.dart
│   └── theme_provider.dart
└── widgets/
    ├── custom_button.dart
    ├── custom_text_field.dart
    └── loading_indicator.dart
```

---

## 🎯 Key Features to Implement

### 1. Wallet Management

**Files to Create:**
- `wallet_service.dart` - Core wallet logic
- `wallet_provider.dart` - State management
- `wallet_screen.dart` - Wallet UI

**Functionality:**
- Create new wallet (BIP39)
- Import existing wallet
- Multiple wallet support
- Backup seed phrase
- Export private key

**Implementation:**
```dart
// wallet_service.dart
class WalletService {
  Future<Wallet> createWallet() async {
    final mnemonic = bip39.generateMnemonic();
    final seed = bip39.mnemonicToSeed(mnemonic);
    final privateKey = await derivePrivateKey(seed);
    return Wallet(mnemonic: mnemonic, privateKey: privateKey);
  }
  
  Future<Wallet> importWallet(String mnemonic) async {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw Exception('Invalid mnemonic');
    }
    final seed = bip39.mnemonicToSeed(mnemonic);
    final privateKey = await derivePrivateKey(seed);
    return Wallet(mnemonic: mnemonic, privateKey: privateKey);
  }
}
```

### 2. Biometric Authentication

**Files to Create:**
- `biometric_service.dart` - Biometric logic
- `auth_provider.dart` - Auth state
- `security_screen.dart` - Security settings

**Functionality:**
- Face ID / Touch ID
- Fingerprint authentication
- PIN code fallback
- Auto-lock timer
- Biometric enrollment

**Implementation:**
```dart
// biometric_service.dart
class BiometricService {
  final LocalAuthentication _auth = LocalAuthentication();
  
  Future<bool> authenticate() async {
    try {
      return await _auth.authenticate(
        localizedReason: 'Authenticate to access wallet',
        options: const AuthenticationOptions(
          biometricOnly: true,
          stickyAuth: true,
        ),
      );
    } catch (e) {
      return false;
    }
  }
  
  Future<bool> canCheckBiometrics() async {
    return await _auth.canCheckBiometrics;
  }
}
```

### 3. QR Code Scanning

**Files to Create:**
- `qr_scan_screen.dart` - QR scanner UI
- `qr_utils.dart` - QR parsing logic

**Functionality:**
- Scan wallet addresses
- Scan payment requests
- Parse EIP-681 URIs
- Generate QR codes
- Share QR codes

**Implementation:**
```dart
// qr_scan_screen.dart
class QRScanScreen extends StatefulWidget {
  @override
  _QRScanScreenState createState() => _QRScanScreenState();
}

class _QRScanScreenState extends State<QRScanScreen> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  
  void _onQRViewCreated(QRViewController controller) {
    controller.scannedDataStream.listen((scanData) {
      // Parse and handle scanned data
      final address = parseAddress(scanData.code);
      Navigator.pop(context, address);
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: QRView(
        key: qrKey,
        onQRViewCreated: _onQRViewCreated,
      ),
    );
  }
}
```

### 4. Push Notifications

**Files to Create:**
- `notification_service.dart` - FCM integration
- `notification_handler.dart` - Notification handling

**Functionality:**
- Transaction notifications
- Price alerts
- Security alerts
- News updates
- Custom notifications

**Implementation:**
```dart
// notification_service.dart
class NotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  
  Future<void> initialize() async {
    await _fcm.requestPermission();
    
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      // Handle foreground notifications
      showLocalNotification(message);
    });
    
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      // Handle notification tap
      handleNotificationTap(message);
    });
  }
}
```

---

## 🔧 Implementation Steps

### Step 1: Initialize Project (4 hours)
```bash
flutter create 3wallet_mobile
cd 3wallet_mobile
flutter pub get
```

### Step 2: Setup Dependencies (4 hours)
- Add all dependencies to pubspec.yaml
- Configure Firebase
- Setup secure storage

### Step 3: Create Core Services (16 hours)
- Wallet service
- Biometric service
- Storage service
- Notification service

### Step 4: Build Onboarding Flow (12 hours)
- Splash screen
- Welcome screen
- Create/Import wallet
- Backup seed phrase

### Step 5: Build Home Screen (16 hours)
- Balance display
- Token list
- Recent transactions
- Quick actions

### Step 6: Build Wallet Features (20 hours)
- Send tokens
- Receive tokens
- Transaction history
- Token management

### Step 7: Implement Biometric Auth (12 hours)
- Face ID / Touch ID
- PIN code
- Security settings

### Step 8: Implement QR Scanner (12 hours)
- QR code scanning
- QR code generation
- Address parsing

### Step 9: Setup Push Notifications (12 hours)
- Firebase integration
- Notification handling
- Custom notifications

### Step 10: iOS Configuration (16 hours)
- Info.plist configuration
- Signing & capabilities
- App Store assets

### Step 11: Android Configuration (16 hours)
- AndroidManifest.xml
- Permissions
- Play Store assets

### Step 12: Testing (20 hours)
- Unit tests
- Widget tests
- Integration tests
- Manual testing

---

## 📱 Platform-Specific Configuration

### iOS Configuration

**Info.plist:**
```xml
<key>NSCameraUsageDescription</key>
<string>Camera access is required to scan QR codes</string>
<key>NSFaceIDUsageDescription</key>
<string>Face ID is used to secure your wallet</string>
```

**Podfile:**
```ruby
platform :ios, '12.0'
```

### Android Configuration

**AndroidManifest.xml:**
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

**build.gradle:**
```gradle
android {
    compileSdkVersion 34
    minSdkVersion 21
    targetSdkVersion 34
}
```

---

## 🎨 UI/UX Design

### Design System
- Material Design 3
- Custom color scheme
- Consistent spacing
- Smooth animations
- Responsive layouts

### Color Palette
```dart
class AppColors {
  static const primary = Color(0xFF10B981);
  static const secondary = Color(0xFF1E293B);
  static const background = Color(0xFF0F172A);
  static const surface = Color(0xFF1E293B);
  static const error = Color(0xFFEF4444);
}
```

---

## 🔒 Security Requirements

### Must Implement
- [ ] Secure key storage (Keychain/Keystore)
- [ ] Biometric authentication
- [ ] PIN code protection
- [ ] Auto-lock
- [ ] Encrypted local storage
- [ ] SSL pinning
- [ ] Jailbreak/Root detection
- [ ] Screenshot prevention (sensitive screens)

---

## 🧪 Testing Requirements

### Unit Tests
```dart
test('creates wallet with valid mnemonic', () async {
  final wallet = await walletService.createWallet();
  expect(wallet.mnemonic, isNotEmpty);
  expect(wallet.privateKey, isNotEmpty);
});
```

### Widget Tests
```dart
testWidgets('displays balance correctly', (WidgetTester tester) async {
  await tester.pumpWidget(MyApp());
  expect(find.text('Balance'), findsOneWidget);
});
```

---

## 📊 Success Criteria

- [ ] iOS build working
- [ ] Android build working
- [ ] All features implemented
- [ ] 80%+ test coverage
- [ ] App Store ready
- [ ] Play Store ready
- [ ] Performance optimized

---

**Status:** ⚠️ READY TO START  
**Next Step:** Initialize Flutter project  
**Estimated Completion:** 120-180 hours

