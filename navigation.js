/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/home';
import Details from './src/screens/details';

const MainStack = createNativeStackNavigator();

const MainScreenStack = () => {
    return (
        <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen
                options={{
                    headerShown: false,
                }}
                name="Home"
                component={Home}
            />
            <MainStack.Screen
                name="Details"
                component={Details}
            />
        </MainStack.Navigator>
    );
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <MainScreenStack />
        </NavigationContainer>
    );
};

export default Navigation;
