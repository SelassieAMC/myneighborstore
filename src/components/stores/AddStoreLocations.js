import React, { useCallback, useEffect, useState } from 'react';
import Location from '../../models/Location';
import MyInput from '../common/basic-elements/MyInput';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import ListLocationsPanel from './ListLocationsPanel';
import * as Utils from '../../utils/utils';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dictionaryActions from '../../redux/actions/dictionaryActions';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '15px',
    marginBottom: '15px'
  };
   
  const center = {
    lat: 4.624335,
    lng: -74.063644
  };

function AddStoreLocations({store,setStore,handleNext, handleBack, viewMode, countries, country, ...props}){

    let location = new Location({});
    const [map, setMap] = useState(null);
    const [citiesOptions, setCities] = useState([]);
    const [localitiesOptions, setLocalities] = useState([]);
    const [neighboorsOptions, setNeighboors] = useState([]);

    const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
    }, []);
    
    const onUnmount = useCallback(function callback(map) {
    setMap(null)
    }, []);

    useEffect(() => {
        if(!country.id){
            props.actions.loadCountry(1)
                .catch(error => {
                    toast.error(error);
                })
        }
    });

    function stateChangeHandler(id){
        const cities = country.states.find(x => x.id === id).cities;
        setCities(cities);
    }

    function cityChangeHandler(id){
        const localities = citiesOptions.find(x => x.id === id).localities;
        setLocalities(localities);
    }

    function localityChangeHandler(id){
        const neighboors = localitiesOptions.find(x => x.id === id).neighboors;
        setNeighboors(neighboors);
    }

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
    }

    function addNewLocation(){
        if(!location.address){
            toast.error("You must fill all the fields.");
            return;
        }
        const id = Utils.createGuid();
        location.uuid = id;

        setStore({...store, ...store.locations.push(location)});
        location = new Location({});
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
            <div className="locations-data">
                <div className="location-fields">
                    { countries.length > 0 ?
                    <div className="wrap-input100 input100-select bg1">
                        <span className="label-input100">Country</span>
                        <div>
                            <select className="js-select2" name="country">
                                <option>Please chooses</option>
                                { countries.map((item) => {
                                    return (<option key={item.id}>item.name</option>)
                                })}
                            </select>
                            <div className="dropDownSelect2"></div>
                        </div>
                    </div> : null
                    }
                    <div className="wrap-input100 input100-select bg1">
                        <span className="label-input100">State</span>
                        <div>
                            <select className="js-select2" name="state" onChange={() => stateChangeHandler(1)}>
                                <option>Please chooses</option>
                                {   country?.states?.length > 0 ? country?.states?.map( item => {
                                        return <option key={item?.id} value={item?.id}>{item?.name}</option>
                                    }): null
                                }
                            </select>
                            <div className="dropDownSelect2"></div>
                        </div>
                    </div>
                    <div className="wrap-input100 input100-select bg1">
                        <span className="label-input100">City</span>
                        <div>
                            <select className="js-select2" name="city">
                                <option>Please chooses</option>
                                {citiesOptions.length > 0 ? citiesOptions.map((item) => {
                                    return (<option key={item?.id}>{item?.name}</option>)
                                }) : null}
                            </select>
                            <div className="dropDownSelect2"></div>
                        </div>
                    </div>
                    <div className="wrap-input100 input100-select bg1">
                        <span className="label-input100">Neighboor</span>
                        <div>
                            <select className="js-select2" name="neighboor">
                                <option>Please chooses</option>
                                {countries.length > 0 ? countries.map((item) => {
                                    return (<option key={item.id}>item.name</option>)
                                }) : null}
                            </select>
                            <div className="dropDownSelect2"></div>
                        </div>
                    </div>
                    {/* <MyInput 
                        msgValidation = "Enter the city" 
                        txtLabel = "City"
                        isMandatory
                        msgPlaceHolder = "Enter the store city"
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
                        type = "number"
                        name = "country"
                        value = {location.getCountry()}
                        onChangeHandler = {handleChange}
                        hidden={viewMode}
                    /> */}

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
                    <button hidden={viewMode} onClick={addNewLocation} className="add-button">
                        <img src="/static/icons/button-850100_960_720.png" alt="addbutton"/>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg" className="plus-icon" />
                    </button>
                </div>
                {
                    !viewMode ? 
                    <div className="google-map-container">
                        <LoadScript
                            googleMapsApiKey="AIzaSyA1rDr6RUgwIbN4HiRYQ3oE2UQt2o9UJ6w"
                        >
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                                position={{lat:center.lat, lng:center.lng}}
                            ></GoogleMap>
                        </LoadScript>
                    </div> : 
                    <></>
                }
            </div>
            <div className="location-panel-container">
                { store.locations.length > 0 ?
                    <ListLocationsPanel locations={store.locations}/> :
                    null
                }
            </div>
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

function mapStateToProps(state){
    return {
        countries: state.dictionaries.countries,
        country: state.dictionaries.country
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            loadCountries: bindActionCreators(dictionaryActions.loadCountries, dispatch),
            loadCountry: bindActionCreators(dictionaryActions.loadCountry, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (React.memo(AddStoreLocations));