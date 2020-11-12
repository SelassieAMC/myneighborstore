import * as actionTypes from './actionTypes';
import { beginApiCall } from './apiStatusActions';
import * as countryDataCalls from '../../apiCalls/Dictionaries/countryDataCalls';

export function loadCountriesSuccess(countries){
    return {type: actionTypes.LOAD_COUNTRIES_SUCCESS,countries};
}

export function loadCountrySuccess(country){
    return {type: actionTypes.LOAD_COUNTRY_SUCCESS,country};
}

export function loadCountries(includeData=true){
    return function (dispatch){
        dispatch(beginApiCall());
        return countryDataCalls.getCountries(includeData)
                .then( resp => {
                    dispatch(loadCountriesSuccess(resp))
                }).catch(error => {
                    throw error;
                });
    }
}

export function loadCountry(id, includeData=true){
    return function (dispatch){
        dispatch(beginApiCall());
        return countryDataCalls.getCountryById(id, includeData)
                .then( resp => {
                    dispatch(loadCountrySuccess(resp))
                }).catch(error => {
                    throw error;
                });
    }
}