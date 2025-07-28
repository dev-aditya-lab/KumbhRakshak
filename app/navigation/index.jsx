import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export default function Navigation({ userType }) {
  return (
    <NavigationContainer>
      <RootNavigator userType={userType} />
    </NavigationContainer>
  );
}
