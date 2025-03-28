import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";

const WaterResourceScreen = ({ route }) => {

    const { location } = route.params;
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWaterResources = async (latitude, longitude) => {
        console.log("Fetching water resources...");
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
        console.log(location)
        if (location) {
            fetchWaterResources(location.coords.latitude, location.coords.longitude).then(setResources);
        }
        setLoading(false);
    }, [location]);

    return (
        <Layout>
            <Text className="text-lg font-semibold text-center">Nearby Water Resources</Text>

            {loading ? (
                <View className="flex-1 items-center justify-center bg-gray-100">
                    <ActivityIndicator size="large" color="#2563eb" />
                    <Text className="text-lg text-blue-600 mt-4">Fetching water resources...</Text>
                </View>
            ) : (
                <View className="flex-1 mb-2">
                    <MapView
                        style={{ flex: 1, height: 500, width: "100%", marginTop: 10 }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="Your Location" pinColor="red" />

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