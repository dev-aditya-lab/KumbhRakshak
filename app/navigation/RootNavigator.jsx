import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* 👇 Tabs are inside the stack */}
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />

      {/* 👇 Any other screen you want outside the tabs */}
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
