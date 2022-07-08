
import React, {useState, useEffect, useRef} from 'react';

import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/components/Dashboard';
import VideoCalling from './src/components/VideoCalling';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();


const App = (props) => {

    useEffect(() => {
        setTimeout(() => {
          SplashScreen.hide();
        }, 500);
      }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false
              }}
         >
                <Stack.Screen name="Home" component={Dashboard} />
                <Stack.Screen name="Details" component={VideoCalling} />
            </Stack.Navigator>
        </NavigationContainer>
    );
    /*   <>
        <VideoCalling/>
        </>) */
};

export default App;
