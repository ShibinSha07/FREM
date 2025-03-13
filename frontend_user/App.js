import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomePage';
import UserHome from './src/screens/UserHome'
import LocateScreen from './src/screens/LocateScreen';

import './global.css'
import FirstAid from './src/screens/FirstAid';
import WaterResourceScreen from './src/screens/WaterResourceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomePage">
                <Stack.Screen name="WelcomePage" options={{ headerShown: false }} component={WelcomeScreen} />
                <Stack.Screen name="UserHome" options={{ headerShown: false }} component={UserHome} />
                <Stack.Screen name="Locate" options={{ headerShown: false }} component={LocateScreen} />
                <Stack.Screen name="FirstAid" options={{ headerShown: false }} component={FirstAid} />
                <Stack.Screen name="WaterResourceScreen" options={{ headerShown: false }} component={WaterResourceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}