import * as actionTypes from '../actions/actionTypes';

const initialState = {
    countries : [],
    country: {}
}

export default function dictionariesReducer(state = initialState, action) {
    switch(action.type){
        case actionTypes.LOAD_COUNTRIES_SUCCESS:
            return {...state, countries: action.countries}
        case actionTypes.LOAD_COUNTRY_SUCCESS:
            return {...state, country: action.country}
        default: 
            return state;
    }
}