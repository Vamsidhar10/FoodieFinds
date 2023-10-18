import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,alert, Alert } from 'react-native';



const Home = () => {

    return (
        <View style={styles.container}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>FoodieFinds Home!</Text>
        </View>
      );
}



export default Home;




const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      },
      logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
      }
    });