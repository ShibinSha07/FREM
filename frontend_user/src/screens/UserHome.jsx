import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const App = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Image
                    source={require('../assests/fire_rescue_logo.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.title}>FREM</Text>
            </View>

            {/* Location Button */}
            <View style={styles.locationButtonContainer}>
                <Button title="Turn on Location" color="blue" onPress={handleLocationFetch} />
            </View>

            {/* Emergency Call Button */}
            <TouchableOpacity style={styles.emergencyButton}>
                <Text style={styles.emergencyButtonText}>Emergency Call</Text>
            </TouchableOpacity>

            {/* MapView */}

            <View style={styles.mapContainer}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
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
        color: 'white',
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