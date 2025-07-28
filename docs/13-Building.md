# 🏗️ Building & Deployment - Production Ready Setup
*उत्पादन तैयार सेटअप*

## 🎯 Purpose / उद्देश्य
**English**: This guide covers the complete build and deployment process for the Kumbh Rakshak app, including development setup, production builds, app store deployment, and CI/CD configuration. It ensures the app is ready for real-world deployment during Kumbh Mela events.

**Hinglish**: Ye guide Kumbh Rakshak app ke liye complete build aur deployment process cover karta hai, including development setup, production builds, app store deployment, aur CI/CD configuration. Ye ensure karta hai ki app Kumbh Mela events ke dauran real-world deployment ke liye ready hai.

## 📊 Development Environment Setup / डेवलपमेंट एनवायरनमेंट सेटअप

### 1. Prerequisites / पूर्व आवश्यकताएं

#### Required Software / आवश्यक सॉफ्टवेयर
```bash
# Node.js (LTS version)
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher

# Expo CLI
npm install -g @expo/cli

# EAS CLI (for builds)
npm install -g eas-cli

# Git
git --version

# VS Code (recommended)
code --version
```

**English**: 
- **Node.js**: JavaScript runtime for development / Development के लिए JavaScript runtime
- **Expo CLI**: Command line interface for Expo projects / Expo projects के लिए command line interface
- **EAS CLI**: Expo Application Services for cloud builds / Cloud builds के लिए Expo Application Services
- **Git**: Version control system / Version control system

**Hinglish**:
- **Node.js**: Development ke liye JavaScript runtime
- **Expo CLI**: Expo projects ke liye command line interface
- **EAS CLI**: Cloud builds ke liye Expo Application Services
- **Git**: Version control system

#### Environment Variables / एनवायरनमेंट वैरिएबल्स
```bash
# Create .env file in project root
EXPO_PUBLIC_API_URL=https://api.kumbhrakshak.com
EXPO_PUBLIC_EMERGENCY_NUMBER=1950
EXPO_PUBLIC_ANALYTICS_KEY=your_analytics_key
EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key

# Development environment
EXPO_PUBLIC_ENV=development

# Production environment (for builds)
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_API_URL=https://prod-api.kumbhrakshak.com
```

### 2. Project Setup / प्रोजेक्ट सेटअप

#### Initial Setup Commands / प्रारंभिक सेटअप कमांड्स
```bash
# Clone the repository
git clone https://github.com/kumbhrakshak/my-expo-app.git
cd my-expo-app

# Install dependencies
npm install

# Start development server
npx expo start

# Start with specific platform
npx expo start --ios     # iOS simulator
npx expo start --android # Android emulator
npx expo start --web     # Web browser
```

#### Package.json Scripts / Package.json स्क्रिप्ट्स
```json
{
  "scripts": {
    "start": "expo start",
    "start:clear": "expo start --clear",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios", 
    "build:all": "eas build --platform all",
    "submit:android": "eas submit --platform android",
    "submit:ios": "eas submit --platform ios",
    "preview": "expo install expo-dev-client && npx expo start --dev-client",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 🏗️ Build Configuration / बिल्ड कॉन्फ़िगरेशन

### 1. EAS Build Configuration / EAS बिल्ड कॉन्फ़िगरेशन

#### eas.json
```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "resourceClass": "medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "resourceClass": "medium",
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "resourceClass": "medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD123456"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

**English**: 
- **Development**: Builds with dev client for testing / Testing के लिए dev client के साथ builds
- **Preview**: Internal distribution for stakeholders / Stakeholders के लिए internal distribution
- **Production**: App store ready builds / App store ready builds
- **Submit**: Configuration for app store submission / App store submission के लिए configuration

**Hinglish**:
- **Development**: Testing ke liye dev client ke saath builds
- **Preview**: Stakeholders ke liye internal distribution
- **Production**: App store ready builds
- **Submit**: App store submission ke liye configuration

### 2. App Configuration / ऐप कॉन्फ़िगरेशन

#### app.json / app.config.js
```json
{
  "expo": {
    "name": "Kumbh Rakshak",
    "slug": "kumbh-rakshak",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#2563eb"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.kumbhrakshak.app",
      "buildNumber": "1",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app uses location to help you find nearby emergency services during Kumbh Mela.",
        "NSCameraUsageDescription": "This app uses camera to capture incident photos for emergency reporting.",
        "NSMicrophoneUsageDescription": "This app uses microphone for voice messages in emergency situations."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#2563eb"
      },
      "package": "com.kumbhrakshak.app",
      "versionCode": 1,
      "permissions": [
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.CALL_PHONE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-localization",
      "expo-font",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow Kumbh Rakshak to use your location for emergency services."
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "Allow Kumbh Rakshak to access camera for incident reporting."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    }
  }
}
```

