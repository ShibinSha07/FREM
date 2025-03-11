import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/api';

const ActiveIncidents = () => {

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
///

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/incidents`);
      console.log(response.date)
      
      // Filter pending incidents
      const pendingIncidents = response.data.filter(incident => 
        incident.status.toLowerCase() === 'pending'
      );
      
      setIncidents(pendingIncidents);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching incidents:', err);
      setError('Failed to load incidents. Please try again later.');
      setLoading(false);
    }
  };

  const renderIncident = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg p-4 mb-3 shadow-md border border-gray-200"
    >
      <View className="flex-row justify-between mb-2">
        <Text className="font-bold text-lg text-gray-800">Location: {item.place || 'Unknown'}</Text>
        {/* <Text className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
          {item.status}
        </Text> */}
      </View>
      
      <Text className="text-gray-600 mb-2">Coordinates: {item.coordinates}</Text>
      
      {/* {item.note && (
        <View className="bg-gray-50 p-2 rounded mt-1">
          <Text className="text-gray-700">{item.note}</Text>
        </View>
      )} */}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-3 text-gray-600">Loading incidents...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500">{error}</Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-500 py-2 px-4 rounded-lg"
          onPress={fetchIncidents}
        >
          <Text className="text-white font-medium">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">Pending Incidents</Text>
      
      {incidents.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No pending incidents found</Text>
        </View>
      ) : (
        <FlatList
          data={incidents}
          renderItem={renderIncident}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          className="w-full"
        />
      )}
    </View>
  );
};

export default ActiveIncidents; 