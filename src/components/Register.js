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

const styles = theme => ({
    root:{
        width: '90%',
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
    render(){
        return(
            <LoginNavbar/>
        );
    }
}

export default Register;