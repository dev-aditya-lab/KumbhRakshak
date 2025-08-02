import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserStorage } from '../utils/UserStorage';
import '../global.css';

export default function RegistrationModal({ visible, onComplete }) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setPhoneError('');

    // Validate name
    if (!name.trim()) {
      setNameError(t('registration.required_field'));
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    if (!phone.trim()) {
      setPhoneError(t('registration.required_field'));
      isValid = false;
    } else if (!phoneRegex.test(phone.trim())) {
      setPhoneError(t('registration.invalid_phone'));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Store user data using UserStorage
      const userData = {
        name: name.trim(),
        phone: phone.trim(),
        userType: 'user',
        registrationDate: new Date().toISOString(),
      };

      // Save locally first
      await UserStorage.saveUserData(userData);

      // Try to send to server (Node.js + MongoDB backend)
      const serverResponse = await UserStorage.sendToServer(userData);

      setIsSubmitting(false);

      if (serverResponse.success) {
        Alert.alert(
          '🎉 ' + t('registration.registration_success'),
          t('registration.server_sync_success'),
          [{ text: 'OK', onPress: onComplete }],
        );
      } else if (serverResponse.offlineMode) {
        Alert.alert(
          '🎉 ' + t('registration.registration_success'),
          t('registration.offline_mode'),
          [{ text: 'OK', onPress: onComplete }],
        );
      } else {
        Alert.alert(
          '⚠️ ' + t('registration.partial_success'),
          t('registration.server_sync_failed'),
          [{ text: 'OK', onPress: onComplete }],
        );
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Registration error:', error);
      Alert.alert(t('registration.error'), t('registration.registration_failed'));
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 bg-black/60">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center px-4">
          <Animated.View
            style={{ opacity: fadeAnim }}
            className="max-h-[85%] overflow-hidden rounded-3xl bg-gray-50">
            {/* Simplified Header */}
            <View className="relative bg-kumbhblue-600 px-6 py-6">
              {/* Language Toggle Button */}
              <TouchableOpacity
                onPress={toggleLanguage}
                className="absolute right-4 top-4 flex-row items-center rounded-full bg-white/20 px-3 py-2"
                activeOpacity={0.8}>
                <FontAwesome6 name="language" size={16} color="white" />
                <Text className="ml-2 text-sm font-medium text-white">
                  {i18n.language === 'en' ? 'हिंदी' : 'English'}
                </Text>
              </TouchableOpacity>

              <View className="mt-4 items-center">
                <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <FontAwesome6 name="user-plus" size={28} color="white" />
                </View>
                <Text className="text-center text-2xl font-bold text-white">
                  {t('registration.welcome')}
                </Text>
                <Text className="mt-2 text-center leading-5 text-white/90">
                  {t('registration.subtitle')}
                </Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="p-6">
                {/* Name Input */}
                <View className="mb-5">
                  <Text className="mb-3 text-base font-semibold text-gray-800">
                    {t('registration.name_label')} *
                  </Text>
                  <View
                    className={`rounded-xl border-2 px-4 py-4 ${nameError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                    <TextInput
                      value={name}
                      onChangeText={(text) => {
                        setName(text);
                        if (nameError) setNameError('');
                      }}
                      placeholder={t('registration.name_placeholder')}
                      placeholderTextColor="#9CA3AF"
                      className="text-base text-gray-900"
                      autoCapitalize="words"
                    />
                  </View>
                  {nameError ? (
                    <View className="mt-2 flex-row items-center">
                      <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
                      <Text className="ml-2 text-sm font-medium text-red-600">{nameError}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Phone Input */}
                <View className="mb-5">
                  <Text className="mb-3 text-base font-semibold text-gray-800">
                    {t('registration.phone_label')} *
                  </Text>
                  <View
                    className={`rounded-xl border-2 px-4 py-4 ${phoneError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                    <TextInput
                      value={phone}
                      onChangeText={(text) => {
                        // Only allow numbers and limit to 10 digits
                        const numericText = text.replace(/[^0-9]/g, '').slice(0, 10);
                        setPhone(numericText);
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder={t('registration.phone_placeholder')}
                      placeholderTextColor="#9CA3AF"
                      className="text-base text-gray-900"
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                  {phoneError ? (
                    <View className="mt-2 flex-row items-center">
                      <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
                      <Text className="ml-2 text-sm font-medium text-red-600">{phoneError}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Privacy Notice */}
                <View className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <View className="flex-row items-start">
                    <View className="mr-3 mt-0.5 h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                      <FontAwesome6 name="shield-halved" size={12} color="#3B82F6" />
                    </View>
                    <Text className="flex-1 text-sm font-medium leading-5 text-gray-800">
                      {t('registration.privacy_text')}
                    </Text>
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  className={`items-center rounded-xl px-6 py-4 ${
                    isSubmitting ? 'bg-gray-400' : 'bg-kumbhblue-600'
                  }`}>
                  {isSubmitting ? (
                    <View className="flex-row items-center">
                      <FontAwesome6 name="spinner" size={16} color="white" />
                      <Text className="ml-3 text-base font-bold text-white">Processing...</Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center">
                      <FontAwesome6 name="rocket" size={16} color="white" />
                      <Text className="ml-3 text-base font-bold text-white">
                        {t('registration.submit_button')}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
