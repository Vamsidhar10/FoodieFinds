import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.API_KEY,
    authDomain: Constants.expoConfig.extra.AUTH_DOMAIN,
    projectId: Constants.expoConfig.extra.PROJECT_ID,
    storageBucket: Constants.expoConfig.extra.PUBLIC_STORAGE_BUCKET,
    messagingSenderId: Constants.expoConfig.extra.MESSAGING_SENDER_ID,
    appId: Constants.expoConfig.extra.APP_ID
};

// const firebaseConfig = {
//     apiKey: process.env.EXPO_PUBLIC_API_KEY,
//     authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
//     appId: process.env.EXPO_PUBLIC_APP_ID
// };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

