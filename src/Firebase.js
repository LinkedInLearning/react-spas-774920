import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCrcYE6hgoslLT4l69DaLfBoCKSXwaMO8s',
  authDomain: 'react-spa-777.firebaseapp.com',
  databaseURL: 'https://react-spa-777.firebaseio.com',
  projectId: 'react-spa-777',
  storageBucket: '',
  messagingSenderId: '351104538646'
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
