import React, { useReducer } from 'react';
import profileImage from '../assets/my_profile.png';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Spinner} from 'native-base';
import {doPostCall} from './helpercode';

import  folderImage from '../assets/foldericongreen.jpg';
import  cameraImage from '../assets/cameraicongreen.png';
import flipImage from '../assets/iconflip.png';
import clickImage from '../assets/ticksymbolgreen.jpg';

import { View, Text, Button, TouchableWithoutFeedback,Dimensions, FlatList, StyleSheet,Image, ListView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export function ImageAnalysisScreen({ route, navigation }) {

  const access_token = route.params.access_token;
  const imageType = route.params.imageType;
  const [image ,setimage] = React.useState();
  const [dataForScreen, setdataForScreen] = React.useState();
  const [processing,setProcessing ] = React.useState(false);
  const [imageAnalysisOutput, setimageAnalysisOutput] = React.useState([]);
  const [takingPic, settakingPic] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  let camera;

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
      else
        await pickImage();
    }
  };


  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64:true
      });
      if (!result.cancelled) {
        //this.setState({ image: result.uri });
        
        if(result.type != "image")
        {
          await pickImage();
          return;
        }
        setProcessing(true);
        const uri = result.uri;

        console.log(imageType);
        const datatopush = {
          height:result.height,
          width:result.width,
          fileExtension:uri.substring(uri.lastIndexOf("."), uri.length),
          mediabase64:result.base64,
          analysisType:imageType
        }
        //console.log(datatopush);
        //return;
        var response = await doPostCall('/api/saveAndAnalyzeMedia',datatopush, access_token);
        console.log(response.data);
        setimage(response.data.fileUri);
        const allData = [];
        response.data.stuffToShow.forEach(element => {
          console.log(element.label);

          allData.push({label:element.label, labelvalue:element.labelValue});
        });
       // console.log(allData);
        setimageAnalysisOutput(allData);
       // console.log(imageAnalysisOutput);
        setProcessing(false);


        //base64
        
      }

      //console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const takePicture = async() =>{
    const { status } = await Camera.requestPermissionsAsync();
    if(status !== 'granted'){
      alert('Sorry, we need access to camera');
    }
    else{
      console.log("got permission so lets take picture");
      settakingPic(true);

    }
  }


  React.useEffect(()=>{
    async function anyNameFunction() {
        console.log('getting invoked on load');
          //await getPermissionAsync();

      }
      // Execute the created function directly
      anyNameFunction();
    }, []);

  
  if(!processing && !takingPic){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

        <View style={{  flexDirection: "row", margin:10, padding:5 }}>
          <View style={{width:250, height:250, borderColor:'black', borderRadius:5, borderWidth:1, justifyContent:"center", alignItems:"center"}}>
            <Image source={{ uri: image }} style={{width:230, height:230}}/>
          </View>
          <View style={{flexDirection:"column", margin:5, justifyContent:"space-around"}}>
            <TouchableOpacity onPress={getPermissionAsync}>
              <Image source={folderImage} style={{width:60, height:60}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture}>
              <Image source={cameraImage} style={{width:60, height:60}}/>
            </TouchableOpacity>
          </View>

        </View>
        
        <View>
          <FlatList data={imageAnalysisOutput}
          renderItem={({item}) => 
          <View>
            <View style={{flexDirection:"row"}}>
              <Text>{item.label}:</Text>
              <Text >{item.labelvalue}</Text>

            </View>
          </View>
          

          }
          
          keyExtractor={(item, index) => index.toString()}
          >

          </FlatList>

        </View>
       


      </View>
    );
  }
  if(!processing && takingPic){
    return (
      <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => (camera = ref)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent:"space-evenly",
            padding:10
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              
              
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Image source={flipImage} style={{width:60, height:50}}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.1,
             
              
            }}
            onPress={async () => {
                                    console.log('please write code to handle the picture taken');
                                    const options = {quality: 0.5, base64:true};
                                    const imageResponse = await camera.takePictureAsync(options);
                                    console.log(imageResponse.uri);
                                    setProcessing(true);
                                    const uri = imageResponse.uri;
                                    console.log(imageType);
                                    const datatopush = {
                                      height:imageResponse.height,
                                      width:imageResponse.width,
                                      fileExtension:".jpg",
                                      mediabase64:imageResponse.base64,
                                      analysisType:imageType
                                    }
                                    //console.log(datatopush);
                                    //return;
                                    var response = await doPostCall('/api/saveAndAnalyzeMedia',datatopush, access_token);
                                    console.log(response.data);
                                    setimage(response.data.fileUri);
                                    const allData = [];
                                    response.data.stuffToShow.forEach(element => {  
                                                allData.push({label:element.label, labelvalue:element.labelValue});
                                    });
                                    setimageAnalysisOutput(allData);
                                    settakingPic(false);
                                    setProcessing(false);
                                  }
                      }
            >
            <Image source={clickImage} style={{width:60, height:50}}></Image>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>

    )
  }
  else{
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}
        >
        
        <Spinner color='red'></Spinner>
        <Text style={{fontSize:15, color:"red"}}>Uploading Image and analyzing it</Text>
        </View>
    );
  }

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