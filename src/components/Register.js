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
        password: ""
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));

        console.log("First Name:" + this.state.firstName);
        console.log("Last Name:" + this.state.lastName);
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

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
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </div>;
                    //Second step: Login credentials
                    case 1:
                    return <div>
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
                    <Button onClick={this.handleReset}>Reset</Button>
                    </div>;
                    default:
                    return null;
                    }
                })()}
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