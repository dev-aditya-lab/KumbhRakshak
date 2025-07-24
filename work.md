```js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-600">Welcome to KumbhRakshak</Text>
      <Button title="Go to Emergency" onPress={() => navigation.navigate('Emergency')} />
    </SafeAreaView>
  );
}
```