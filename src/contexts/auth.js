import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebase/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logOff, toEnter} from '../services/firebase/firebaseDatas'

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
       async function loadStorage(){
           const storageUser = await AsyncStorage.getItem('Auth_user');

           if(storageUser){
               setUser(JSON.parse(storageUser));
               setLoading(false);
           }

           setLoading(false);
       }
       
       loadStorage();
    }, []);

    //Funcao para logar o usario
    const signIn = async (email, password) =>{
        let data = await toEnter(email, password)
        setUser(data);
        storageUser(data);
        // console.log(toEnter())
    }
    
    //Cadastrar usuario
    async function signUp(email, password, nome){
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                };
                setUser(data);
                storageUser(data);
            })
        })
        .catch((error)=> {
            alert(error.code);
        });
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }


    async function signOut() {
        logOff()
        await AsyncStorage.clear()
        .then( () => {
            setUser(null);
            console.log(user)
        })
    }

    return(
     <AuthContext.Provider value={{ signed: !!user , user, loading, signUp, signIn, signOut }}>
         {children}
     </AuthContext.Provider>   
    );
}

export default AuthProvider;