import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const WaterResourceScreen = ({ route, navigation }) => {
  // Get location passed from previous screen
  const { location } = route.params;
  console.log(location);
  
  // States
  const [radius, setRadius] = useState('5000');
  const [waterResources, setWaterResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(true);
  
  // Overpass API endpoint
  const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
  
  // Initial region based on passed location
  const initialRegion = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  // Fetch water resources directly from Overpass API
  const fetchWaterResources = async () => {
    const radiusValue = parseInt(radius) || 5000;
    
    // Create Overpass QL query
    const query = `
      [out:json];
      (
        node["natural"="water"](around:${radiusValue},${location.latitude},${location.longitude});
        way["natural"="water"](around:${radiusValue},${location.latitude},${location.longitude});
        relation["natural"="water"](around:${radiusValue},${location.latitude},${location.longitude});
      );
      out center;
    `;
    
    try {
      setLoading(true);
      
      const response = await fetch(OVERPASS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data.elements && data.elements.length > 0) {
        // Process the raw Overpass API data
        const processedResources = data.elements.map(element => {
          const resource = {
            id: element.id,
            type: element.type,
            name: element.tags?.name || 'Unnamed Water Body',
          };
          
          // Extract coordinates
          if (element.type === 'node') {
            resource.lat = element.lat;
            resource.lon = element.lon;
          } else if ((element.type === 'way' || element.type === 'relation') && element.center) {
            resource.lat = element.center.lat;
            resource.lon = element.center.lon;
          }
          
          return resource;
        }).filter(resource => resource.lat && resource.lon); // Filter out elements without coordinates
        
        setWaterResources(processedResources);
      } else {
        Alert.alert('Info', 'No water resources found in this area');
        setWaterResources([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch water resources');
      console.error('Error fetching water resources:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch water resources when screen loads
  useEffect(() => {
    fetchWaterResources();
  }, []);

  // Toggle between map and list view to help with performance
  const toggleView = () => {
    setShowMap(!showMap);
  };

  // Render a water resource item in the list
  const renderItem = ({ item }) => (
    <View style={styles.resourceItem}>
      <Text style={styles.resourceName}>{item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Location: {item.lat.toFixed(5)}, {item.lon.toFixed(5)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.radiusInput]}
          placeholder="Radius (meters)"
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={fetchWaterResources}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Find Water</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleView}>
        <Text style={styles.toggleButtonText}>
          {showMap ? "Show List View" : "Show Map View"}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading water resources...</Text>
        </View>
      ) : showMap ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
          >
            {/* Current location marker */}
            <Marker
              coordinate={location}
              title="Your Location"
              pinColor="red"
            />
            
            {/* Water resource markers */}
            {waterResources.map((resource, index) => (
              <Marker
                key={`${resource.id || index}`}
                coordinate={{
                  latitude: parseFloat(resource.lat),
                  longitude: parseFloat(resource.lon),
                }}
                title={resource.name}
                description={`Type: ${resource.type}`}
                pinColor="blue"
              />
            ))}
          </MapView>
        </View>
      ) : (
        <FlatList
          data={waterResources}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id || index}`}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No water resources found</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  radiusInput: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#444',
  },
  listContainer: {
    padding: 10,
  },
  resourceItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});

export default WaterResourceScreen;