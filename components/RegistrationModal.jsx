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
  Dimensions
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../global.css';

const { width, height } = Dimensions.get('window');

export default function RegistrationModal({ visible, onComplete }) {
  const { t } = useTranslation();
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
  }, [visible]);

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
      
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert('Error', 'Failed to save registration. Please try again.');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
    >
      <View className="flex-1 bg-black/50">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center px-6"
        >
          <Animated.View 
            style={{ opacity: fadeAnim }}
            className="bg-white rounded-3xl p-6 mx-2 shadow-2xl"
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View className="items-center mb-6">
                <View className="w-20 h-20 bg-kumbhblue/10 rounded-full items-center justify-center mb-4">
                  <FontAwesome6 name="user-plus" size={32} color="#204B72" />
                </View>
                <Text className="text-2xl font-bold text-kumbhblue text-center">
                  {t('registration.welcome')}
                </Text>
                <Text className="text-gray-600 text-center mt-2 leading-5">
                  {t('registration.subtitle')}
                </Text>
              </View>

              {/* Name Input */}
              <View className="mb-4">
                <Text className="text-kumbhblue font-semibold mb-2 text-base">
                  {t('registration.name_label')} *
                </Text>
                <View className={`border-2 rounded-xl px-4 py-3 ${nameError ? 'border-red-400' : 'border-gray-200'}`}>
                  <TextInput
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (nameError) setNameError('');
                    }}
                    placeholder={t('registration.name_placeholder')}
                    placeholderTextColor="#9CA3AF"
                    className="text-gray-800 text-base"
                    autoCapitalize="words"
                  />
                </View>
                {nameError ? (
                  <Text className="text-red-500 text-sm mt-1 ml-1">{nameError}</Text>
                ) : null}
              </View>

              {/* Phone Input */}
              <View className="mb-4">
                <Text className="text-kumbhblue font-semibold mb-2 text-base">
                  {t('registration.phone_label')} *
                </Text>
                <View className={`border-2 rounded-xl px-4 py-3 ${phoneError ? 'border-red-400' : 'border-gray-200'}`}>
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
                    className="text-gray-800 text-base"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
                {phoneError ? (
                  <Text className="text-red-500 text-sm mt-1 ml-1">{phoneError}</Text>
                ) : null}
              </View>

              {/* Privacy Notice */}
              <View className="bg-blue-50 rounded-xl p-4 mb-6">
                <View className="flex-row items-start">
                  <FontAwesome6 name="shield-halved" size={16} color="#204B72" className="mt-1 mr-2" />
                  <Text className="text-gray-700 text-sm leading-5 flex-1 ml-2">
                    {t('registration.privacy_text')}
                  </Text>
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                className={`rounded-xl py-4 px-6 items-center ${
                  isSubmitting ? 'bg-gray-400' : 'bg-kumbhblue'
                }`}
              >
                {isSubmitting ? (
                  <View className="flex-row items-center">
                    <FontAwesome6 name="spinner" size={16} color="white" className="mr-2" />
                    <Text className="text-white font-bold text-base ml-2">Processing...</Text>
                  </View>
                ) : (
                  <Text className="text-white font-bold text-base">
                    {t('registration.submit_button')}
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
