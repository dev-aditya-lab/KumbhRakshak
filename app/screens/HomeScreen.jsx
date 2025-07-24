import { Image, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import '../../global.css';

export default function HomeScreen() {
  return (
    <View className="bg-white">
      <View className="h-fit w-full items-center rounded-b-[2rem] bg-kumbhblue/90 py-14 ">
        <Image className="h-52 w-52" source={require('../../assets/KR_logo.png')} />
        <Text className="text-4xl font-bold text-white">Kumbh Rakshak</Text>
        <Text className="text-xl text-white">Safety, Cleanliness and Community Seva</Text>
      </View>
    </View>
  );
}
