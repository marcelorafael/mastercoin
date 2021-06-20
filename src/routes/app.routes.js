import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/auth'

import { Home } from '../pages/Home/Home';

const AppStack = createStackNavigator();

function AppRoutes() {
    const { user } = useContext(AuthContext)

    if (user === null) {
        <ActivityIndicator color="#FFF" size='large' /> 
    } else {
        return (
            <AppStack.Navigator>
                <AppStack.Screen name="Home" component={Home} />
            </AppStack.Navigator>
        );
    }

    
}

export default AppRoutes;
