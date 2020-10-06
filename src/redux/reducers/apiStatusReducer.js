import * as actionTypes from '../actions/actionTypes';

const initialState = {
        apiCallStatus : 0
    }

function actionTypeEndsInSuccess(type){
    return type.substring(type.length - 8) === "_SUCCESS";
}

function actionTypeEndsInError(type){
    return type.substring(type.length - 5) === "_FAIL";
}

export default function apiCallStatusReducer( state = initialState.apiCallStatus, action){
    if(action.type === actionTypes.BEGIN_API_CALL){
        return state + 1;
    }else if(actionTypeEndsInSuccess(action.type)){
        return state -1;
    }else if(actionTypeEndsInError(action.type)){
        return -100;
    }
    return state;
}