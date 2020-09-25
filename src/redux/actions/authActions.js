import * as actionTypes from './actionTypes';
import * as authRedirect from '../../authentication/authRedirect';

export function userLoggedInSuccess(userAuth){
    return { type: actionTypes.USER_LOGGEDIN_SUCCESS, userAuth };
}

export function userLoggedOutSuccess(){
    return { type: actionTypes.USER_LOGGEDOUT_SUCCESS };
}

export function signInUser(){
    return function (dispatch){
        const authUser = authRedirect.getMsalObject().getAccount()??{};
        return dispatch(userLoggedInSuccess(authUser));
    }
}

export function signOutUser(){
    return function (dispatch){
        authRedirect.signOut();
        return dispatch(userLoggedOutSuccess());
    }
}

