import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const WaterResourceScreen = () => {

    const [location, setLocation] = useState(null)
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    console.error("Permission to access location was denied");
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });

            } catch (error) {
                console.error("error in fetching the current location:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLocation();
    }, [])

    const fetchWaterResources = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=water&bounded=1&viewbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}`;

        try {
            const response = await fetch(url, {
                headers: {
                    "User-Agent": "YourAppName/1.0 (frem@gmail.com)",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return data.map((place) => ({
                name: place.display_name,
                lat: parseFloat(place.lat),
                lon: parseFloat(place.lon),
            }));
        } catch (error) {
            console.error("Error fetching water resources:", error.message);
            return [];
        }
    };

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            fetchWaterResources(location.latitude, location.longitude)
                .then((data) => {
                    setResources(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [location]);

    return (
        <Layout>
            <Text className="text-lg font-semibold text-center">Nearby Water Resources</Text>

            {loading ? (
                <View className="flex-1 items-center justify-center bg-gray-100">
                    <ActivityIndicator size="large" color="orange" />
                    <Text className="text-lg text-blue-600 mt-4">Fetching water resources...</Text>
                </View>
            ) : (
                <View className="flex-1 mb-2">
                    <MapView
                        style={{ flex: 1, height: 500, width: "100%", marginTop: 10 }}
                        region={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            title="Your Location"
                            pinColor="red"
                        />

                        {resources.map((res, index) => (
                            <Marker key={index} coordinate={{ latitude: res.lat, longitude: res.lon }} title={res.name} pinColor="#3498db" />
                        ))}

                    </MapView>
                </View>
            )}
        </Layout>
    );
};

export default WaterResourceScreen;