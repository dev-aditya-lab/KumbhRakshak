import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity 
      onPress={toggleLanguage}
      className="absolute top-12 right-4 bg-white/20 rounded-full p-3 flex-row items-center"
    >
      <FontAwesome6 name="language" size={20} color="white" />
      <Text className="text-white font-bold ml-2">
        {t('language.switch')}
      </Text>
    </TouchableOpacity>
  );
}
