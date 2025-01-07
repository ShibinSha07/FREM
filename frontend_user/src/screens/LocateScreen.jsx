import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import * as Location from 'expo-location';

export default function LocateScreen ({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 10.5545,
    longitude: 76.2247,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const buildingLocation = { latitude: 10.5545, longitude: 76.2247 };
  const [vehicleLocation, setVehicleLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const getRoute = async (start, end) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=polyline`;
    try {
      const response = await axios.get(url);
      // console.log(response)
      const route = response.data.routes[0];
      // console.log(route)
      return route.geometry;
    } catch (error) {
      console.error('Error fetching route:', error);
      return null;
    }
  };

  const decodePolyline = (encoded) => {
    const points = polyline.decode(encoded);
    return points.map(([latitude, longitude]) => ({ latitude, longitude }));
  };

  const fetchAndSetRoute = async () => {
    const route = await getRoute(vehicleLocation, buildingLocation);
    if (route) {
      setRouteCoordinates(decodePolyline(route));
    }
  };

  const fetchLiveVehicleLocation = async () => {
    try {
      // Replace with the actual endpoint that provides live vehicle location
      // const response = await axios.get('https://mock-api-for-vehicle-location.com/vehicle');

      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log(status)

      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permissions are required to fetch the vehicle location.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      // console.log(location)

      const { latitude, longitude } = location.coords;
    //   console.log(latitude, longitude)

      setVehicleLocation({ latitude, longitude });
    } catch (error) {
      console.error('Error fetching live vehicle location:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveVehicleLocation();
    }, 1000); // Fetch live location every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (vehicleLocation) {
      fetchAndSetRoute();
    }
  }, [vehicleLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker coordinate={buildingLocation} title="Building" />
        
        {vehicleLocation && (
          <Marker coordinate={vehicleLocation} title="Vehicle" />
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});