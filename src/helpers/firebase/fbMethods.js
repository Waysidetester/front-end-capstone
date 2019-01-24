import firebase from 'firebase/app';
import axios from 'axios';
import fbKeys from './fbKeys';
import 'firebase/auth';

const fBaseUrl = fbKeys.config.databaseURL;

// Log in with Google
const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
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

const atvCollectionCreate = stockObject => axios.post(`${fBaseUrl}/active-collection.json`, stockObject);

const currentUID = () => firebase.auth().currentUser.uid;

export default {
  googleLogin,
  logout,
  initFirebase,
  currentUID,
  atvCollectionCreate,
};
