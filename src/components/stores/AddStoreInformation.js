import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Store from '../../models/Store';
import MyInput from '../common/basic-elements/MyInput';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import MyTextArea from '../common/basic-elements/MyTextArea';
import './StoreCreation.css';

function AddStoreInformation({store,handleSubmitAction}){
    const storeObj = useState(new Store(store ?? {}));

    function handleChange(event){
        let value = event.target.value;
        console.log(value);
    }

    return (
        <form className="contact100-form validate-form" onSubmit={handleSubmitAction}>
            <MyInput 
                msgValidation = "Enter the name" 
                txtLabel = "Store Name"
                isMandatory
                msgPlaceHolder = "Enter the store name"
                type = "text"
                name = "name"
                value = {storeObj.name}
                onChangeHandler = {handleChange}
            />

            <MyTextArea 
                msgValidation = "Enter a more detailed description" 
                txtLabel = "Description"
                isMandatory
                msgPlaceHolder = "Type your description here ..."
                name = "description"
                value = {storeObj.description}
                onChangeHandler = {handleChange}
            />

            <MyInput 
                msgValidation = "Enter a valid email" 
                txtLabel = "Business or personal email"
                isMandatory
                msgPlaceHolder = "Enter your email"
                styleclass = "rs1-wrap-input100"
                type="email"
                name = "email"
                value = {storeObj.email}
                onChangeHandler = {handleChange}
            />

            <MyInput 
                msgValidation = "Enter a valid phone number" 
                txtLabel = "Business or personal phone number"
                isMandatory
                msgPlaceHolder = "Enter your phone number"
                styleclass = "rs1-wrap-input100"
                type="number"
                name = "phone"
                value = {storeObj.phone}
                onChangeHandler = {handleChange}
            />
            <div className="container-contact100-form-btn">
                <MySubmitButton textButton="Add Basic Info" type="submit" styleClass="contact50-form-btn"/>
                <Link className="cancel-button" to="/stores">
                    <MySubmitButton textButton="Cancel" styleClass="contact100-form-btn" />
                </Link>
            </div>
        </form>
    )
}

export default AddStoreInformation;