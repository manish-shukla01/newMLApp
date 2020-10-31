import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import {HomeScreen} from './Screens/HomeScreen';

<<<<<<< HEAD
export default function App() {
  // Endpoint
  const discovery = useAutoDiscovery('https://manishb2ctenant.b2clogin.com/manishb2ctenant.onmicrosoft.com/B2C_1_fb/v2.0/.well-known/openid-configuration');
  //const discovery = useAutoDiscovery('https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration');
=======
import {LoginScreen} from './Screens/LoginScreen';
>>>>>>> 9c3df9cf335ee0ff9de55994e001f11855dc890d

import {ImageAnalysisScreen} from './Screens/ImageAnalysisScreen';
import {ProfileScreen} from './Screens/ProfileScreen';
import {AudioScreen} from './Screens/AudioScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'orange',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
     
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Menu" component={HomeScreen} />
      <Stack.Screen name="ImageAnalysis" component={ImageAnalysisScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Audio" component={AudioScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;