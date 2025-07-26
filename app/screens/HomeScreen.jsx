import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import '../../global.css';
import HelpBtn from '../../components/HelpBtn';
import LanguageSwitch from '../../components/LanguageSwitch';
import { UserStorage } from '../../utils/UserStorage';
import { useRegistration } from '../../context/RegistrationContext.js';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { isRegistrationModalOpen } = useRegistration();

  // Debug function to reset registration (for testing)
  const resetRegistration = async () => {
    await UserStorage.clearUserData();
    alert('Registration cleared! Restart the app to see the registration modal.');
  };
  
  return (
    <View className="flex-1 bg-white">
      <View className="h-fit w-full items-center rounded-b-[2rem] bg-kumbhblue/90 py-14 relative">
        <LanguageSwitch disabled={isRegistrationModalOpen} />
        <Image className="h-52 w-52" source={require('../../assets/KR_logo.png')} />
        <Text className="text-4xl font-bold text-white">{t('app.title')}</Text>
        <Text className="text-xl text-white">{t('app.subtitle')}</Text>
        
        {/* Debug Button - Remove in production */}
        {__DEV__ && (
          <TouchableOpacity 
            onPress={resetRegistration}
            className="absolute bottom-2 left-4 bg-red-500/20 px-3 py-1 rounded"
          >
            <Text className="text-white text-xs">Reset Registration</Text>
          </TouchableOpacity>
        )}


      </View>
    <ScrollView className= "px-2">
    <HelpBtn 
      className='bg-rose-200 border border-rose-400' 
      icon="truck-medical" 
      iconSize={60} 
      translationKey="emergency"
    />
    <HelpBtn 
      className='bg-blue-200 border border-blue-500' 
      icon="broom" 
      iconSize={60} 
      translationKey="cleanliness"
    />
    <HelpBtn 
      className='bg-pink-200 border border-pink-400' 
      icon="store" 
      iconSize={60} 
      translationKey="services"
    />
    <HelpBtn translationKey="default"/>
    <HelpBtn translationKey="default"/>
    <HelpBtn translationKey="default"/>
    <HelpBtn translationKey="default"/>
    <HelpBtn translationKey="default"/>

    </ScrollView>
    </View>
  );
}
