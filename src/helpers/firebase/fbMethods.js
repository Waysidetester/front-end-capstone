import firebase from 'firebase/app';
import 'firebase/auth';

// Log in with Google
const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// Log out of application
const logout = () => {
  firebase.auth().signOut();
};

export default {
  googleLogin,
  logout,
};
