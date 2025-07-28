import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// Dummy admin credentials for development phase
const DUMMY_ADMIN_CREDENTIALS = {
  email: 'admin@kumbhrakshak.com',
  password: 'admin123'
};

export default function VolunteerLoginModal({ visible, onLoginSuccess, onClose }) {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
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
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = t('volunteer.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('volunteer.invalidEmail');
    }

    if (!password) {
      newErrors.password = t('volunteer.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('volunteer.passwordTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check against dummy admin credentials
      if (email.trim().toLowerCase() === DUMMY_ADMIN_CREDENTIALS.email && 
          password === DUMMY_ADMIN_CREDENTIALS.password) {
        
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onLoginSuccess({ 
            email: email.trim(), 
            userType: 'volunteer',
            loginTime: new Date().toISOString()
          });
          setEmail('');
          setPassword('');
          setErrors({});
        });
      } else {
        Alert.alert(t('volunteer.error'), t('volunteer.loginFailed'));
      }
    } catch (_error) {
      Alert.alert(t('volunteer.error'), t('volunteer.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      setEmail('');
      setPassword('');
      setErrors({});
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}
        >
          <Animated.View 
            style={{ 
              opacity: fadeAnim,
              backgroundColor: 'white',
              borderRadius: 24,
              overflow: 'hidden',
              maxHeight: '85%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 20
            }}
          >
            {/* Header */}
            <View style={{ backgroundColor: '#D97706', paddingHorizontal: 24, paddingVertical: 24, position: 'relative' }}>
              {/* Language Toggle Button */}
              <TouchableOpacity 
                onPress={toggleLanguage}
                style={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: 20, 
                  paddingHorizontal: 12, 
                  paddingVertical: 8, 
                  flexDirection: 'row', 
                  alignItems: 'center' 
                }}
                activeOpacity={0.8}
              >
                <FontAwesome6 name="language" size={16} color="white" />
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '500', marginLeft: 8 }}>
                  {i18n.language === 'en' ? 'हिंदी' : 'English'}
                </Text>
              </TouchableOpacity>

              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <View style={{ 
                  width: 64, 
                  height: 64, 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: 32, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: 16 
                }}>
                  <FontAwesome6 name="hands-helping" size={28} color="white" />
                </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                  {t('volunteer.title')}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 8, lineHeight: 20 }}>
                  {t('volunteer.subtitle')}
                </Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ padding: 24 }}>
                {/* Demo Credentials Info */}
                <View style={{ 
                  backgroundColor: '#FFFBEB', 
                  borderRadius: 12, 
                  padding: 16, 
                  marginBottom: 24, 
                  borderWidth: 1, 
                  borderColor: '#FDE68A' 
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ 
                      width: 24, 
                      height: 24, 
                      backgroundColor: 'rgba(234, 179, 8, 0.2)', 
                      borderRadius: 12, 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      marginRight: 12, 
                      marginTop: 2 
                    }}>
                      <FontAwesome6 name="info" size={12} color="#EAB308" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#92400E', fontSize: 14, fontWeight: '600', marginBottom: 4 }}>
                        Demo Credentials (Development Phase)
                      </Text>
                      <Text style={{ color: '#B45309', fontSize: 14 }}>
                        Email: admin@kumbhrakshak.com{'\n'}
                        Password: admin123
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Email Input */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: '#1F2937', fontWeight: '600', marginBottom: 12, fontSize: 16 }}>
                    {t('volunteer.email')} *
                  </Text>
                  <View style={{ 
                    borderWidth: 2, 
                    borderColor: errors.email ? '#F87171' : '#D1D5DB', 
                    borderRadius: 12, 
                    paddingHorizontal: 16, 
                    paddingVertical: 16, 
                    backgroundColor: errors.email ? '#FEF2F2' : 'white' 
                  }}>
                    <TextInput
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        if (errors.email) {
                          setErrors(prev => ({ ...prev, email: null }));
                        }
                      }}
                      placeholder={t('volunteer.emailPlaceholder')}
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ color: '#111827', fontSize: 16 }}
                    />
                  </View>
                  {errors.email && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                      <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
                      <Text style={{ color: '#DC2626', fontSize: 14, marginLeft: 8, fontWeight: '500' }}>
                        {errors.email}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Password Input */}
                <View style={{ marginBottom: 24 }}>
                  <Text style={{ color: '#1F2937', fontWeight: '600', marginBottom: 12, fontSize: 16 }}>
                    {t('volunteer.password')} *
                  </Text>
                  <View style={{ 
                    borderWidth: 2, 
                    borderColor: errors.password ? '#F87171' : '#D1D5DB', 
                    borderRadius: 12, 
                    paddingHorizontal: 16, 
                    paddingVertical: 16, 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    backgroundColor: errors.password ? '#FEF2F2' : 'white' 
                  }}>
                    <TextInput
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) {
                          setErrors(prev => ({ ...prev, password: null }));
                        }
                      }}
                      placeholder={t('volunteer.passwordPlaceholder')}
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      style={{ flex: 1, color: '#111827', fontSize: 16 }}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="ml-2"
                      activeOpacity={0.7}
                    >
                      <FontAwesome6 
                        name={showPassword ? "eye" : "eye-slash"} 
                        size={18} 
                        color="#6B7280" 
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <View className="flex-row items-center mt-2">
                      <FontAwesome6 name="triangle-exclamation" size={14} color="#EF4444" />
                      <Text className="text-red-600 text-sm ml-2 font-medium">{errors.password}</Text>
                    </View>
                  )}
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  className={`rounded-xl py-4 px-6 items-center shadow-medium mb-4 ${
                    loading ? 'bg-gray-400' : 'bg-kumbhgold-600'
                  }`}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <View className="flex-row items-center">
                      <ActivityIndicator size="small" color="white" />
                      <Text className="text-white font-bold text-base ml-3">
                        {t('volunteer.loggingIn')}
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center">
                      <FontAwesome6 name="sign-in-alt" size={16} color="white" />
                      <Text className="text-white font-bold text-base ml-3">
                        {t('volunteer.login')}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Back Button */}
                <TouchableOpacity
                  onPress={handleBack}
                  disabled={loading}
                  className="py-3 items-center"
                  activeOpacity={0.7}
                >
                  <Text className="text-kumbhgold-600 font-medium text-base">
                    {t('volunteer.backToSelection')}
                  </Text>
                </TouchableOpacity>

                {/* Info Section */}
                <View className="bg-blue-50 rounded-xl p-4 mt-4 border border-blue-200">
                  <View className="flex-row items-start">
                    <FontAwesome6 name="info-circle" size={16} color="#3B82F6" />
                    <Text className="text-blue-800 text-sm ml-3 leading-relaxed flex-1">
                      {t('volunteer.infoText')}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
