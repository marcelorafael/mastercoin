import React, { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebase/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logOff, toEnter, register} from '../services/firebase/firebaseDatas'

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
            if(!data){
                signOut()
                setUser(null);
                return;
            }

            setUser(data);
            storageUser(data);
            
    }
    
    //Cadastrar usuario
    async function signUp(email, password, nome){
        let data = await register(email, password, nome)
        signOut()
        setUser(data);
        setUser(null);        
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }


    async function signOut() {
        logOff()
        await AsyncStorage.clear()
        .then( () => {
            setUser(null);
        })
    }

    return(
     <AuthContext.Provider value={{ signed: !!user , user, loading, signUp, signIn, signOut }}>
         {children}
     </AuthContext.Provider>   
    );
}

export default AuthProvider;
