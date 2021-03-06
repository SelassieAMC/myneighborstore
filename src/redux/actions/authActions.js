import * as actionTypes from './actionTypes';
import * as authRedirect from '../../authentication/authRedirect';

export function userLoggedInSuccess(userAuth){
    return { type: actionTypes.USER_LOGGEDIN_SUCCESS, userAuth };
}

export function userLoggedOutSuccess(){
    return { type: actionTypes.USER_LOGGEDOUT_SUCCESS };
}

export function signInUser(authUser){
    return function (dispatch){
        return dispatch(userLoggedInSuccess(authUser));
    }
}

export function signOutUser(){
    return function (dispatch){
        authRedirect.signOut();
        return dispatch(userLoggedOutSuccess());
    }
}

