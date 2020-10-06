import React from 'react';
import './StoresList.css';

function StoresList({stores, showDetails=false}){
    return (
        <div className="row stores-list">
            {
                stores.lenght === 0 ?
                <p>Crea una tienda ahora ...</p> :
                stores.map( store => {
                    const urlStore = store.photos[0]?.urlAccess ?? "/static/images/bannerImages/banner-item-01.jpg"
                    return (
                        <div key ={store?.id} className="col-sm-3 col-md-3">
                            <div className="thumbnail">
                                <a className="lightbox" href="/">
                                    <img src={urlStore} alt="MyStore"/>
                                </a>
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
