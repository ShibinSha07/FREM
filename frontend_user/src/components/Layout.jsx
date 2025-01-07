import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const Layout = ({ children }) => {

  const navigation = useNavigation();
  const route = useRoute();

  // Check if the current route is the home page
  const isHomeScreen = route.name === 'UserHome';

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          {isHomeScreen ? (
            <Image source={require('../assets/fire_logo.png')} style={styles.tinyLogo} />
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../assets/back_icon.png')} style={styles.backIcon} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.right}>
          <TouchableOpacity>
            <Image source={require('../assets/icon_gear.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/icon_bell.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {children}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('UserHome')}>
          <Image source={require('../assets/icon_home.png')} style={styles.image1} />
        </TouchableOpacity >

        <TouchableOpacity>
          <Image source={require('../assets/icon_profile.png')} style={styles.image2} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // backgroundColor: '#ffffff'
    // padding: 15,

  },
  header: {
    marginBottom: 10,
    padding: 15,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red'

  },
  right: {
    flexDirection: 'row',
    gap: 10
  },
  tinyLogo: {
    height: 40,
    width: 40,
  },

  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    // padding: 15,
  },
  footer: {
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    // position: 'absolute', // Fixes the footer to the bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    // gap: 20,
    borderTopWidth: 0.5, // Adds a border above the footer
    borderTopColor: '#e0e0e0',
    // backgroundColor: '#ffffff',
  },
  image1: {
    width: 30,
    height: 30,
  },
  image2: {
    width: 30,
    height: 30,
  }
})