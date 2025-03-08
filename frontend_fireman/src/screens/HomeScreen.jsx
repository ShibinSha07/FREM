import { Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import Layout from '../components/Layout';

const HomeScreen = ({ navigation }) => {

    return (
        <Layout>
            <View className="flex-1 items-center p-4">
                <Text>this is the HomeScreen</Text>
                {/* <TouchableOpacity className="bg-gray-100 rounded-lg h-48 w-full p-4 shadow-md">
                    <Text className="text-gray-800 text-lg font-bold">No task</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ActiveScreen')}>
                        <Image className="h-24 w-24 ml-24" source={require('../assets/reload.png')} />
                    </TouchableOpacity>
                </TouchableOpacity> */}
            </View>
        </Layout>
    );
};

export default HomeScreen;
