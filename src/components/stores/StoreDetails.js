import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Store from '../../models/Store';
import * as storeActions from '../../redux/actions/storeActions';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import AddStoreInformation from './AddStoreInformation';
import AddStoreLocations from './AddStoreLocations';
import AddStorePhotos from './AddStorePhotos';
import './styles/StoreCreation.css';
import './styles/StoreEdition.css';
import { Link } from 'react-router-dom';

function StoreDetails({store, stores, ...props}){

    useEffect(() => {
        if(stores.length === 0){
            props.actions.loadStores();
        }
    },[props, stores]);

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Store Details</h2>
                <p className="page-description">Basic Information</p>
                <AddStoreInformation store={store} viewMode/>
                <p className="page-description">Locations associated</p>
                {
                    store.locations.length > 0 ?
                    <AddStoreLocations store={store} viewMode/> :
                    <p>No locations registered to this store</p> 
                }
                <p className="page-description">Store photos</p>
                {
                    store.photos.length > 0 ?
                    <AddStorePhotos photos={store.photos} viewMode/> :
                    <p>No photos uploaded to this store</p> 
                }
                <Link to={`/store-edition/${store.id}`}>
                    <MySubmitButton textButton="Edit" styleClass="contact100-form-btn"/> 
                </Link>               
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    const id = ownProps.match.params.id;
    return {
        store: state.stores.length > 0 ?
                state.stores.find(x => x.id === id) : new Store({}),
        stores: state.stores
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            loadStores : bindActionCreators(storeActions.loadStores, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (StoreDetails);