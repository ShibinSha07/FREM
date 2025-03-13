import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const Layout = ({ children }) => {

    const navigation = useNavigation();
    const route = useRoute();

    const isHomeScreen = route.name === 'HomeScreen';

    return (
        <View className="flex-1 mt-10">
            {/* Header */}
            <View className="flex-row justify-between items-center px-4">
                <View>
                    {isHomeScreen ? (
                        <Image source={require('../assets/fire_logo.png')} className="w-8 h-8" />
                    ) : (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/back_icon.png')} className="w-6 h-6" />
                        </TouchableOpacity>
                    )}
                </View>

                <View className="flex-row gap-4">
                    <TouchableOpacity>
                        <Image source={require('../assets/icon_gear.png')} className="w-6 h-6" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/icon_bell.png')} className="w-6 h-6" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <View className="flex-1">{children}</View>

            {/* Footer */}
            <View className="h-20 flex-row justify-around items-center border-t border-gray-300 bg-white">
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Image source={require('../assets/icon_home.png')} className="w-8 h-8" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={require('../assets/icon_profile.png')} className="w-8 h-8" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Layout;
