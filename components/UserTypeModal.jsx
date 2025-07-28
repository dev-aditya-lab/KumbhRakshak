import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';
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
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View className="flex-1 bg-black/70">
        <Animated.View 
          style={{ opacity: fadeAnim }}
          className="flex-1 justify-center px-6"
        >
          <View className="bg-white rounded-3xl overflow-hidden shadow-strong">
            {/* Header */}
            <View className="bg-gradient-to-r from-kumbhblue-600 to-kumbhblue-700 px-6 py-8">
              <View className="items-center">
                <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                  <FontAwesome6 name="users" size={32} color="white" />
                </View>
                <Text className="text-3xl font-bold text-white text-center">
                  {t('userType.welcome')}
                </Text>
                <Text className="text-white/90 text-center mt-2 text-lg">
                  {t('userType.subtitle')}
                </Text>
              </View>
            </View>

            {/* User Type Options */}
            <View className="p-6">
              {/* User Option */}
              <TouchableOpacity
                onPress={() => handleUserTypeSelect('user')}
                className="bg-gradient-to-r from-kumbhblue-50 to-kumbhblue-100 rounded-2xl p-6 mb-4 border-2 border-kumbhblue-200 shadow-medium"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <View className="w-16 h-16 bg-kumbhblue-600 rounded-xl items-center justify-center">
                    <FontAwesome6 name="user" size={24} color="white" />
                  </View>
                  
                  <View className="flex-1 ml-4">
                    <Text className="text-2xl font-bold text-gray-800">
                      {t('userType.user.title')}
                    </Text>
                    <Text className="text-gray-600 text-base mt-1 leading-relaxed">
                      {t('userType.user.description')}
                    </Text>
                  </View>
                  
                  <FontAwesome6 name="chevron-right" size={20} color="#204B72" />
                </View>

                <View className="mt-4 pt-4 border-t border-kumbhblue-200">
                  <View className="flex-row items-center">
                    <FontAwesome6 name="check-circle" size={16} color="#10B981" />
                    <Text className="text-kumbhgreen-600 font-medium ml-2">
                      {t('userType.user.benefit')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Volunteer Option */}
              <TouchableOpacity
                onPress={() => handleUserTypeSelect('volunteer')}
                className="bg-gradient-to-r from-kumbhgold-50 to-kumbhgold-100 rounded-2xl p-6 border-2 border-kumbhgold-200 shadow-medium"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <View className="w-16 h-16 bg-kumbhgold-600 rounded-xl items-center justify-center">
                    <FontAwesome6 name="hands-helping" size={24} color="white" />
                  </View>
                  
                  <View className="flex-1 ml-4">
                    <Text className="text-2xl font-bold text-gray-800">
                      {t('userType.volunteer.title')}
                    </Text>
                    <Text className="text-gray-600 text-base mt-1 leading-relaxed">
                      {t('userType.volunteer.description')}
                    </Text>
                  </View>
                  
                  <FontAwesome6 name="chevron-right" size={20} color="#D97706" />
                </View>

                <View className="mt-4 pt-4 border-t border-kumbhgold-200">
                  <View className="flex-row items-center">
                    <FontAwesome6 name="shield-halved" size={16} color="#DC2626" />
                    <Text className="text-red-600 font-medium ml-2">
                      {t('userType.volunteer.requirement')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Info Section */}
              <View className="bg-gray-50 rounded-xl p-4 mt-4">
                <View className="flex-row items-start">
                  <FontAwesome6 name="info-circle" size={16} color="#6B7280" />
                  <Text className="text-gray-600 text-sm ml-3 leading-relaxed flex-1">
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
