import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import '../../global.css';

export default function EmergencyScreen() {
  const emergencyContacts = [
    { name: 'Police', number: '100', icon: 'shield-halved', color: 'blue' },
    { name: 'Ambulance', number: '108', icon: 'truck-medical', color: 'red' },
    { name: 'Fire Brigade', number: '101', icon: 'fire-flame-curved', color: 'orange' },
    { name: 'Disaster Management', number: '1078', icon: 'triangle-exclamation', color: 'purple' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-600',
      red: 'bg-red-500 border-red-600',
      orange: 'bg-orange-500 border-orange-600',
      purple: 'bg-purple-500 border-purple-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Status bar background replacement */}
      <View className="bg-gray-50 h-0" />
      
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-6 py-4">{/* Rest of component remains the same */}
        <Text className="text-3xl font-bold text-gray-800">Emergency</Text>
        <Text className="text-gray-600 mt-1">Quick access to emergency services</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Emergency Alert Banner */}
        <View className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center mb-3">
            <FontAwesome6 name="triangle-exclamation" size={24} color="#DC2626" />
            <Text className="text-xl font-bold text-red-700 ml-3">Emergency Alert</Text>
          </View>
          <Text className="text-red-600 leading-relaxed">
            In case of immediate danger, call the appropriate emergency number below. 
            Your safety is our priority.
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Emergency Contacts</Text>
          
          <View className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-soft"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <View className={`p-4 rounded-2xl ${getColorClasses(contact.color)}`}>
                    <FontAwesome6 name={contact.icon} size={28} color="white" />
                  </View>
                  
                  <View className="flex-1 ml-4">
                    <Text className="text-xl font-bold text-gray-800">{contact.name}</Text>
                    <Text className="text-gray-600 mt-1">Emergency Service</Text>
                  </View>
                  
                  <View className="items-end">
                    <View className="bg-gray-100 px-4 py-2 rounded-full">
                      <Text className="text-2xl font-bold text-gray-800">{contact.number}</Text>
                    </View>
                    <Text className="text-sm text-gray-500 mt-1">Tap to call</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          
          <View className="space-y-3">
            <TouchableOpacity className="bg-kumbhblue-600 rounded-2xl p-6 shadow-medium">
              <View className="flex-row items-center">
                <FontAwesome6 name="location-dot" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-4">Share Location</Text>
              </View>
              <Text className="text-kumbhblue-100 mt-2">Send your current location to emergency contacts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-kumbhgold-500 rounded-2xl p-6 shadow-medium">
              <View className="flex-row items-center">
                <FontAwesome6 name="bell" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-4">Emergency Alert</Text>
              </View>
              <Text className="text-orange-100 mt-2">Send alert to all registered emergency contacts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety Tips */}
        <View className="bg-white rounded-2xl p-6 border border-gray-200 shadow-soft">
          <View className="flex-row items-center mb-4">
            <FontAwesome6 name="lightbulb" size={24} color="#059669" />
            <Text className="text-xl font-bold text-gray-800 ml-3">Safety Tip</Text>
          </View>
          <Text className="text-gray-600 leading-relaxed">
            Always keep your phone charged and know your exact location. 
            In crowded areas, stay aware of your surroundings and follow official guidance.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
