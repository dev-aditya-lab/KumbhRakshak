# 📱 App.js - Main Application Component
*मुख्य एप्लिकेशन कंपोनेंट*

## 🎯 Purpose / उद्देश्य
**English**: App.js is the entry point of our React Native application. It manages the overall app state and decides which screens to show based on user authentication.

**Hinglish**: App.js hamari React Native application ka entry point hai. Ye overall app state ko manage karta hai aur user authentication ke basis pe decide karta hai ki konsa screen dikhana hai.

## 📊 Code Breakdown / कोड विवरण

### 1. Imports / इम्पोर्ट्स
```javascript
import { useEffect, useState } from 'react';
import Navigation from './app/navigation';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import './i18n'; // Initialize i18n
import RegistrationModal from './components/RegistrationModal';
import UserTypeModal from './components/UserTypeModal';
import VolunteerLoginModal from './components/VolunteerLoginModal';
import { UserStorage } from './utils/UserStorage';
import { RegistrationContext } from './context/RegistrationContext.js';
```

**English**: We import all necessary dependencies:
- React hooks for state management
- Navigation component for app navigation
- StatusBar for controlling status bar appearance
- CSS file for global styles
- i18n for language support
- Modal components for different user flows
- UserStorage for data persistence
- Context for state sharing

**Hinglish**: Hum saare zaroori dependencies import kar rahe hain:
- State management ke liye React hooks
- App navigation ke liye Navigation component
- Status bar control ke liye StatusBar
- Global styles ke liye CSS file
- Language support ke liye i18n
- Different user flows ke liye Modal components
- Data persistence ke liye UserStorage
- State sharing ke liye Context

### 2. State Variables / स्टेट वेरिएबल्स
```javascript
export default function App() {
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showVolunteerLogin, setShowVolunteerLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);
```

**English**: State variables control which modals to display:
- `showUserTypeSelection`: Shows the user type selection modal
- `showRegistration`: Shows the registration modal for regular users
- `showVolunteerLogin`: Shows the login modal for volunteers
- `isLoading`: Shows loading state while checking user status
- `userType`: Stores the user type ('user' or 'volunteer')

**Hinglish**: State variables control karte hain ki konsa modal dikhana hai:
- `showUserTypeSelection`: User type selection modal dikhaata hai
- `showRegistration`: Regular users ke liye registration modal dikhaata hai
- `showVolunteerLogin`: Volunteers ke liye login modal dikhaata hai
- `isLoading`: User status check karte waqt loading state dikhaata hai
- `userType`: User type store karta hai ('user' ya 'volunteer')

### 3. App Initialization / ऐप इनिशियलाइज़ेशन
```javascript
useEffect(() => {
  checkUserStatus();
}, []);
```

**English**: When the app starts, we immediately check the user's status to determine what to show.

**Hinglish**: Jab app start hota hai, hum turant user ka status check karte hain ki kya dikhana hai.

### 4. User Status Check / उपयोगकर्ता स्थिति जांच
```javascript
const checkUserStatus = async () => {
  try {
    const isRegistered = await UserStorage.isUserRegistered();
    const savedUserType = await UserStorage.getUserType();
    
    if (!savedUserType) {
      // First time user - show user type selection
      setShowUserTypeSelection(true);
    } else if (savedUserType === 'user' && !isRegistered) {
      // Regular user but not registered - show registration
      setUserType('user');
      setShowRegistration(true);
    } else if (savedUserType === 'volunteer') {
      // Volunteer - check if logged in
      const isVolunteerLoggedIn = await UserStorage.isVolunteerLoggedIn();
      if (!isVolunteerLoggedIn) {
        setUserType('volunteer');
        setShowVolunteerLogin(true);
      } else {
        setUserType('volunteer');
      }
    } else {
      // Regular user, already registered
      setUserType('user');
    }
  } catch (error) {
    console.error('Error checking user status:', error);
    // Fallback to user type selection
    setShowUserTypeSelection(true);
  } finally {
    setIsLoading(false);
  }
};
```

**English**: This function determines the app flow:
1. Check if user type is saved
2. If no user type → Show user type selection
3. If user type is 'user' but not registered → Show registration
4. If user type is 'volunteer' but not logged in → Show volunteer login
5. Otherwise → Show main app

**Hinglish**: Ye function app flow decide karta hai:
1. Check karta hai ki user type save hai ya nahi
2. Agar koi user type nahi → User type selection dikhao
3. Agar user type 'user' hai lekin registered nahi → Registration dikhao
4. Agar user type 'volunteer' hai lekin logged in nahi → Volunteer login dikhao
5. Warna → Main app dikhao

### 5. User Type Selection Handler / उपयोगकर्ता प्रकार चयन हैंडलर
```javascript
const handleUserTypeSelection = async (selectedType) => {
  try {
    await UserStorage.setUserType(selectedType);
    setUserType(selectedType);
    setShowUserTypeSelection(false);

    if (selectedType === 'user') {
      // Check if user is already registered
      const isRegistered = await UserStorage.isUserRegistered();
      if (!isRegistered) {
        setShowRegistration(true);
      }
    } else if (selectedType === 'volunteer') {
      // Show volunteer login
      setShowVolunteerLogin(true);
    }
  } catch (error) {
    console.error('Error saving user type:', error);
  }
};
```

