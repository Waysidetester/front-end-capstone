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


/* ******************** Begin Active Colleciton Methods ****************************** */

const atvCollectionCreate = stockObject => axios.post(`${fBaseUrl}/active-collection.json`, stockObject);

/* reads active collection and pushes objects that aren't true to be returned */
const readAtvCollection = () => new Promise((resolve, reject) => {
  // filtering returned stocks in database call to match user
  axios.get(`${fBaseUrl}/active-collection.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
    .then((results) => {
      const items = [];
      if (results.data !== null) {
        Object.keys(results.data).forEach((key) => {
          if (!results.data[key].isRemoved) {
            // eslint-disable-next-line
            results.data[key].id = key;
            items.push(results.data[key]);
          }
        });
        // sorts by date added
        items.sort((a, b) => parseFloat(b.originTimestamp) - parseFloat(a.originTimestamp));
        resolve(items);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const readSingleSaved = fbKey => new Promise((resolve, reject) => {
  // filtering returned stocks in database call to match user
  axios.get(`${fBaseUrl}/active-collection.json?orderBy="$key"&equalTo="${fbKey}"`)
    .then((results) => {
      const items = [];
      if (results.data !== null) {
        Object.keys(results.data).forEach((key) => {
          // eslint-disable-next-line
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

/* Reads active collection and pushes removed objects to be returned */
const readRemovedFromActive = () => new Promise((resolve, reject) => {
  // filtering returned stocks in database call to match user
  axios.get(`${fBaseUrl}/active-collection.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
    .then((results) => {
      const items = [];
      if (results.data !== null) {
        Object.keys(results.data).forEach((key) => {
          if (results.data[key].isRemoved) {
            // eslint-disable-next-line
            results.data[key].id = key;
            items.push(results.data[key]);
          }
        });
        // sorts by date removed
        items.sort((a, b) => parseFloat(b.removeTimestamp) - parseFloat(a.removeTimestamp));
        resolve(items);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const removeSecurity = (fbKey, updatedObj) => axios.put(`${fBaseUrl}/active-collection/${fbKey}.json`, updatedObj);

/* ******************** End Active Colleciton Methods ****************************** */

/* ******************** Begin Watchlist Methods ************************************ */

const readWatchingList = () => new Promise((resolve, reject) => {
  // filtering returned stocks in database call to match user
  axios.get(`${fBaseUrl}/watching.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
    .then((results) => {
      const items = [];
      if (results.data !== null) {
        Object.keys(results.data).forEach((key) => {
          // eslint-disable-next-line
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

const readWatchingTicker = () => new Promise((resolve, reject) => {
  // filtering returned stocks in database call to match user
  axios.get(`${fBaseUrl}/watching.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
    .then((results) => {
      const items = [];
      if (results.data !== null) {
        Object.keys(results.data).forEach((key) => {
          items.push(results.data[key].ticker);
        });
        resolve(items);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const watchingCreate = watchingObj => axios.post(`${fBaseUrl}/watching.json`, watchingObj);

const watchingDelete = watchingKey => axios.delete(`${fBaseUrl}/watching/${watchingKey}.json`);

/* ******************** End Watchlist Methods ************************************** */


const currentUID = () => firebase.auth().currentUser.uid;

export default {
  googleLogin,
  logout,
  initFirebase,
  currentUID,
  atvCollectionCreate,
  readAtvCollection,
  readSingleSaved,
  readRemovedFromActive,
  removeSecurity,
  watchingCreate,
  readWatchingList,
  readWatchingTicker,
  watchingDelete,
};
