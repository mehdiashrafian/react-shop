import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAGpkK0ZYXEO657qJrGbq-8quzO5e7TXd4",
  authDomain: "crwn-db-55d36.firebaseapp.com",
  databaseURL: "https://crwn-db-55d36.firebaseio.com",
  projectId: "crwn-db-55d36",
  storageBucket: "crwn-db-55d36.appspot.com",
  messagingSenderId: "894062638745",
  appId: "1:894062638745:web:e5e622ffdff202dff5ea08",
  measurementId: "G-LW6PJVJ3P1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
