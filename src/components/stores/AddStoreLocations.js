import React from 'react';
import MyInput from '../common/basic-elements/MyInput';
import MySubmitButton from '../common/basic-elements/MySubmitButton';

function AddStoreLocations({location,setLocation,handleNext, handleBack}){

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case "address":location.address = value; break;
            case "city":location.city = value; break;
            case "country":location.country = value; break;
            case "coordinates":location.coordinates = value; break;
            default: break;
        }
        setLocation(location);
    }

    return(
        <section className="contact100-form validate-form" onSubmit={handleNext}>
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
                <MySubmitButton textButton="Next" onClickHandler={handleNext} styleClass="contact50-form-btn"/>
                <MySubmitButton textButton="Back" onClickHandler={handleBack} styleClass="contact50-form-btn" />
            </div>

        </section>
    );
}

export default AddStoreLocations;