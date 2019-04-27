import React, { Component } from 'react';
import '../App.css';

// Login component that handles login functionality for the project manager project
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            user: []
        }
    }

    componentDidMount(){
        //clears sessionStorage when user went back to login page
        sessionStorage.clear();
    }

    //reference: http://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example#user-service-js
    handleChange(e){
        const {name,value} = e.target;
        this.setState({ [name]: value});
    }

    handleClick(){
        var data = {user: this.state.username, password: this.state.password};
    }

    //reference: https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede
    render(){
        const {username, password, submitted, loading, error} = this.state;
        return(
            <div>
                <h2>WELCOME TO PROJECT MANAGER</h2>
                <div className="center">
                    <span className="span-label">Username: </span> <input name="username" value={username} type="text" className="input-text" onChange={this.handleChange()}/>
                    <span className="span-label">Password: </span> <input name="password" value={password} type="password" className="input-text" onChange={this.handleChange()}/>
                    <button className="button" onClick={() => this.handleClick()}>Login</button>
                </div>
            </div>
        )
    }

}

export default Login;