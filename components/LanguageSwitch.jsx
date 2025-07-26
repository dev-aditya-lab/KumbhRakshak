import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
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
      className={`absolute top-12 right-4 rounded-full p-3 flex-row items-center ${
        disabled 
          ? 'bg-gray-400/30' 
          : 'bg-white/20'
      }`}
    >
      <FontAwesome6 
        name="language" 
        size={20} 
        color={disabled ? '#9CA3AF' : 'white'} 
      />
      <Text className={`font-bold ml-2 ${
        disabled ? 'text-gray-400' : 'text-white'
      }`}>
        {t('language.switch')}
      </Text>
    </TouchableOpacity>
  );
}
