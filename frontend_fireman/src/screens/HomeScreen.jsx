import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { API_URL } from '../lib/api';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

    const [incidents, setIncidents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchIncidents = async () => {
            try {
                const response = await axios.get(`${API_URL}/incidents`)
                const pendingIncidents = response.data.filter(inc => inc.status.toLowerCase() === 'pending')
                setIncidents(pendingIncidents)
            } catch (error) {
                console.error("error in fetching incidents", error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchIncidents();
    }, [])

    return (
        <Layout>
            <View className="flex-1 px-4 pt-4">
                <View className="w-full bg-red-100 border border-red-500 rounded-md mb-6 p-4">
                    <Text className="text-center font-bold mb-2 text-xl">Our Vision</Text>
                    <Text className='text-center'>Minimize the response time in urban and rural areas by increasing the number of Fire & Rescue Stations and mobility profile of the Department.
                    </Text>
                </View>

                <View className="flex-1">
                    <Text className="text-xl font-bold mb-4">Pending Incidents</Text>
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
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('MapScreen', { incident: item })
                                    }
                                >
                                    <View className="w-full bg-white p-4 rounded-md shadow-md mb-4">
                                        <Text className="text-lg font-bold">{item.place}</Text>
                                        <Text className="text-gray-500">Note: {item.note}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>

                <TouchableOpacity
                    className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
                    onPress={() => navigation.navigate('WaterResourceScreen')}
                >
                    <MaterialIcons name="water-drop" size={28} color="white" />
                </TouchableOpacity>

            </View>
        </Layout>
    );
};

export default HomeScreen;
