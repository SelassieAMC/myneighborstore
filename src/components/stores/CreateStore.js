import React, { useState } from 'react';
import MyInput from '../common/basic-elements/MyInput';
import MyTextArea from '../common/basic-elements/MyTextArea';
import './CreateStore.css';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import Store from '../../models/Store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions  from '../../redux/actions/storeActions'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function CreateStore({history, store, ...props}){

    const [storeObj] = useState(new Store(store ?? {}));

    function handleSubmitAction(event){
        event.preventDefault();
        const target = event.target;
        const newStore = new Store({});
        for(let i=0; i< target.length; i++){
            switch(target[i].name){
                case 'name': newStore.name = target[i].value 
                            break;
                case 'description': newStore.description = target[i].value 
                            break;
                case 'email':newStore.email = target[i].value 
                            break;
                case 'phone':newStore.phone = target[i].value 
                            break;
                default: break;
            }
        }
        props.actions.saveStore(newStore)
            .then( () => {
                toast.success("Store created successfully");
                history.push('/add-store-details');
            })
            .catch(error => {
                toast.error(error);
            });
    }

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Create Store</h2>
                <form className="contact100-form validate-form" onSubmit={handleSubmitAction}>
                    <MyInput 
                        msgValidation = "Enter the name" 
                        txtLabel = "Store Name"
                        isMandatory
                        msgPlaceHolder = "Enter the store name"
                        type = "text"
                        name = "name"
                        value = {storeObj.getName()}
                    />

                    <MyTextArea 
                        msgValidation = "Enter a more detailed description" 
                        txtLabel = "Description"
                        isMandatory
                        msgPlaceHolder = "Type your description here ..."
                        name = "description"
                        value = {storeObj.getDescription()}
                    />

                    <MyInput 
                        msgValidation = "Enter a valid email" 
                        txtLabel = "Business or personal email"
                        isMandatory
                        msgPlaceHolder = "Enter your email"
                        styleclass = "rs1-wrap-input100"
                        type="email"
                        name = "email"
                        value = {storeObj.getEmail()}
                    />

                    <MyInput 
                        msgValidation = "Enter a valid phone number" 
                        txtLabel = "Business or personal phone number"
                        isMandatory
                        msgPlaceHolder = "Enter your phone number"
                        styleclass = "rs1-wrap-input100"
                        type="number"
                        name = "phone"
                        value = {storeObj.getPhone()}
                    />

                    <div className="container-contact100-form-btn">
                        <MySubmitButton textButton="Create & Continue" type="submit" styleClass="contact50-form-btn"/>
                        <Link className="cancel-button" to="/stores">
                            <MySubmitButton textButton="Cancel" styleClass="contact100-form-btn" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        
    )
}

function mapStateToProps(state){
    return { store: state.store };
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            saveStore: bindActionCreators(storeActions.saveStore, dispatch)
        }
    }     
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);