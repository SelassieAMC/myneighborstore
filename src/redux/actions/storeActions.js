import * as actionTypes from './actionTypes';
import { beginApiCall } from './apiStatusActions';
import * as storeCalls from '../../apiCalls/Store/storeCalls';

export function loadStoresSuccess(stores){
    return {type: actionTypes.LOAD_STORES_SUCCESS,stores};
}

export function saveStoreSuccess(store){
    return {type: actionTypes.SAVE_STORE_SUCCESS,store};
}

export function saveStorePhotosSuccess(){
    return {type: actionTypes.SAVE_STORE_PHOTOS_SUCCESS};
}

export function loadStoresFail(){
    return {type: actionTypes.LOAD_STORES_FAIL};
}

export function saveStoreFail(){
    return {type: actionTypes.SAVE_STORE_FAIL};
}

export function saveStorePhotosFail(){
    return {type: actionTypes.SAVE_STORE_PHOTOS_FAIL};
}

export function  loadStores() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return storeCalls
                .getStores()
                .then( stores => {
                    dispatch(loadStoresSuccess(stores));
                }).catch(error => {
                    dispatch(loadStoresFail());
                    throw error;
                });
    }
}

export function saveStore(store){
    return function(dispatch){
        dispatch(beginApiCall());
        return store.id ? 
                storeCalls
                .saveStoreDetails(store)
                    .then( storeResp => {
                        dispatch(saveStoreSuccess(storeResp));
                    }).catch(error => {
                        dispatch(saveStoreFail());
                        throw error;
                    }) :
                storeCalls
                .createStore(store)
                    .then( storeResp => {
                        dispatch(saveStoreSuccess(storeResp));
                    }).catch(error => {
                        dispatch(saveStoreFail());
                        throw error;
                    });
    }
}

export function saveStorePhotos(photosData){
    return function(dispatch){
        dispatch(beginApiCall());
        return storeCalls
                .saveStorePhotos(photosData)
                    .then( () => {
                        dispatch(saveStorePhotosSuccess());
                    })
                    .catch(error => {
                        dispatch(saveStorePhotosFail());
                        throw error;
                    });
    }
}