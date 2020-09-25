import { loginRequest } from './authConfig';
import { msalConfig } from './authConfig';
import * as Msal from "msal";

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

export const signIn = (() =>{
    myMSALObj.loginPopup(loginRequest)
      .then(loginResponse => {
          if (myMSALObj.getAccount()) {
            console.log("User logged "+myMSALObj.getAccount().name); 
          }
      }).catch(error => {
        console.log(error);
        
        // Error handling
        if (error.errorMessage) {
            console.log(error.errorMessage);
        }
      });
  });

export const signOut = (() => {
  myMSALObj.logout();
});