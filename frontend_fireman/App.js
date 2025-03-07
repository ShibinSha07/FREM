import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ActiveScreen from './src/screens/ActiveScreen';

const Stack = createNativeStackNavigator();

import './global.css'

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="ActiveScreen" options={{ headerShown: false }} component={ActiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

