import React, { useEffect, useState,useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, Linking, TouchableOpacity, FlatList,Dimensions } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { addFavoriteToDB } from './FirestoreHandler';
import {RestaurantContext} from './RestaurantContext';
import RestaurantRatingCommentInput from './RatingCommentInput';


const RestaurantDetails = () => {
  
  const navigation = useNavigation();
  const apiKey = process.env.EXPO_PUBLIC_YELP_API_KEY;
  const [restaurantDetails, setRestaurantDetails] = useState({"alias": "the-elm-bloomington", "categories": [{"alias": "newamerican", "title": "New American"}], "coordinates": {"latitude": 39.161246325212296, "longitude": -86.52629759999999}, "display_phone": "(812) 407-4339", "hours": [{"hours_type": "REGULAR", "is_open_now": false, "open": [Array]}], "id": "UnS087E_cYstvT0HJO8Ycw", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/Lffg2EFgd2B2xwn2a15ZQA/o.jpg", "is_claimed": true, "is_closed": false, "location": {"address1": "614 E 2nd St", "address2": "", "address3": null, "city": "Bloomington", "country": "US", "cross_streets": "", "display_address": ["614 E 2nd St", "Bloomington, IN 47401"], "state": "IN", "zip_code": "47401"}, "messaging": {"url": "https://www.yelp.com/raq/UnS087E_cYstvT0HJO8Ycw?adjust_creative=XUJZ7EXQV4av9HuQtef3Nw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=XUJZ7EXQV4av9HuQtef3Nw#popup%3Araq", "use_case_text": "Message the Business"}, "name": "The Elm", "phone": "+18124074339", "photos": ["https://s3-media3.fl.yelpcdn.com/bphoto/Lffg2EFgd2B2xwn2a15ZQA/o.jpg", "https://s3-media2.fl.yelpcdn.com/bphoto/LzHk0G4WyApC1XS9rz3j-Q/o.jpg", "https://s3-media4.fl.yelpcdn.com/bphoto/4UXAzV-oUM89fUAY7RSXfQ/o.jpg"], "rating": 4.5, "review_count": 57, "transactions": [], "url": "https://www.yelp.com/biz/the-elm-bloomington?adjust_creative=XUJZ7EXQV4av9HuQtef3Nw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=XUJZ7EXQV4av9HuQtef3Nw"});
  const {restaurant, setRestaurant} = useContext(RestaurantContext);
  console.log("Received id: " + restaurant.id);
  // const onScreenFocus = () => {
  //   if (!restaurant?.id) {
  //  Alert.alert("Please select a restaurant in Home to view details");
  //  navigation.navigate('Home');
  // }
  // };

  // useFocusEffect(onScreenFocus);

  // useEffect(() => {
  //   console.log("in details");
  //   if (!restaurant?.id) {
  // Alert.alert("Please select a restaurant in Home to view details");
  //  navigation.navigate('Home');
  //  return;
  // }
  // },[0]);
   
  async function fetchBusinessDetails() {
    if(!restaurant?.id){
      return;
    }
    try {
      const response = await axios.get(`https://api.yelp.com/v3/businesses/${restaurant.id}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Replace YOUR_API_KEY_HERE with your actual Yelp API key
        },
      });
      setRestaurantDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  }

  // if(restaurantDetails==null || restaurantDetails==undefined || restaurant.id!=restaurantDetails.id){
  //   fetchBusinessDetails();
  // }
  
  // useEffect(() => {
  //   if (!route.params) {
  //     Alert.alert("Please select a restaurant in Home to view details");
  //     return goToHome();
  //   }

  //   const { restaurant } = route.params;
  //   console.log("Received params:{}", route.params)

  //   // Fetch restaurant details from Yelp Fusion API
  //   // axios
  //   //   .get(`https://api.yelp.com/v3/businesses/${restaurant.Id}`, {
  //   //     headers: {
  //   //       Authorization: `Bearer ${apiKey}`,
  //   //     },
  //   //   })
  //   //   .then((response) => {
  //   //     setRestaurantDetails(response.data);
  //   //     console.log(response.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('Error fetching restaurant details:', error);
  //   //   });
  //  setRestaurantDetails({"alias": "cardinal-spirits-bloomington-3", "categories": [{"alias": "cocktailbars", "title": "Cocktail Bars"}, {"alias": "distilleries", "title": "Distilleries"}, {"alias": "newamerican", "title": "New American"}], "coordinates": {"latitude": 39.15619, "longitude": -86.53662}, "display_phone": "(812) 202-6789", "hours": [{"hours_type": "REGULAR", "is_open_now": false, "open": [Array]}], "id": "zMWjsqs6H6jiLaDcKq6g4w", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/U3UBBRjxiDnYgoUH-W10ow/o.jpg", "is_claimed": true, "is_closed": false, "location": {"address1": "922 S Morton St", "address2": "", "address3": "", "city": "Bloomington", "country": "US", "cross_streets": "", "display_address": ["922 S Morton St", "Bloomington, IN 47403"], "state": "IN", "zip_code": "47403"}, "name": "Cardinal Spirits", "phone": "+18122026789", "photos": ["https://s3-media2.fl.yelpcdn.com/bphoto/U3UBBRjxiDnYgoUH-W10ow/o.jpg", "https://s3-media2.fl.yelpcdn.com/bphoto/rOwuJxCzNr4C23uj_jD2-g/o.jpg", "https://s3-media3.fl.yelpcdn.com/bphoto/MXfCP-_MVjLqtrCjajR_pA/o.jpg"], "price": "$$", "rating": 4.5, "review_count": 226, "transactions": [], "url": "https://www.yelp.com/biz/cardinal-spirits-bloomington-3?adjust_creative=XUJZ7EXQV4av9HuQtef3Nw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=XUJZ7EXQV4av9HuQtef3Nw"});
  // }, []);

    

  const openWebsite = () => {
    if (restaurantDetails) {
      Linking.openURL(restaurantDetails.url);
    }
  };

  const goToReviews = ()=>{
    navigation.navigate('Reviews');
  }

  const addFavorite = async () => {
    if(restaurantDetails){
    await addFavoriteToDB(navigation,restaurantDetails);
   // Alert.alert("Added to Favorites successfully");
    }
  }

  const handleRatingCommentSubmit = ({ rating, comment }) => {
    // Implement logic to send the rating and comment to your server or store them locally.
    // You can also update the UI to display the user's rating and comment.
    console.log(`Rating: ${rating}, Comment: ${comment}`);
  };



  return (restaurantDetails?
        <View style={styles.container}>
        <View>
          {console.log(restaurantDetails)}
        <FlatList  data={restaurantDetails.photos} 
        renderItem={
            ({item}) => <View><Image source={{ uri: item }} style={styles.photo}/></View>} 
            pagingEnabled={true} horizontal={true} />
        </View>
        

      <ScrollView style={styles.detailsContainer}>
        {/* <Text style={styles.name}>{restaurantDetails.name || ''}</Text> */}
        <TouchableOpacity onPress={openWebsite}>
            <Text style={styles.name}>{restaurantDetails.name || ''}</Text>
          </TouchableOpacity>
        <Text style={styles.categories}>
          {restaurantDetails.categories
            ? restaurantDetails.categories.map((category) => category.title).join(', ')
            : ''}
        </Text>
        <TouchableOpacity onPress={goToReviews}>
          <Text style={styles.rating}>
            {`${restaurantDetails.rating || 0} ★ (${restaurantDetails.review_count || 0} reviews)`}
          </Text>
        </TouchableOpacity>
        <Text style={styles.price}>{`Price: ${restaurantDetails.price?restaurantDetails.price:'Unavailable'}`}</Text>
        <Text style={styles.address}>{`Address: ${restaurantDetails.location?.address1 || ''}, ${restaurantDetails.location?.city || ''}, ${restaurantDetails.location?.state || ''} ${restaurantDetails.location?.zip_code || ''}`}</Text>
        <Text style={styles.phone}>{`Phone: ${restaurantDetails.display_phone || ''}`}</Text>
        {/* <Text style={styles.distance}>{`Distance: ${restaurantDetails.distance.toFixed(2)} meters`}</Text> */}
        <TouchableOpacity style={styles.websiteButton} onPress={addFavorite}>
            <Text style={styles.websiteButtonText}>Add to Favorites</Text>
          </TouchableOpacity>
          {/* <RestaurantRatingCommentInput onSubmit={handleRatingCommentSubmit} /> */}
      </ScrollView>
    </View>: <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  buttonsContainer:{
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  photo: {
    width: Dimensions.get("window").width,
    height: 400,
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
    color:'#2196F3',
    textDecorationLine: 'underline'
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
    marginTop: 5,
    backgroundColor: '#2196F3',
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
