import * as actionTypes from '../actions/actionTypes';

export default function storeReducer(state = [], action) {
    switch(action.type){
        case actionTypes.LOAD_STORES_SUCCESS:
            return action.stores;
        default: 
            return state;
    }
}