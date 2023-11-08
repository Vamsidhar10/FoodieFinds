import React, { useState } from 'react';
import { View, Text, Button, StyleSheet,Alert } from 'react-native';
import { checkIfUserIsLoggedIn } from './FirestoreHandler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        console.log('In Profile');
        const localUser = await checkIfUserIsLoggedIn(navigation);
        console.log(localUser);
        setUser(localUser);
      };

      fetchUserData();
    }, [navigation])
  );

  const handleLogout = async () => {
    Alert.alert("Logged out successfully");
    try {
      await AsyncStorage.removeItem('@user');
      console.log('User item removed from AsyncStorage');
      navigation.navigate('AUTH');
      return;
    } catch (error) {
      console.error('Error removing user item:', error);
    }
  };

  return user ? (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.detail}>{user.email}</Text>
      <Text style={styles.label}>User ID:</Text>
      <Text style={styles.detail}>{user.uid}</Text>
      <Text style={styles.label}>Email Verified:</Text>
      <Text style={styles.detail}>{user.emailVerified ? 'Yes' : 'No'}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Log Out" onPress={handleLogout} color="#E74C3C" />
      </View>
    </View>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  detail: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default UserProfile;
