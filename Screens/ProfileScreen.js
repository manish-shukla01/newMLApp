import React from 'react';
import profileImage from '../assets/my_profile.png';

import { View, Text, Button, TouchableWithoutFeedback,Dimensions, FlatList, StyleSheet,Image } from 'react-native';
import {doGetCall, doPostCall} from './helpercode'


export function ProfileScreen({ route, navigation }) {


    const accessToken = route.params.access_token;
    const  [dataForScreen, setdataForScreen] = React.useState(null); 
    const refreshData = async() =>{
        const response = await doGetCall('api/getClaims',accessToken);
        //console.log(response);
        const allData = [];
        response.data.forEach(element => {
            console.log(element);
            if(element.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")
                allData.push({Label :'First Name', Value : element.claimValue});
            if(element.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname")
                allData.push({Label :'Last Name', Value : element.claimValue});
            if(element.type == "name")
                allData.push({Label :'Name', Value : element.claimValue});
            if(element.type == "http://schemas.microsoft.com/identity/claims/identityprovider")
                allData.push({Label :'Identity Provider', Value : element.claimValue});
            if(element.type == "http://schemas.microsoft.com/identity/claims/objectidentifier")
                allData.push({Label :'Unique Id', Value : element.claimValue});
            if(element.type == "city")
                allData.push({Label :'City', Value : element.claimValue});
            if(element.type == "country")
                allData.push({Label :'Country', Value : element.claimValue});
            if(element.type == "emails")
                allData.push({Label :'Emails', Value : element.claimValue});                            
        });
        setdataForScreen(allData);
        console.log(dataForScreen);
    }
    
    
    React.useEffect(()=>{
        async function anyNameFunction() {
            await refreshData();
          }
          // Execute the created function directly
          anyNameFunction();
        }, []);



    return(
        <View>
            <FlatList data={dataForScreen}
                renderItem={
                    ({item}) =>
                    <View style={{borderWidth:1,borderColor:"black",borderRadius:5, padding:5, margin:5}}>
                        <Text style={{fontSize:12}}>{item.Label}</Text>
                        <Text style={{fontSize:16}}>{item.Value}</Text>
                        
                    </View>

                }
                keyExtractor={(item, index) => index.toString()}
            
            >

            </FlatList>
        </View>

    );

}
