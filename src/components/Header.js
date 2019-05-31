import React, {Component} from 'react';
//import logo from '../logo.svg'
import '../App';
import MainNavbar from './MainNavbar';

class Header extends Component {
    
    render(){
        var LoginNavigation;
        if(sessionStorage.getItem("LoggedInUser") !== [] && sessionStorage.getItem("LoggedInUser") !== null){ 
            LoginNavigation = <MainNavbar/>
        }
            
        return(
            <div className="header">
                PROJECT MANAGER
                <div>
                {LoginNavigation}
                </div>
            </div>
        )
    }
}

export default Header;