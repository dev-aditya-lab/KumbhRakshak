import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/ApiService';

const USER_STORAGE_KEY = 'userRegistration';
const USER_TYPE_KEY = 'userType';
const VOLUNTEER_LOGIN_KEY = 'volunteerLogin';

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

  // Save user registration data
  async saveUserData(userData) {
    try {
      const dataToSave = {
        ...userData,
        isRegistered: true,
        registrationDate: new Date().toISOString(),
      };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
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

  // User Type Management
  async setUserType(userType) {
    try {
      await AsyncStorage.setItem(USER_TYPE_KEY, userType);
      return true;
    } catch (error) {
      console.error('Error setting user type:', error);
      return false;
    }
  },

  async getUserType() {
    try {
      const userType = await AsyncStorage.getItem(USER_TYPE_KEY);
      return userType;
    } catch (error) {
      console.error('Error getting user type:', error);
      return null;
    }
  },

  // Volunteer Login Management
  async setVolunteerLoginData(volunteerData) {
    try {
      const loginData = {
        ...volunteerData,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };
      await AsyncStorage.setItem(VOLUNTEER_LOGIN_KEY, JSON.stringify(loginData));
      return true;
    } catch (error) {
      console.error('Error setting volunteer login data:', error);
      return false;
    }
  },

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
  },

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
  },

  async logoutVolunteer() {
    try {
      await AsyncStorage.removeItem(VOLUNTEER_LOGIN_KEY);
      return true;
    } catch (error) {
      console.error('Error logging out volunteer:', error);
      return false;
    }
  },

  // Clear all data (for testing purposes)
  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([USER_STORAGE_KEY, USER_TYPE_KEY, VOLUNTEER_LOGIN_KEY]);
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  },

  // Send user data to server using Node.js + MongoDB backend
  async sendToServer(userData) {
    try {
      console.log('Sending user data to server:', userData);

      // Call our Node.js API to register user
      const response = await apiService.registerUser(userData);

      console.log('User data sent to server successfully:', response);
      return { success: true, data: response };
    } catch (error) {
      console.error('Failed to send user data to server:', error);

      // For development, we'll still allow offline storage
      return {
        success: false,
        error: error.message,
        offlineMode: true,
      };
    }
  },
};
