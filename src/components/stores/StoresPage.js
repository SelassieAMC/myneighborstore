import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from '../../redux/actions/storeActions';
import Spinner from '../common/Spinner';
import StoresList from './StoresList';
import './StoresPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function StoresPage(props){

    useEffect(() => {
        if(props.stores.length === 0){
            props.actions.loadStores().catch(error => {
                console.log(error);
            });
        }
    },[props.actions,props.stores]);

    return(
        <div className="stores-admin">
            <h2>Stores</h2>
            <p className="page-description">Manage the stores in the application.</p>
            { 
                props.apiCallFailed ?
                <h2>Error trying to load stores information</h2> :
                props.apiStatus ? 
                <Spinner/> :
                <>
                    <Link to="/create-store-wiz">
                        <button type="button" className="menu-button">
                            <FontAwesomeIcon icon={faPlusCircle} size="lg" className="plus-icon" />
                            Add Store
                        </button>                        
                    </Link>

                    <StoresList stores = {props.stores} showDetails={false}/>
                </>
            }
        </div>
    );

}

function mapStateToProps(state){
    return{
        stores: state.stores,
        apiStatus: state.apiStatus > 0,
        apiCallFailed: state.apiStatus === -100
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            loadStores: bindActionCreators(storeActions.loadStores, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoresPage);