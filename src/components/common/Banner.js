import React, { useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import './Banner.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from '../../redux/actions/storeActions';
import { Link } from 'react-router-dom';

function Banner({stores, ...props}){

    useEffect(() => {
        if(stores.length === 0){
            props.actions.loadStores();
        }
    });

    return(
        <div className="main-banner header-text">
            { stores.length > 0 ? 
            <div className="container-fluid">
                <OwlCarousel 
                    items={3} 
                    className="owl-theme owl-banner"
                    loop  
                    nav  
                    margin={1}
                    dots
                >
                    {
                        stores.map(store => {
                            return (
                                <div key={store.id} className="item">
                                    <img className="img" src= {store.photos[0].urlAccess} alt=""/>
                                    <div className="item-content">
                                        <div className="main-content">
                                            <div className="meta-category">
                                                <span>Fashion</span>
                                            </div>
                                            <Link to={`store-details/${store.id}`}><h4>{store.name}</h4></Link>
                                            <ul className="post-info">
                                                <li><a href="/#">Admin</a></li>
                                                <li><a href="/#">May 12, 2020</a></li>
                                                <li><a href="/#">12 Comments</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="item">
                        <img className="img" src= {'/static/images/bannerImages/banner-item-01.jpg'} alt=""/>
                        <div className="item-content">
                            <div className="main-content">
                                <div className="meta-category">
                                    <span>Fashion</span>
                                </div>
                                <a href="post-details.html"><h4>Morbi dapibus condimentum</h4></a>
                                <ul className="post-info">
                                    <li><a href="/#">Admin</a></li>
                                    <li><a href="/#">May 12, 2020</a></li>
                                    <li><a href="/#">12 Comments</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div> : <></> }
        </div> 
    )
}

function mapStateToProps(state){
    return {
        stores : state.stores
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : {
            loadStores: bindActionCreators(storeActions.loadStores, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Banner);