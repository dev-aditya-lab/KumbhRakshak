import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import './global.css'

export default function App() {
  return (
    <SafeAreaView>
      <View className='bg-blue-500 w-full h-20'>
        <Text className='text-2xl font-bold'>Welcome to My Expo App</Text>
      </View>
      <Text className='text-xl font-bold'>App</Text>

    </SafeAreaView>
  )
}