import React, { useState, createContext, useEffect } from 'react';
import firebase from '../firebase/firebaseConnection'
import AsyncStorage from '@react-native-async-storage/async-storage';

let user = null;
let loading = true;

async function logOff() {
  await firebase.auth().signOut();
}

const toEnter = async (email, password) => {
  let data = {}
  let audit = await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).once('value')
        .then((snapshot) => {
          data = {
            uid: uid,
            nome: snapshot.val().nome,
            email: value.user.email,
          };
        })
    })
    .catch((error) => {
      alert(error.code);
    });

  if (!audit) {
    return null
  } else {
    return data
  }
}

const register = async (email, password, nome) => {
  let data = {};
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).set({
        saldo: 0,
        nome: nome
      })
        .then(() => {
          let data = {
            uid: uid,
            nome: nome,
            email: value.user.email,
          };
        })
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('E-mail já cadastrado!!!!');
      }

    });

  return data;
}


export { logOff, toEnter, register }
