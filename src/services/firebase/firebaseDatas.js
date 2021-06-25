import React, { useState, createContext, useEffect } from 'react';
import firebase from '../firebase/firebaseConnection'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns'

let user = null;
let loading = true;

async function logOff() {
  await firebase.auth().signOut();
}

const toEnter = async (email, password) => {
  let data = {}
  let audit = false
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;
      await firebase.database().ref('users').child(uid).once('value')
        .then((snapshot) => {
          data = {
            uid: uid,
            nome: snapshot.val().nome,
            email: value.user.email,
          };

          audit = true
        })
    })
    .catch((error) => {
      
      if (error.code === 'auth/invalid-email') {
        alert('E-mail inválido!');
        return;
      }

      if (error.code === 'auth/user-not-found') {
        alert('Usuário não exite');
        return;
      }

      if (error.code === 'auth/wrong-password') {
        alert('Senha Inválida!!');
        return;
      }

      if (error.code === 'auth/too-many-requests') {
        alert('Muitas tentativas');
        return;
      }

      alert(error.code);
    });

  if (audit) {
    return data
  } else {
    return null
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

const movimetation = async (usuario, tipo, valor) => {
    let uid = usuario.uid;
    let key = await firebase.database().ref('historico').child(uid).push().key;

    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yy')
    })

    let user = await firebase.database().ref('historico').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);
    });
}


export { logOff, toEnter, register, movimetation }
