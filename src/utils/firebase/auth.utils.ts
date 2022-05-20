import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const onGoogleButtonPress= async () => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const onGoogleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => console.log('Your are signed out!'));
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };