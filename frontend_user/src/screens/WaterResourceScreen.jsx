import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

// if (typeof global === 'undefined') {
//     global = window;
//   }

import MarkerClusterer from 'react-native-maps-clustering';


const WaterResourcesScreen = ({ route }) => {
    // Get location from previous screen
    const { location } = route.params;

    const [region, setRegion] = useState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [waterResources, setWaterResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchRadius, setSearchRadius] = useState(5000); // Default 5000m (5km)
    const mapRef = useRef(null);

    // Initial fetch when component mounts
    useEffect(() => {
        fetchWaterResources();
    }, []);

    // Function to fetch water resources from Overpass API
    const fetchWaterResources = async () => {
        setLoading(true);
        
        try {
            const overpassQuery = `
                [out:json];
                (
                    node["natural"="water"](around:${searchRadius}, ${region.latitude}, ${region.longitude});
                    way["natural"="water"](around:${searchRadius}, ${region.latitude}, ${region.longitude});
                    relation["natural"="water"](around:${searchRadius}, ${region.latitude}, ${region.longitude});
                );
                out center;
            `;
            
            const response = await axios.get('https://overpass-api.de/api/interpreter', {
                params: { data: overpassQuery },
                timeout: 10000
            });
            
            if (!response.data.elements || response.data.elements.length === 0) {
                Alert.alert("No Results", "No water resources found in this area.");
                setWaterResources([]);
                setLoading(false);
                return;
            }
            
            // Process and format the water resources
            const resources = response.data.elements.map(element => {
                let coordinates = {};
                
                if (element.type === 'node') {
                    coordinates = {
                        lat: element.lat,
                        lon: element.lon
                    };
                } else if (element.type === 'way' || element.type === 'relation') {
                    if (element.center) {
                        coordinates = {
                            lat: element.center.lat,
                            lon: element.center.lon
                        };
                    }
                }
                
                return {
                    id: element.id,
                    type: element.type,
                    name: element.tags?.name || "Unnamed Water Body",
                    ...coordinates
                };
            }).filter(resource => resource.lat && resource.lon);
            
            setWaterResources(resources);
        } catch (error) {
            console.error("Error fetching water resources:", error);
            Alert.alert("Error", "Failed to fetch water resources. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Search location using OpenStreetMap Nominatim API
    const searchLocation = async () => {
        if (!searchQuery || searchQuery.length < 3) {
            Alert.alert("Invalid Search", "Please enter at least 3 characters.");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search`,
                {
                    params: {
                        format: 'json',
                        q: searchQuery,
                        limit: 1
                    }
                }
            );
            
            if (response.data && response.data.length > 0) {
                const location = response.data[0];
                const newRegion = {
                    latitude: parseFloat(location.lat),
                    longitude: parseFloat(location.lon),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                
                setRegion(newRegion);
                mapRef.current?.animateToRegion(newRegion);
                
                // Fetch water resources for this new location
                fetchWaterResources();
            } else {
                Alert.alert("Location Not Found", "Could not find the location. Please try a different search term.");
            }
        } catch (error) {
            console.error("Error searching location:", error);
            Alert.alert("Error", "Failed to search location. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search location"
                    onSubmitEditing={searchLocation}
                />
                <TextInput
                    style={styles.input}
                    value={searchRadius.toString()}
                    onChangeText={(text) => setSearchRadius(parseInt(text) || 5000)}
                    placeholder="Radius (meters)"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchWaterResources}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Searching..." : "Find Water Resources"}
                    </Text>
                </TouchableOpacity>
            </View>
            
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                {/* User's location marker */}
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }}
                    title="Your Location"
                >
                    <View style={styles.userMarker}>
                        <MaterialIcons name="my-location" size={24} color="#1E88E5" />
                    </View>
                </Marker>
                
                {/* Search radius circle */}
                <Circle
                    center={{
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}
                    radius={searchRadius}
                    strokeWidth={1}
                    strokeColor="rgba(0, 100, 255, 0.3)"
                    fillColor="rgba(0, 100, 255, 0.1)"
                />
                
                {/* Water resources markers with clustering */}
                <MarkerClusterer>
                    {waterResources.map((resource, index) => (
                        <Marker
                            key={`${resource.type}-${resource.id || index}`}
                            coordinate={{
                                latitude: parseFloat(resource.lat),
                                longitude: parseFloat(resource.lon)
                            }}
                            title={resource.name}
                            description={`Lat: ${resource.lat}, Lon: ${resource.lon}`}
                        >
                            <View style={styles.waterMarker}>
                                <MaterialIcons name="water-drop" size={24} color="#29B6F6" />
                            </View>
                        </Marker>
                    ))}
                </MarkerClusterer>
            </MapView>
            
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#0066cc" />
                    <Text style={styles.loadingText}>Searching for water resources...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    inputContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        zIndex: 1,
    },
    input: {
        padding: 8,
        fontSize: 16,
        backgroundColor: 'white',
        borderRadius: 4,
        flex: 1,
        minWidth: 120,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    map: {
        flex: 1,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#0066cc',
    },
    userMarker: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        borderWidth: 2,
        borderColor: '#1E88E5',
    },
    waterMarker: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
        borderWidth: 2,
        borderColor: '#29B6F6',
    },
});

export default WaterResourcesScreen;