import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';

class AddProjectModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            startDate: "",
            userID: 0,
            targetEndDate: "",
            error: "",
        }

        //bind handleChange to handle error when textbox has changed
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    formValidation = () => {
        const {name, startDate, userID, targetEndDate, error} = this.state;
        
        var isValidate = true;
        if(name === ""){
            this.setState({error: "Please enter new project name."});
            isValidate = false;
        }
        else if(startDate === "" ){
            this.setState({error: "Please select new project's start date"});
            isValidate = false;
        }
        else if(targetEndDate === ""){
            this.setState({error: "Please select new project's target end date"});
            isValidate = false;
        }
        else{
            this.setState({error: ""});
        }

        return isValidate;
    }

    handleClick(){

        //if it's true then add new project
        if(this.formValidation()){
            console.log('create new project');
        }

    }

    componentDidMount(){
        //get the logged in user
        const user = JSON.parse(sessionStorage.getItem("LoggedInUser"));
        const userID = user[0].UserID;

        if(userID > 0){

            this.setState({
                userID: userID
            });

        }
    };

    //reference: http://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example#user-service-js
    handleChange(e){
        const {name,value} = e.target;
        this.setState({ [name]: value});
    }

    render(){
        const {name, startDate, userID, targetEndDate, error} = this.state
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="theme" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ADD NEW PROJECT
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="center-modal">
                         <span className="span-label">Project Name: </span> <input name="name" value={name} type="text" className="input-text" onChange={this.handleChange}/>
                         <span className="span-label">Start Date:</span> <input name="startDate" value={startDate} type="date" className="input-text" onChange={this.handleChange}/>
                         <span className="span-label">Target End Date:</span> <input name="targetEndDate" value={targetEndDate} type="date" className="input-text" onChange={this.handleChange}/>
                         <br/>
                         <button id="AddProjectButton" className="button" onClick={this.handleClick}>Add Project</button>
                         <br/>
                         <span className="error-message">{error}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddProjectModal;