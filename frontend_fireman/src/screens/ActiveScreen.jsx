import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import * as Location from 'expo-location';
import Layout from '../components/Layout';
import { API_URL } from '../lib/api';

export default function LocateScreen() {
  const [region, setRegion] = useState({
    latitude: 10.5545,
    longitude: 76.2247,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const vehicleLocation = { latitude: 10.555716, longitude: 76.223747 };
  const [incidentLocation, setIncidentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const getRoute = async (start, end) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=polyline`;
    try {
      const response = await axios.get(url);
      const route = response.data.routes[0];
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
    if (incidentLocation && vehicleLocation) {
      const route = await getRoute(vehicleLocation, incidentLocation);
      if (route) {
        setRouteCoordinates(decodePolyline(route));
      }
    }
  };

  const fetchLiveIncidentLocation = async () => {
    try {
      const response = await fetch(`${API_URL}/1/allocated`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.allocated) {
          setIncidentLocation({ latitude: data.latitude, longitude: data.longitude });
        } else {
          Alert.alert('No Incident', data.message || 'No allocation found.');
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error fetching live incident location:', error);
      Alert.alert('Error', 'Failed to fetch incident location.');
    }
  };

  useEffect(() => {
    fetchLiveIncidentLocation();
  }, []);

  useEffect(() => {
    fetchAndSetRoute();
  }, [incidentLocation]);

  return (
    <Layout>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker coordinate={vehicleLocation} title="Vehicle Location" />

          {incidentLocation && (
            <Marker coordinate={incidentLocation} title="Incident Location" />
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
    </Layout>
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
