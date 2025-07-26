import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';
import "../global.css";

export default function HelpBtn({
  className="bg-white border-2 border-gray-200 shadow-soft", 
  icon = "circle-info",
  iconSize = 50,
  translationKey = "default",
  onPress = () => {}
}) {
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`mb-4 rounded-2xl overflow-hidden ${className}`}
      activeOpacity={0.85}
    >
      <View className="p-6">
        <View className="flex-row items-center">
          {/* Icon Container with Better Contrast */}
          <View className="relative">
            <View className="bg-kumbhblue-600 rounded-2xl p-4 shadow-medium">
              <FontAwesome6 name={icon} size={iconSize} color="white" />
            </View>
          </View>
          
          {/* Content Section with Better Contrast */}
          <View className="flex-1 ml-6">
            <Text className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {t(`help_buttons.${translationKey}.title`)}
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              {t(`help_buttons.${translationKey}.desc`)}
            </Text>
          </View>
          
          {/* Arrow Indicator */}
          <View className="ml-4">
            <FontAwesome6 name="chevron-right" size={20} color="#6B7280" />
          </View>
        </View>
        
        {/* Status Indicator with Better Contrast */}
        <View className="mt-4 pt-4 border-t border-gray-300">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-gray-600 font-medium">Tap to access</Text>
            <View className="flex-row space-x-1">
              <View className="w-2 h-2 bg-kumbhblue-400 rounded-full" />
              <View className="w-2 h-2 bg-kumbhblue-600 rounded-full" />
              <View className="w-2 h-2 bg-gray-400 rounded-full" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}