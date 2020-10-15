import React, { useState } from 'react';
import MyInput from '../common/basic-elements/MyInput';
import './CreateStore.css';
import Location from '../../models/Location';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from '../../redux/actions/storeActions';
import Store from '../../models/Store';
import { toast } from 'react-toastify';

function AddStoreBsDetails({store, history, ...props}){

    const [storeObj, setStore] = useState(new Store(store ?? {}));
    const [location,setLocation] = useState(new Location({}));

    function handleSubmitAction(event){
        event.preventDefault();
        const target = event.target;
        const newLocation = new Location({ storeid : storeObj.id });
        for(let i=0; i< target.length; i++){
            switch(target[i].name){
                case 'address': newLocation.address = target[i].value 
                            break;
                case 'city': newLocation.city = Number(target[i].value) 
                            break;
                case 'country':newLocation.country = Number(target[i].value) 
                            break;
                case 'coordinates':newLocation.coordinates = target[i].value
                            break;
                default: break;
            }
        }
        setLocation(newLocation);
        setStore({...storeObj, ...storeObj.locations.push(newLocation)})
        props.actions.saveStoreDetails(storeObj)
            .then( () => {
                toast.success("Business Info added succesfully.");
                history.push('/add-store-photos');
            })
            .catch(error => {
                toast.error(error);
            });
    }

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Add Store Details</h2>
                <form className="contact100-form validate-form" onSubmit={handleSubmitAction}>
                    <MyInput 
                        msgValidation = "Enter the address" 
                        txtLabel = "Address"
                        isMandatory
                        msgPlaceHolder = "Enter the store address"
                        type = "text"
                        name = "address"
                        value = {location.getAddress()}
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
                    />

                    <MyInput 
                        msgValidation = "Enter the coordinates" 
                        txtLabel = "Coordinates"
                        isMandatory
                        msgPlaceHolder = "Enter the store coordinates"
                        type = "text"
                        name = "coordinates"
                        value = {location.getCoordinates()}
                    />

                    <div className="container-contact100-form-btn">
                        <MySubmitButton textButton="Add details & Continue" type="submit" styleClass="contact50-form-btn"/>
                        <Link className="cancel-button" to="/stores">
                            <MySubmitButton textButton="Cancel" styleClass="contact100-form-btn" />
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return { store: state.store };
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            saveStoreDetails: bindActionCreators(storeActions.saveStore, dispatch)
        }
    }     
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStoreBsDetails);