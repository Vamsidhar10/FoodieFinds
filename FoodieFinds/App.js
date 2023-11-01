
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthScreen from './Components/Authentication.js';
import Home from './Components/Home.js';
import RestaurantDetails from './Components/RestaurantDetails.js';
import { FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import Favorites from './Components/Favorites.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function App() {
const [user, setUser]=useState(null)
const getUser = async()=>{
    const user = await AsyncStorage.getItem("@user");
    setUser(user);
    console.log(user);
  }
// useEffect(async()=>{
//   await getUser();
//   return setUser(null)
// },[])
  return (
    <NavigationContainer>
         <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Auth') {
              iconName = 'google';
            } else if (route.name === 'RestaurantDetails') {
              iconName = 'silverware';
            }
            else if (route.name === 'Favorites'){
              iconName = 'star';
            }

            // You can customize the icon size and color here
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })} initialRouteName='Home'
      >
        {<Tab.Screen name="Auth" component={AuthScreen}/> }
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="RestaurantDetails" component={RestaurantDetails}/>
        <Tab.Screen name="Favorites" component={Favorites} />
        {/* Add other screens and navigation options here */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
