import * as actionTypes from './actionTypes';
import { beginApiCall } from './apiStatusActions';
import * as storeCalls from '../../apiCalls/Store/storeCalls';

export function loadStoresSucess(stores){
    return {type: actionTypes.LOAD_STORES_SUCCESS,stores};
}

export function  loadStores() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return storeCalls
                .getStores()
                .then( stores => {
                    dispatch(loadStoresSucess(stores));
                }).catch(error => {
                    throw error;
                });
    }
}