import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';
import '../global.css';

export default function HelpBtn({
  className = 'bg-white border border-gray-200',
  icon = 'circle-info',
  iconSize = 24,
  translationKey = 'default',
  onPress = () => {},
}) {
  const { t } = useTranslation();

  // Extract color scheme from className for theming
  const getColorScheme = () => {
    if (className.includes('red')) return { primary: '#DC2626', secondary: '#FEE2E2', text: '#991B1B' };
    if (className.includes('blue')) return { primary: '#2563EB', secondary: '#DBEAFE', text: '#1E40AF' };
    if (className.includes('green')) return { primary: '#059669', secondary: '#D1FAE5', text: '#047857' };
    if (className.includes('purple')) return { primary: '#7C3AED', secondary: '#EDE9FE', text: '#5B21B6' };
    if (className.includes('orange')) return { primary: '#EA580C', secondary: '#FED7AA', text: '#C2410C' };
    return { primary: '#6B7280', secondary: '#F3F4F6', text: '#374151' };
  };

  const colors = getColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl ${className}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
      activeOpacity={0.95}>
      <View className="p-5">
        <View className="flex-row items-center">
          {/* Icon Container - Modern Light Design */}
          <View className="relative">
            <View 
              className="rounded-2xl p-4"
              style={{ 
                backgroundColor: colors.primary,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
              }}>
              <FontAwesome6 name={icon} size={iconSize} color="white" />
            </View>
            {/* Status Indicator */}
            <View 
              className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
              }} />
          </View>

          {/* Content Section - Enhanced Light Theme Typography */}
          <View className="ml-5 flex-1">
            <Text 
              className="mb-2 text-xl font-black leading-tight"
              style={{ color: colors.text }}>
              {t(`help_buttons.${translationKey}.title`)}
            </Text>
            <Text className="text-base font-semibold leading-relaxed text-gray-600">
              {t(`help_buttons.${translationKey}.desc`)}
            </Text>
          </View>

          {/* Arrow Indicator - Light Theme Design */}
          <View className="ml-4">
            <View 
              className="rounded-xl border border-gray-200 bg-gray-50 p-3"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}>
              <FontAwesome6 name="arrow-right" size={18} style={{ color: colors.primary }} />
            </View>
          </View>
        </View>

        {/* Enhanced Status Section */}
        <View className="mt-5 border-t border-gray-100 pt-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View 
                className="mr-3 h-2.5 w-2.5 rounded-full bg-emerald-500"
                style={{
                  shadowColor: '#22C55E',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  shadowRadius: 4,
                  elevation: 2,
                }} />
              <Text className="text-sm font-bold text-gray-700">Available 24/7</Text>
            </View>
            <View className="flex-row space-x-1.5">
              <View 
                className="h-2 w-2 rounded-full"
                style={{ 
                  backgroundColor: colors.primary,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 1,
                }} />
              <View className="h-2 w-2 rounded-full bg-gray-300" />
              <View className="h-2 w-2 rounded-full bg-gray-200" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
