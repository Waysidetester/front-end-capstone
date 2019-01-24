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

const readAtvCollection = () => new Promise((resolve, reject) => {
  // filtering returned stocks in database call to match user
  axios.get(`${fBaseUrl}/active-collection.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
    .then((results) => {
      const items = [];
      if (results.data !== null) {
        Object.keys(results.data).forEach((key) => {
          results.data[key].id = key;
          items.push(results.data[key]);
        });
        resolve(items);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const currentUID = () => firebase.auth().currentUser.uid;

export default {
  googleLogin,
  logout,
  initFirebase,
  currentUID,
  atvCollectionCreate,
  readAtvCollection,
};
