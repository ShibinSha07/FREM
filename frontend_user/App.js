import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomePage';
import UserHome from './src/screens/UserHome'
import LocateScreen from './src/screens/LocateScreen';

import './global.css'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen name="WelcomePage" options = {{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="UserHome" options = {{ headerShown: false }} component={UserHome} />
        <Stack.Screen name="Locate" options = {{ headerShown: false }} component={LocateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}