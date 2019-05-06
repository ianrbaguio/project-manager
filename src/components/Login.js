import React, { Component } from 'react';
import '../App.css';
import LoginNavbar from './LoginNavbar';

// Login component that handles login functionality for the project manager project
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            submitted: false,
            loading: false,
            error: "",
            user: [],
            apiResponse: ""
        }

        //bind handleChange to handle error when textbox has changed
        this.handleChange = this.handleChange.bind(this);
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
        var data = {username: this.state.username, password: this.state.password};

        console.log("Username: " + data.username + " Password: " + data.password);
        
        fetch("http://localhost:9000/webService/login", {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({users: data.user});
            sessionStorage.setItem("LoggedInUser", this.state.users);

            if(data.user.length != 0){
                window.location = "/main"
            }
            else{
                this.setState({error: "Invalid username/password"})
            }
        })
        .catch(error => console.log("Get User Error: " + error));

    }

    //reference: https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede
    render(){
        const {username, password, submitted, loading, error} = this.state;
        return(
            <div>
                <LoginNavbar/>
                <h2>WELCOME TO PROJECT MANAGER</h2>
                <div className="center">
                    <span className="span-label">Username: </span> <input name="username" value={username} type="text" className="input-text" onChange={this.handleChange}/>
                    <span className="span-label">Password: </span> <input name="password" value={password} type="password" className="input-text" onChange={this.handleChange}/>
                    <button className="button" onClick={() => this.handleClick()}>Login</button>
                    <button className="button" onClick={() => window.location = "/register"}>Register</button>
                    <span className="error-message">{this.state.error}</span>
                </div>
            </div>
        )
    }

}

export default Login;