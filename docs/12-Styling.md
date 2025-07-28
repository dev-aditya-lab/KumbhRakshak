# 🎨 Styling System - TailwindCSS with NativeWind
*TailwindCSS के साथ स्टाइलिंग सिस्टम*

## 🎯 Purpose / उद्देश्य
**English**: The Kumbh Rakshak app uses TailwindCSS with NativeWind for styling, providing a consistent, maintainable, and responsive design system. This approach enables rapid development with utility-first CSS classes while maintaining professional appearance for Kumbh Mela management.

**Hinglish**: Kumbh Rakshak app styling ke liye TailwindCSS with NativeWind use karta hai, jo consistent, maintainable, aur responsive design system provide karta hai. Ye approach utility-first CSS classes ke saath rapid development enable karta hai while Kumbh Mela management ke liye professional appearance maintain karta hai.

## 📊 Configuration Setup / कॉन्फ़िगरेशन सेटअप

### 1. TailwindCSS Configuration / TailwindCSS कॉन्फ़िगरेशन

#### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Kumbh Rakshak Brand Colors
        kumbhblue: {
          50: '#eff6ff',   // Very light blue for backgrounds
          100: '#dbeafe',  // Light blue for subtle elements
          200: '#bfdbfe',  // Lighter blue for borders
          300: '#93c5fd',  // Medium light blue
          400: '#60a5fa',  // Medium blue
          500: '#3b82f6',  // Standard blue
          600: '#2563eb',  // Main brand blue (headers)
          700: '#1d4ed8',  // Dark blue (volunteer interface)
          800: '#1e40af',  // Darker blue
          900: '#1e3a8a',  // Darkest blue
          950: '#172554'   // Ultra dark blue
        },
        // Emergency Colors
        emergency: {
          red: '#dc2626',      // Emergency red
          orange: '#ea580c',   // Warning orange
          yellow: '#eab308',   // Caution yellow
          green: '#16a34a',    // Safe green
          blue: '#2563eb'      // Info blue
        }
      },
      fontFamily: {
        // Custom fonts (if needed)
        'sans': ['Inter', 'sans-serif'],
        'hindi': ['Noto Sans Devanagari', 'sans-serif']
      },
      boxShadow: {
        // Custom shadows for mobile
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.2)'
      },
      borderRadius: {
        // Custom border radius
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px'
      },
      spacing: {
        // Custom spacing
        '18': '4.5rem',  // 72px
        '72': '18rem',   // 288px
        '84': '21rem',   // 336px
        '96': '24rem'    // 384px
      }
    },
  },
  plugins: [],
}
```

**English**: 
- **Content Paths**: Specifies where Tailwind should look for classes / Tailwind को classes कहाँ देखनी चाहिए specify करता है
- **NativeWind Preset**: Enables React Native compatibility / React Native compatibility enable करता है
- **Custom Colors**: Kumbh-specific color palette / Kumbh-specific color palette
- **Extended Theme**: Additional utilities for the app / App के लिए additional utilities

**Hinglish**:
- **Content Paths**: Tailwind ko classes kahan dekhni chahiye specify karta hai
- **NativeWind Preset**: React Native compatibility enable karta hai
- **Custom Colors**: Kumbh-specific color palette
- **Extended Theme**: App ke liye additional utilities

### 2. Global CSS Configuration / ग्लोबल CSS कॉन्फ़िगरेशन

#### global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Base Styles */
@layer base {
  /* Text selection colors */
  ::selection {
    background-color: #3b82f6;
    color: white;
  }
  
  /* Custom font loading */
  @font-face {
    font-family: 'Inter';
    src: url('./assets/fonts/Inter-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Inter';
    src: url('./assets/fonts/Inter-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
}

/* Custom Component Classes */
@layer components {
  /* Button variants */
  .btn-primary {
    @apply bg-kumbhblue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-soft;
  }
  
  .btn-secondary {
    @apply bg-white border-2 border-kumbhblue-600 text-kumbhblue-600 px-6 py-3 rounded-xl font-semibold;
  }
  
  .btn-emergency {
    @apply bg-emergency-red text-white px-6 py-3 rounded-xl font-bold shadow-medium;
  }
  
  /* Card variants */
  .card-default {
    @apply bg-white rounded-3xl p-6 shadow-soft;
  }
  
  .card-emergency {
    @apply bg-red-50 border-2 border-red-200 rounded-2xl p-4 shadow-soft;
  }
  
  .card-volunteer {
    @apply bg-kumbhblue-50 border-2 border-kumbhblue-200 rounded-2xl p-4 shadow-soft;
  }
  
  /* Input variants */
  .input-default {
    @apply border-2 border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-white;
  }
  
  .input-focused {
    @apply border-kumbhblue-500 ring-2 ring-kumbhblue-200;
  }
  
  .input-error {
    @apply border-red-500 ring-2 ring-red-200;
  }
}

/* Custom Utility Classes */
@layer utilities {
  /* Glassmorphism effect */
  .glass {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  /* Text gradients */
  .text-gradient-blue {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  /* Safe area utilities */
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
  
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  /* Animation utilities */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  .animate-bounce-gentle {
    animation: bounceGentle 2s infinite;
  }
}

/* Custom Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounceGentle {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

/* Responsive utilities for different screen sizes */
@media (max-width: 375px) {
  .text-responsive {
    font-size: 14px;
  }
}

@media (min-width: 375px) and (max-width: 414px) {
  .text-responsive {
    font-size: 16px;
  }
}

@media (min-width: 414px) {
  .text-responsive {
    font-size: 18px;
  }
}
```

