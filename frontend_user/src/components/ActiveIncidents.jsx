import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/api';

const ActiveIncidents = () => {

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/incidents`);
            const pendingIncidents = response.data.filter(incident => incident.status.toLowerCase() === 'pending');
            setIncidents(pendingIncidents);
        } catch (err) {
            console.error('Error fetching incidents:', err);
            setError('Failed to load incidents. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1">
            <Text className="text-xl font-bold mb-4">Accidents Reported Near You.</Text>

            {loading ? (
                <View className="h-5/6 justify-center items-center bg-gray-200 rounded-md">
                    <ActivityIndicator size="large" color="#FF4500" />
                </View>
            ) : incidents.length === 0 ? (
                <Text>No pending incidents found.</Text>
            ) : (
                <FlatList
                    data={incidents}
                    keyExtractor={(item) => item.id.toString()}
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View className="w-full bg-white p-4 rounded-md shadow-md mb-4">
                                <Text className="text-lg font-bold">{item.place}</Text>
                                <Text className="text-gray-500">Note: {item.note}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default ActiveIncidents;
