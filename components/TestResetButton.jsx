import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { UserStorage } from '../utils/UserStorage';

const TestResetButton = () => {
  const resetAppState = async () => {
    try {
      await UserStorage.clearAllData();
      Alert.alert(
        'Reset Complete', 
        'App state has been reset. Please restart the app to see the user type selection.',
        [
          {
            text: 'OK',
            onPress: () => {
              // In a real app, you might want to restart the app programmatically
              console.log('App state reset');
            }
          }
        ]
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to reset app state');
    }
  };

  const showCurrentState = async () => {
    try {
      const userType = await UserStorage.getUserType();
      const isRegistered = await UserStorage.isUserRegistered();
      const isVolunteerLoggedIn = await UserStorage.isVolunteerLoggedIn();
      
      Alert.alert(
        'Current App State',
        `User Type: ${userType || 'Not set'}\nRegistered: ${isRegistered ? 'Yes' : 'No'}\nVolunteer Logged In: ${isVolunteerLoggedIn ? 'Yes' : 'No'}`
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to get app state');
    }
  };

  return (
    <View className="p-4 bg-gray-100 m-4 rounded-lg">
      <Text className="text-lg font-bold text-gray-800 mb-3">Developer Tools</Text>
      
      <TouchableOpacity
        onPress={showCurrentState}
        className="bg-blue-500 p-3 rounded-lg mb-2 flex-row items-center justify-center"
        activeOpacity={0.7}
      >
        <FontAwesome6 name="info-circle" size={16} color="white" className="mr-2" />
        <Text className="text-white font-medium ml-2">Show Current State</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={resetAppState}
        className="bg-red-500 p-3 rounded-lg flex-row items-center justify-center"
        activeOpacity={0.7}
      >
        <FontAwesome6 name="rotate-right" size={16} color="white" className="mr-2" />
        <Text className="text-white font-medium ml-2">Reset App State</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestResetButton;
