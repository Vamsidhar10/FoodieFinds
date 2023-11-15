import React, { useState} from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import Restaurant from "../Components/Restaurant";
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('Food');
  const [location, setLocation] = useState('Bloomington,IN');
  const [businesses, setBusinesses] = useState([
    {
      "id": "zMWjsqs6H6jiLaDcKq6g4w",
      "alias": "cardinal-spirits-bloomington-3",
      "name": "Cardinal Spirits",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/U3UBBRjxiDnYgoUH-W10ow/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/cardinal-spirits-bloomington-3?adjust_creative=XUJZ7EXQV4av9HuQtef3Nw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XUJZ7EXQV4av9HuQtef3Nw",
      "review_count": 225,
      "categories": [
          {
              "alias": "cocktailbars",
              "title": "Cocktail Bars"
          },
          {
              "alias": "distilleries",
              "title": "Distilleries"
          },
          {
              "alias": "newamerican",
              "title": "American (New)"
          }
      ],
      "rating": 4.5,
      "coordinates": {
          "latitude": 39.15619,
          "longitude": -86.53662
      },
      "transactions": [],
      "price": "$$",
      "location": {
          "address1": "922 S Morton St",
          "address2": "",
          "address3": "",
          "city": "Bloomington",
          "zip_code": "47403",
          "country": "US",
          "state": "IN",
          "display_address": [
              "922 S Morton St",
              "Bloomington, IN 47403"
          ]
      },
      "phone": "+18122026789",
      "display_phone": "(812) 202-6789",
      "distance": 1379.187891803987
  },
  {
      "id": "UnS087E_cYstvT0HJO8Ycw",
      "alias": "the-elm-bloomington",
      "name": "The Elm",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/Lffg2EFgd2B2xwn2a15ZQA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/the-elm-bloomington?adjust_creative=XUJZ7EXQV4av9HuQtef3Nw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XUJZ7EXQV4av9HuQtef3Nw",
      "review_count": 57,
      "categories": [
          {
              "alias": "newamerican",
              "title": "New American"
          }
      ],
      "rating": 4.5,
      "coordinates": {
          "latitude": 39.161246325212296,
          "longitude": -86.52629759999999
      },
      "transactions": [],
      "location": {
          "address1": "614 E 2nd St",
          "address2": "",
          "address3": null,
          "city": "Bloomington",
          "zip_code": "47401",
          "country": "US",
          "state": "IN",
          "display_address": [
              "614 E 2nd St",
              "Bloomington, IN 47401"
          ]
      },
      "phone": "+18124074339",
      "display_phone": "(812) 407-4339",
      "distance": 359.25784566680784
  },
  {
      "id": "hV3MJGD-hAyrk97Vl-zvnQ",
      "alias": "feast-market-and-cellar-bloomington-2",
      "name": "Feast Market & Cellar",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/RkB2omR3y4x08NjTE5gRKA/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/feast-market-and-cellar-bloomington-2?adjust_creative=XUJZ7EXQV4av9HuQtef3Nw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XUJZ7EXQV4av9HuQtef3Nw",
      "review_count": 127,
      "categories": [
          {
              "alias": "bakeries",
              "title": "Bakeries"
          },
          {
              "alias": "newamerican",
              "title": "New American"
          },
          {
              "alias": "wine_bars",
              "title": "Wine Bars"
          }
      ],
      "rating": 4.5,
      "coordinates": {
          "latitude": 39.1533353938549,
          "longitude": -86.5384726842605
      },
      "transactions": [
          "delivery"
      ],
      "price": "$$",
      "location": {
          "address1": "407 W Patterson Dr",
          "address2": "",
          "address3": "",
          "city": "Bloomington",
          "zip_code": "47403",
          "country": "US",
          "state": "IN",
          "display_address": [
              "407 W Patterson Dr",
              "Bloomington, IN 47403"
          ]
      },
      "phone": "+18122878615",
      "display_phone": "(812) 287-8615",
      "distance": 1673.536268261601
  }
  ]);

  const apiKey = Constants.expoConfig.extra.YELP_API_KEY;

  const onSearchTermChange = (text) => {
    setSearchTerm(text);
  };

  const onLocationChange = (text) => {
    setLocation(text);
  };

  const onSearchSubmit = async() => {
    // Call the Yelp API with the search term and location
    // Handle API request and display results

    try {
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          term: searchTerm,
          location: location, // Optionally, you can pass the location as well
        },
      });
  
      console.log(response.data.businesses);
      const businessess = response.data.businesses;
      setBusinesses(businessess);
      
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error fetching data:', error);
      //throw error; // You may choose to throw the error for further handling
      Alert.alert("Failed to featch restaurants. Please try after sometime");
    }

  };
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
         await onSearchSubmit();
      };

      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
        <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder=" Search Food/Events "
          value={searchTerm}
          onChangeText={onSearchTermChange}
        />
        <TextInput
          style={styles.input}
          placeholder="  Location"
          value={location}
          onChangeText={onLocationChange}
        />
        <Button style={styles.Button} title="Search" onPress={onSearchSubmit} />
      </View>
       <ScrollView>
        {businesses.map((restaurant) => (
          <Restaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </ScrollView>
      {/* <FlatList data={businesses} 
        renderItem={
            ({business}) =><Restaurant key={business.id} restaurant={business} /> } /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  searchButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 10,
  },
});
