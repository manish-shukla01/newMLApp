## High level architecture

![image of archicture](https://github.com/manish-shukla01/newMLApp/blob/master/Diagram.png)

1.  User uses the app to sign into the app.
2.  App is configured to use AAD B2C for signin
3.  App simply gives the control to aad b2c. AAD B2C has an app configured which gives options to sign in. It gives optin to signup or use facebook or google to sign in. If we add more identity providers to aad b2c app, they will just show up in the mobile app also with no change on mobile app side.
4. Once the user signs in, they get the token to call the api which secured by aad.
5. User calls the different api endpoint which inturn calls various services which do ML stuff. All the secrets for ML APIs are stored in keyvault and api uses managed identity to get keys for other apis so no secrets are stored in any config file.

Other repos connected to this project:

1. [API app](https://github.com/manish-shukla01/newMLAppAPI) 
2. [Custom training and deploying model to ACI using azure ML SDK.](https://github.com/manish-shukla01/tensorflowkerasinazure)
