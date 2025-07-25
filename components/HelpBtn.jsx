import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import "../global.css";
export default function HelpBtn({className="bg-rose-200 border border-rose-400", icon = "circle-info",iconSize = 50 ,title = "Help", desc = "Need assistance? Click here!" }) {
  return (
    <View>
        <TouchableOpacity className={`mt-2 rounded-md gap-3 h-32 flex flex-row items-center p-2 ${className}`}>
        <FontAwesome6 className="" name={icon} size={iconSize} color="#204B72" />
        <View className="">
          <Text className="text-3xl font-bold text-kumbhblue">{title}</Text>
          <Text className="text-xl text-gray-600">{desc}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}