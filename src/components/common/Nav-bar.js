import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as  authActions from '../../redux/actions/authActions';
import * as authRedirect from '../../authentication/authRedirect';
import './Nav-bar.css';
import { bindActionCreators } from 'redux';

function Navbar( {userAuth, ...props} ){
    //const [userAuth, setUserAuth] = useState(userAuth);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if(userAuth.name){
            setSignedIn(true);
            console.log("Hola "+ userAuth.name);
        }else{
            console.log("No logged in");
        }
    },[userAuth.name]);

    function handleLogin(){
        authRedirect.signIn(handleRedirect);
    }

    function handleRedirect(error, response){
        debugger;
        props.actions.signInUser();
        if(!error){
            props.actions.signInUser();
            console.log(response);
        }else{
            console.log(error);
        }
    }
    
    function handleLogout(){
        props.actions.signOutUser()
    }

    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Services</a></li>
                <li><a href="/">Team</a></li>
                <li><a href="/">Contact</a></li>
                <li>{signedIn ? <button onClick={handleLogout} >LOGOUT</button> : <button onClick={handleLogin} >LOGIN</button> }</li>{/**/}
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    userAuth: propTypes.object.isRequired,
    // signInUser: propTypes.func.isRequired,
    // signOutUser: propTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        userAuth: state.userAuth
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            signInUser: bindActionCreators(authActions.signInUser, dispatch),
            signOutUser: bindActionCreators(authActions.signOutUser, dispatch)
        }   
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
