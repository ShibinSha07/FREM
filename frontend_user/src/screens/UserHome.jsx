import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, Button, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Layout from '../components/Layout';
import { API_URL } from '../lib/api.js';

const UserHome = ({ navigation }) => {

    const [location, setLocation] = useState(null);
    const [place, setPlace] = useState("Unknown location")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.log("Permission to access location was denied");
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);

                if (currentLocation && currentLocation.coords) {
                    const { latitude, longitude } = currentLocation.coords;
                    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

                    const geocodeResponse = await axios.get(geocodeUrl, {
                        headers: { "User-Agent": "YourAppName/1.0 (frem@gmail.com)" },
                    });

                    setPlace(geocodeResponse.data.display_name || "Unknown Location");
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching location:", error.message);
            }
        };

        fetchLocation();
    }, []);

    const makeCall = async () => {
        try {
            console.log("making call")

            const phoneNumber = "tel:8281396739";
            const supported = await Linking.canOpenURL(phoneNumber);

            if (!location) {
                Alert.alert("Error", "Location is not available yet.");
                return;
            }

            const { latitude, longitude } = location.coords;

            const requestData = {
                coordinates: `${latitude} ${longitude}`,
                place: place,
                incident_id: null,
            };

            const response = await axios.post(`${API_URL}/calls`, requestData);
            console.log("call added:", response.data);

            await Linking.openURL(phoneNumber);
        }
        catch (error) {
            console.error("An error occurred", error.message);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    return (
        <Layout>
            <View className="flex-1">
                <View className="w-full h-40 bg-gray-200 rounded-md mb-6 p-4">
                    <Text className="text-center">Save Your life</Text>
                </View>

                <View className="w-full h-2/3  rounded-md">
                    {loading ? (
                        <View className="flex-1 justify-center items-center bg-gray-200">
                            <ActivityIndicator size="large" color="#ff5733" />
                        </View>
                    ) : (
                        <>
                            <View className="w-full h-96 mb-20 bg-white">
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: 10.5545,
                                        longitude: 76.2247,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    region={
                                        location
                                            ? {
                                                latitude: location.coords.latitude,
                                                longitude: location.coords.longitude,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01,
                                            }
                                            : undefined
                                    }
                                >
                                    {location?.coords && (
                                        <Marker
                                            coordinate={{
                                                latitude: location.coords.latitude,
                                                longitude: location.coords.longitude,
                                            }}
                                            title="Your Location"
                                        />
                                    )}
                                </MapView>
                            </View>

                            <View className="flex-row justify-between gap-x-2 mb-2">
                                <TouchableOpacity className="bg-blue-600 py-4 rounded-md flex-1">
                                    <Text className="text-white text-center text-lg font-bold">
                                        Nearest Fire Stations
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="bg-green-600 py-4 rounded-md flex-1"
                                    onPress={() => navigation.navigate('Locate')}
                                >
                                    <Text className="text-white text-center text-lg font-bold">
                                        Locate Fire Vehicle
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                className="bg-red-600 py-4 rounded-md"
                                onPress={makeCall}
                            >
                                <Text className="text-white text-center text-lg font-bold">
                                    Emergency Call
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>



            </View>
        </Layout >
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});

export default UserHome;