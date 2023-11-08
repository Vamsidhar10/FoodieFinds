import { collection, query, where, getDocs, addDoc, doc, setDoc, getDoc,exists } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_DB } from '../firebaseConfig';
import { Alert } from 'react-native';


export const checkIfUserIsLoggedIn = async(navigation) =>{
    const user = JSON.parse(await AsyncStorage.getItem("@user"));
    console.log(user);
    if(user == undefined || user == null){
      Alert.alert("Please Sign in or Sign Up to create a new account");
      navigation.navigate('AUTH');
      return;
    }
    //console.log(user.uid);
    return user;
}

export const addFavoriteToDB = async (navigation,restaurantDetails) => {
    const user = await checkIfUserIsLoggedIn(navigation);
    if(user == undefined || user == null){
        return;
    }
    console.log(user.uid);
    const restaurantId = restaurantDetails.id;
    const userRef = doc(FIREBASE_DB, 'User', user.uid);
    const favoritesRef = collection(userRef, 'favorites');
    
  try {
    // Check if the user document exists
    const userDocSnapshot = await getDoc(userRef);

    if (!userDocSnapshot.exists()) {
      // User document doesn't exist, create it
      await setDoc(userRef, {});

      // Then add the favorite
      await addDoc(favoritesRef, {
        restaurant_id: restaurantId,
        restaurant_details: JSON.stringify(restaurantDetails)
      });

      console.log('User and favorite added successfully.');
      Alert.alert("Added to Favorites successfully");
    } else {
      // User document exists, check if the restaurant is already a favorite
      const q = query(favoritesRef, where('restaurant_id', '==', restaurantId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // No matching document found, add the favorite
        await addDoc(favoritesRef, {
            restaurant_id: restaurantId,
            restaurant_details: restaurantDetails
        });

        console.log('Favorite added successfully.');
        Alert.alert("Added to Favorites successfully");
      } else {
        // Matching document already exists
        console.log('Favorite already exists.');
        Alert.alert("Favorites already exists");
      }
    }
  } catch (error) {
    console.error('Error adding favorite: ', error);
    Alert.alert("Error adding Favorites. Try again after some time");
  }
};


export const fetchFavoritesForUser = async (navigation) => {
    const user = await checkIfUserIsLoggedIn(navigation);
    if(user == undefined || user == null){
        return;
    }
    console.log(user.uid);
    console.log(user);
    const userRef = doc(FIREBASE_DB, 'User', user.uid);
    const favoritesRef = collection(userRef, 'favorites');

  try {
    // Check if the user document exists
    const userDocSnapshot = await getDoc(userRef);

    if (!userDocSnapshot.exists()) {
      console.log('User does not exist or has no favorites.');
      return [];
    }

    // Create a query to get the user's favorite restaurants
    const q = query(favoritesRef);

    const querySnapshot = await getDocs(q);

    const favorites = [];
    querySnapshot.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
   console.log(favorites)
    return favorites;
  } catch (error) {
    console.error('Error fetching user favorites: ', error);
    return [];
  }
};  


export const saveReview = async (rating, comment,navigation) => {
  const user = await checkIfUserIsLoggedIn(navigation);
  if(user == undefined || user == null){
      return;
  }
  console.log(user.uid);
  
  try {
    const reviewsRef = collection(FIREBASE_DB, 'Reviews');

    // Create a new review object with the provided data
    const newReview = {
      userId: user.uid,
      userEmail: user.email,
      rating: rating,
      comment: comment,
      timestamp: new Date(),
    };
    const docRef = await addDoc(reviewsRef, newReview);
    console.log('Review added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review: ', error);
    throw error;
  }
};