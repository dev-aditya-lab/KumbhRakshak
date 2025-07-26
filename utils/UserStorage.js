import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = 'userRegistration';

export const UserStorage = {
  // Check if user is already registered
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
  },

  // Get user data
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
  },

  // Clear user data (for testing purposes)
  async clearUserData() {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing user data:', error);
      return false;
    }
  },

  // Send user data to server (placeholder for future implementation)
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
};
