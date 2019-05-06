import React from 'react';
//import logo from '../logo.svg';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

//reference: https://stackoverflow.com/questions/40458335/reactjs-header-and-footer
//           https://stackoverflow.com/questions/49891407/where-to-put-my-header-and-footer-tags-in-reactjs
//           https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#named-components
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