**English**: 
- **Layer Organization**: Organized into base, components, and utilities / Base, components, और utilities में organized
- **Custom Components**: Reusable button and card classes / Reusable button और card classes
- **Utility Classes**: Special effects like glassmorphism / Glassmorphism जैसे special effects
- **Animations**: Smooth transitions and effects / Smooth transitions और effects

**Hinglish**:
- **Layer Organization**: Base, components, aur utilities mein organized
- **Custom Components**: Reusable button aur card classes
- **Utility Classes**: Glassmorphism jaise special effects
- **Animations**: Smooth transitions aur effects

### 3. NativeWind Integration / NativeWind एकीकरण

#### metro.config.js
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

**English**: Integrates NativeWind with Expo Metro bundler / Expo Metro bundler के साथ NativeWind integrate करता है
**Hinglish**: Expo Metro bundler ke saath NativeWind integrate karta hai

#### babel.config.js
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

## 🎨 Design System Components / डिज़ाइन सिस्टम कंपोनेंट्स

### 1. Color System Usage / रंग प्रणाली का उपयोग

#### Brand Colors Implementation / ब्रांड रंग कार्यान्वयन
```javascript
// Primary brand usage
<View className="bg-kumbhblue-600 p-6">
  <Text className="text-white text-2xl font-bold">
    Kumbh Rakshak
  </Text>
</View>

// Light background usage
<View className="bg-kumbhblue-50 flex-1">
  <Text className="text-kumbhblue-700">
    Content text
  </Text>
</View>

// Emergency colors
<TouchableOpacity className="bg-emergency-red p-4 rounded-xl">
  <Text className="text-white font-bold">Emergency Button</Text>
</TouchableOpacity>
```

#### Color Semantic Meaning / रंग का अर्थ
```css
/* User Interface Colors */
kumbhblue-50:  Main background color
kumbhblue-600: Headers and primary buttons
kumbhblue-700: Volunteer interface (authority)

/* Service Type Colors */
red-50:        Emergency services
blue-50:       Information services
green-50:      Success states
orange-50:     Warning states
purple-50:     Special features

/* Status Colors */
emergency-red:    Critical alerts
emergency-orange: Warnings  
emergency-yellow: Cautions
emergency-green:  Success
emergency-blue:   Information
```

