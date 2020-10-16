import React, { useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import './Banner.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActions from '../../redux/actions/storeActions';

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
                                            <a href="post-details.html"><h4>{store.name}</h4></a>
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

                    {/* <div className="item">
                        <img src= {'/static/images/bannerImages/banner-item-02.jpg'} alt=""/>
                        <div className="item-content">
                            <div className="main-content">
                                <div className="meta-category">
                                    <span>Nature</span>
                                </div>
                                <a href="post-details.html"><h4>Donec porttitor augue at velit</h4></a>
                                <ul className="post-info">
                                    <li><a href="/#">Admin</a></li>
                                    <li><a href="/#">May 14, 2020</a></li>
                                    <li><a href="/#">24 Comments</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <img src={'/static/images/bannerImages/banner-item-03.jpg'} alt=""/>
                        <div className="item-content">
                            <div className="main-content">
                                <div className="meta-category">
                                <span>Lifestyle</span>
                                </div>
                                <a href="post-details.html"><h4>Best HTML Templates on TemplateMo</h4></a>
                                <ul className="post-info">
                                <li><a href="/#">Admin</a></li>
                                <li><a href="/#">May 16, 2020</a></li>
                                <li><a href="/#">36 Comments</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={'/static/images/bannerImages/banner-item-04.jpg'} alt=""/>
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Fashion</span>
                            </div>
                            <a href="post-details.html"><h4>Responsive and Mobile Ready Layouts</h4></a>
                            <ul className="post-info">
                            <li><a href="/#">Admin</a></li>
                            <li><a href="/#">May 18, 2020</a></li>
                            <li><a href="/#">48 Comments</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={'/static/images/bannerImages/banner-item-05.jpg'} alt=""/>
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Nature</span>
                            </div>
                            <a href="post-details.html"><h4>Cras congue sed augue id ullamcorper</h4></a>
                            <ul className="post-info">
                            <li><a href="/#">Admin</a></li>
                            <li><a href="/#">May 24, 2020</a></li>
                            <li><a href="/#">64 Comments</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={'/static/images/bannerImages/banner-item-06.jpg'} alt=""/>
                        <div className="item-content">
                        <div className="main-content">
                            <div className="meta-category">
                            <span>Lifestyle</span>
                            </div>
                            <a href="post-details.html"><h4>Suspendisse nec aliquet ligula</h4></a>
                            <ul className="post-info">
                            <li><a href="/#">Admin</a></li>
                            <li><a href="/#">May 26, 2020</a></li>
                            <li><a href="/#">72 Comments</a></li>
                            </ul>
                        </div>
                        </div>
                    </div> */}
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