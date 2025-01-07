import { StyleSheet, Text, TouchableOpacity,Image, View } from 'react-native';
import React from 'react';
import Layout from '../components/Layout';

const HomeScreen = ({ navigation }) => {
    return (
        <Layout>
            <View style={styles.container}>
                <TouchableOpacity style={styles.task}>
                    <Text style={styles.taskText}>No task</Text>
                    <TouchableOpacity  onPress={() => navigation.navigate('ActiveScreen')}>
                        <Image style={styles.reload} source={require('../assets/reload.png')}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </Layout>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#f5f5f5', // Light gray background
        padding: 16,
    },
    task: {
        backgroundColor: '#f5f5f5', // White background for the task view
        borderRadius: 10, // Rounded corners
        height: 200,
        width: '100%',
        padding: 16, // Padding inside the task view
        // shadowColor: '#000', // Shadow for elevation effect
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        elevation: 3, // Elevation for Android shadow
    },
    reload: {
        height: 100,
        width:100,
        marginLeft: 100,
    },
    taskText: {
        color: '#333', // Darker gray for text
        fontSize: 18,
        fontWeight: 'bold',
    },
});
