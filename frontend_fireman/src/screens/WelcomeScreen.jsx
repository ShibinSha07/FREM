import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/fire_logo.png')}
        />
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

})