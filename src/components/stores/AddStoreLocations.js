import React, { useState } from 'react';
import Location from '../../models/Location';
import MyInput from '../common/basic-elements/MyInput';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import ListLocationsPanel from './ListLocationsPanel';
import * as Utils from '../../utils/utils';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
  };
   
  const center = {
    lat: 4.624335,
    lng: -74.063644
  };

function AddStoreLocations({store,setStore,handleNext, handleBack, viewMode}){

    const [location,setLocation] = useState(new Location({}));
    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, []);
    
    const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    }, []);

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

    function addNewLocation(){
        if(!location.address){
            toast.error("You must fill all the fields.");
            return;
        }
        const id = Utils.createGuid();
        location.uuid = id;
        setLocation(location);

        setStore({...store, ...store.locations.push(location)});
        setLocation(new Location({}));
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
                hidden={viewMode}
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
                hidden={viewMode}
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
                hidden={viewMode}
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
                hidden={viewMode}
            />
            {
                !viewMode ? 
                <LoadScript
                    googleMapsApiKey="AIzaSyA1rDr6RUgwIbN4HiRYQ3oE2UQt2o9UJ6w"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    ></GoogleMap>
                </LoadScript> :
                <></>
            }
            
            <div className="location-panel-container">
                { store.locations.length > 0 ?
                    <ListLocationsPanel locations={store.locations}/> :
                    <><p>No locations registered!!</p></>
                }
            </div>
            <button hidden={viewMode} onClick={addNewLocation} className="add-button">
                <img src="/static/icons/button-850100_960_720.png" alt="addbutton"/>
                <FontAwesomeIcon icon={faPlusCircle} size="lg" className="plus-icon" />
            </button>
            <div className="container-contact100-form-btn">
                { store.locations.length > 0 ?
                    <MySubmitButton textButton="Next" disabled={false} isHidden={viewMode} onClickHandler={handleNext} styleClass="contact50-form-btn"/> :
                    <MySubmitButton textButton="Next" disabled={true} isHidden={viewMode} styleClass="disabled-form-btn"/>
                }
                <MySubmitButton textButton="Back" isHidden={viewMode} onClickHandler={handleBack} styleClass="contact50-form-btn" />
            </div>

        </section>
    );
}

export default React.memo(AddStoreLocations);