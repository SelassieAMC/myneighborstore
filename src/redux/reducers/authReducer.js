import * as actionTypes from '../actions/actionTypes';

export default function authReducer(state = {}, action){
    debugger;
    switch(action.type){
        case actionTypes.USER_LOGGEDIN_SUCCESS:
            return action.userAuth;
        case actionTypes.USER_LOGGEDOUT_SUCCESS:
            return state;
        default:
            return state;
    }
}