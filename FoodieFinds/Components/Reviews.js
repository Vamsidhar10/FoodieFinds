import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { saveReview,getReviewsForRestaurant } from './FirestoreHandler';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import {RestaurantContext} from './RestaurantContext';

const Reviews = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const {restaurant, setRestaurant} = useContext(RestaurantContext);
  const [reviews, setReviews] = useState([]);

  const handleRating = (ratedValue) => {
    
    setRating(ratedValue);
    console.log(rating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const fetchedReviews = await getReviewsForRestaurant(navigation,restaurant.id);
          console.log(fetchedReviews);
          setReviews(fetchedReviews);
        } catch (error) {
          console.error('Error fetching reviews: ', error);
        }
      };

      fetchData();
    }, [])
  );

  const handleSubmit = async () => {
    try {
      const review = {
        'rating':rating,
        'comment':comment,
        'restaurant':restaurant
      }
      await saveReview(navigation,review);
      Alert.alert("Added review successfully");
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error saving review: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write a Review</Text>
      <AirbnbRating
        count={5}
        reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
        defaultRating={rating}
        onFinishRating={handleRating}
      />
      <View>
      <TextInput
        style={styles.commentInput}
        placeholder="Write your comment..."
        multiline={true}
        numberOfLines={4}
        value={comment}
        onChangeText={handleCommentChange}
      />
      </View>
      <Button title="Submit Review" onPress={handleSubmit} />

      <View>
            <Text style={styles.title}>Reviews</Text>
            {reviews.map((review, index) => (
              <View style={styles.reviewContainer} key={index}>
                <Text style={styles.reviewText}>Rating: {review.rating}</Text>
                <Text style={styles.reviewText}>Comment: {review.comment}</Text>
                <Text style={styles.reviewText}>User Email: {review.userEmail}</Text>
    </View>
  ))}
</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop:30,
  },
  reviewContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Reviews;
