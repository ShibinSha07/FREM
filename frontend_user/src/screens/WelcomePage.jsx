import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      className="flex-1 bg-white justify-center items-center gap-y-52"
      onPress={() => navigation.navigate('UserHome')}
    >
      <Image
        source={require('../assets/fire_logo.png')}
        className="w-80 h-80"
      />
      <Text className="text-6xl font-bold text-black">
        FREM
      </Text>
    </TouchableOpacity>
  );
}