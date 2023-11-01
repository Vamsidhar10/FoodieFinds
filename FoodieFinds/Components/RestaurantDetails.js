import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const RestaurantDetails = ({ route }) => {
  const apiKey = process.env.EXPO_PUBLIC_YELP_API_KEY;
  const navigation = useNavigation();
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  // Function to navigate back to the "Home" screen
  const goToHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (!route.params || !route.params.restaurant) {
      Alert.alert("Please select a restaurant in Home to view details");
      return goToHome();
    }

    const { restaurant } = route.params;

    // Fetch restaurant details from Yelp Fusion API
    axios
      .get(`https://api.yelp.com/v3/businesses/${restaurant.id}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((response) => {
        setRestaurantDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching restaurant details:', error);
      });
  }, []);

  const openWebsite = () => {
    if (restaurantDetails) {
      Linking.openURL(restaurantDetails.url);
    }
  };

  return (restaurantDetails?
        <View style={styles.container}>

{/* <Carousel
        data={restaurantDetails.photos || []} // Use the photos from the provided object
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.photo} />
        )}
        sliderWidth={300}
        itemWidth={300}
      /> */}
      {/* <Image source={{ uri: restaurantDetails.image_url || '' }} style={styles.image} /> */}

      <ScrollView style={styles.detailsContainer}>
      {restaurantDetails.photos && restaurantDetails.photos.map((photo, index) => (
  <Image key={index} source={{ uri: photo }} style={styles.photo} />
))}
        <Text style={styles.name}>{restaurantDetails.name || ''}</Text>
        <Text style={styles.categories}>
          {restaurantDetails.categories
            ? restaurantDetails.categories.map((category) => category.title).join(', ')
            : ''}
        </Text>
        <Text style={styles.rating}>
          {`${restaurantDetails.rating || 0} ★ (${restaurantDetails.review_count || 0} reviews)`}
        </Text>
        <Text style={styles.price}>{`Price: ${restaurantDetails.price || ''}`}</Text>
        <Text style={styles.address}>{`Address: ${restaurantDetails.location?.address1 || ''}, ${restaurantDetails.location?.city || ''}, ${restaurantDetails.location?.state || ''} ${restaurantDetails.location?.zip_code || ''}`}</Text>
        <Text style={styles.phone}>{`Phone: ${restaurantDetails.display_phone || ''}`}</Text>
        {/* <Text style={styles.distance}>{`Distance: ${restaurantDetails.distance.toFixed(2)} meters`}</Text> */}
        {restaurantDetails.url && (
          <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
            <Text style={styles.websiteButtonText}>Visit Website</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>: <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 200,
  },
  photo: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categories: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  rating: {
    fontSize: 20,
    color: '#ffaa00',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
  },
  phone: {
    fontSize: 16,
    marginBottom: 10,
  },
  distance: {
    fontSize: 16,
    marginBottom: 10,
  },
  websiteButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  websiteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RestaurantDetails;
