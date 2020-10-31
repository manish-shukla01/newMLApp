import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, ResponseType } from 'expo-auth-session';


export function LoginScreen({ route, navigation }) {
    const discovery = useAutoDiscovery('https://manishb2ctenant.b2clogin.com/manishb2ctenant.onmicrosoft.com/B2C_1_fb/v2.0');
    
    //https://manishb2ctenant.b2clogin.com/cd31b2db-a0a7-48a1-89be-6bfe6fc0d5f2/v2.0/.well-known/openid-configuration?p=B2C_1_fb

    const [request, response, promptAsync] = useAuthRequest(
        {
          clientId: 'dfdc2010-9da9-42f1-9af8-3c1620e86cf6',
          scopes: ['openid'
                  ,'https://manishb2ctenant.onmicrosoft.com/dfdc2010-9da9-42f1-9af8-3c1620e86cf6/callapi'
                  //,'https://graph.windows.net/Directory.Read.All'
               //   , 'profile'
                  , 'email'
                //  , 'offline_access'
                ],
          // For usage in managed apps using the proxy
           redirectUri: makeRedirectUri({
            // For usage in bare and standalone
            native: 'com.newmlapps.newmlapp://auth',
          }),

          responseType: ResponseType.Token,
          prompt:'select_account'
        },
        discovery
      );
      return (
        <View style={{flex:1,justifyContent:"center"}}>
        <Button
          disabled={!request}
          title="Login please"
          onPress={async () => {
            console.log(request.redirectUri);
            console.log(JSON.stringify(request));
            //https://login.microsoftonline.com/ff3f5973-8dab-44a5-a56e-485e01ff0c50/v2.0

            const response = await promptAsync();
            console.log('full response');
            console.log(JSON.stringify(response));
            console.log('access token');
            
            console.log(response.params.access_token);
            navigation.navigate('Menu', {
              access_token:response.params.access_token,
              imageURL:'sfsdfsd'
            });
          }}
        />
        </View>
      );

}