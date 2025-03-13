import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import Layout from '../components/Layout';
import { API_URL } from '../lib/api.js';
import ActiveIncidents from '../components/ActiveIncidents.jsx';
import HelpNumbers from '../components/HelpNumbers.jsx';
import Quote from '../components/Quote.jsx';
import Map from '../components/Map.jsx';

const UserHome = () => {

    return (
        <Layout>
            <SafeAreaView className="flex-1">
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Quote />

                            <Map />

                            <ActiveIncidents />

                            <HelpNumbers />
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />

            </SafeAreaView>
        </Layout >
    );
};


export default UserHome;