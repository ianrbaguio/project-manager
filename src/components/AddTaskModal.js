import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';

class AddTaskModal extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name: '',
            startDate: new Date(),
            targetEndDate: new Date(),
            actualEndDate: new Date(),
        }
    }

    render(){
        return "";
    }

}

export default AddTaskModal;