**English**: When user selects their type:
1. Save the user type to storage
2. Hide the user type selection modal
3. Show appropriate next modal (registration for users, login for volunteers)

**Hinglish**: Jab user apna type select karta hai:
1. User type ko storage mein save karo
2. User type selection modal ko hide karo
3. Appropriate next modal dikhao (users ke liye registration, volunteers ke liye login)

### 6. Registration Completion / पंजीकरण पूर्णता
```javascript
const handleRegistrationComplete = () => {
  setShowRegistration(false);
};
```

**English**: Simple function to hide registration modal when user completes registration.

**Hinglish**: Simple function jo registration modal ko hide kar deta hai jab user registration complete kar leta hai.

### 7. Volunteer Login Success / स्वयंसेवक लॉगिन सफलता
```javascript
const handleVolunteerLoginSuccess = async (volunteerData) => {
  try {
    await UserStorage.setVolunteerLoginData(volunteerData);
    setShowVolunteerLogin(false);
  } catch (error) {
    console.error('Error saving volunteer login data:', error);
  }
};
```

**English**: When volunteer successfully logs in:
1. Save volunteer data to storage
2. Hide the volunteer login modal
3. App will automatically show volunteer dashboard

**Hinglish**: Jab volunteer successfully login ho jata hai:
1. Volunteer data ko storage mein save karo
2. Volunteer login modal ko hide karo
3. App automatically volunteer dashboard dikhayega

### 8. Volunteer Login Close / स्वयंसेवक लॉगिन बंद
```javascript
const handleVolunteerLoginClose = () => {
  setShowVolunteerLogin(false);
  setShowUserTypeSelection(true);
};
```

**English**: When volunteer cancels login, go back to user type selection.

**Hinglish**: Jab volunteer login cancel kar deta hai, to user type selection pe wapas jao.

### 9. Main Render / मुख्य रेंडर
```javascript
if (isLoading) {
  // You can add a splash screen component here
  return null;
}

return (
  <RegistrationContext.Provider value={{ 
    isRegistrationModalOpen: showRegistration, 
    setShowRegistration,
    userType 
  }}>
    <Navigation userType={userType} />
    <StatusBar style="light" />
    
    <UserTypeModal
      visible={showUserTypeSelection}
      onSelectUserType={handleUserTypeSelection}
    />
    
    <RegistrationModal 
      visible={showRegistration}
      onComplete={handleRegistrationComplete}
    />

    <VolunteerLoginModal
      visible={showVolunteerLogin}
      onLoginSuccess={handleVolunteerLoginSuccess}
      onClose={handleVolunteerLoginClose}
    />
  </RegistrationContext.Provider>
);
```

**English**: The main render function:
1. Show loading if app is initializing
2. Provide context to child components
3. Render navigation system
4. Set status bar style
5. Conditionally show modals based on state

**Hinglish**: Main render function:
1. Agar app initialize ho raha hai to loading dikhao
2. Child components ko context provide karo
3. Navigation system ko render karo
4. Status bar style set karo
5. State ke basis pe modals ko conditionally dikhao

## 🔄 App Flow / ऐप फ्लो

```
App Start
    ↓
Check User Status
    ↓
┌─────────────────┐
│ No User Type?   │ → UserTypeModal
└─────────────────┘
    ↓
┌─────────────────┐
│ User Selected?  │ → RegistrationModal → Main App
└─────────────────┘
    ↓
┌─────────────────┐
│ Volunteer?      │ → VolunteerLoginModal → Volunteer Dashboard
└─────────────────┘
```

## 🚀 Key Features / मुख्य विशेषताएं

### ✅ Smart User Detection / स्मार्ट उपयोगकर्ता पहचान
- Remembers user type and login status / उपयोगकर्ता प्रकार और लॉगिन स्थिति याद रखता है
- Automatic flow based on previous choices / पिछली पसंद के आधार पर स्वचालित फ्लो

### ✅ Context Sharing / संदर्भ साझाकरण
- Shares registration state across components / कंपोनेंट्स में पंजीकरण स्थिति साझा करता है
- Provides user type to navigation system / नेवीगेशन सिस्टम को उपयोगकर्ता प्रकार प्रदान करता है

### ✅ Error Handling / त्रुटि प्रबंधन
- Graceful fallback to user type selection / उपयोगकर्ता प्रकार चयन के लिए सुंदर फॉलबैक
- Console logging for debugging / डिबगिंग के लिए कंसोल लॉगिंग

## 🎯 Hackathon Presentation Points / हैकाथॉन प्रेजेंटेशन पॉइंट्स

1. **Smart App Initialization** / स्मार्ट ऐप इनिशियलाइज़ेशन
   - App remembers user preferences / ऐप उपयोगकर्ता प्राथमिकताएं याद रखता है
   - Seamless user experience / निर्बाध उपयोगकर्ता अनुभव

2. **Dual User System** / दोहरा उपयोगकर्ता सिस्टम
   - Regular users and volunteers have different flows / नियमित उपयोगकर्ता और स्वयंसेवकों के अलग फ्लो हैं
   - Role-based access control / भूमिका-आधारित पहुंच नियंत्रण

3. **State Management** / स्टेट प्रबंधन
   - Efficient state handling with React hooks / React hooks के साथ कुशल स्टेट हैंडलिंग
   - Context API for data sharing / डेटा साझाकरण के लिए Context API
