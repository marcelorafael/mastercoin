import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native'
import {LogBox} from 'react-native'

import { AuthContext } from '../contexts/auth'

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';


function Routes() {
    LogBox.ignoreAllLogs(true)
    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        return(
            <View style={{flex:1, alignContent:'center', justifyContent:'center', backgroundColor:'#000'}}>
                <ActivityIndicator color="#00b94a" size="large" />
            </View>
        );
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;