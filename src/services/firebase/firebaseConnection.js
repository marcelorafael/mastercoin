import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyBqz53nYRf_a4RfFgUmqMpyMwYA5V8Hz38",
  authDomain: "doletas-b86a6.firebaseapp.com",
  databaseURL: "https://doletas-b86a6.firebaseio.com",
  projectId: "doletas-b86a6",
  storageBucket: "doletas-b86a6.appspot.com",
  messagingSenderId: "579706409404",
  appId: "1:579706409404:web:7ebfce0fe78259f6461bb9",
  measurementId: "G-VPCS1KF0TL"
};
// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase