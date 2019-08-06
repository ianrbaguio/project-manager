import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import global from '../global/global.json';

class AddTaskModal extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name: '',
            startDate: '',
            targetEndDate: '',
            userID: 0,
            success: '',
            error: ''
        }

        //bind handleChange to handle error when textbox has changed
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

        /*
         *   Function that validates add project modal form
         */
        formValidation = () => {
            const {userID, name, startDate, targetEndDate, success, error} = this.state;
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

        /*
        * Function that adds new task to the selected project
        */

        handleClick(){

            var data = {
                projectID: this.props.projectid,
                name: this.state.name,
                startDate: this.state.startDate,
                targetEndDate: this.state.targetEndDate,
            }

            if(this.formValidation()){
                fetch(global.api + "/webService/addTask", {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then((data) => {
                    if(data.return){
                    this.setState({success: "New Task Added"});
                    setTimeout(() => this.closeModal(), 3000);
                }
                })
                .catch(err => console.log("Add Project Error: " + err))
            }
        }

    closeModal = () => {
        if(this.state.success !== ''){
            //put all states back to default
            this.setState({
                name: '',
                startDate: new Date(),
                targetEndDate: new Date(),
                success: '',
                error: ''
            });
            this.props.onHide();
        }
    }

        /*
        *  function that set the states from project name textbox value 
        *  reference: http://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example#user-service-js
        */
    handleChange(e){
        const {name,value} = e.target;
        this.setState({ [name]: value});
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

    render(){
        const {name, startDate, targetEndDate, userID, success,error} = this.state
        return (
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
                         <span className="span-label">Task Name: </span> <input name="name" value={name} type="text" className="input-text" onChange={this.handleChange}/>
                         <span className="span-label">Start Date:</span> <input name="startDate" value={startDate} type="date" className="input-text" onChange={this.handleChange}/>
                         <span className="span-label">Target End Date:</span> <input name="targetEndDate" value={targetEndDate} type="date" className="input-text" onChange={this.handleChange}/>
                         <br/>
                         <button id="AddTaskButton" className="button" onClick={this.handleClick}>Add Task</button>
                         <br/>
                         <span className="error-message">{error}</span>
                         <span className="success-message">{success}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default AddTaskModal;