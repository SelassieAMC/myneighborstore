import React from 'react';
import { Link } from 'react-router-dom';
import './styles/StoresList.css';

function StoresList({stores, showDetails=false}){
    return (
        <div className="row stores-list">
            {
                stores.lenght === 0 ?
                <p>Crea una tienda ahora ...</p> :
                stores.map( store => {
                    const urlImageStore = store.photos[0]?.urlAccess ?? "/static/images/bannerImages/banner-item-01.jpg"
                    return (
                        <div key ={store?.id} className="col-sm-3 col-md-3">
                            <div className="thumbnail">
                                <Link className="lightbox" to={"/store-details/"+store.id}>
                                    <img src={urlImageStore} alt="MyStore"/>
                                </Link>
                                <div className="caption">
                                    <h3>{store?.name}</h3>
                                    {showDetails ? <p>{store?.description}</p> : <></>}
                                </div>
                            </div>
                        </div>    
                    )
                })
            }
        </div>
    );
}

export default StoresList;
