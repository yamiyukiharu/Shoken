import React from 'react';
import {Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {onGoogleButtonPress, onGoogleSignOut} from '../utils/firebase/auth.utils'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


GoogleSignin.configure();

const SignInScreen = () => {

  const onGoogleSignInTapped = async () => {
    await onGoogleButtonPress()
  }

  return (
    <View style={styles.container}>
      <Image 
        style={styles.backgroundImage}
        source={require('../../assets/gif/sign-in-gif.gif')} 
      />
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>SHOKEN</Text>    
      </View>
      <Text style={{color: 'white', fontSize: 20}}> Sign In </Text>
      <TextInput 
        style={styles.input} 
        textContentType='emailAddress'
        placeholder='Email'/>
      <TextInput 
        style={styles.input} 
        textContentType='password'
        placeholder='Password'/>

        <Button title='Sign Out' onPress={onGoogleSignOut}/>
        <TouchableOpacity 
          onPress={onGoogleSignInTapped}
          style={styles.googleSignIn}>
          <MaterialIcon name={'google'} size={18}/>
          <Text style={{marginLeft:10, color: '#222222'}}>Sign in with Google</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.7,
  },
  logoContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    marginTop: 300,
    marginBottom: 50,
    padding: 15,
    borderRadius: 10,
  },  
  logo: {

    color: 'white',
    fontSize: 50,
  },
  input: {
    height: 40,
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    opacity: 0.8,
  },
  googleSignIn: {
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 12,
    color: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default SignInScreen;
