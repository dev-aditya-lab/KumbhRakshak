# 💾 UserStorage.js - Data Management System
*डेटा प्रबंधन सिस्टम*

## 🎯 Purpose / उद्देश्य
**English**: UserStorage.js manages all data persistence in the app using AsyncStorage. It handles user registration data, user types, and volunteer login information.

**Hinglish**: UserStorage.js AsyncStorage use karke app mein saara data persistence manage karta hai. Ye user registration data, user types, aur volunteer login information handle karta hai.

## 📊 Storage Keys / स्टोरेज कीज़

```javascript
const USER_STORAGE_KEY = 'userRegistration';     // User registration data
const USER_TYPE_KEY = 'userType';               // User type (user/volunteer)
const VOLUNTEER_LOGIN_KEY = 'volunteerLogin';   // Volunteer login data
```

**English**: Three main storage keys for different data types
**Hinglish**: Alag data types ke liye teen main storage keys

## 🔧 Functions Breakdown / फ़ंक्शन विवरण

### 1. User Registration Management / उपयोगकर्ता पंजीकरण प्रबंधन

#### Check Registration Status / पंजीकरण स्थिति जांचें
```javascript
async isUserRegistered() {
  try {
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.isRegistered === true;
    }
    return false;
  } catch (error) {
    console.error('Error checking user registration:', error);
    return false;
  }
}
```

**English**: 
- Gets user data from storage / Storage se user data लेता है
- Parses JSON data / JSON data को parse करता है
- Checks if `isRegistered` flag is true / `isRegistered` flag true है या नहीं check करता है
- Returns false if no data or error / अगर data नहीं है या error है तो false return करता है

**Hinglish**:
- Storage se user data leta hai
- JSON data ko parse karta hai
- Check karta hai ki `isRegistered` flag true hai ya nahi
- Agar data nahi hai ya error hai to false return karta hai

#### Get User Data / उपयोगकर्ता डेटा प्राप्त करें
```javascript
async getUserData() {
  try {
    const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}
```

**English**: Retrieves and parses stored user data, returns null if not found
**Hinglish**: Stored user data ko retrieve aur parse karta hai, agar nahi mila to null return karta hai

#### Save User Data / उपयोगकर्ता डेटा सेव करें
```javascript
async saveUserData(userData) {
  try {
    const dataToSave = {
      ...userData,                              // Spread existing data
      isRegistered: true,                       // Mark as registered
      registrationDate: new Date().toISOString() // Add timestamp
    };
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
}
```

**English**: 
- Takes user data as input / User data को input के रूप में लेता है
- Adds registration metadata / Registration metadata add करता है
- Converts to JSON and saves / JSON में convert करके save करता है
- Returns success/failure status / Success/failure status return करता है

**Hinglish**:
- User data ko input ke roop mein leta hai
- Registration metadata add karta hai
- JSON mein convert karke save karta hai
- Success/failure status return karta hai

#### Clear User Data / उपयोगकर्ता डेटा साफ़ करें
```javascript
async clearUserData() {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing user data:', error);
    return false;
  }
}
```

**English**: Removes user registration data from storage
**Hinglish**: Storage se user registration data ko remove kar deta hai

### 2. User Type Management / उपयोगकर्ता प्रकार प्रबंधन

#### Set User Type / उपयोगकर्ता प्रकार सेट करें
```javascript
async setUserType(userType) {
  try {
    await AsyncStorage.setItem(USER_TYPE_KEY, userType);
    return true;
  } catch (error) {
    console.error('Error setting user type:', error);
    return false;
  }
}
```

**English**: Saves user type ('user' or 'volunteer') to storage
**Hinglish**: User type ('user' ya 'volunteer') ko storage mein save karta hai

#### Get User Type / उपयोगकर्ता प्रकार प्राप्त करें
```javascript
async getUserType() {
  try {
    const userType = await AsyncStorage.getItem(USER_TYPE_KEY);
    return userType;
  } catch (error) {
    console.error('Error getting user type:', error);
    return null;
  }
}
```

**English**: Retrieves saved user type from storage
**Hinglish**: Storage se saved user type ko retrieve karta hai

### 3. Volunteer Login Management / स्वयंसेवक लॉगिन प्रबंधन

#### Set Volunteer Login Data / स्वयंसेवक लॉगिन डेटा सेट करें
```javascript
async setVolunteerLoginData(volunteerData) {
  try {
    const loginData = {
      ...volunteerData,                    // Spread volunteer data
      isLoggedIn: true,                   // Mark as logged in
      loginTime: new Date().toISOString() // Add login timestamp
    };
    await AsyncStorage.setItem(VOLUNTEER_LOGIN_KEY, JSON.stringify(loginData));
    return true;
  } catch (error) {
    console.error('Error setting volunteer login data:', error);
    return false;
  }
}
```

**English**: 
- Takes volunteer login data / Volunteer login data लेता है
- Adds login metadata / Login metadata add करता है
- Saves as JSON string / JSON string के रूप में save करता है

**Hinglish**:
- Volunteer login data leta hai
- Login metadata add karta hai
- JSON string ke roop mein save karta hai

#### Check Volunteer Login Status / स्वयंसेवक लॉगिन स्थिति जांचें
```javascript
async isVolunteerLoggedIn() {
  try {
    const volunteerData = await AsyncStorage.getItem(VOLUNTEER_LOGIN_KEY);
    if (volunteerData) {
      const parsed = JSON.parse(volunteerData);
      return parsed.isLoggedIn === true;
    }
    return false;
  } catch (error) {
    console.error('Error checking volunteer login status:', error);
    return false;
  }
}
```

