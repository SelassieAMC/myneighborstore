import { loginRequest } from './authConfig';
import { msalConfig } from './authConfig';
import * as Msal from "msal";

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function authCallback(error, response) {
    //handle redirect response
    console.log("Hola Callback "+error);
    console.log("Hola Callback "+response);
}

export function getAccount(){
    return myMSALObj.getAccount();
}

myMSALObj.handleRedirectCallback(authCallback);


export function signIn(){
    console.log("Hola login request in");
    myMSALObj.loginRedirect(loginRequest);
    console.log("Hola login request out");
}

export function signOut(){
    myMSALObj.logout();
}
