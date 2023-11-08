import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { saveReview } from './FirestoreHandler';
import { useNavigation} from '@react-navigation/native';

const Reviews = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (ratedValue) => {
    
    setRating(ratedValue);
    console.log(rating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = async () => {
    try {
      // Call saveReview and pass the necessary data
      const reviewId = await saveReview(rating, comment,navigation);
      console.log('Review saved with ID: ', reviewId);
      Alert.alert("Added review successfully");
      // Clear the input fields or navigate to another screen as needed.
      setRating(0);
      setComment('');
    } catch (error) {
      // Handle the error as needed, e.g., show an error message to the user
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
});

export default Reviews;
