# 🌐 Language Switch Component - LanguageSwitch.jsx
*भाषा स्विच कंपोनेंट*

## 🎯 Purpose / उद्देश्य
**English**: LanguageSwitch is a reusable component that allows users to switch between English and Hindi languages throughout the app. It can be disabled during certain states like registration popup.

**Hinglish**: LanguageSwitch ek reusable component hai jo users ko puri app mein English aur Hindi languages ke beech switch karne deta hai. Registration popup jaise certain states ke dauran ise disable kiya ja sakta hai.

## 📊 Code Breakdown / कोड विवरण

### 1. Component Structure / कंपोनेंट संरचना

```javascript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';

export default function LanguageSwitch({ disabled = false }) {
  const { t, i18n } = useTranslation();
```

**English**: 
- `disabled` prop controls if language switching is allowed / Language switching allowed है या नहीं control करता है
- `useTranslation` hook provides translation function and i18n instance / Translation function और i18n instance provide करता है

**Hinglish**:
- `disabled` prop control karta hai ki language switching allowed hai ya nahi
- `useTranslation` hook translation function aur i18n instance provide karta hai

### 2. Language Toggle Logic / भाषा टॉगल लॉजिक

```javascript
const toggleLanguage = () => {
  if (disabled) return; // Don't change language when disabled
  
  const currentLang = i18n.language;
  const newLang = currentLang === 'en' ? 'hi' : 'en';
  i18n.changeLanguage(newLang);
};
```

**English**: 
- **Disabled Check**: Returns early if component is disabled / Component disabled है तो early return करता है
- **Current Language**: Gets the currently active language / Currently active language get करता है
- **Toggle Logic**: Switches between 'en' and 'hi' / 'en' और 'hi' के बीच switch करता है
- **Language Change**: Updates the entire app's language / पूरी app की language update करता है

**Hinglish**:
- **Disabled Check**: Component disabled hai to early return karta hai
- **Current Language**: Currently active language get karta hai
- **Toggle Logic**: 'en' aur 'hi' ke beech switch karta hai
- **Language Change**: Puri app ki language update karta hai

### 3. Visual Design / दृश्य डिज़ाइन

```javascript
return (
  <TouchableOpacity 
    onPress={toggleLanguage}
    disabled={disabled}
    className={`absolute top-14 right-6 rounded-2xl overflow-hidden ${
      disabled 
        ? 'bg-gray-500/30' 
        : 'bg-white/20 backdrop-blur-sm'
    }`}
    activeOpacity={0.8}
  >
    <View className={`px-4 py-3 flex-row items-center border ${
      disabled 
        ? 'border-gray-400/30' 
        : 'border-white/30'
    }`}>
```

**English**: 
- **Positioning**: Absolutely positioned at top-right corner / Top-right corner में absolutely positioned
- **Conditional Styling**: Different appearance when disabled / Disabled होने पर अलग appearance
- **Blur Effect**: Backdrop blur for modern glass effect / Modern glass effect के लिए backdrop blur
- **Transparency**: Semi-transparent background / Semi-transparent background

**Hinglish**:
- **Positioning**: Top-right corner mein absolutely positioned
- **Conditional Styling**: Disabled hone par alag appearance
- **Blur Effect**: Modern glass effect ke liye backdrop blur
- **Transparency**: Semi-transparent background

### 4. Icon Section / आइकन सेक्शन

```javascript
<View className={`p-2 rounded-full mr-3 ${
  disabled 
    ? 'bg-gray-400/30' 
    : 'bg-white/20'
}`}>
  <FontAwesome6 
    name="language" 
    size={18} 
    color={disabled ? '#9CA3AF' : 'white'} 
  />
</View>
```

**English**: 
- **Icon Container**: Circular background for the language icon / Language icon के लिए circular background
- **Dynamic Color**: Gray when disabled, white when active / Disabled में gray, active में white
- **Consistent Size**: 18px icon size for proper visual balance / Proper visual balance के लिए 18px icon size

**Hinglish**:
- **Icon Container**: Language icon ke liye circular background
- **Dynamic Color**: Disabled mein gray, active mein white
- **Consistent Size**: Proper visual balance ke liye 18px icon size

### 5. Text Content / टेक्स्ट सामग्री

```javascript
<View>
  <Text className={`font-bold text-sm ${
    disabled ? 'text-gray-400' : 'text-white'
  }`}>
    {t('language.switch')}
  </Text>
  <Text className={`text-xs ${
    disabled ? 'text-gray-500' : 'text-white/80'
  }`}>
    {t('language.current')}
  </Text>
</View>
```

**English**: 
- **Switch Text**: Shows the language user can switch to / User जिस language पर switch कर सकता है वो दिखाता है
- **Current Text**: Shows currently active language / Currently active language दिखाता है
- **Dynamic Colors**: Different text colors based on disabled state / Disabled state के base पर अलग text colors

**Hinglish**:
- **Switch Text**: User jis language par switch kar sakta hai wo dikhata hai
- **Current Text**: Currently active language dikhata hai
- **Dynamic Colors**: Disabled state ke base par alag text colors

### 6. Chevron Indicator / शेवरॉन संकेतक

```javascript
{!disabled && (
  <View className="ml-2">
    <FontAwesome6 name="chevron-down" size={12} color="white" />
  </View>
)}
```

**English**: 
- **Conditional Rendering**: Only shows when component is not disabled / Component disabled नहीं है तो ही दिखता है
- **Visual Cue**: Indicates that the button is interactive / Button interactive है indicate करता है
- **Small Size**: 12px for subtle visual enhancement / Subtle visual enhancement के लिए 12px

