import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, Button, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Layout from '../components/Layout';
import { API_URL } from '../lib/api.js';

const UserHome = ({ navigation }) => {

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    const makeCall = async () => {
        try {
            console.log("making call")

            const phoneNumber = "tel:8281396739";
            const supported = await Linking.canOpenURL(phoneNumber);

            const { latitude, longitude } = location.coords;

            const locationString = `POINT(${longitude} ${latitude})`;
            const requestData = {
                location: locationString,
                status: "pending",
            };

            console.log(requestData)

            const response = await axios.post(`${API_URL}/incidents`, requestData);
            console.log("Incident created:", response.data);

            if (!supported) {
                Alert.alert("Error", "Phone call not supported on this device.");
            } else {
                await Linking.openURL(phoneNumber);
            }
        }
        catch (error) {
            console.error("An error occurred", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

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
                setLoading(false);
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };

        fetchLocation();
    }, []);

    return (
        <Layout>
            <View className="flex-1">
                <View className="w-full h-40 bg-gray-200 rounded-md mb-6 p-4">
                    <Text className="text-center">Save Your life</Text>
                </View>

                <View className="w-full h-96 bg-gray-200 mb-20 rounded-md">
                    {loading ? (
                        <View className="flex-1 justify-center items-center ">
                            <ActivityIndicator size="large" color="#ff5733" />
                        </View>
                    ) : (
                        <>
                            <View className="w-full h-96">
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
                        </>
                    )}
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