### 2. Typography System / टाइपोग्राफी सिस्टम

#### Text Hierarchy / टेक्स्ट पदानुक्रम
```javascript
// Heading levels
<Text className="text-3xl font-bold text-kumbhblue-700">
  Main Title (30px, bold)
</Text>

<Text className="text-2xl font-bold text-kumbhblue-600">
  Section Header (24px, bold)
</Text>

<Text className="text-xl font-semibold text-gray-800">
  Subsection (20px, semibold)
</Text>

<Text className="text-lg font-medium text-gray-700">
  Body Large (18px, medium)
</Text>

<Text className="text-base text-gray-600">
  Body Text (16px, normal)
</Text>

<Text className="text-sm text-gray-500">
  Small Text (14px, normal)
</Text>

<Text className="text-xs text-gray-400">
  Caption (12px, normal)
</Text>
```

#### Font Weight Usage / फ़ॉन्ट वेट का उपयोग
```css
font-thin:      100 weight (very light)
font-light:     300 weight (light)
font-normal:    400 weight (regular)
font-medium:    500 weight (medium)
font-semibold:  600 weight (semibold)
font-bold:      700 weight (bold)
font-extrabold: 800 weight (extra bold)
font-black:     900 weight (black)
```

### 3. Spacing System / स्पेसिंग सिस्टम

#### Consistent Spacing / सुसंगत स्पेसिंग
```javascript
// Padding system
<View className="p-1">   {/* 4px all sides */}
<View className="p-2">   {/* 8px all sides */}
<View className="p-4">   {/* 16px all sides */}
<View className="p-6">   {/* 24px all sides */}
<View className="p-8">   {/* 32px all sides */}

// Margin system
<View className="m-1">   {/* 4px all sides */}
<View className="m-2">   {/* 8px all sides */}
<View className="m-4">   {/* 16px all sides */}
<View className="m-6">   {/* 24px all sides */}

// Directional spacing
<View className="px-6 py-4">  {/* horizontal 24px, vertical 16px */}
<View className="mt-4 mb-6">  {/* top 16px, bottom 24px */}
```

#### Spacing Scale / स्पेसिंग स्केल
```css
/* Tailwind spacing scale (customized) */
1:  4px   - Minimal spacing
2:  8px   - Small spacing  
3:  12px  - Medium-small spacing
4:  16px  - Medium spacing (most common)
6:  24px  - Large spacing
8:  32px  - Extra large spacing
12: 48px  - Section spacing
16: 64px  - Page spacing
```

### 4. Layout System / लेआउट सिस्टम

#### Flexbox Usage / फ्लेक्सबॉक्स का उपयोग
```javascript
// Common layout patterns
<View className="flex-1">                    {/* Flex grow */}
<View className="flex-row items-center">     {/* Horizontal center */}
<View className="flex-col justify-center">   {/* Vertical center */}
<View className="flex-row justify-between">  {/* Space between */}
<View className="flex-wrap">                 {/* Allow wrapping */}

// Alignment examples
<View className="items-start">     {/* Align start */}
<View className="items-center">    {/* Align center */}
<View className="items-end">       {/* Align end */}
<View className="items-stretch">   {/* Stretch items */}

<View className="justify-start">   {/* Justify start */}
<View className="justify-center">  {/* Justify center */}
<View className="justify-end">     {/* Justify end */}
<View className="justify-between"> {/* Justify between */}
```

#### Grid System / ग्रिड सिस्टम
```javascript
// 2-column grid for services
<View className="flex-row flex-wrap justify-between">
  <View className="w-[48%] mb-4">
    {/* Service card 1 */}
  </View>
  <View className="w-[48%] mb-4">
    {/* Service card 2 */}
  </View>
</View>

// 3-column grid for features
<View className="flex-row justify-between">
  <View className="w-[30%]">{/* Item 1 */}</View>
  <View className="w-[30%]">{/* Item 2 */}</View>
  <View className="w-[30%]">{/* Item 3 */}</View>
</View>
```

