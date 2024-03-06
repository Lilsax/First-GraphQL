/* eslint-disable prettier/prettier */
import React from 'react';
import Home from './src/screens/home';
import Details from './src/screens/details';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';

export type HomeStackType = {
    Home: undefined;
};

export type DetailsStackType = {
    Details: { itemId: string, title: string };
}

export type MainStackType = {
    HomeStack: NavigatorScreenParams<HomeStackType>;
    DetailsStack: NavigatorScreenParams<DetailsStackType>;
}

const DetailsStack = () => {
    const _DetailsStack = createNativeStackNavigator<DetailsStackType>();
    return (
        <_DetailsStack.Navigator initialRouteName="Details">
            <_DetailsStack.Screen
                options={{
                    headerShown: true,
                }}
                name="Details"
                component={Details}
            />
        </_DetailsStack.Navigator>
    );
};

const HomeStack = () => {
    const _HomeStack = createNativeStackNavigator<HomeStackType>();
    return (
        <_HomeStack.Navigator initialRouteName="Home">
            <_HomeStack.Screen
                options={{
                    headerShown: false,
                }}
                name="Home"
                component={Home}
            />
        </_HomeStack.Navigator>
    );
};


const MainScreenStack = () => {
    const MainStack = createNativeStackNavigator<MainStackType>();
    return (
        <MainStack.Navigator initialRouteName="HomeStack">
            <MainStack.Screen
                options={{
                    headerShown: false,
                }}
                name="HomeStack"
                component={HomeStack}
            />
            <MainStack.Screen
                options={{
                    headerShown: false,
                }}
                name="DetailsStack"
                component={DetailsStack}
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
