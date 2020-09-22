import React from 'react';
import profileImage from '../assets/my_profile.png';

import { View, Text, Button, TouchableWithoutFeedback,Dimensions, FlatList, StyleSheet,Image } from 'react-native';


export function AudioScreen({ route, navigation }) {


    const access_token = route.params.access_token;
    return(
    <Text>`Place holder for audio stuff and ${access_token}`</Text>

    );

}