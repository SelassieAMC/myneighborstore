import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Location from '../../models/Location';
import Store from '../../models/Store';
import MyInput from '../common/basic-elements/MyInput';
import MySubmitButton from '../common/basic-elements/MySubmitButton';

function AddStoreLocations({location,setLocation,handleSubmitAction}){

    function handleChange(event){
        let value = event.target.value;
        console.log(value);
        setLocation(new Location({address:value, city:value}));
    }

    return(
        <form className="contact100-form validate-form" onSubmit={handleSubmitAction}>
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

            <div className="container-contact100-form-btn">
                <MySubmitButton textButton="Add details & Continue" type="submit" styleClass="contact50-form-btn"/>
                <Link className="cancel-button" to="/stores">
                    <MySubmitButton textButton="Cancel" styleClass="contact100-form-btn" />
                </Link>
            </div>

        </form>
    );
}

export default AddStoreLocations;