### 5. Component Styling Patterns / कंपोनेंट स्टाइलिंग पैटर्न

#### Button Patterns / बटन पैटर्न
```javascript
// Primary button
<TouchableOpacity className="bg-kumbhblue-600 px-6 py-3 rounded-xl shadow-soft">
  <Text className="text-white font-semibold text-center">
    Primary Action
  </Text>
</TouchableOpacity>

// Secondary button  
<TouchableOpacity className="border-2 border-kumbhblue-600 px-6 py-3 rounded-xl">
  <Text className="text-kumbhblue-600 font-semibold text-center">
    Secondary Action
  </Text>
</TouchableOpacity>

// Emergency button
<TouchableOpacity className="bg-red-500 px-6 py-3 rounded-xl shadow-medium">
  <Text className="text-white font-bold text-center">
    Emergency Action
  </Text>
</TouchableOpacity>
```

#### Card Patterns / कार्ड पैटर्न
```javascript
// Standard card
<View className="bg-white rounded-3xl p-6 shadow-soft mb-4">
  <Text className="text-xl font-bold text-kumbhblue-700 mb-2">
    Card Title
  </Text>
  <Text className="text-gray-600">
    Card content goes here
  </Text>
</View>

// Service card
<TouchableOpacity className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 shadow-soft">
  <View className="items-center">
    <FontAwesome6 name="icon" size={32} color="#2563eb" />
    <Text className="text-blue-700 font-bold text-center mt-2">
      Service Name
    </Text>
  </View>
</TouchableOpacity>
```

#### Input Patterns / इनपुट पैटर्न
```javascript
// Standard input
<TextInput 
  className="border-2 border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-white"
  placeholder="Enter text..."
  placeholderTextColor="#9ca3af"
/>

// Focused input
<TextInput 
  className="border-2 border-kumbhblue-500 ring-2 ring-kumbhblue-200 rounded-xl px-4 py-3 text-gray-700 bg-white"
/>

// Error input
<TextInput 
  className="border-2 border-red-500 ring-2 ring-red-200 rounded-xl px-4 py-3 text-gray-700 bg-white"
/>
```

## 🎯 Responsive Design / रेस्पॉन्सिव डिज़ाइन

### 1. Screen Size Adaptations / स्क्रीन साइज़ अनुकूलन

#### Breakpoint System / ब्रेकपॉइंट सिस्टम
```javascript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device size categories
const screenSizes = {
  small: width < 375,   // iPhone SE
  medium: width >= 375 && width < 414,  // iPhone 12
  large: width >= 414,  // iPhone 12 Pro Max
};

// Responsive component
const ResponsiveText = ({ children }) => {
  const fontSize = screenSizes.small ? 'text-sm' : 
                   screenSizes.medium ? 'text-base' : 'text-lg';
  
  return (
    <Text className={fontSize}>
      {children}
    </Text>
  );
};
```

#### Dynamic Styling / डायनामिक स्टाइलिंग
```javascript
// Responsive padding
const getResponsivePadding = () => {
  const { width } = Dimensions.get('window');
  return width < 375 ? 'px-4' : 'px-6';
};

// Responsive grid columns
const getGridColumns = () => {
  const { width } = Dimensions.get('window');
  return width < 375 ? 1 : 2;
};

// Usage in component
<View className={`${getResponsivePadding()} py-4`}>
  {/* Content */}
</View>
```

### 2. Safe Area Handling / सेफ एरिया हैंडलिंग

#### Safe Area Implementation / सेफ एरिया कार्यान्वयन
```javascript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaComponent = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="flex-1 bg-kumbhblue-50"
    >
      {/* Content */}
    </View>
  );
};
```

## 🎨 Animation Integration / एनीमेशन एकीकरण

