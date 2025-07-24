import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-600">Profile</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </SafeAreaView>
  );
}
