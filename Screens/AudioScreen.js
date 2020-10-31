import React from 'react';
import profileImage from '../assets/my_profile.png';

import { View, Text, Button, TouchableWithoutFeedback,Dimensions, FlatList, StyleSheet,Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {doPostCall} from './helpercode';


export function AudioScreen({ route, navigation }) {

    const [textToAnalyze,settextToAnalyze]  = React.useState("this is good;life is good");
    const [results,setresults]  = React.useState();
    const analyzeText = async() =>{
        console.log(textToAnalyze);
        const allSentences = [];
        textToAnalyze.split(';').forEach(element => allSentences.push(element));
        const datatopush = {sentences:allSentences}
        
        var response = await doPostCall('/api/AnalyzeText',datatopush, access_token);
        console.log(response.data);
        let output="";
        response.data.forEach(element => {
            output = output + ";" + element;
        });
        setresults(output);
        console.log(output);

    }

    const clearAll = () =>{
        settextToAnalyze("");
        setresults("");
    }


    const access_token = route.params.access_token;

    return(
    <View style={{flex:1}}>
    <TextInput   onChangeText={(text) =>settextToAnalyze(text)}
        style={{height:100, borderColor:"black", borderRadius:5, borderWidth:1, justifyContent:"flex-start" }} 
    >
      {textToAnalyze}  
    </TextInput>

    <Text style={{fontWeight:"bold"}}>Analysis Results:</Text>
    <Text style={{height:100, borderColor:"black", borderRadius:5, borderWidth:1, marginTop:5}}
        
    >
{results}  

    </Text>
    <TouchableOpacity onPress={analyzeText} style={{alignSelf:"center", borderWidth:1, height:40
                                    , justifyContent:"center", width:100, alignItems:"center", backgroundColor:"green"
                                    ,margin:10}}>
        <Text>Analyse</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={clearAll} style={{alignSelf:"center", borderWidth:1, height:40
                                    , justifyContent:"center", width:100, alignItems:"center", backgroundColor:"green"
                                    ,margin:10}}>
        <Text>Clear</Text>
    </TouchableOpacity>
    </View>

    );

}