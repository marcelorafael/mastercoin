import React, { useState, createContext, useEffect } from 'react';
import firebase from '../firebase/firebaseConnection'
import AsyncStorage from '@react-native-async-storage/async-storage';

let user = null;
let loading = true;

async function signOut(){
  await firebase.auth().signOut();
}

const toEnter = async (email, password) =>{
  let data = {}
  await firebase.auth().signInWithEmailAndPassword(email,password)
  .then(async (value)=>{
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).once('value')
      .then((snapshot)=>{
          data = {
            uid: uid,
            nome: snapshot.val().nome,
            email: value.user.email,
          };

          // return data;
      })
  })
  .catch((error)=> {
      alert(error.code);
  });

  return data
}

export {signOut, toEnter}
