import React, { useState } from 'react';
import { connect } from 'react-redux';
import Store from '../../models/Store';
import './StoreDetails.css';

function StoreDetails({store, ...props}){
    const [ storeObj, setStore] = useState(new Store( store ?? {}));
    return (
        <div className="store-details">
            {store ? 
            <div>
                <h2>{storeObj.name}</h2>
                <input value={storeObj.description}/>
                <input value={storeObj.email}/>
                <input value={storeObj.phone}/>
                { storeObj.locations?.map( location => {
                    return (
                        location.isenable ?
                        <div className="addresses">
                            <div className="info">
                                <input value={location.address}/>
                                <input value={location.coordinates}/> 
                            </div>
                        </div>:
                        <></>
                    )
                }) }
            </div> :
            <h2>Tienda no encontrada</h2>
            }
        </div>
    );
}


function mapStateToProps(state, ownProps){

    const id = ownProps.match.params.id;
    const store = id && state.stores.length > 0 ?
                state.stores.find( x => x.id === id) :
                {};
    return {
        stores: state.stores,
        store
    }
}


export default connect(mapStateToProps, null) (StoreDetails);