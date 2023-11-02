import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,alert, Alert } from 'react-native';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import {FIREBASE_APP,FIREBASE_AUTH} from '../firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation }  from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = () => {



  const app = FIREBASE_APP;
  const auth = FIREBASE_AUTH

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  //Google authentication
  const provider = new GoogleAuthProvider();

  const GOOGLE_WEB_CLIENT_ID = '264191423840-l4srk6gudnar85sl4olj8j7iaoed1kvn.apps.googleusercontent.com'
  const GOOGLE_IOS_CLIENT_ID = '264191423840-5re8e7cno5eiqjlclfkcde2u0jpe0eie.apps.googleusercontent.com'
  const GOOGLE_ANDROID_CLIENT_ID = '264191423840-1mrqasdue65ga4g08jish971tvui3vk3.apps.googleusercontent.com'

  const [request, response, promptAsync]= Google.useAuthRequest({
    androidClientId:GOOGLE_ANDROID_CLIENT_ID,
    iosClientId:GOOGLE_IOS_CLIENT_ID,
    webClientId:GOOGLE_WEB_CLIENT_ID
  })

  React.useEffect(()=>{
    handleSignInWithGoogle
  },[response]);

  async function handleSignInWithGoogle(){
    console.log("Entered google signIn")
    const user = await AsyncStorage.getItem("@user");
    console.log(user);
    if(!user){
      if(response?.type === "success"){
        await getUserInfo(response.authentication.accessToken);
      }
    }
    else{
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async(token)=>{
    if(!token) return;
    try{
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers:{Authorization: `Bearer ${token}`},
        }
      );

      const user = await  response.json();
      await AsyncStorage.setItem("@user",JSON.stringify(user));
      setUserInfo(user);
    }catch(error){
      console.log("Error");
    }

  }


  // const signInWithGoogle = async() =>{
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log(user);
  //       // Handle user information as needed
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error(errorCode, errorMessage);
  //     });
  
  // }

  const signInWithGoogle = async()=>{
  // web working version
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
 
  

  const handleSignUp = async () => {
    console.log("Entered signup");
    if(email ==undefined || password == undefined || password== '' || email== ''){
         Alert.alert('Enter all the fields');
        // alert('E');
        //window.alert('Enter all the fields');
        return
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed up 
      Alert.alert('Signed up successfully');
      const user = userCredential.user;
      await AsyncStorage.setItem("@user",JSON.stringify(user));
      console.log("Success:{}",user);
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
  .then(async(userCredential) => {
    const user = userCredential.user;
    Alert.alert('Signed In successfully');
    await AsyncStorage.setItem("@user",JSON.stringify(user));
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

    <View>
        <Button title="Sign in with Google" onPress={() =>promptAsync()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

buttonContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '50%',
    marginBottom:10
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 200,
    height: 200,
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