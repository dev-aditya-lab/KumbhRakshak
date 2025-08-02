import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../../global.css';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const settingsGroups = [
    {
      title: 'General Preferences',
      items: [
        {
          icon: 'bell',
          title: 'Push Notifications',
          subtitle: 'Receive alerts and updates',
          type: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: 'location-dot',
          title: 'Location Services',
          subtitle: 'Allow location access for better service',
          type: 'toggle',
          value: locationEnabled,
          onToggle: setLocationEnabled,
        },
        {
          icon: 'globe',
          title: 'Language',
          subtitle: 'Change app language',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: 'shield-halved',
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'file-contract',
          title: 'Terms of Service',
          subtitle: 'View terms and conditions',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'user-shield',
          title: 'Data & Privacy',
          subtitle: 'Manage your data preferences',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'headset',
          title: 'Help Center',
          subtitle: 'Get help and support',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'bug',
          title: 'Report a Bug',
          subtitle: 'Help us improve the app',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: 'star',
          title: 'Rate the App',
          subtitle: 'Rate us on the app store',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header - Professional redesign with better contrast */}
      <View 
        className="bg-blue-600 px-6 py-8"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }}>
        <View className="flex-row items-center mb-3">
          <View 
            className="mr-4 rounded-2xl bg-white/20 p-3"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <FontAwesome6 name="gear" size={26} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-3xl font-black text-white">Settings</Text>
            <Text className="mt-1 text-lg font-semibold text-white/90">
              Customize your experience
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} className="mb-8">
            <View className="mb-4 flex-row items-center">
              <Text className="text-xl font-black text-gray-900">{group.title}</Text>
            </View>

            <View 
              className="rounded-2xl border border-gray-100 bg-white"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}>
              {group.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    className="p-5"
                    activeOpacity={item.type === 'toggle' ? 1 : 0.7}>
                    <View className="flex-row items-center">
                      <View 
                        className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200"
                        style={{
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1,
                          shadowRadius: 3,
                          elevation: 2,
                        }}>
                        <FontAwesome6 name={item.icon} size={20} color="#2563EB" />
                      </View>

                      <View className="flex-1">
                        <Text className="mb-1 text-lg font-black text-gray-900">{item.title}</Text>
                        <Text className="text-sm font-semibold text-gray-600">{item.subtitle}</Text>
                      </View>

                      {item.type === 'toggle' ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                          thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        />
                      ) : (
                        <View 
                          className="rounded-full bg-gray-100 p-2.5"
                          style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                            elevation: 2,
                          }}>
                          <FontAwesome6 name="chevron-right" size={16} color="#4B5563" />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  {itemIndex < group.items.length - 1 && (
                    <View className="ml-20 h-px bg-gray-200" />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Information Footer - Redesigned */}
        <View className="mb-8 mt-6">
          {/* Main App Info Card */}
          <View 
            className="rounded-2xl bg-kumbhblue-300/50 border border-gray-100"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
            }}>
            
            {/* Orange Gradient Header */}
            <View 
              className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 rounded-t-2xl"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}>
              <View className="items-center">
                <View 
                  className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-white/20"
                  style={{
                    shadowColor: 'red',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    elevation: 4,
                  }}>
                  <FontAwesome6 name="shield-heart" size={24} color="red" />
                </View>
                <Text className="text-2xl font-black text-white tracking-wide">KumbhRakshak</Text>
                <Text className="mt-1 text-center text-sm font-semibold text-white/90 px-4">
                  Smart Health & Safety for Mahakumbh 2028
                </Text>
              </View>
            </View>

            {/* App Details Section */}
            <View className="px-6 py-5">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <FontAwesome6 name="mobile-screen" size={18} color="#F97316" />
                  <Text className="ml-3 text-base font-bold text-gray-900">App Version</Text>
                </View>
                <View className="bg-orange-100 px-3 py-1.5 rounded-full">
                  <Text className="text-sm font-bold text-orange-600">v1.0.0</Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <FontAwesome6 name="calendar-days" size={18} color="#F97316" />
                  <Text className="ml-3 text-base font-bold text-gray-900">Release Date</Text>
                </View>
                <Text className="text-sm font-semibold text-gray-600">{new Date().toLocaleDateString('en-US', { month: 'long' })} {new Date().getFullYear()}</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <FontAwesome6 name="code" size={18} color="#F97316" />
                  <Text className="ml-3 text-base font-bold text-gray-900">Build</Text>
                </View>
                <Text className="text-sm font-semibold text-gray-600">Production</Text>
              </View>
            </View>

            {/* Divider */}
            <View className="mx-6 h-px bg-gray-200" />

            {/* Copyright & Legal Section */}
            <View className="px-6 py-5">
              <View className="items-center">
                <Text className="text-sm font-bold text-gray-900 mb-2">
                  KumbhRakshak © 2025  Ujjain Mahakumbh Hackathon Team Ender Devs
                </Text>
                <Text className="text-xs text-gray-600 text-center leading-5 mb-3">
                  All rights reserved. This application is licensed under proprietary terms.
                </Text>
                
                {/* Developer Info */}
                <View className="bg-gray-50 rounded-xl px-4 py-3 w-full">
                  <View className="flex-row items-center justify-center mb-2">
                    <FontAwesome6 name="user-graduate" size={16} color="#6B7280" />
                    <Text className="ml-2 text-sm font-bold text-gray-700">Developed by</Text>
                  </View>
                  <Text className="text-center text-sm font-semibold text-gray-900">
                    Team Ender Devs
                  </Text>
                  <Text className="text-center text-xs text-gray-600 mt-1">
                    For Ujjain Mahakumbh Hackathon 2025
                  </Text>
                </View>

                {/* Legal Links */}
                <View className="flex-row items-center justify-center mt-4 space-x-6">
                  <TouchableOpacity onPress={() => {}}>
                    <Text className="text-xs font-semibold text-orange-600">Privacy Policy | </Text>
                  </TouchableOpacity>
                  <View className="w-px h-3 bg-gray-300" />
                  <TouchableOpacity onPress={() => {}}>
                    <Text className="text-xs font-semibold text-orange-600">Terms of Use | </Text>
                  </TouchableOpacity>
                  <View className="w-px h-3 bg-gray-300" />
                  <TouchableOpacity onPress={() => {}}>
                    <Text className="text-xs font-semibold text-orange-600">Licenses</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Additional Footer Text */}
          <View className="mt-4 items-center">
            <Text className="text-xs text-gray-500 text-center leading-4">
              Made with ❤️ for the safety and well-being of all Kumbh Mela pilgrims
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}