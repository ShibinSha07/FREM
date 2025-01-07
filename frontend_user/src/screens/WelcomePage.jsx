import React from 'react';
import { View, Text, Button, StyleSheet ,Image} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/fire_rescue_logo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>FREM</Text>
      <Text style={styles.subtitle}>Fire and Rescue Emergency Management</Text>

      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('UserHome')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 50, fontWeight: 'bold' ,color: 'white' },
});