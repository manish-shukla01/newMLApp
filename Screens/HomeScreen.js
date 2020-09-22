import React from 'react';
import profileImage from '../assets/my_profile.png';

import { View, Text, Button, TouchableWithoutFeedback,Dimensions, FlatList, StyleSheet,Image } from 'react-native';


export function HomeScreen({ route, navigation }) {

    const FlatListItems = [{name:'My Profile', Image: profileImage, key: '0'}
    ,{name:'Audio Transcription', Image: profileImage,key: '1'}
    ,{name:'Dog Breed Detect', Image: profileImage,key: '2'}
    ,{name:'Indian Bread detect', Image: profileImage,key: '3'}]
    
    const onItemClick = (iconnumber) => {

        if(iconnumber=='0')
          {
          console.log(iconnumber);
          const access_token = route.params.access_token;
          console.log(access_token);
          navigation.navigate('Profile',{access_token:access_token});
          }
          if(iconnumber=='1')
          {
          console.log(iconnumber);
          navigation.navigate('Audio', 
                                    {
                                      access_token:route.params.access_token
                                    }
                              );
                            
          }
          if(iconnumber=='2')
          {
          console.log(iconnumber);
          navigation.navigate('ImageAnalysis', 
                                    {
                                      access_token:route.params.access_token,
                                      imageType:'Dogs'
                                    }
                              );
                            
          }

          if(iconnumber=='3')
          {
          console.log(iconnumber);
          navigation.navigate('ImageAnalysis', 
                                    {
                                      access_token:route.params.access_token,
                                      imageType:'IndianBread'
                                    }
                              );
                            
          }

            
    }

    return (

        <View style={styles.rootLayoutContainer}>
        
        <FlatList
        data={FlatListItems}
         contentContainerStyle={{paddingTop: 25}}
         numColumns={2}
        renderItem={({item})=>(
        <TouchableWithoutFeedback onPress={() => onItemClick( item.key)} >
        <View style={styles.containerOfList} >
        <Image  style={styles.listItemImage} source={item.Image}></Image>
        <Text style={styles.textContainer}  >
        {item.name}
        </Text>
        </View>
         </TouchableWithoutFeedback>
        )}
        />
              </View>
        
            );

}
const styles = StyleSheet.create({

    rootLayoutContainer: {
          flex: 1,
          backgroundColor: '#fff'
 
     },
 
     menuTextContainer:{
     alignSelf:"center",
     padding:5,
    
     fontWeight: 'bold',
     fontSize:25
     },
 
   containerOfList: {
       flex: 1,
       flexDirection: 'column',
        backgroundColor: '#fff',
       justifyContent: 'space-between',
        alignItems: 'center',
       marginBottom: 20,
        borderRadius:15,
        margin:10,
                   borderColor:"brown", borderWidth:0.7
 
   },
 
 
   textContainer:{
   backgroundColor:'white',
   color:'black',
   padding:5,
   fontSize:20,
   textAlign:"center"
   },
 
 listItemImage: {
   width: 100,
   height: 100
 }
   });