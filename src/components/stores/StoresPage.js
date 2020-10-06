import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from '../../redux/actions/storeActions';
import Spinner from '../common/Spinner';
import StoresList from './StoresList';
import './StoresPage.css';
import CreateStore from './CreateStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

function StoresPage(props){
    const [addStore, setAddStore] = useState(false);

    useEffect(() => {
        if(props.stores.length === 0){
            props.actions.loadStores().catch(error => {
                console.log(error);
            });
        }
    },[props.actions,props.stores]);

    function handleAddStore(){
        setAddStore(true);
    }

    return(
        <div className="stores-admin">
            <h2>Stores</h2>
            <p className="page-description">Manage the stores in the application.</p>
            { 
                props.apiCallFailed ?
                <h2>Error al cargar informacion de tiendas</h2> :
                props.apiStatus ? 
                <Spinner/> :
                    addStore ? 
                    <CreateStore cancelAction={setAddStore}/> : 
                    <>
                        <button className="menu-button" onClick={handleAddStore}>
                            <FontAwesomeIcon icon={faPlusCircle} size="lg" className="plus-icon" />
                            Add Store
                        </button>

                        <StoresList stores = {props.stores}/>
                    </>
            }
        </div>
    );

}

function mapStateToProps(state){
    return{
        stores: state.stores,
        apiStatus: state.apiStatus >= 0,
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