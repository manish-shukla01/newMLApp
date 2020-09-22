import React from 'react';
import profileImage from '../assets/my_profile.png';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { View, Text, Button, TouchableWithoutFeedback,Dimensions, FlatList, StyleSheet,Image } from 'react-native';


export function ImageAnalysisScreen({ route, navigation }) {

  const access_token = route.params.access_token;
  const imageType = route.params.imageType;
  const [image ,setimage] = React.useState();
  const [dataForScreen, setdataForScreen] = React.useState();

  const testdata = [
    {
      imageurl:'dfdsdffs'
    }
  ];


  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true
      });
      if (!result.cancelled) {
        //this.setState({ image: result.uri });
        setimage(result.uri)
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


  React.useEffect(()=>{
    async function anyNameFunction() {
        console.log('getting invoked on load');
          await getPermissionAsync();

      }
      // Execute the created function directly
      anyNameFunction();
    }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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