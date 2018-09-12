import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCk9mIMo7jjWzJ2UYtA8435he3vl1mWdpc',
  authDomain: 'react-spas.firebaseapp.com',
  databaseURL: 'https://react-spas.firebaseio.com',
  projectId: 'react-spas',
  storageBucket: 'react-spas.appspot.com',
  messagingSenderId: '579151738498'
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
