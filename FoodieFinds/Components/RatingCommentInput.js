import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const RestaurantRatingCommentInput = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('5');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text>Rate it:</Text>
      <Picker
      style={styles.picker}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
      setSelectedLanguage(itemValue)
      }>
    <Picker.Item label="1" value='1' />
    <Picker.Item label="2" value='2' />
    <Picker.Item label="3" value='3' />
    <Picker.Item label="4" value='4' />
    <Picker.Item label="5" value='5' />
    </Picker>

      <Text>Comment:</Text>
      <TextInput
        onChangeText={handleCommentChange}
        value={comment}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width:100,
    alignContent:'center'
  },
});

export default RestaurantRatingCommentInput;
