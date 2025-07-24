import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

export default function App() {
  return (
    <SafeAreaView>
      <View className="h-20 w-full bg-blue-500">
        <Text className="text-2xl font-bold">Welcome to My Expo App</Text>
      </View>
      <Text className="text-xl font-bold">Hello doston</Text>
    </SafeAreaView>
  );
}
