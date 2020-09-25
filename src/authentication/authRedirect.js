import { loginRequest } from './authConfig';
import { msalConfig } from './authConfig';
import * as Msal from "msal";

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig);

// function authCallback(error, response) {
//     //handle redirect response
//     console.log(error);
//     if (myMSALObj.getAccount()) {
//         console.log(response);
//     }
// }

export function getMsalObject(){
    return myMSALObj;
}

export function signIn(handleCallback){
    myMSALObj.handleRedirectCallback(handleCallback);
    myMSALObj.loginRedirect(loginRequest);
}

export function signOut(){
    myMSALObj.logout();
}
