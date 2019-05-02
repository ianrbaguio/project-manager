import React from 'react';
import {Redirect, Route} from 'react-router-dom';

//reference: http://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example#private-route-jsx
function PrivateRoute({component: Component, ...rest}){

    var _isLoggedIn = false;
    const _user = sessionStorage.getItem('LoggedInUser');

    //console.log("user: " + _user);

    //user's logged in
    if(_user != [] && _user != null){
        _isLoggedIn = true;
    }

    return(
        <Route 
            {...rest}
            render={props => _isLoggedIn ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathanme: '/', state: {from: props.location}}} />
            )}
        />
    )

}

export default PrivateRoute;