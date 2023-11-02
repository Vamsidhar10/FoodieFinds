import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, FlatList,Image } from 'react-native';
import { fetchFavoritesForUser } from './FirestoreHandler';
import { useNavigation } from '@react-navigation/native';



const Favorites = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      const userFavorites = await fetchFavoritesForUser(navigation);
      console.log(userFavorites);
      // Parse the restaurantDetails property of each favorite
      setFavorites(userFavorites);
    };

    fetchUserFavorites();
  }, [navigation]);

  return favorites ? (
<View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.restaurant_details.image_url }} style={styles.image} />
            <Text style={styles.name}>{item.restaurant_details.name}</Text>
            <Text style={styles.rating}>Rating: {item.restaurant_details.rating}</Text>
            <Text style={styles.price}>Price: {item.restaurant_details.price}</Text>
          </View>
        )}
      />
    </View>
  ):<View><Text>Loading..</Text></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
  },
});
export default Favorites;
