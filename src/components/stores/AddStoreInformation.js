import React from 'react';
import MyInput from '../common/basic-elements/MyInput';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import MyTextArea from '../common/basic-elements/MyTextArea';

function AddStoreInformation({store,setStore,handleNext, viewMode}){

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case "name":store.name = value; break;
            case "description":store.description = value; break;
            case "email":store.email = value; break;
            case "phone":store.phone = value; break;
            default: break;
        }
        setStore(store);
    }

    return (
        <section className="contact100-form validate-form">
            <MyInput 
                msgValidation = "Enter the name" 
                txtLabel = "Store Name"
                isMandatory
                msgPlaceHolder = "Enter the store name"
                type = "text"
                name = "name"
                value = {store.name}
                onChangeHandler = {handleChange}
                isDisabled={viewMode}
            />

            <MyTextArea 
                msgValidation = "Enter a more detailed description" 
                txtLabel = "Description"
                isMandatory
                msgPlaceHolder = "Type your description here ..."
                name = "description"
                value = {store.description}
                onChangeHandler = {handleChange}
                isDisabled={viewMode}
            />

            <MyInput 
                msgValidation = "Enter a valid email" 
                txtLabel = "Business or personal email"
                isMandatory
                msgPlaceHolder = "Enter your email"
                styleclass = "rs1-wrap-input100"
                type="email"
                name = "email"
                value = {store.email}
                onChangeHandler = {handleChange}
                isDisabled={viewMode}
            />

            <MyInput 
                msgValidation = "Enter a valid phone number" 
                txtLabel = "Business or personal phone number"
                isMandatory
                msgPlaceHolder = "Enter your phone number"
                styleclass = "rs1-wrap-input100"
                type="number"
                name = "phone"
                value = {store.phone}
                onChangeHandler = {handleChange}
                isDisabled={viewMode}
            />
            <div className="container-contact100-form-btn">
                <MySubmitButton textButton="Next" onClickHandler={handleNext} styleClass="contact50-form-btn" isHidden={viewMode}/>
            </div>
        </section>
    )
}

export default AddStoreInformation;