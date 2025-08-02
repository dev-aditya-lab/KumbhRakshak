import { Text, View, TouchableOpacity, ScrollView, StatusBar, Linking } from 'react-native';
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

  const getColorScheme = (color) => {
    const colors = {
      blue: { bg: '#2563EB', border: '#1D4ED8', light: '#DBEAFE' },
      red: { bg: '#DC2626', border: '#B91C1C', light: '#FEE2E2' },
      orange: { bg: '#EA580C', border: '#C2410C', light: '#FED7AA' },
      purple: { bg: '#7C3AED', border: '#6D28D9', light: '#EDE9FE' },
    };
    return colors[color] || colors.blue;
  };

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      
      {/* Header */}
      <View style={{
        backgroundColor: '#DC2626',
        paddingHorizontal: 24,
        paddingVertical: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            marginRight: 16,
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: 12,
          }}>
            <FontAwesome6 name="triangle-exclamation" size={26} color="white" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 32,
              fontWeight: '900',
              color: 'white',
              marginBottom: 4,
            }}>
              Emergency
            </Text>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.9)',
            }}>
              Quick access to help
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1, backgroundColor: '#F8FAFC' }} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24, paddingBottom: 32 }}
      >
        {/* Emergency Alert Banner */}
        <View style={{
          marginBottom: 32,
          borderRadius: 16,
          backgroundColor: '#DC2626',
          padding: 24,
          shadowColor: '#DC2626',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 6,
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <FontAwesome6 name="triangle-exclamation" size={26} color="white" />
            <Text style={{
              marginLeft: 16,
              fontSize: 20,
              fontWeight: '900',
              color: 'white',
            }}>
              Emergency Alert
            </Text>
          </View>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 22,
            color: 'rgba(255, 255, 255, 0.95)',
          }}>
            In case of immediate danger, call the appropriate emergency number below. Your safety is our priority.
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={{ marginBottom: 32 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <View style={{
              marginRight: 12,
              borderRadius: 24,
              backgroundColor: '#3B82F6',
              padding: 10,
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <FontAwesome6 name="phone" size={20} color="white" />
            </View>
            <Text style={{
              fontSize: 24,
              fontWeight: '900',
              color: '#111827',
            }}>
              Emergency Contacts
            </Text>
          </View>

          {emergencyContacts.map((contact, index) => {
            const colors = getColorScheme(contact.color);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleCall(contact.number)}
                style={{
                  marginBottom: 16,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white',
                  padding: 24,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    borderRadius: 16,
                    backgroundColor: colors.bg,
                    padding: 16,
                    shadowColor: colors.bg,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 4,
                  }}>
                    <FontAwesome6 name={contact.icon} size={26} color="white" />
                  </View>

                  <View style={{ marginLeft: 24, flex: 1 }}>
                    <Text style={{
                      marginBottom: 8,
                      fontSize: 20,
                      fontWeight: '900',
                      color: '#111827',
                    }}>
                      {contact.name}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#6B7280',
                    }}>
                      Emergency Service
                    </Text>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={{
                      borderRadius: 12,
                      backgroundColor: colors.light,
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 2,
                    }}>
                      <Text style={{
                        fontSize: 24,
                        fontWeight: '900',
                        color: colors.bg,
                      }}>
                        {contact.number}
                      </Text>
                    </View>
                    <Text style={{
                      marginTop: 12,
                      fontSize: 12,
                      fontWeight: '700',
                      color: '#6B7280',
                      textAlign: 'center',
                    }}>
                      Tap to call
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            marginBottom: 16,
            fontSize: 24,
            fontWeight: '900',
            color: '#111827',
          }}>
            Quick Actions
          </Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity style={{
              borderRadius: 16,
              backgroundColor: '#3B82F6',
              padding: 24,
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 5,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome6 name="location-dot" size={24} color="white" />
                <Text style={{
                  marginLeft: 16,
                  fontSize: 18,
                  fontWeight: '700',
                  color: 'white',
                }}>
                  Share Location
                </Text>
              </View>
              <Text style={{
                marginTop: 8,
                fontSize: 14,
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.8)',
              }}>
                Send your current location to emergency contacts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              borderRadius: 16,
              backgroundColor: '#F59E0B',
              padding: 24,
              shadowColor: '#F59E0B',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 5,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome6 name="bell" size={24} color="white" />
                <Text style={{
                  marginLeft: 16,
                  fontSize: 18,
                  fontWeight: '700',
                  color: 'white',
                }}>
                  Emergency Alert
                </Text>
              </View>
              <Text style={{
                marginTop: 8,
                fontSize: 14,
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.8)',
              }}>
                Send alert to all registered emergency contacts
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={{
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#D1FAE5',
          backgroundColor: '#ECFDF5',
          padding: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <FontAwesome6 name="lightbulb" size={24} color="#059669" />
            <Text style={{
              marginLeft: 12,
              fontSize: 20,
              fontWeight: '900',
              color: '#065F46',
            }}>
              Safety Tip
            </Text>
          </View>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 22,
            color: '#047857',
          }}>
            Always keep your phone charged and know your exact location. In crowded areas, stay aware of your surroundings and follow official guidance.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