**Hinglish**:
- **Conditional Rendering**: Component disabled nahi hai to hi dikhta hai
- **Visual Cue**: Button interactive hai indicate karta hai
- **Small Size**: Subtle visual enhancement ke liye 12px

## 🌐 Translation System / अनुवाद सिस्टम

### Translation Keys Used / उपयोग की गई अनुवाद कीज़

```javascript
// English (en.json)
"language": {
  "switch": "हिंदी",        // Shows Hindi when current is English
  "current": "English"      // Shows current language
}

// Hindi (hi.json)
"language": {
  "switch": "English",      // Shows English when current is Hindi  
  "current": "हिंदी"        // Shows current language
}
```

**English**: 
- **Switch Text**: Always shows the opposite language / हमेशा opposite language दिखाता है
- **Current Text**: Shows what language is currently active / Currently active language दिखाता है

**Hinglish**:
- **Switch Text**: Hamesha opposite language dikhata hai
- **Current Text**: Currently active language dikhata hai

## 🎨 States and Styles / अवस्थाएं और शैलियां

### Active State / सक्रिय अवस्था
```css
- Background: bg-white/20 backdrop-blur-sm
- Border: border-white/30  
- Text: text-white
- Icon: white color
- Interactive: Shows chevron icon
```

### Disabled State / निष्क्रिय अवस्था
```css
- Background: bg-gray-500/30
- Border: border-gray-400/30
- Text: text-gray-400/text-gray-500
- Icon: #9CA3AF color
- Non-interactive: No chevron icon
```

**English**: Visual feedback clearly shows when language switching is available or disabled
**Hinglish**: Visual feedback clearly dikhata hai ki language switching available hai ya disabled hai

## 🔄 Usage Examples / उपयोग उदाहरण

### 1. Normal Usage / सामान्य उपयोग
```jsx
<LanguageSwitch />
// or
<LanguageSwitch disabled={false} />
```

### 2. Disabled During Registration / पंजीकरण के दौरान निष्क्रिय
```jsx
<LanguageSwitch disabled={true} />
```

### 3. Conditional Disabling / सशर्त निष्क्रियकरण
```jsx
<LanguageSwitch disabled={isRegistrationModalOpen} />
```

## 🚀 Key Features / मुख्य विशेषताएं

### ✅ Smooth Language Switching / चिकनी भाषा अदला-बदली
- Instant language change throughout app / पूरी app में instant language change
- No page reload required / Page reload की जरूरत नहीं

### ✅ Visual State Management / दृश्य स्थिति प्रबंधन
- Clear visual feedback for enabled/disabled states / Enabled/disabled states के लिए clear visual feedback
- Consistent design with app theme / App theme के साथ consistent design

### ✅ Accessibility / पहुंच
- Touch-friendly size / Touch-friendly size
- High contrast in both states / दोनों states में high contrast
- Clear visual hierarchy / Clear visual hierarchy

### ✅ Reusable Component / पुन: उपयोग योग्य कंपोनेंट
- Can be used anywhere in the app / App में कहीं भी use किया जा सकता है
- Configurable disabled state / Configurable disabled state

## 📱 Responsive Design / प्रतिक्रियाशील डिज़ाइन

### Positioning / स्थिति निर्धारण
```css
absolute top-14 right-6
```
- **Fixed Position**: Always in top-right corner / हमेशा top-right corner में
- **Safe Area**: Positioned below status bar / Status bar के नीचे positioned
- **Margin**: 24px from right edge / Right edge से 24px margin

### Touch Target / स्पर्श लक्ष्य
```css
px-4 py-3  // 16px horizontal, 12px vertical padding
```
- **Adequate Size**: Easy to tap on mobile devices / Mobile devices पर आसानी से tap करने योग्य
- **Comfortable Spacing**: Not too cramped / ज्यादा cramped नहीं

## 🎯 Hackathon Presentation Points / हैकाथॉन प्रेजेंटेशन पॉइंट्स

1. **Instant Multilingual Support** / तत्काल बहुभाषी समर्थन
   - Switch languages anywhere in the app / App में कहीं भी भाषा बदलें
   - Real-time translation without reload / Reload के बिना real-time translation

2. **Smart State Management** / स्मार्ट स्थिति प्रबंधन
   - Automatically disables during critical flows / Critical flows के दौरान automatically disable हो जाता है
   - Visual feedback for user clarity / User clarity के लिए visual feedback

3. **Modern UI Design** / आधुनिक UI डिज़ाइन
   - Glassmorphism effect with backdrop blur / Backdrop blur के साथ glassmorphism effect
   - Consistent with app's design language / App की design language के साथ consistent

4. **User Experience Excellence** / उपयोगकर्ता अनुभव उत्कृष्टता
   - Always accessible but contextually appropriate / हमेशा accessible लेकिन contextually appropriate
   - Clear indication of current and target language / Current और target language का clear indication

## 🔧 Integration / एकीकरण

### How to Integrate / कैसे integrate करें

1. **Import the component** / Component को import करें
```javascript
import LanguageSwitch from '../components/LanguageSwitch';
```

2. **Use in any screen** / किसी भी screen में use करें  
```jsx
<View>
  {/* Your content */}
  <LanguageSwitch disabled={someCondition} />
</View>
```

3. **Pass disabled prop when needed** / जरूरत होने पर disabled prop pass करें
```javascript
const [isModalOpen, setIsModalOpen] = useState(false);

<LanguageSwitch disabled={isModalOpen} />
```
