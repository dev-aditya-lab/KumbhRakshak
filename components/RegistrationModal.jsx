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
  Animated
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      // Store user data locally
      const userData = {
        name: name.trim(),
        phone: phone.trim(),
        registeredAt: new Date().toISOString(),
        isRegistered: true
      };

      await AsyncStorage.setItem('userRegistration', JSON.stringify(userData));
      
      // TODO: Send to server when backend is ready
      // await sendToServer(userData);
      
      // Simulate API call delay
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          '🎉 ' + t('registration.registration_success'),
          '',
          [{ text: 'OK', onPress: onComplete }]
        );
      }, 1500);
      
    } catch (_error) {
      setIsSubmitting(false);
      Alert.alert('Error', 'Failed to save registration. Please try again.');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View className="flex-1 bg-black/60">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center px-4"
        >
          <Animated.View 
            style={{ opacity: fadeAnim }}
            className="bg-white rounded-3xl overflow-hidden shadow-strong max-h-[85%]"
          >
            {/* Simplified Header */}
            <View className="bg-kumbhblue-600 px-6 py-6 relative">
              {/* Language Toggle Button */}
              <TouchableOpacity 
                onPress={toggleLanguage}
                className="absolute top-4 right-4 bg-white/20 rounded-full px-3 py-2 flex-row items-center"
                activeOpacity={0.8}
              >
                <FontAwesome6 name="language" size={16} color="white" />
                <Text className="text-white text-sm font-medium ml-2">
                  {i18n.language === 'en' ? 'हिंदी' : 'English'}
                </Text>
              </TouchableOpacity>

              <View className="items-center mt-4">
                <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-4">
                  <FontAwesome6 name="user-plus" size={28} color="white" />
                </View>
                <Text className="text-2xl font-bold text-white text-center">
                  {t('registration.welcome')}
                </Text>
                <Text className="text-white/90 text-center mt-2 leading-5">
                  {t('registration.subtitle')}
                </Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="p-6">
                {/* Name Input */}
                <View className="mb-5">
                  <Text className="text-gray-800 font-semibold mb-3 text-base">
                    {t('registration.name_label')} *
                  </Text>
                  <View className={`border-2 rounded-xl px-4 py-4 ${nameError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}>
                    <TextInput
                      value={name}
                      onChangeText={(text) => {
                        setName(text);
                        if (nameError) setNameError('');
                      }}
                      placeholder={t('registration.name_placeholder')}
                      placeholderTextColor="#9CA3AF"
                      className="text-gray-900 text-base"
                      autoCapitalize="words"
                    />
                  </View>
                  {nameError ? (
                    <View className="flex-row items-center mt-2">
                      <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
                      <Text className="text-red-600 text-sm ml-2 font-medium">{nameError}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Phone Input */}
                <View className="mb-5">
                  <Text className="text-gray-800 font-semibold mb-3 text-base">
                    {t('registration.phone_label')} *
                  </Text>
                  <View className={`border-2 rounded-xl px-4 py-4 ${phoneError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}>
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
                      className="text-gray-900 text-base"
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                  {phoneError ? (
                    <View className="flex-row items-center mt-2">
                      <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
                      <Text className="text-red-600 text-sm ml-2 font-medium">{phoneError}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Privacy Notice */}
                <View className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                  <View className="flex-row items-start">
                    <View className="w-6 h-6 bg-blue-500/20 rounded-full items-center justify-center mr-3 mt-0.5">
                      <FontAwesome6 name="shield-halved" size={12} color="#3B82F6" />
                    </View>
                    <Text className="text-gray-800 text-sm leading-5 flex-1 font-medium">
                      {t('registration.privacy_text')}
                    </Text>
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  className={`rounded-xl py-4 px-6 items-center shadow-medium ${
                    isSubmitting ? 'bg-gray-400' : 'bg-kumbhblue-600'
                  }`}
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center">
                      <FontAwesome6 name="spinner" size={16} color="white" />
                      <Text className="text-white font-bold text-base ml-3">Processing...</Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center">
                      <FontAwesome6 name="rocket" size={16} color="white" />
                      <Text className="text-white font-bold text-base ml-3">
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
