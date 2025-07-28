import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../../utils/UserStorage';

export default function VolunteerScreen() {
  const { t } = useTranslation();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
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
          }
        }
      ]
    );
  };

  const volunteerFeatures = [
    {
      id: 'manage-requests',
      title: 'Manage Emergency Requests',
      description: 'View and respond to emergency calls from users',
      icon: 'ambulance',
      color: '#DC2626',
      bgColor: '#FEE2E2'
    },
    {
      id: 'cleanliness-reports',
      title: 'Cleanliness Reports',
      description: 'Review and assign cleanliness issues to teams',
      icon: 'broom',
      color: '#059669',
      bgColor: '#D1FAE5'
    },
    {
      id: 'coordination',
      title: 'Team Coordination',
      description: 'Coordinate with other volunteers and staff',
      icon: 'users',
      color: '#2563EB',
      bgColor: '#DBEAFE'
    },
    {
      id: 'crowd-management',
      title: 'Crowd Management',
      description: 'Monitor crowd density and manage flow',
      icon: 'people-group',
      color: '#7C2D12',
      bgColor: '#FED7AA'
    },
    {
      id: 'resource-tracking',
      title: 'Resource Tracking',
      description: 'Track medical supplies and equipment',
      icon: 'boxes-stacked',
      color: '#7C3AED',
      bgColor: '#EDE9FE'
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      description: 'Create daily activity and incident reports',
      icon: 'chart-line',
      color: '#EA580C',
      bgColor: '#FED7AA'
    }
  ];

  const handleFeaturePress = (featureId) => {
    Alert.alert(
      'Feature Coming Soon',
      `${featureId} functionality will be available in the next update.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: '#D97706', 
        paddingTop: 48, 
        paddingBottom: 24, 
        paddingHorizontal: 24 
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
              Volunteer Dashboard
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>
              Welcome back, Volunteer!
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            activeOpacity={0.8}
          >
            <FontAwesome6 name="sign-out-alt" size={16} color="white" />
            <Text style={{ color: 'white', marginLeft: 8, fontWeight: '500' }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
      >
        {/* Quick Stats */}
        <View style={{ 
          flexDirection: 'row', 
          marginBottom: 24,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#DC2626' }}>12</Text>
            <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>Active{'\n'}Requests</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#059669' }}>8</Text>
            <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>Tasks{'\n'}Completed</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2563EB' }}>5</Text>
            <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>Team{'\n'}Members</Text>
          </View>
        </View>

        {/* Features Grid */}
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#1F2937', 
          marginBottom: 16 
        }}>
          Volunteer Tools
        </Text>

        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between' 
        }}>
          {volunteerFeatures.map((feature, index) => (
            <TouchableOpacity
              key={feature.id}
              onPress={() => handleFeaturePress(feature.title)}
              style={{
                width: '48%',
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3
              }}
              activeOpacity={0.8}
            >
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: feature.bgColor,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <FontAwesome6 name={feature.icon} size={20} color={feature.color} />
              </View>
              
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: 4,
                lineHeight: 20
              }}>
                {feature.title}
              </Text>
              
              <Text style={{
                fontSize: 12,
                color: '#6B7280',
                lineHeight: 16
              }}>
                {feature.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          marginTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16
          }}>
            Recent Activity
          </Text>

          {[
            { 
              action: 'Emergency call resolved', 
              time: '2 minutes ago', 
              icon: 'check-circle', 
              color: '#059669' 
            },
            { 
              action: 'Cleanliness report assigned', 
              time: '15 minutes ago', 
              icon: 'arrow-right', 
              color: '#2563EB' 
            },
            { 
              action: 'Team coordination meeting', 
              time: '1 hour ago', 
              icon: 'users', 
              color: '#7C2D12' 
            }
          ].map((activity, index) => (
            <View 
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: index < 2 ? 1 : 0,
                borderBottomColor: '#F3F4F6'
              }}
            >
              <View style={{
                width: 32,
                height: 32,
                backgroundColor: `${activity.color}20`,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <FontAwesome6 name={activity.icon} size={14} color={activity.color} />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F2937' }}>
                  {activity.action}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                  {activity.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Info Section */}
        <View style={{
          backgroundColor: '#EFF6FF',
          borderRadius: 12,
          padding: 16,
          marginTop: 24,
          borderWidth: 1,
          borderColor: '#DBEAFE'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <FontAwesome6 name="info-circle" size={16} color="#2563EB" />
            <Text style={{
              color: '#1E40AF',
              fontSize: 14,
              marginLeft: 12,
              lineHeight: 20,
              flex: 1
            }}>
              This is the volunteer dashboard. All features are currently in development and will be connected to the backend admin panel.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
