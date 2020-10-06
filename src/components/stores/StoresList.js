import React from 'react';
import './StoresList.css';

function StoresList({stores}){
    return (
        <div className="row stores-list">
            {
                stores.lenght === 0 ?
                <p>Crea una tienda ahora ...</p> :
                stores.map( store => {
                    return (
                        <div key ={store?.id} className="col-sm-3 col-md-3">
                            <div className="thumbnail">
                                <a className="lightbox" href="/">
                                    <img src="/static/images/bannerImages/banner-item-01.jpg" alt="Park"/>
                                </a>
                                <div className="caption">
                                    <h3>{store?.name}</h3>
                                    <p>{store?.description}</p>
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
