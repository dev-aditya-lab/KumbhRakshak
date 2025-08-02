import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';

export default function LanguageSwitch({ disabled = false }) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    if (disabled) return; // Don't change language when disabled

    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      disabled={disabled}
      className={`overflow-hidden rounded-xl ${
        disabled ? 'bg-gray-500/30' : 'border border-white/30 bg-white/90 backdrop-blur-sm'
      }`}
      activeOpacity={0.8}>
      <View className={`flex-row items-center px-4 py-2 ${disabled ? 'border-gray-400/30' : ''}`}>
        <View
          className={`mr-3 rounded-full p-2 ${disabled ? 'bg-gray-400/30' : 'bg-kumbhblue-600'}`}>
          <FontAwesome6 name="language" size={16} color={disabled ? '#9CA3AF' : 'white'} />
        </View>

        <View className="flex-1">
          <Text className={`text-sm font-bold ${disabled ? 'text-gray-400' : 'text-gray-800'}`}>
            {t('language.switch')}
          </Text>
          <Text className={`text-xs font-medium ${disabled ? 'text-gray-500' : 'text-gray-600'}`}>
            {t('language.current')}
          </Text>
        </View>

        {!disabled && (
          <View className="ml-2">
            <FontAwesome6 name="chevron-down" size={12} color="#374151" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