**English**: Checks if volunteer is currently logged in
**Hinglish**: Check karta hai ki volunteer currently logged in hai ya nahi

#### Get Volunteer Data / स्वयंसेवक डेटा प्राप्त करें
```javascript
async getVolunteerData() {
  try {
    const volunteerData = await AsyncStorage.getItem(VOLUNTEER_LOGIN_KEY);
    if (volunteerData) {
      return JSON.parse(volunteerData);
    }
    return null;
  } catch (error) {
    console.error('Error getting volunteer data:', error);
    return null;
  }
}
```

**English**: Retrieves all volunteer login data and details
**Hinglish**: Saara volunteer login data aur details retrieve karta hai

#### Logout Volunteer / स्वयंसेवक लॉगआउट
```javascript
async logoutVolunteer() {
  try {
    await AsyncStorage.removeItem(VOLUNTEER_LOGIN_KEY);
    return true;
  } catch (error) {
    console.error('Error logging out volunteer:', error);
    return false;
  }
}
```

**English**: Removes volunteer login data (logout)
**Hinglish**: Volunteer login data ko remove kar deta hai (logout)

### 4. Utility Functions / उपयोगिता फ़ंक्शन

#### Clear All Data / सभी डेटा साफ़ करें
```javascript
async clearAllData() {
  try {
    await AsyncStorage.multiRemove([USER_STORAGE_KEY, USER_TYPE_KEY, VOLUNTEER_LOGIN_KEY]);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
}
```

**English**: 
- Uses `multiRemove` for efficiency / Efficiency के लिए `multiRemove` use करता है
- Clears all app data at once / एक साथ सारा app data clear कर देता है
- Useful for testing and reset / Testing और reset के लिए useful है

**Hinglish**:
- Efficiency ke liye `multiRemove` use karta hai
- Ek saath saara app data clear kar deta hai
- Testing aur reset ke liye useful hai

#### Send to Server (Placeholder) / सर्वर पर भेजें (प्लेसहोल्डर)
```javascript
async sendToServer(userData) {
  // TODO: Implement server API call
  console.log('Sending user data to server:', userData);
  
  // Placeholder for actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('User data sent to server successfully');
      resolve({ success: true });
    }, 1000);
  });
}
```

**English**: 
- Placeholder for future server integration / भविष्य के server integration के लिए placeholder
- Currently just logs and simulates delay / अभी सिर्फ log करता है और delay simulate करता है
- Will be replaced with actual API calls / असली API calls से replace हो जाएगा

**Hinglish**:
- Future server integration ke liye placeholder
- Abhi sirf log karta hai aur delay simulate karta hai
- Asli API calls se replace ho jayega

## 🗄️ Data Structure Examples / डेटा संरचना उदाहरण

### User Registration Data / उपयोगकर्ता पंजीकरण डेटा
```javascript
{
  "name": "राम शर्मा",
  "phone": "9876543210",
  "isRegistered": true,
  "registrationDate": "2025-07-28T10:30:00.000Z"
}
```

### User Type Data / उपयोगकर्ता प्रकार डेटा
```javascript
"user"  // or "volunteer"
```

### Volunteer Login Data / स्वयंसेवक लॉगिन डेटा
```javascript
{
  "email": "admin@kumbhrakshak.com",
  "userType": "volunteer",
  "isLoggedIn": true,
  "loginTime": "2025-07-28T10:30:00.000Z"
}
```

## 🔒 Error Handling / त्रुटि प्रबंधन

### Try-Catch Pattern / ट्राई-कैच पैटर्न
```javascript
try {
  // AsyncStorage operation
  const data = await AsyncStorage.getItem(key);
  return processData(data);
} catch (error) {
  console.error('Error description:', error);
  return fallbackValue; // Safe fallback
}
```

**English**: 
- Every async operation wrapped in try-catch / हर async operation try-catch में wrapped है
- Console logging for debugging / Debugging के लिए console logging
- Safe fallback values / Safe fallback values

**Hinglish**:
- Har async operation try-catch mein wrapped hai
- Debugging ke liye console logging
- Safe fallback values

## 🚀 Key Features / मुख्य विशेषताएं

### ✅ Robust Data Management / मजबूत डेटा प्रबंधन
- Consistent error handling / Consistent error handling
- JSON serialization / JSON serialization
- Automatic metadata addition / Automatic metadata addition

### ✅ Multiple Data Types / कई डेटा प्रकार
- User registration / उपयोगकर्ता पंजीकरण
- User type selection / उपयोगकर्ता प्रकार चयन
- Volunteer authentication / स्वयंसेवक प्रमाणीकरण

### ✅ Testing Support / टेस्टिंग समर्थन
- Clear all data function / सभी डेटा clear करने का function
- Individual clear functions / व्यक्तिगत clear functions
- Debug-friendly logging / Debug-friendly logging

## 🎯 Hackathon Presentation Points / हैकाथॉन प्रेजेंटेशन पॉइंट्स

1. **Persistent Data Management** / स्थायी डेटा प्रबंधन
   - App remembers user preferences across sessions / Sessions के दौरान user preferences याद रखता है

2. **Role-Based Data Handling** / भूमिका-आधारित डेटा हैंडलिंग
   - Different data structures for different user types / अलग user types के लिए अलग data structures

3. **Error-Resistant Design** / त्रुटि-प्रतिरोधी डिज़ाइन
   - Graceful error handling with fallbacks / Fallbacks के साथ graceful error handling

4. **Future-Ready Architecture** / भविष्य-तैयार आर्किटेक्चर
   - Server integration placeholder ready / Server integration placeholder तैयार है
