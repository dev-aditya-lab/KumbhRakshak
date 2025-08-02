import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../../utils/UserStorage';
import '../../global.css';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await UserStorage.getUserData();
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert('Clear Data', 'This will clear all your stored data. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await UserStorage.clearUserData();
          Alert.alert('Success', 'Data cleared successfully. Restart the app to register again.');
        },
      },
    ]);
  };

  const profileOptions = [
    {
      icon: 'user-pen',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      action: () => {},
    },
    {
      icon: 'bell',
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      action: () => {},
    },
    {
      icon: 'shield-halved',
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      action: () => {},
    },
    {
      icon: 'headset',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      action: () => {},
    },
    {
      icon: 'cog',
      title: 'Settings',
      subtitle: 'App preferences and configurations',
      action: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar barStyle="light-content" backgroundColor="#EA580C" />
      
      {/* Header */}
      <View style={{
        backgroundColor: '#EA580C',
        paddingHorizontal: 24,
        paddingVertical: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            marginRight: 16,
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <FontAwesome6 name="user-circle" size={28} color="white" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 32,
              fontWeight: '900',
              color: 'white',
              marginBottom: 4,
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}>
              Profile
            </Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#FED7AA',
              textShadowColor: 'rgba(0, 0, 0, 0.2)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}>
              Manage your account & preferences
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1, backgroundColor: '#F8FAFC' }} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, paddingBottom: 32 }}
      >
        {/* User Info Card */}
        <View style={{
          marginBottom: 32,
          borderRadius: 16,
          backgroundColor: 'white',
          padding: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}>
          <View style={{ alignItems: 'center' }}>
            {/* Avatar */}
            <View style={{
              marginBottom: 24,
              height: 128,
              width: 128,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 64,
              borderWidth: 4,
              borderColor: '#FED7AA',
              backgroundColor: '#EA580C',
              shadowColor: '#EA580C',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}>
              <FontAwesome6 name="user" size={42} color="white" />
            </View>

            {/* User Details */}
            {userData ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  marginBottom: 8,
                  fontSize: 32,
                  fontWeight: '900',
                  color: '#111827',
                }}>
                  {userData.name}
                </Text>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#6B7280',
                  marginBottom: 16,
                }}>
                  {userData.phone}
                </Text>
                <View style={{
                  borderRadius: 24,
                  backgroundColor: '#10B981',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  shadowColor: '#10B981',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 4,
                }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: 'white',
                  }}>
                    ✓ Verified User
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#9CA3AF',
                }}>
                  Loading...
                </Text>
              </View>
            )}
          </View>

          {/* Stats Row */}
          <View style={{
            marginTop: 32,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            paddingTop: 24,
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#3B82F6',
                marginBottom: 4,
              }}>
                0
              </Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#6B7280',
              }}>
                Requests
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#10B981',
                marginBottom: 4,
              }}>
                3
              </Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#6B7280',
              }}>
                Reports
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#7C3AED',
                marginBottom: 4,
              }}>
                5
              </Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#6B7280',
              }}>
                Points
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '900',
                color: '#EA580C',
                marginBottom: 4,
              }}>
                New
              </Text>
              <Text style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#6B7280',
              }}>
                Member
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Options */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{
            marginBottom: 24,
            fontSize: 24,
            fontWeight: '900',
            color: '#111827',
          }}>
            Account Options
          </Text>

          <View style={{
            borderRadius: 16,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            {profileOptions.map((option, index) => (
              <View key={index}>
                <TouchableOpacity 
                  onPress={option.action} 
                  style={{ padding: 20 }} 
                  activeOpacity={0.7}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      marginRight: 16,
                      height: 48,
                      width: 48,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 16,
                      backgroundColor: '#F3F4F6',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 2,
                    }}>
                      <FontAwesome6 name={option.icon} size={20} color="#4B5563" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{
                        marginBottom: 4,
                        fontSize: 18,
                        fontWeight: '900',
                        color: '#111827',
                      }}>
                        {option.title}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#6B7280',
                      }}>
                        {option.subtitle}
                      </Text>
                    </View>

                    <View style={{
                      borderRadius: 24,
                      backgroundColor: '#F3F4F6',
                      padding: 12,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 1,
                    }}>
                      <FontAwesome6 name="chevron-right" size={16} color="#6B7280" />
                    </View>
                  </View>
                </TouchableOpacity>
                {index < profileOptions.length - 1 && (
                  <View style={{
                    marginLeft: 80,
                    height: 1,
                    backgroundColor: '#F3F4F6',
                  }} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            borderRadius: 16,
            backgroundColor: 'white',
            padding: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <Text style={{
              marginBottom: 24,
              fontSize: 20,
              fontWeight: '900',
              color: '#111827',
            }}>
              App Information
            </Text>

            <View style={{ gap: 20 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#6B7280',
                }}>
                  Version
                </Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '900',
                  color: '#111827',
                }}>
                  1.0.0
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#6B7280',
                }}>
                  Last Updated
                </Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '900',
                  color: '#111827',
                }}>
                  August 2025
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#6B7280',
                }}>
                  Build
                </Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '900',
                  color: '#111827',
                }}>
                  1.0.0 (1)
                </Text>
              </View>
            </View>

            {/* Debug Clear Data Button */}
            {__DEV__ && (
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  marginTop: 24,
                  borderTopWidth: 1,
                  borderTopColor: '#F3F4F6',
                  paddingTop: 16,
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  backgroundColor: '#FEF2F2',
                  borderWidth: 1,
                  borderColor: '#FECACA',
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}>
                  <FontAwesome6 name="trash" size={18} color="#DC2626" />
                  <Text style={{
                    marginLeft: 12,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#DC2626',
                  }}>
                    Clear All Data (Debug)
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
