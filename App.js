import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button } from 'react-native';

export default function App() {
  // Endpoint
  const discovery = useAutoDiscovery('https://manishb2ctenant.b2clogin.com/manishb2ctenant.onmicrosoft.com/B2C_1_fb/v2.0/.well-known/openid-configuration');
  //const discovery = useAutoDiscovery('https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration');

  //https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_sign_in/v2.0/.well-known/openid-configuration

  

  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '2169df6d-5dc5-432b-882d-4d98a028d5a0',
      scopes: ['openid'
           //   , 'profile'
           //   , 'email'
            //  , 'offline_access'
            ],
      // For usage in managed apps using the proxy
       redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: 'com.newmlapps.newmlapp://auth',
      }),
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
        const response = await promptAsync();
        console.log(JSON.stringify(response));
        }}
    />
    </View>
  );
}
