import React from 'react';
import { View, Text, Image, StyleSheet,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({ restaurant}) => {
  const categories = restaurant.categories.map((category) => category.title).join(', ');
  const reviewCount = restaurant.review_count;
  const rating = restaurant.rating;
   const navigation = useNavigation();
  
  const goToDetails = () => {
    // Navigate to the restaurant details screen
    navigation.navigate('RestaurantDetails', { restaurant });
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image_url }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.tags}>{categories}</Text>
        <Text style={styles.rating}>
          {`${rating} ★ (${reviewCount} reviews)`}
        </Text>
        <Text style={styles.address}>{restaurant.location.address1}</Text>
        <View style={styles.button}>
          <Button  title='View Details' onPress={()=>goToDetails()}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ececec',
  },
  infoContainer: {
    width: '70%',
    flexDirection: 'column',
    padding: 10,
    marginLeft: 13
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tags: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    marginBottom: 7,
    color: '#ffaa00', // Gold color
  },
  address: {
    fontSize: 14,
    color: '#888',
    marginBottom:1
  },
  button: {
    borderRadius: 6,
    alignItems: 'center',
    padding: 10,
    marginLeft:3
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    marginLeft: 7,
    width: 130,
    height: 180,
  },
});

export default RestaurantCard;
