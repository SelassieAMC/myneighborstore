import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as  authActions from '../../redux/actions/authActions';
import * as authRedirect from '../../authentication/authRedirect';
import './Nav-bar.css';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

function Navbar({ userAuth, ...props}){

    const [user, setUser] = useState(userAuth);

    useEffect(() => {
        const userCheck = user?.name;
        if(!userCheck){
            setUser(authRedirect.getAccount());
        }else if(!userAuth?.name){
            props.actions.signInUser(user);
        }
    },[user, userAuth, props.actions]);

    function handleLogin(){
        if(user?.name){
            authRedirect.signOut();
        }else{
            authRedirect.signIn();
        }
    }

    const textButton = user?.name ? user.name.toLocaleUpperCase() : 'LOGIN';
    
    return (
        <nav>
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink exact to="/">About</NavLink></li>
                <li><NavLink exact to="/">Team</NavLink></li>
                <li><NavLink exact to="/">Contact</NavLink></li>
                <li><NavLink to="/Stores">Stores</NavLink></li>
                <li>
                    <button onClick={handleLogin} >{textButton}</button>
                    <div className="user-profile"></div>
                </li>
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    userAuth: propTypes.object.isRequired,
    actions: propTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        userAuth: state.userAuth
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            signInUser: bindActionCreators(authActions.signInUser, dispatch),
            signOutUser: bindActionCreators(authActions.signOutUser, dispatch)
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
