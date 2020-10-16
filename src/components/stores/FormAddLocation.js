import React from 'react';
import MyInput from '../common/basic-elements/MyInput';

function FormAddLocation({location, handleChange}){
    return(
        <>
            <MyInput 
                msgValidation = "Enter the address" 
                txtLabel = "Address"
                isMandatory
                msgPlaceHolder = "Enter the store address"
                type = "text"
                name = "address"
                value = {location.getAddress()}
                onChangeHandler = {handleChange}
            />

            <MyInput 
                msgValidation = "Enter the city" 
                txtLabel = "City"
                isMandatory
                msgPlaceHolder = "Enter the store city"
                styleclass = "rs1-wrap-input100"
                type = "number"
                name = "city"
                value = {location.getCity()}
                onChangeHandler = {handleChange}
            />

            <MyInput 
                msgValidation = "Enter the country" 
                txtLabel = "Country"
                isMandatory
                msgPlaceHolder = "Enter the store country"
                styleclass = "rs1-wrap-input100"
                type = "number"
                name = "country"
                value = {location.getCountry()}
                onChangeHandler = {handleChange}
            />

            <MyInput 
                msgValidation = "Enter the coordinates" 
                txtLabel = "Coordinates"
                isMandatory
                msgPlaceHolder = "Enter the store coordinates"
                type = "text"
                name = "coordinates"
                value = {location.getCoordinates()}
                onChangeHandler = {handleChange}
            />
        </>
    )
}

export default FormAddLocation;