import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from '../../redux/actions/storeActions';
import Spinner from '../common/Spinner';

function StoresPage(props){

    useEffect(() => {
        props.actions.loadStores().catch(error => {
            console.log(error);
        });
    },[props.actions]);

    return(
        <>
        { props.apiStatus ? 
            <Spinner/> :
            <div>
                <h2>Hola</h2>
                {
                    props.stores.map( store => {
                        return (
                            <p key ={store?.id}>
                                {store?.name}
                            </p>
                        )
                    })
                }
            </div>
        }
        </>
    );

}

function mapStateToProps(state){
    return{
        stores: state.stores,
        apiStatus: state.apiCallStatus > 0
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