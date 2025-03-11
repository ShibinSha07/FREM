import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomePage';
import UserHome from './src/screens/UserHome'
import LocateScreen from './src/screens/LocateScreen';
import ActiveIncidents from './src/components/ActiveIncidents';

import './global.css'
import HelpNumbers from './src/components/HelpNumbers';
// import WaterResourcesScreen from './src/screens/WaterResourceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen name="WelcomePage" options = {{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="UserHome" options = {{ headerShown: false }} component={UserHome} />
        <Stack.Screen name="Locate" options = {{ headerShown: false }} component={LocateScreen} />
        <Stack.Screen name="ActiveIncidents" options = {{ headerShown: false }} component={ActiveIncidents} />
        <Stack.Screen name="HelpNumbers" options = {{ headerShown: false }} component={HelpNumbers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}