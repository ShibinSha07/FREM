import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Layout = ({ children }) => {
    const navigation = useNavigation();
    const route = useRoute();

    const isHomeScreen = route.name === 'UserHome';

    return (
        <View className="flex-1 mt-5">

            <View className="px-4 mt-2 flex-row justify-between items-center">
                <View>
                    {isHomeScreen ? (
                        <Image source={require('../assets/fire_logo.png')} className="w-10 h-10" />
                    ) : (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/back_icon.png')} className="w-6 h-6" />
                        </TouchableOpacity>
                    )}
                </View>

                <View>
                    <Text className="font-bold text-xl">FREM User</Text>
                </View>

                {/* <View className="flex-row gap-x-2">
                    <TouchableOpacity>
                        <Image source={require('../assets/icon_gear.png')} className="w-6 h-6" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/icon_bell.png')} className="w-6 h-6" />
                    </TouchableOpacity>
                </View> */}
            </View>

            <View className="flex-1 px-4 pt-4">
                {children}
            </View>

            <View className="h-20 flex-row justify-around items-center border-t border-gray-300">
                <TouchableOpacity onPress={() => navigation.navigate('UserHome')}>
                    <Image source={require('../assets/icon_home.png')} className="w-8 h-8" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('FirstAid')}>
                    <FontAwesome5 name="hand-holding-medical" size={24} color="#ff1b38" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Layout
