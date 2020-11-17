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

function AddStoreLocations({store,setStore,handleNext, handleBack, viewMode, editMode, countries, country, ...props}){

    //let location = new Location({});
    const [location, setLocation] = useState(new Location({}));
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

    function compare ( a, b ){ if(a.name > b.name) return 1; if( a.name < b.name ) return -1; return 0;}

    function stateChangeHandler(id){
        setLocalities([]);
        setNeighboors([]);
        let state = country.states.find(x => x.id === id);
        setLocation({...location, countryId:country.id, stateId:id, state:{ id : state.id, name: state.name}});
        const cities = [...state?.cities].sort(compare);
        setCities(cities ?? []);
    }

    function cityChangeHandler(id){
        setNeighboors([]);
        let city = citiesOptions.find(x => x.id === id);
        setLocation({...location, ...{cityId:id, city:{id : city.id, name: city.name}}});
        const localities = [...city?.localities].sort(compare);
        setLocalities(localities ?? []);
    }

    function localityChangeHandler(id){
        let locality = localitiesOptions.find(x => x.id === id);
        setLocation({...location, ...{localityId:id, locality:{id : locality.id, name: locality.name}}});
        const neighboors = [...locality?.neighboors].sort(compare);
        setNeighboors(neighboors ?? []);
    }

    function neighborChangeHandler(id){
        location.neighborId = id;
        let neighbor = neighboorsOptions.find(x => x.id === id);
        setLocation({...location, ...{neighborId:id, neighbor:{id : neighbor.id, name: neighbor.name}}});
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        switch(name){
            case "address": 
                setLocation({...location, address:value});
                break;
            case "coordinates":
                setLocation({...location, coordinates:value});
                break;
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
        setLocation(new Location({}));
    }

    return(
        <section className="contact100-form validate-form" onSubmit={handleNext}>
            {
            !viewMode ?
            <>
                <MyInput 
                    msgValidation = "Enter the address" 
                    txtLabel = "Address"
                    isMandatory
                    msgPlaceHolder = "Enter the store address"
                    type = "text"
                    name = "address"
                    value = {location.address}
                    onChangeHandler = {handleChange}
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
                                        return (<option key={item.id}>{item.name.toUpperCase()}</option>)
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
                                            return <option key={item?.id} value={item?.id}>{item?.name.toUpperCase()}</option>
                                        }): null
                                    }
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                        </div>
                        <div className="wrap-input100 input100-select bg1">
                            <span className="label-input100">City</span>
                            <div>
                                <select className="js-select2" name="city" onChange={(e) => cityChangeHandler(parseInt(e.target.value))}>
                                    <option>Please chooses</option>
                                    {citiesOptions.length > 0 ? citiesOptions.map((item) => {
                                        return (<option key={item?.id} value={item?.id}>{item?.name.toUpperCase()}</option>)
                                    }) : null}
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                        </div>
                        <div className="wrap-input100 input100-select bg1">
                            <span className="label-input100">Locality</span>
                            <div>
                                <select className="js-select2" name="locality" onChange={(e) => localityChangeHandler(parseInt(e.target.value))}>
                                    <option>Please chooses</option>
                                    {localitiesOptions.length > 0 ? localitiesOptions.map((item) => {
                                        return (<option key={item?.id} value={item?.id}>{item?.name.toUpperCase()}</option>)
                                    }) : null}
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                        </div>
                        <div className="wrap-input100 input100-select bg1">
                            <span className="label-input100">Neighbor</span>
                            <div>
                                <select className="js-select2" name="neighbor" onChange={(e) => neighborChangeHandler(parseInt(e.target.value))}>
                                    <option>Please chooses</option>
                                    {neighboorsOptions.length > 0 ? neighboorsOptions.map((item) => {
                                        return (<option key={item?.id} value={item?.id}>{item?.name.toUpperCase()}</option>)
                                    }) : null}
                                </select>
                                <div className="dropDownSelect2"></div>
                            </div>
                        </div>
                        <MyInput 
                            msgValidation = "Enter the coordinates" 
                            txtLabel = "Coordinates"
                            isMandatory
                            msgPlaceHolder = "Enter the store coordinates"
                            type = "text"
                            name = "coordinates"
                            value = {location.coordinates}
                            onChangeHandler = {handleChange}
                            hidden={viewMode}
                        />
                        <button hidden={viewMode} onClick={addNewLocation} className="add-button">
                            <img src="/static/icons/button-850100_960_720.png" alt="addbutton"/>
                            <FontAwesomeIcon icon={faPlusCircle} size="lg" className="plus-icon" />
                        </button>
                    </div>
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
                    </div>
                </div> 
            </>: null }
            <div className="location-panel-container">
                { store.locations.length > 0 ?
                    <ListLocationsPanel locations={store.locations}/> :
                    null
                }
            </div>
            {
                editMode ? editMode : viewMode ? 
                null :
                <div className="container-contact100-form-btn">
                    { store.locations.length > 0 ?
                        <MySubmitButton textButton="Next" disabled={false} isHidden={editMode ? editMode : viewMode} onClickHandler={handleNext} styleClass="contact50-form-btn"/> :
                        <MySubmitButton textButton="Next" disabled={true} isHidden={editMode ? editMode : viewMode} styleClass="disabled-form-btn"/>
                    }
                    <MySubmitButton textButton="Back" isHidden={editMode ? editMode : viewMode} onClickHandler={handleBack} styleClass="contact50-form-btn" />
                </div>
            }
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