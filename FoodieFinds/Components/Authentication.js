import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,alert, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {


    const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_APP_ID
    };
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

 
  

  const handleSignUp = async () => {
    if(email ==undefined || password == undefined || password== '' || email== ''){
        Alert.alert('Enter all the fields');
        return
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      Alert.alert('Signed up successfully');
      const user = userCredential.user;
      //console.log("Success:{}",user);
      navigation.navigate('Home')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log("code"+ errorCode)
      Alert.alert(errorCode)
    });
    }


  const handleSignIn = async () => {
    if(email ==undefined || password == undefined || password== '' || email== ''){
        Alert.alert('Enter all the fields');
        return
    }
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    Alert.alert('Signed In successfully');
    console.log(user);
    navigation.navigate('Home');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert(errorCode);
   // setError(errorMessage);
  });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to FoodieFinds!</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Enter all the fields"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
      />

    <View style={styles.buttonContainer}>

            <View>
                <Button
                title="Sign Up"
                onPress={handleSignUp}
                style={styles.button}/>
             </View>
        
        <View>
            <Button
                title="Sign In"
                onPress={handleSignIn}
                style={styles.button}
            />
        </View>
        

    </View> 
    </View>
  );
};

const styles = StyleSheet.create({

buttonContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '50%',
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    color: 'white',
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AuthScreen;