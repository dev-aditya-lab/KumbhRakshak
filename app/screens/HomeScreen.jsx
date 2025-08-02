import { ScrollView, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../../utils/UserStorage';
import '../../global.css';
import HelpBtn from '../../components/HelpBtn';
import LanguageSwitch from '../../components/LanguageSwitch';

export default function HomeScreen() {
    const { t } = useTranslation();

    const resetRegistration = async () => {
        try {
            await UserStorage.clearAllData();
            // Force app to restart by reloading the page (for testing purposes)
            // In production, you might want to navigate to user type selection
            console.log('All user data cleared for testing');
        } catch (error) {
            console.error('Error resetting registration:', error);
        }
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
                            Alert.alert('Success', 'All data cleared successfully!');
                        } catch (error) {
                            console.error('Error clearing all data:', error);
                            Alert.alert('Error', 'Failed to clear data');
                        }
                    },
                },
            ],
        );
    };

    return (
        <View className="flex-1 bg-kumbhblue-500">
            {/* Header Section - Modern Light Theme Design */}
            <View
                className="relative  px-6  pt-16 rounded-b-3xl">
                {/* Language Switch - Modern Light Design */}
                <View className="absolute right-6 top-9 z-10">
                    <LanguageSwitch />
                </View>

                { /* App Logo/Icon */}
                <View className="mb-6 mt-4">
                    <View className="mb-4 flex-row items-center">
                        <View
                            className="mr-4 rounded-2xl bg-white/20 p-4">
                            {/* <FontAwesome6 name="shield" size={32} color="orange"  /> */}
                            <Image
                                source={require('../../assets/KumbhRakshak.png')}
                                style={{ width: 40, height: 40 }}
                                className="rounded-lg"
                                resizeMode="contain"
                            />
                        </View>
                        <View className="flex-1 pr-20">
                            <Text className="mb-2 text-3xl font-black text-white">
                                {t('welcome')}
                            </Text>
                            <Text className="text-base font-semibold text-orange-300">
                                {t('tagline')}
                            </Text>
                        </View>
                    </View>

                    {/* Status Indicator - Redesigned with clear visibility */}
                    <View
                        className="mt-4 flex-row items-center rounded-xl bg-white px-4 py-3 border border-green-200"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            elevation: 3,
                        }}>
                        <View
                            className="mr-3 h-3 w-3 rounded-full bg-green-500"
                            style={{
                                shadowColor: '#22C55E',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.4,
                                shadowRadius: 2,
                                elevation: 2,
                            }}
                        />
                        <Text className="flex-1 text-sm font-bold text-gray-800">
                            All services are operational
                        </Text>
                        <View
                            className="rounded-lg bg-green-100 p-2"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.1,
                                shadowRadius: 2,
                                elevation: 1,
                            }}>
                            <FontAwesome6 name="shield" size={16} color="#16A34A" />
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
                {/* Emergency Services Section - Modern Light Card Design */}
                <View className="px-6 pt-6">
                    <View
                        className="mb-6 rounded-2xl bg-white p-6"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}>
                        <View className="mb-6 flex-row items-center">
                            <View
                                className="mr-4 rounded-2xl bg-red-500 p-4"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 4,
                                }}>
                                <FontAwesome6 name="shield-heart" size={24} color="white" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-2xl font-black text-gray-800">{t('emergencyServices')}</Text>
                                <Text className="mt-1 text-sm font-semibold text-gray-600">
                                    Quick access to emergency help
                                </Text>
                            </View>
                        </View>

                        <View className="space-y-4 flex flex-col gap-5">
                            <HelpBtn
                                className="border border-red-200 bg-red-50"
                                translationKey="emergency"
                                icon="video"
                                iconSize={24}
                            />
                            <HelpBtn
                                className="border border-blue-200 bg-blue-50"
                                translationKey="services"
                                icon="map-location-dot"
                                iconSize={24}
                            />
                            <HelpBtn
                                className="border border-green-200 bg-green-50"
                                translationKey="cleanliness"
                                icon="broom"
                                iconSize={24}
                            />
                        </View>
                    </View>
                </View>

                {/* Community Services Section - Modern Light Design */}
                <View className="px-6">
                    <View
                        className="mb-6 rounded-2xl bg-white p-6"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}>
                        <View className="mb-6 flex-row items-center">
                            <View
                                className="mr-4 rounded-2xl bg-orange-500 p-4"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 4,
                                }}>
                                <FontAwesome6 name="users" size={24} color="white" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-2xl font-black text-gray-800">Community Services</Text>
                                <Text className="mt-1 text-sm font-semibold text-gray-600">
                                    Local assistance & information
                                </Text>
                            </View>
                        </View>

                        <View className="space-y-4 flex flex-col gap-5">
                            <HelpBtn
                                className="border border-purple-200 bg-purple-50"
                                translationKey="default"
                                icon="map-location-dot"
                                iconSize={24}
                            />
                            <HelpBtn
                                className="border border-orange-200 bg-orange-50"
                                translationKey="default"
                                icon="utensils"
                                iconSize={24}
                            />
                        </View>
                    </View>
                </View>

                {/* Developer Mode Section - Light Professional Design */}
                <View className="px-6 pb-8">
                    <View
                        className="rounded-2xl border border-gray-200 bg-white p-6"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}>
                        <View className="mb-6 flex-row items-center">
                            <View
                                className="mr-4 rounded-xl bg-gray-600 p-3"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 4,
                                }}>
                                <FontAwesome6 name="code" size={20} color="white" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xl font-black text-gray-800">Developer Tools</Text>
                                <Text className="text-sm font-semibold text-gray-600">Testing & debugging</Text>
                            </View>
                        </View>

                        <View className="space-y-3 flex flex-col gap-5">
                            <TouchableOpacity
                                onPress={resetRegistration}
                                className="rounded-xl bg-blue-500 p-4"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 4,
                                }}
                                activeOpacity={0.8}>
                                <View className="flex-row items-center justify-center">
                                    <FontAwesome6 name="refresh" size={18} color="white" />
                                    <Text className="ml-3 text-base font-bold text-white">Reset Registration</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={clearAllUserData}
                                className="rounded-xl bg-red-500 p-4"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 4,
                                }}
                                activeOpacity={0.8}>
                                <View className="flex-row items-center justify-center">
                                    <FontAwesome6 name="trash" size={18} color="white" />
                                    <Text className="ml-3 text-base font-bold text-white">Clear All Data</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
                            <Text className="text-center text-sm font-bold text-amber-800">
                                ⚠️ Development only - will be removed in production
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
