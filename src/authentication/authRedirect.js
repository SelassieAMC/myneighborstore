import { loginRequest, msalConfig, tokenRequest } from './authConfig';
import * as Msal from "msal";

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function authCallback(error, response) {
    //handle redirect response
    console.log("Hola Callback "+error);
    console.log("Hola Callback "+response);
    console.log("Token type is "+response.tokenType);
}

export function getAccount(){
    return myMSALObj.getAccount();
}

myMSALObj.handleRedirectCallback(authCallback);


export function signIn(){
    myMSALObj.loginRedirect(loginRequest);
}

export function signOut(){
    myMSALObj.logout();
}

export function getTokenRedirect(){
    return myMSALObj.acquireTokenSilent(tokenRequest)
        .then((response) => {
            if (response.accessToken) {
                console.log("Token acquired silently");
            }
            return response;
        }).catch(error => {
            console.log(error);
            return myMSALObj.acquireTokenRedirect(tokenRequest);
        });
}