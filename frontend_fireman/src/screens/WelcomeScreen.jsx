import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {


  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => navigation.navigate('LoginScreen')}>
      <Image
        source={require('../assets/fire_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>FREM</Text> 

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whigrayte',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginTop: '200',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black'
  },
});