### 1. CSS Animations / CSS एनीमेशन
```javascript
// Fade in animation
<View className="animate-fade-in">
  <Text>This text fades in</Text>
</View>

// Slide up animation
<View className="animate-slide-up">
  <Text>This slides up from bottom</Text>
</View>

// Gentle bounce
<View className="animate-bounce-gentle">
  <Text>This bounces gently</Text>
</View>
```

### 2. React Native Animated Integration / React Native Animated एकीकरण
```javascript
import { Animated } from 'react-native';

const AnimatedComponent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return (
    <Animated.View 
      style={{ opacity: fadeAnim }}
      className="bg-white p-6 rounded-xl"
    >
      <Text>Animated content</Text>
    </Animated.View>
  );
};
```

## 🎯 Performance Considerations / प्रदर्शन विचारण

### 1. Optimized Styling / अनुकूलित स्टाइलिंग
```javascript
// Efficient class usage - combine related classes
<View className="bg-white rounded-xl p-4 shadow-soft mb-4">
  
// Avoid excessive nesting
<View className="flex-1">
  <View className="p-6">
    <Text className="text-xl font-bold">Title</Text>
  </View>
</View>

// Use StyleSheet for complex styles
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  complexCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  }
});
```

### 2. Bundle Size Optimization / बंडल साइज़ अनुकूलन
```javascript
// Purge unused classes in production
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  // This automatically removes unused styles
  purge: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
};
```

## 🚀 Best Practices / सर्वोत्तम प्रथाएं

### 1. Consistent Naming / सुसंगत नामकरण
```javascript
// Use semantic class names
<View className="emergency-card">        {/* Good */}
<View className="red-bg-round-pad">      {/* Avoid */}

// Follow BEM-like conventions
<View className="card-emergency">
<View className="card-emergency__header">
<View className="card-emergency__content">
```

### 2. Reusable Components / पुन: उपयोग योग्य कंपोनेंट्स
```javascript
// Create styled components
const Card = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-white rounded-xl p-4 shadow-soft',
    emergency: 'bg-red-50 border-2 border-red-200 rounded-xl p-4',
    volunteer: 'bg-kumbhblue-50 border-2 border-kumbhblue-200 rounded-xl p-4'
  };
  
  return (
    <View className={variants[variant]}>
      {children}
    </View>
  );
};

// Usage
<Card variant="emergency">
  <Text>Emergency content</Text>
</Card>
```

### 3. Theme Consistency / थीम स्थिरता
```javascript
// Define theme constants
export const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#1d4ed8',
    emergency: '#dc2626',
    success: '#16a34a',
    warning: '#ea580c',
    info: '#0ea5e9'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  }
};
```

## 🎯 Hackathon Presentation Points / हैकाथॉन प्रेजेंटेशन पॉइंट्स

1. **Modern Styling Architecture** / आधुनिक स्टाइलिंग आर्किटेक्चर
   - TailwindCSS with NativeWind for efficient styling / Efficient styling के लिए TailwindCSS with NativeWind
   - Utility-first approach for rapid development / Rapid development के लिए utility-first approach

2. **Consistent Design System** / सुसंगत डिज़ाइन सिस्टम
   - Custom Kumbh brand color palette / Custom Kumbh brand color palette
   - Semantic color usage for different services / अलग services के लिए semantic color usage

3. **Professional Appearance** / व्यावसायिक दिखावट
   - Glassmorphism effects and shadows / Glassmorphism effects और shadows
   - Consistent typography hierarchy / Consistent typography hierarchy

4. **Responsive Design** / रेस्पॉन्सिव डिज़ाइन
   - Adaptive layouts for different screen sizes / अलग screen sizes के लिए adaptive layouts
   - Safe area handling for modern devices / Modern devices के लिए safe area handling

5. **Performance Optimized** / प्रदर्शन अनुकूलित
   - Efficient class usage / Efficient class usage
   - Purged unused styles / Purged unused styles

6. **Maintainable Codebase** / रखरखाव योग्य कोडबेस
   - Reusable component patterns / Reusable component patterns
   - Organized styling architecture / Organized styling architecture
