import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRegistration } from '../../context/RegistrationContext';
import { UserStorage } from '../../utils/UserStorage';
import '../../global.css';
import HelpBtn from '../../components/HelpBtn';
import LanguageSwitch from '../../components/LanguageSwitch';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { setShowRegistration } = useRegistration();

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

  return (
    <View className="flex-1 bg-kumbhblue-50">
      {/* Header Section */}
      <View className="bg-kumbhblue-600 pt-12 pb-6 px-6">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold mb-1">
              {t('welcome')}
            </Text>
            <Text className="text-kumbhblue-100 text-sm">
              {t('tagline')}
            </Text>
          </View>
          <View className="mt-2">
            <LanguageSwitch />
          </View>
        </View>

        {/* Logo Section */}
        <View className="items-center mt-4">
          <Image 
            source={require('../../assets/KumbhRakshak.png')} 
            className="w-32 h-32"
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Emergency Services Section */}
        <View className="p-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            {t('emergencyServices')}
          </Text>
          <View className="grid grid-cols-2 gap-4">
            <HelpBtn 
              className="bg-red-50 border-2 border-red-300 shadow-soft" 
              translationKey="emergency"
              iconSize={44}
            />
            <HelpBtn 
              className="bg-blue-50 border-2 border-blue-300 shadow-soft" 
              translationKey="services"
              iconSize={44}
            />
            <HelpBtn 
              className="bg-green-50 border-2 border-green-300 shadow-soft" 
              translationKey="cleanliness"
              iconSize={44}
            />
            <HelpBtn 
              className="bg-yellow-50 border-2 border-yellow-300 shadow-soft" 
              translationKey="emergency"
              iconSize={44}
            />
          </View>
        </View>

        {/* Additional Services Section */}
        <View className="px-6 pb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            {t('additionalServices')}
          </Text>
          <View className="grid grid-cols-2 gap-4">
            <HelpBtn 
              className="bg-purple-50 border-2 border-purple-300 shadow-soft" 
              translationKey="default"
              iconSize={44}
            />
            <HelpBtn 
              className="bg-orange-50 border-2 border-orange-300 shadow-soft" 
              translationKey="default"
              iconSize={44}
            />
          </View>
        </View>

        {/* Debug Button - Remove in production */}
        <View className="px-6 pb-8">
          <TouchableOpacity 
            onPress={resetRegistration}
            className="bg-gray-200 p-3 rounded-lg"
          >
            <Text className="text-gray-700 text-center">
              Reset Registration (Debug)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
