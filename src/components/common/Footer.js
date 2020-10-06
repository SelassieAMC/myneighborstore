import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer(){
    return(
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>Sobre nosotros</h6>
                        <p className="text-justify">
                            Mi tiendita es una iniciativa que busca ayudar a los pequeños y grandes comercios a obtener un mejor reconocimiento
                            en una comunidad especifica y llegar a cubrir mas mercado en una ciudad. Por medio de estrellas y reconocimientos
                            un pequeño empresario puede establecer un mercado sin importar si cuenta con un local de comercio, eso es lo que hace
                            posible que podamos ayudar a pequeños empresarios a ser reconocidos.
                        </p>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Categories</h6>
                        <ul className="footer-links">
                            <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                            <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
                            <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                            <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
                            <li><a href="http://scanfcode.com/category/android/">Android</a></li>
                            <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                            <li><a href="http://scanfcode.com/about/">About Us</a></li>
                            <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                            <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                            <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                            <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
                        </ul>
                    </div>
                    <hr/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">
                                Copyright &copy; 2020 All Rights Reserved
                            </p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="facebook" href="/#"><FontAwesomeIcon icon={['fab','facebook-f']}/></a></li>
                                <li><a className="twitter" href="/#"><FontAwesomeIcon icon={['fab','twitter']}/></a></li>
                                <li><a className="github" href="/#"><FontAwesomeIcon icon={['fab','github']}/></a></li>
                                <li><a className="linkedin" href="/#"><FontAwesomeIcon icon={['fab','linkedin']}/></a></li>   
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )  
}