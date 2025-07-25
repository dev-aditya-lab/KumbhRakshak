import { Image, ScrollView, Text,  View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import '../../global.css';
import HelpBtn from '../../components/HelpBtn';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="h-fit w-full items-center rounded-b-[2rem] bg-kumbhblue/90 py-14">
        <Image className="h-52 w-52" source={require('../../assets/KR_logo.png')} />
        <Text className="text-4xl font-bold text-white">Kumbh Rakshak</Text>
        <Text className="text-xl text-white">Safety, Cleanliness and Community Seva</Text>
      </View>
    <ScrollView className= "px-2">
    <HelpBtn className='bg-rose-200 border border-rose-400' icon="truck-medical" iconSize={60} title="Start Live Help Call" desc="Talk to an officer for urgent help"/>
    <HelpBtn className='bg-blue-200 border border-blue-500' icon="broom" iconSize={60} title="Report Cleanliness Issue" desc="Spotted a dirty area? Report with photo."/>
    <HelpBtn className='bg-pink-200 border border-pink-400' icon="store" iconSize={60} title="Find Local Services" desc="Nearby food stalls & vendors in one place."/>
    <HelpBtn/>
    <HelpBtn/>
    <HelpBtn/>
    <HelpBtn/>
    <HelpBtn/>

    </ScrollView>
    </View>
  );
}
