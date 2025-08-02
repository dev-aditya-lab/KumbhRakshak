import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../global.css';

export default function UserTypeModal({ visible, onSelectUserType }) {
  const { t } = useTranslation();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleUserTypeSelect = (type) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onSelectUserType(type);
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 bg-black/70">
        <Animated.View style={{ opacity: fadeAnim }} className="flex-1 justify-center px-6">
          <View className="overflow-hidden rounded-3xl bg-gray-50">
            {/* Header */}
            <View className="bg-blue-600 px-6 py-8">
              <View className="items-center">
                <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-white/20">
                  <FontAwesome6 name="users" size={32} color="white" />
                </View>
                <Text className="text-center text-3xl font-bold text-white">
                  {t('userType.welcome')}
                </Text>
                <Text className="mt-2 text-center text-lg text-white/90">
                  {t('userType.subtitle')}
                </Text>
              </View>
            </View>

            {/* User Type Options */}
            <View className="p-6">
              {/* User Option */}
              <TouchableOpacity
                onPress={() => handleUserTypeSelect('user')}
                className="mb-4 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6"
                activeOpacity={0.8}>
                <View className="flex-row items-center">
                  <View className="h-16 w-16 items-center justify-center rounded-xl bg-blue-600">
                    <FontAwesome6 name="user" size={24} color="white" />
                  </View>

                  <View className="ml-4 flex-1">
                    <Text className="text-2xl font-bold text-gray-800">
                      {t('userType.user.title')}
                    </Text>
                    <Text className="mt-1 text-base leading-relaxed text-gray-600">
                      {t('userType.user.description')}
                    </Text>
                  </View>

                  <FontAwesome6 name="chevron-right" size={20} color="#204B72" />
                </View>

                <View className="mt-4 border-t border-kumbhblue-200 pt-4">
                  <View className="flex-row items-center">
                    <FontAwesome6 name="check-circle" size={16} color="#10B981" />
                    <Text className="ml-2 font-medium text-kumbhgreen-600">
                      {t('userType.user.benefit')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Volunteer Option */}
              <TouchableOpacity
                onPress={() => handleUserTypeSelect('volunteer')}
                className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-6"
                activeOpacity={0.8}>
                <View className="flex-row items-center">
                  <View className="h-16 w-16 items-center justify-center rounded-xl bg-orange-600">
                    <FontAwesome6 name="hands-helping" size={24} color="white" />
                  </View>

                  <View className="ml-4 flex-1">
                    <Text className="text-2xl font-bold text-gray-800">
                      {t('userType.volunteer.title')}
                    </Text>
                    <Text className="mt-1 text-base leading-relaxed text-gray-600">
                      {t('userType.volunteer.description')}
                    </Text>
                  </View>

                  <FontAwesome6 name="chevron-right" size={20} color="#D97706" />
                </View>

                <View className="mt-4 border-t border-kumbhgold-200 pt-4">
                  <View className="flex-row items-center">
                    <FontAwesome6 name="shield-halved" size={16} color="#DC2626" />
                    <Text className="ml-2 font-medium text-red-600">
                      {t('userType.volunteer.requirement')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Info Section */}
              <View className="mt-4 rounded-xl bg-gray-50 p-4">
                <View className="flex-row items-start">
                  <FontAwesome6 name="info-circle" size={16} color="#6B7280" />
                  <Text className="ml-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {t('userType.info')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
