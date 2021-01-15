import React from 'react';
import profileImage from '../assets/my_profile.png';

import { View, Text, Button, TouchableWithoutFeedback,Dimensions, FlatList, StyleSheet,Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { doPostCallAMLEndPoint } from './helpercode';
//import {doPostCall} from './helpercode';


export function FormScreen({ route, navigation }) {

    const [textToAnalyze,settextToAnalyze]  = React.useState("this is good;life is good");

    const [age,setage]  = React.useState("30");

    
    const [results,setresults]  = React.useState();
    const analyzeText = async() =>{
        console.log(textToAnalyze);
        console.log(age);

        const allSentences = [];
        textToAnalyze.split(';').forEach(element => allSentences.push(element));
        const datatopush = {sentences:allSentences}
        

        const data1 = [[2,180,74,24,21,23.9091702,1.488172308,22],
        [0,148,58,11,179,39.19207553,0.160829008,45],
        [2,180,74,24,21,23.9091702,1.488172308,22],
        [2,180,74,24,21,23.9091702,1.488172308,22],
        [0,148,58,11,179,39.19207553,0.160829008,45]]


        // Pregnancies,	PlasmaGlucose, Diastolic, BloodPressure, TricepsThickness, SerumInsulin, BMI,	DiabetesPedigree, Age
        //const data = {"data": [[1, 180, 74, 24, 21, 23.9091702, 1.488172308, 22]]}


        const data = {"data": [[1, 180, 74, 24, 21, 23.9091702, 1.488172308, 22], [2, 148, 58, 11, 179, 39.19207553, 0.160829008, 45], [2, 180, 74, 24, 21, 23.9091702, 1.488172308, 22], [2, 180, 74, 24, 21, 23.9091702, 1.488172308, 22], [0, 148, 58, 11, 179, 39.19207553, 0.160829008, 45]]}

        //headers = { 'Content-Type':'application/json' }

        // http://836d24f7-652e-40ea-bd88-118f804ded5c.uksouth.azurecontainer.io/score

        var response = await doPostCallAMLEndPoint(data);
        console.log(response.data);
        let output="";
        setresults(response.data);
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

    <Text style={{fontWeight:"bold"}}>Age:</Text>

    <TextInput   onChangeText={(text) =>setage(text)}
        style={{height:100, borderColor:"black", borderRadius:5, borderWidth:1, justifyContent:"flex-start" }} 
    >
      {age}  
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