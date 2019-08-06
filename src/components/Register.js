import React, {Component} from 'react';
import '../App.css';
import LoginNavbar from './LoginNavbar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import global from '../global/global.json';

//reference: https://material-ui.com/
//tutorial: https://codesandbox.io/s/rlv2r08lno
const styles = theme => ({
    root:{
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions:{
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    error: {
        color: "red",
        textAlign: "center"
    },
    success: {
        color: "green",
        textAlign: "center"
    }
});

function getSteps(){
    return ['Enter your name', 'Enter user credentials', 'You are now registered!'];
}

function getStepContent(step){
    switch(step){
        case 0:
            return "Enter your name";
        case 1:
            return "Enter your login credentials";
        case 2:
            return "Registered";
        default:
            return "Error encountered";
    }
}

class Register extends React.Component{
    state = {
        activeStep: 0,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        validation: "",
        registered: "",
        usernameExists: 0,
    }

    /******************************************************************
     * 
     * Function that checks if the inputted username exists
     * 
    *******************************************************************/
    checkUsernameExists = username => {
        fetch(global.api + "/webService/checkUsername?username=" + username)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    usernameExists: data.UserExists,
                });
            })
            .catch(error => console.log("Get User Error: " + error));
    }

    /******************************************************************
     * 
     * Function that registers new user
     * 
    *******************************************************************/
    registerNewUser = () => {
        var data = {firstName: this.state.firstName, 
                    lastName: this.state.lastName,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password}
        fetch(global.api + "/webService/register",{
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            if(data.Registered === 1){
                this.setState({
                    registered: "Thank you " + this.state.firstName + " " + this.state.lastName + " for registering."
                })
            }
            else{
                this.setState({
                    validation: "Error encountered while registering. Please try again"
                })
            }
        })
        .catch(error => console.log("Register Error: " + error));
    }

    /******************************************************************
     * 
     * Function that validates first step of stepper 
     * (firstName & lastName)
     * 
    *******************************************************************/
    firstStepValidation = () => {

        var isValidate = true;

        if(this.state.firstName === ""){
            this.setState({
                validation: "Please Enter Your First Name"
            });
            isValidate = false;
        }
        else if(this.state.lastName === ""){
            this.setState({
                validation: "Please Enter Your Last Name"
            });
            isValidate = false;
        }
        else{
            this.setState({
                validation: ""
            });
        }

        return isValidate;

    };

    /******************************************************************
     * 
     * Function that validates second step of stepper
     * (username, email and password)
     * 
    *******************************************************************/
    secondStepValidation = () => {

        var isValidate = true;

        if(this.state.username === ""){
            
                isValidate = false;
                this.setState({
                    validation: "Please Enter Your Username"
                });                
            // if(this.checkUsernameExists() === 1){
            //     isValidate = false;
            //     this.setState({
            //         validation: "Username Already Exists. Please Enter A Different Username"
            //     });
            // } 

        }
        else if(this.state.usernameExists === 1){
            isValidate = false;
            this.setState({
                validation: "Username Already Exists. Please Enter A Different Username"
            });  
        }
        else if(this.state.email === ""){
            this.setState({
                validation: "Please Enter Your Email"
            });
            isValidate = false;
        }
        else if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)){
            this.setState({
                validation: "Please Enter A Valid Email Address"
            });
            isValidate = false;
        }
        else if(this.state.password === ""){
            this.setState({
                validation: "Please Enter Your Password"
            });
            isValidate = false;
        }
        else if(this.state.password.length <= 6){
            this.setState({
                validation: "Password Must Be At Least 6 Characters"
            });
            isValidate = false;
        }
        else{
            this.setState({
                validation: ""
            });
        }

        return isValidate;

    };

    /******************************************************************
     * 
     * Function that handles changes in textboxes
     * 
    *******************************************************************/
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });

    // if the textbox inputted change is from username then check if username exists
        if([name][0] === "username"){
            this.checkUsernameExists(event.target.value);
        }
      };

    /******************************************************************
     * 
     * Function that handles the next button for stepper
     * 
    *******************************************************************/
    handleNext = () => {

        var stepValidate = false;

        //checks if each stepper steps and if all inputs are validated
        if((this.state.activeStep === 0 && this.firstStepValidation()) 
        || (this.state.activeStep === 1 && this.secondStepValidation())) {
            stepValidate = true;

            if(this.state.activeStep === 1){
                this.registerNewUser();
            }
        }
    
        if(stepValidate){
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        }
    };

    /******************************************************************
     * 
     * Function that handles the back button for stepper
     * 
    *******************************************************************/
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
            validation:  ""
        }));
    };

    /******************************************************************
     * 
     * Function that handles the reset button for stepper
     * 
    *******************************************************************/
    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render(){
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        return(
            <div>
                <LoginNavbar/>
            
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label.indexOf()}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                {/* Switch Render Condition: Renders base on activeStep */}
                {(() => {
                    switch(activeStep) {
                    //First step: Name
                    case 0:
                        return <div className="center-form">
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <TextField
                        id="FirstNameTB"
                        label="First Name"
                        className={classes.textField}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                        />
                        <br/>
                        <TextField
                        id="LastNameTB"
                        label="Last Name"
                        className={classes.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                        />
                        <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.backButton}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                            {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                        </Button>
                        </div>
                    </div>;
                    //Second step: Login credentials
                    case 1:
                    return <div className="center-form">
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <TextField
                        id="UsernameTB"
                        label="Username"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                    />
                    <br/>
                    <TextField
                        id="EmailTB"
                        label="Email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <br/>
                    <TextField
                        id="PasswordTB"
                        label="Password"
                        type="password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <br/>
                    <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.backButton}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </div>;
                    case (steps.length - 1):
                    return <div className="center-form">
                    <Typography className={classes.instructions}>All steps completed</Typography>
                    {
                        this.state.validation !== "" ? <Button onClick={this.handleReset}>Reset</Button> : ""
                    }
                    {
                        this.state.registered !== "" ? <Typography className={classes.success}>
                        {this.state.registered} Click here to <a href='/'>login.</a>
                        </Typography> : ""
                    }
                    </div>;
                    default:
                    return null;
                    }
                })()}
                    <Typography className={classes.error}>{this.state.validation}</Typography>
                    
                    {/* {this.state.activeStep === steps.length ? (
                        <div className="center-form">
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div className="center-form">
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.backButton}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>           
            </div> 
        );
    }
}

export default withStyles(styles)(Register);