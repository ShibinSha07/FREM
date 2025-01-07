import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/fire_logo.png')} />
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.btnText}>Go to Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Light gray background for better contrast
  },
  logo: {
    width: 250, // Adjust to fit the design
    height: 250,
    marginBottom: 200,
  },
  btn: {
    backgroundColor: '#1e90ff', // Nice blue color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Adds shadow for Android
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
