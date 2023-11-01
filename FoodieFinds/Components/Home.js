import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import Restaurant from "../Components/Restaurant";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
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
  }
  ]);

  const apiKey = process.env.EXPO_PUBLIC_YELP_API_KEY;
  const baseURL = 'https://api.yelp.com/v3';

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

  const SearchBar = ({ searchTerm, onSearchTermChange, location, onLocationChange, onSearchSubmit }) => {
    return (
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder=" Search..."
          value={searchTerm}
          onChangeText={onSearchTermChange}
        />
        <TextInput
          style={styles.input}
          placeholder=" Location"
          value={location}
          onChangeText={onLocationChange}
        />
        <TouchableOpacity style={styles.searchButton} onPress={onSearchSubmit}></TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder=" Search..."
          value={searchTerm}
          onChangeText={onSearchTermChange}
        />
        <TextInput
          style={styles.input}
          placeholder=" Location"
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
