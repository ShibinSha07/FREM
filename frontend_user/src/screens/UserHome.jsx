import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking, Button, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Layout from '../components/Layout';
import { API_URL } from '../lib/api.js';
const App = ({ navigation }) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const makeCall = async () => {
        try {
            console.log("making call")
            // Step 1: Get the user's location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission denied", "Location permission is required.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Step 2: Format the data for the API
            const locationString = `POINT(${longitude} ${latitude})`; // Required format
            const requestData = {
                location: locationString,
                status: "pending", // Replace with appropriate status value
            };

            // Step 3: Send location to the database
            const response = await axios.post(`${API_URL}/incidents`, requestData);
            console.log(response)
            console.log("Incident created:", response.data);
            console.log("incident added")

            // Step 4: Make the call
            const phoneNumber = "tel:8281396739";
            const supported = await Linking.canOpenURL(phoneNumber);

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

    const handleLocationFetch = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    useEffect(() => {
        handleLocationFetch();
    },);

    return (
        <Layout>
            <View style={styles.container}>

                {/* MapView */}
                <View style={styles.mapContainer}>

                    {/* Emergency Call Button */}
                    <TouchableOpacity style={styles.emergencyButton} onPress={makeCall}>
                        <Text style={styles.emergencyButtonText}>Emergency Call</Text>
                    </TouchableOpacity>
                    <MapView


                        style={styles.map}
                        initialRegion={{
                            latitude: location ? location.coords.latitude : 10.5545,
                            longitude: location ? location.coords.longitude : 76.2247,
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
                                : null
                        }
                    >


                        {/* User Location Marker */}
                        {location && (
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

                {/* Action Buttons */}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.mapButton}>
                        <Text style={styles.emergencyButtonText}>Nearest Fire Stations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.locateButton} onPress={() => navigation.navigate('Locate')}>
                        <Text style={styles.emergencyButtonText}>Locate Fire Vehicle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Layout >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        // color: 'white',
    },
    locationButtonContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    emergencyButton: {
        backgroundColor: 'red',
        paddingVertical: 15,
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    emergencyButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mapContainer: {
        flex: 1,
        height: '50%',
        marginTop: 150
    },
    map: {
        flex: 1,
    },
    buttonGroup: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    mapButton: {
        backgroundColor: '#0061FF',
        paddingVertical: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    locateButton: {
        backgroundColor: 'green',
        paddingVertical: 15,
        borderRadius: 5,
    },
});

export default App;