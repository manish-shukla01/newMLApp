import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import {HomeScreen} from './Screens/HomeScreen';
import {ImageAnalysisScreen} from './Screens/ImageAnalysisScreen';
import {ProfileScreen} from './Screens/ProfileScreen';
import {AudioScreen} from './Screens/AudioScreen';
import {LoginScreen} from './Screens/LoginScreen';

export default function App() {
  // Endpoint



const Stack = createStackNavigator();


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

