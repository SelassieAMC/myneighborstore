import * as actionTypes from '../actions/actionTypes';

export default function storeEditionReducer(state = [], action) {
    switch(action.type){
        case actionTypes.SAVE_STORE_SUCCESS:
            return action.store;
        default: 
            return state;
    }
}