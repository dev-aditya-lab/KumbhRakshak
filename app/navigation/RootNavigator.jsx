import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import VolunteerScreen from '../screens/VolunteerScreen';
import '../../global.css';

const Stack = createNativeStackNavigator();

export default function RootNavigator({ userType }) {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: userType === 'volunteer' ? '#D97706' : '#204B72',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerShadowVisible: true,
        animation: 'slide_from_right',
      }}
    >
      {userType === 'volunteer' ? (
        <Stack.Screen 
          name="Volunteer" 
          component={VolunteerScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen 
          name="Tabs" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
