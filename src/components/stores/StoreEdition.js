import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Store from '../../models/Store';
import * as storeActions from '../../redux/actions/storeActions';
import AddStoreInformation from './AddStoreInformation';
import AddStoreLocations from './AddStoreLocations';
import AddStorePhotos from './AddStorePhotos';
import './styles/StoreCreation.css';
import './styles/StoreEdition.css';

function StoreEdition({store, stores, ...props}){

    const [stepSection, setSection] = useState(1);

    useEffect(() => {
        if(stores.length === 0){
            props.actions.loadStores();
        }
    },[props, stores]);

    function handleTab(step){
        setSection(step);
    }

    function StepComponent(){
        switch(stepSection){
            case 1: return <AddStoreInformation store={store}/>
            case 2: return <AddStoreLocations store={store}/>
            case 3: return <AddStorePhotos photos={store.photos}/>
            default: break;
        }
    }

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Store Details</h2>
                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                        <span className={`nav-link ${stepSection === 1 ? 'active' : ''}`} data-toggle="pill" onClick={() => handleTab(1)}>Basic Information</span>
                    </li>
                    <li className="nav-item">
                        <span className={`nav-link ${stepSection === 2 ? 'active' : ''}`} data-toggle="pill" onClick={() => handleTab(2)}>Location</span>
                    </li>
                    <li className="nav-item">
                        <span className={`nav-link ${stepSection === 3 ? 'active' : ''}`} data-toggle="pill" onClick={() => handleTab(3)}>Photos</span>
                    </li>
                </ul>
                <div className="tab-content">
                    <StepComponent/>
                </div>
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
            updateStore : bindActionCreators(storeActions.saveStore, dispatch),
            loadStores : bindActionCreators(storeActions.loadStores, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (StoreEdition);