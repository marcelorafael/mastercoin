import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../contexts/auth'

import { Home } from '../pages/Home/Home';
import { Profile } from '../pages/Profile/Profile';
import { New } from '../pages/New/New';

const Drawer = createDrawerNavigator();

function AppRoutes() {
    const { user } = useContext(AuthContext)

    if (user === null) {
        <ActivityIndicator color="#FFF" size='large' />
    } else {
        return (
            <Drawer.Navigator
                drawerStyle={{
                    backgroundColor: '#171717',
                }}
                drawerContentOptions={{
                    labelStyle: {
                        fontWeight: 'bold',
                    },
                    activeTintColor: '#FFF',
                    activeBackgroundColor: '#00B94A',
                    inactiveBackgroundColor: "#000",
                    inactiveTintColor: '#DDD',
                    itemStyle: {
                        marginVertical: 5,
                    }
                }}
            >
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Perfil" component={Profile} />
                <Drawer.Screen name="Registrar" component={New} />
            </Drawer.Navigator>
        );
    }


}

export default AppRoutes;
