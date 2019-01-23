import firebase from 'firebase/app';
import fbKeys from './fbKeys';
import 'firebase/auth';

// Log in with Google
const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
};

// Log out of application
const logout = () => {
  firebase.auth().signOut();
};

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(fbKeys.config);
  }
};


export default {
  googleLogin,
  logout,
  initFirebase,
};