**English**: 
- **Basic Info**: App name, version, and identifier / App name, version, और identifier
- **Assets**: Icons, splash screen, and images / Icons, splash screen, और images
- **Permissions**: Location, camera, and phone access / Location, camera, और phone access
- **Platform Specific**: iOS and Android configurations / iOS और Android configurations

**Hinglish**:
- **Basic Info**: App name, version, aur identifier
- **Assets**: Icons, splash screen, aur images
- **Permissions**: Location, camera, aur phone access
- **Platform Specific**: iOS aur Android configurations

### 3. Metro Configuration / मेट्रो कॉन्फ़िगरेशन

#### metro.config.js
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add support for additional file types
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg');

// Add support for TypeScript and JSX
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json');

// NativeWind integration
module.exports = withNativeWind(config, { input: './global.css' });
```

## 📱 Platform-Specific Builds / प्लेटफ़ॉर्म-विशिष्ट बिल्ड्स

### 1. Android Build Process / एंड्रॉइड बिल्ड प्रक्रिया

#### Development Build / डेवलपमेंट बिल्ड
```bash
# Login to EAS
eas login

# Configure project
eas build:configure

# Build for Android development
eas build --platform android --profile development

# Build APK for testing
eas build --platform android --profile preview

# Production build
eas build --platform android --profile production
```

#### Android Keystore Setup / एंड्रॉइड कीस्टोर सेटअप
```bash
# Generate keystore
keytool -genkey -v -keystore kumbh-rakshak.keystore -alias kumbh-rakshak -keyalg RSA -keysize 2048 -validity 10000

# Add keystore to EAS
eas credentials:configure
```

### 2. iOS Build Process / iOS बिल्ड प्रक्रिया

#### Development Build / डेवलपमेंट बिल्ड
```bash
# Build for iOS development
eas build --platform ios --profile development

# Build for TestFlight
eas build --platform ios --profile preview

# Production build
eas build --platform ios --profile production
```

#### iOS Certificates Setup / iOS सर्टिफिकेट सेटअप
```bash
# Configure iOS credentials
eas credentials:configure --platform ios

# Upload certificates manually if needed
eas credentials:configure --platform ios --upload-cert
```

### 3. Web Build Process / वेब बिल्ड प्रक्रिया

#### Web Build Commands / वेब बिल्ड कमांड्स
```bash
# Install web dependencies
npx expo install react-dom react-native-web

# Build for web
npx expo export:web

# Preview web build locally
npx expo start --web

# Deploy to hosting service
npm run build:web
npx serve -s dist
```

## 🚀 Deployment Strategies / डिप्लॉयमेंट रणनीतियां

### 1. App Store Deployment / ऐप स्टोर डिप्लॉयमेंट

#### iOS App Store / iOS ऐप स्टोर
```bash
# Build for production
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios

# Or submit manually through Xcode
# 1. Download .ipa from EAS
# 2. Use Transporter app to upload
# 3. Process in App Store Connect
```

#### Google Play Store / गूगल प्ले स्टोर
```bash
# Build for production
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android

# Or submit manually
# 1. Download .aab from EAS
# 2. Upload to Google Play Console
# 3. Complete store listing
```

### 2. Internal Distribution / आंतरिक वितरण

#### TestFlight (iOS) / टेस्टफ्लाइट
```bash
# Build for TestFlight
eas build --platform ios --profile preview

# Submit to TestFlight
eas submit --platform ios --profile preview

# Add testers in App Store Connect
# Send invitations to stakeholders
```

#### Firebase App Distribution / फायरबेस ऐप वितरण
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Configure Firebase project
firebase init

# Build app
eas build --platform android --profile preview

# Upload to Firebase
firebase appdistribution:distribute app-release.apk \
  --app 1:your-project-id:android:app-id \
  --groups "kumbh-team" \
  --release-notes "Latest build with bug fixes"
```

### 3. Over-the-Air Updates / ओवर-द-एयर अपडेट्स

#### Expo Updates Setup / एक्सपो अपडेट्स सेटअप
```bash
# Configure updates
eas update:configure

# Publish update
eas update --branch production --message "Emergency fix for location services"

# Preview update before publishing
eas update --branch preview --message "Testing new features"

# View update status
eas update:list
```

#### Update Configuration / अपडेट कॉन्फ़िगरेशन
```json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/your-project-id",
      "fallbackToCacheTimeout": 0,
      "checkAutomatically": "ON_LOAD",
      "codeSigningCertificate": "./code-signing-certificate.pem",
      "codeSigningMetadata": {
        "keyid": "main",
        "alg": "rsa-v1_5-sha256"
      }
    }
  }
}
```

## 🔧 CI/CD Pipeline / CI/CD पाइपलाइन

### 1. GitHub Actions / गिटहब एक्शन्स

#### .github/workflows/build-and-deploy.yml
```yaml
name: Build and Deploy Kumbh Rakshak

on:
  push:
    branches: [main, development]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint

  build-android:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Android
        run: eas build --platform android --profile production --non-interactive

  build-ios:
    needs: test
    runs-on: macos-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build iOS
        run: eas build --platform ios --profile production --non-interactive

  deploy-updates:
    needs: [build-android, build-ios]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Publish update
        run: eas update --branch production --message "Automated deployment from GitHub Actions"
```

### 2. Environment Secrets / एनवायरनमेंट सीक्रेट्स

#### Required Secrets / आवश्यक सीक्रेट्स
```bash
# GitHub Repository Secrets
EXPO_TOKEN=your-expo-access-token
GOOGLE_SERVICES_KEY=base64-encoded-google-services.json
APPLE_CERTIFICATES=base64-encoded-certificates
SLACK_WEBHOOK_URL=webhook-for-notifications

# EAS Environment Variables
SENTRY_DSN=your-sentry-dsn
API_BASE_URL=https://api.kumbhrakshak.com
MAPS_API_KEY=your-google-maps-key
```

## 📊 Performance Optimization / प्रदर्शन अनुकूलन

### 1. Bundle Analysis / बंडल विश्लेषण

#### Bundle Size Optimization / बंडल साइज़ अनुकूलन
```bash
# Analyze bundle size
npx expo install @expo/webpack-config
npx expo export:web --analyze

# Check bundle composition
npx react-native-bundle-visualizer

# Optimize images
npx expo optimize
```

#### Code Splitting / कोड स्प्लिटिंग
```javascript
// Lazy load screens
import { lazy, Suspense } from 'react';

const HomeScreen = lazy(() => import('./app/screens/HomeScreen'));
const EmergencyScreen = lazy(() => import('./app/screens/EmergencyScreen'));

// Use in navigation
<Suspense fallback={<LoadingScreen />}>
  <HomeScreen />
</Suspense>
```

### 2. Asset Optimization / एसेट अनुकूलन

#### Image Optimization / छवि अनुकूलन
```bash
# Optimize images
npx expo optimize --include assets/**/*

# Use appropriate formats
# PNG for logos and icons
# JPEG for photos
# WebP for web builds
```

#### Font Optimization / फ़ॉन्ट अनुकूलन
```javascript
// Preload critical fonts
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });
};
```

## 🔍 Quality Assurance / गुणवत्ता आश्वासन

### 1. Testing Strategy / परीक्षण रणनीति

#### Unit Tests / यूनिट टेस्ट्स
```bash
# Run unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

#### Integration Tests / एकीकरण परीक्षण
```javascript
// Test API integration
import { render, waitFor } from '@testing-library/react-native';
import { fetchEmergencyServices } from '../services/api';

test('loads emergency services', async () => {
  const { getByText } = render(<EmergencyScreen />);
  
  await waitFor(() => {
    expect(getByText('Police')).toBeTruthy();
    expect(getByText('Medical')).toBeTruthy();
  });
});
```

#### End-to-End Tests / एंड-टू-एंड टेस्ट्स
```bash
# Install Detox
npm install --save-dev detox

# Configure Detox
detox init

# Run E2E tests
detox test
```

### 2. Performance Testing / प्रदर्शन परीक्षण

#### Load Testing / लोड परीक्षण
```bash
# Test app performance
npx react-native flipper

# Monitor memory usage
npx react-native doctor

# Profile JavaScript performance
npx react-native profile-hermes
```

## 🎯 Hackathon Presentation Points / हैकाथॉन प्रेजेंटेशन पॉइंट्स

1. **Production-Ready Architecture** / उत्पादन-तैयार आर्किटेक्चर
   - Complete build and deployment pipeline / Complete build और deployment pipeline
   - Industry-standard CI/CD practices / Industry-standard CI/CD practices

2. **Cross-Platform Deployment** / क्रॉस-प्लेटफ़ॉर्म डिप्लॉयमेंट
   - iOS, Android, and Web builds / iOS, Android, और Web builds
   - App store ready configurations / App store ready configurations

3. **Scalable Infrastructure** / स्केलेबल इन्फ्रास्ट्रक्चर
   - Over-the-air updates capability / Over-the-air updates capability
   - Performance optimized builds / Performance optimized builds

4. **Quality Assurance** / गुणवत्ता आश्वासन
   - Comprehensive testing strategy / Comprehensive testing strategy
   - Automated quality checks / Automated quality checks

5. **Real-World Deployment** / वास्तविक-विश्व डिप्लॉयमेंट
   - Production environment configuration / Production environment configuration
   - Emergency response ready / Emergency response ready

6. **Professional Development Practices** / व्यावसायिक डेवलपमेंट प्रथाएं
   - Version control and branching strategy / Version control और branching strategy
   - Documentation and code quality / Documentation और code quality
