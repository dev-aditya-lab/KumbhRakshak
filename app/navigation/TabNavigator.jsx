import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? '#60a5fa' : '#9CA3AF'; // Orange when focused, gray when not
          
          if (route.name === 'Home') iconName = focused ? 'house' : 'house';
          else if (route.name === 'Emergency')
            iconName = focused ? 'truck-medical' : 'truck-medical';
          else if (route.name === 'Profile') iconName = focused ? 'user' : 'user';
          else if (route.name === 'Settings') iconName = focused ? 'gear' : 'gear';

          return (
            <View className="items-center justify-center">
              <FontAwesome6
                name={iconName}
                size={focused ? size + 2 : size}
                color={iconColor}
                style={{
                  marginTop: focused ? -2 : 0,
                }}
              />
              {focused && (
                <View 
                  className="mt-1.5 h-1 w-6 rounded-full bg-orange-600"
                  style={{
                    shadowColor: '#EA580C',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 2,
                  }} />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#EA580C',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          elevation: 20,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 75,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          tabBarLabel: 'Emergency',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
