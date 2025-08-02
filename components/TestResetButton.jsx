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
            },
          },
        ],
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
        `User Type: ${userType || 'Not set'}\nRegistered: ${isRegistered ? 'Yes' : 'No'}\nVolunteer Logged In: ${isVolunteerLoggedIn ? 'Yes' : 'No'}`,
      );
    } catch (_error) {
      Alert.alert('Error', 'Failed to get app state');
    }
  };

  return (
    <View className="m-4 rounded-lg bg-gray-100 p-4">
      <Text className="mb-3 text-lg font-bold text-gray-800">Developer Tools</Text>

      <TouchableOpacity
        onPress={showCurrentState}
        className="mb-2 flex-row items-center justify-center rounded-lg bg-blue-500 p-3"
        activeOpacity={0.7}>
        <FontAwesome6 name="info-circle" size={16} color="white" className="mr-2" />
        <Text className="ml-2 font-medium text-white">Show Current State</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={resetAppState}
        className="flex-row items-center justify-center rounded-lg bg-red-500 p-3"
        activeOpacity={0.7}>
        <FontAwesome6 name="rotate-right" size={16} color="white" className="mr-2" />
        <Text className="ml-2 font-medium text-white">Reset App State</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestResetButton;
