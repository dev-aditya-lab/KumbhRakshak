import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../../utils/UserStorage';

export default function VolunteerScreen() {
  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await UserStorage.logoutVolunteer();
            // The app will automatically redirect to user type selection
            console.log('Volunteer logged out');
          } catch (error) {
            console.error('Error logging out:', error);
          }
        },
      },
    ]);
  };

  const clearAllUserData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will clear ALL user data including:\n• User registration\n• Volunteer login\n• App preferences\n• Stored settings\n\nAre you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await UserStorage.clearAllData();
              await UserStorage.logoutVolunteer();
              console.log('All data cleared - returning to user type selection');
              Alert.alert('Success', 'All data cleared! Returning to login screen.');
            } catch (error) {
              console.error('Error clearing all data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ],
    );
  };

  const volunteerFeatures = [
    {
      id: 'manage-requests',
      title: 'Manage Emergency Requests',
      description: 'View and respond to emergency calls from users',
      icon: 'ambulance',
      color: '#DC2626',
      bgColor: '#FEE2E2',
    },
    {
      id: 'cleanliness-reports',
      title: 'Cleanliness Reports',
      description: 'Review and assign cleanliness issues to teams',
      icon: 'broom',
      color: '#059669',
      bgColor: '#D1FAE5',
    },
    {
      id: 'coordination',
      title: 'Team Coordination',
      description: 'Coordinate with other volunteers and staff',
      icon: 'users',
      color: '#7C3AED',
      bgColor: '#EDE9FE',
    },
    {
      id: 'crowd-management',
      title: 'Crowd Management',
      description: 'Monitor crowd density and manage flow',
      icon: 'people-group',
      color: '#EA580C',
      bgColor: '#FED7AA',
    },
    {
      id: 'resource-tracking',
      title: 'Resource Tracking',
      description: 'Track medical supplies and resources',
      icon: 'truck-medical',
      color: '#0891B2',
      bgColor: '#CFFAFE',
    },
    {
      id: 'generate-reports',
      title: 'Generate Reports',
      description: 'Create daily activity and status reports',
      icon: 'file-lines',
      color: '#9333EA',
      bgColor: '#F3E8FF',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Emergency call resolved',
      time: '2 min ago',
      icon: 'circle-check',
      color: '#10B981',
    },
    {
      id: 2,
      title: 'Cleanliness report assigned',
      time: '15 min ago',
      icon: 'clipboard-check',
      color: '#3B82F6',
    },
    {
      id: 3,
      title: 'Team coordination meeting',
      time: '1 hour ago',
      icon: 'users',
      color: '#8B5CF6',
    },
  ];

  const quickStats = [
    { label: 'Active Requests', value: '12', color: '#DC2626' },
    { label: 'Tasks Completed', value: '8', color: '#059669' },
    { label: 'Team Members', value: '5', color: '#7C3AED' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header - Professional redesign with better contrast */}
      <View 
        className="bg-orange-600 px-6 pb-8 pt-12"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-black text-white">
              Volunteer Portal
            </Text>
            <Text className="mt-2 text-lg font-semibold text-white/90">
              Ready to serve at Mahakumbh 2028
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center rounded-full border border-white/30 bg-white/20 px-5 py-3"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
            }}
            activeOpacity={0.7}>
            <FontAwesome6 name="sign-out-alt" size={18} color="white" />
            <Text className="ml-3 font-bold text-white">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Quick Stats */}
        <View className="px-6 py-6">
          <View className="mb-5 flex-row items-center">
            <View 
              className="mr-3 rounded-full bg-gray-600 p-2.5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <FontAwesome6 name="chart-line" size={16} color="white" />
            </View>
            <Text className="text-xl font-extrabold text-gray-900">Quick Stats</Text>
          </View>
          <View className="flex-row justify-between">
            {quickStats.map((stat, index) => (
              <View
                key={index}
                className="mx-1 flex-1 rounded-2xl bg-white border border-gray-200 p-5"
                style={{ 
                  borderTopWidth: 4, 
                  borderTopColor: stat.color,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}>
                <Text className="text-3xl font-extrabold" style={{ color: stat.color }}>
                  {stat.value}
                </Text>
                <Text className="mt-2 text-sm font-bold text-gray-700">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Volunteer Tools */}
        <View className="px-6 py-2">
          <View className="mb-5 flex-row items-center">
            <View 
              className="mr-3 rounded-full bg-gray-600 p-2.5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <FontAwesome6 name="tools" size={16} color="white" />
            </View>
            <Text className="text-xl font-extrabold text-gray-900">Volunteer Tools</Text>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {volunteerFeatures.map((feature, index) => (
              <TouchableOpacity
                key={feature.id}
                className="mb-4 w-[48%] rounded-2xl border border-gray-100 bg-white p-5"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
                activeOpacity={0.8}>
                <View
                  className="mb-4 h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ 
                    backgroundColor: feature.bgColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    elevation: 4,
                  }}>
                  <FontAwesome6 name={feature.icon} size={22} color={feature.color} />
                </View>
                <Text className="mb-3 text-base font-extrabold text-gray-900">{feature.title}</Text>
                <Text className="text-sm font-semibold leading-5 text-gray-700">
                  {feature.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 py-2 pb-8">
          <View className="mb-5 flex-row items-center">
            <View 
              className="mr-3 rounded-full bg-gray-600 p-2.5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <FontAwesome6 name="clock-rotate-left" size={16} color="white" />
            </View>
            <Text className="text-xl font-extrabold text-gray-900">Recent Activity</Text>
          </View>
          <View 
            className="rounded-2xl border border-gray-100 bg-white p-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            {recentActivities.map((activity, index) => (
              <View key={activity.id}>
                <View className="flex-row items-center py-4">
                  <View
                    className="mr-4 h-12 w-12 items-center justify-center rounded-full"
                    style={{ 
                      backgroundColor: `${activity.color}20`,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}>
                    <FontAwesome6 name={activity.icon} size={18} color={activity.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900">{activity.title}</Text>
                    <Text className="mt-1 text-sm font-semibold text-gray-600">
                      {activity.time}
                    </Text>
                  </View>
                  <View 
                    className="rounded-full bg-gray-100 p-2"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 2,
                    }}>
                    <FontAwesome6 name="chevron-right" size={14} color="#6B7280" />
                  </View>
                </View>
                {index < recentActivities.length - 1 && <View className="ml-16 h-px bg-gray-200" />}
              </View>
            ))}
          </View>
        </View>

        {/* Developer Mode Section - Remove in production */}
        <View className="px-6 pb-8">
          <View 
            className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <View className="mb-4 flex-row items-center">
              <View 
                className="mr-3 rounded-full bg-orange-600 p-2.5"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 3,
                }}>
                <FontAwesome6 name="code" size={16} color="white" />
              </View>
              <Text className="text-lg font-bold text-orange-800">Developer Mode</Text>
            </View>

            <TouchableOpacity
              onPress={clearAllUserData}
              className="rounded-lg bg-red-500 p-3"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 4,
              }}
              activeOpacity={0.8}>
              <View className="flex-row items-center justify-center">
                <FontAwesome6 name="trash" size={16} color="white" />
                <Text className="ml-2 font-medium text-white">
                  Clear ALL Data & Return to Login
                </Text>
              </View>
            </TouchableOpacity>

            <Text className="mt-3 text-xs text-orange-700">
              This button is for development only and will be removed in production.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
