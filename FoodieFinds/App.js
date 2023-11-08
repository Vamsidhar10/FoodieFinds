
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
import { RestaurantContext } from './Components/RestaurantContext.js';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from './Components/UserProfile.js';
import Reviews from './Components/Reviews.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
const [restaurant,setRestaurant] = useState({"iam":"empty"}); 
const [user, setUser]=useState(null)
const getUser = async()=>{
    const user = await AsyncStorage.getItem("@user");
    setUser(user);
    console.log(user);
  }
  const RestaurantNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Restaurant Details" component={RestaurantDetails} />
        <Stack.Screen name ="Reviews" component={Reviews} />
        </Stack.Navigator>
    );
    };
// useEffect(async()=>{
//   await getUser();
//   return setUser(null)
// },[])
  return (
    <RestaurantContext.Provider value={{restaurant,setRestaurant}}>
    <NavigationContainer>
         <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HOME') {
              iconName = 'home';
            } else if (route.name === 'AUTH') {
              iconName = 'google';
            } else if (route.name === 'RestaurantDetails') {
              iconName = 'silverware';
            }
            else if (route.name === 'FAVORITES'){
              iconName = 'star';
            }
            else if (route.name === 'PROFILE'){
              iconName = 'account-circle';
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
        })} initialRouteName='Auth'
      >
        <Tab.Screen name="AUTH" component={AuthScreen} options={{headerShown: true,headerTitle:' Sign In / Sign Up' }}/>
        <Tab.Screen name="HOME" component={RestaurantNavigator} options={{headerShown: false}} />
        <Tab.Screen name="FAVORITES" component={Favorites} options={{headerTitle: 'Favorites'}} /> 
        <Tab.Screen name="PROFILE" component={UserProfile} options={{headerTitle: 'User Profile'}} /> 
        {/* Add other screens and navigation options here */}
      </Tab.Navigator>
    </NavigationContainer>
    </RestaurantContext.Provider>
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
