import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import Layout from '../components/Layout'
import * as Location from 'expo-location';
import fireTruckIcon from '../assets/fire_truck.png';
import axios from 'axios';

const MapScreen = () => {

    const route = useRoute();
    const { incident } = route.params;
    const [latitude, longitude] = incident.coordinates.split(" ").map(Number)

    const [liveLocation, setLiveLocation] = useState({ latitude, longitude })
    const [routeCoords, setRouteCoords] = useState([]);

    useEffect(() => {
        let locationSubscription;

        const fetchCurrentLocation = async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 3000,
                    distanceInterval: 5,
                },
                async (location) => {
                    const newLocation = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    setLiveLocation(newLocation);
                    await fetchRoute(newLocation);
                }
            );
        };

        fetchCurrentLocation();

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, []);

    const fetchRoute = async (newLocation) => {
        try {
            const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${newLocation.longitude},${newLocation.latitude};${longitude},${latitude}?geometries=geojson`;

            const response = await axios.get(osrmUrl);

            if (response.data.routes && response.data.routes.length > 0) {
                const route = response.data.routes[0].geometry.coordinates.map(([lng, lat]) => ({
                    latitude: lat,
                    longitude: lng
                }));
                setRouteCoords(route);
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    return (
        <Layout>
            <View className="flex-1 p-4">
                <Text className="text-center font-bold text-xl mb-2">Live Location</Text>
                <View className="flex-1 mb-4">
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude, longitude }}
                            title={incident.place}
                        />

                        <Marker coordinate={liveLocation} title="Fire Truck">
                            <Image
                                source={fireTruckIcon}
                                className="w-12 h-12"
                                style={{ resizeMode: "contain" }}
                            />
                        </Marker>

                        {routeCoords.length > 0 && (
                            <Polyline
                                coordinates={routeCoords}
                                strokeWidth={6}
                                strokeColor="#FF4500"
                            />
                        )}

                    </MapView>
                </View>


                <View className="p-4 bg-white rounded-md">
                    <Text className="text-xl font-bold">{incident.place}</Text>
                    <Text className="text-gray-500">{incident.note}</Text>
                </View>
            </View>
        </Layout>
    )
}

export default MapScreen
