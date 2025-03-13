import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import { SocketProvider, useSocket } from './src/context/SocketContext';
import Popup from './src/components/Popup'; // Import Popup

const Stack = createNativeStackNavigator();

import './global.css';
import WaterResourceScreen from './src/screens/WaterResourceScreen';

export default function App() {
    return (
        <SocketProvider>
            <NavigationContainer>
                <MainNavigator />
                <PopupWrapper />
            </NavigationContainer>
        </SocketProvider>
    );
}

const PopupWrapper = () => {
    const { popup } = useSocket();
    return popup ? <Popup /> : null;
};

const MainNavigator = () => (
    <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="MapScreen" options={{ headerShown: false }} component={MapScreen} />
        <Stack.Screen name="WaterResourceScreen" options={{ headerShown: false }} component={WaterResourceScreen} />
    </Stack.Navigator>
);
