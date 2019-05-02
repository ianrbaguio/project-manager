import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default Layout;