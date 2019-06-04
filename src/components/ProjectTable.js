import React from 'react';
//import logo from '../logo.svg';
import ProjectRow from './ProjectRow';
import '../App.css';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import AddProjectModal from './AddProjectModal';

class ProjectTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            error: "",
            addProjectModalShow: false,
        };

        //this.addProjectModalClose = this.addProjectModalClose.bind(this);
    }

    /*
        Function that will close the modal dialog and re-renders the project table
    */
    addProjectModalClose = () => {
        this.setState({addProjectModalShow: false});
        this.getProjects();
    };

    /*
        Function that gets all user's current projects
    */
    getProjects = () => {
        var user = JSON.parse(sessionStorage.getItem("LoggedInUser"));
        var userID = user[0].UserID;
        fetch("http://localhost:9000/webService/getProjects?userID=" + userID)
        .then(response => response.json())
        .then((data) => { 
            this.setState({
                projects: data.projects
            });

        })
        .catch(error => "GetProjects Error: " + error);
    }
    
    componentDidMount(){
        this.getProjects();
    }

    render(){
        const projects = this.state.projects;
        
        //let addProjectModalClose = () => this.setState({addProjectModalShow: false});
        
        /*  
            Renders all user's projects
        */
        var projectsList = projects.map((project) => {

            return(
                <ProjectRow project={project} key={project.ProjectID} renderProjects={this.getProjects}/>
            );
        });

        return(
            <div className="project-table-container">
            <div id="AddProjectContainer" className="add-project-container">
                <ButtonToolbar>
                    <Button variant="primary"
                            onClick={() => this.setState({addProjectModalShow: true})}
                            > + NEW PROJECT</Button>

                    <AddProjectModal
                        show={this.state.addProjectModalShow}
                        onHide={this.addProjectModalClose}
                        id="AddProjectModal"
                    />
                </ButtonToolbar>
            </div>
            <div id="ProjectTableHeaders" className="project-headers-container">
                <div className="project-column project-header project-hide-show-header" >SHOW/HIDE</div>
                <div className="project-column project-header project-name project-name-header">PROJECT NAME</div>
                <div className="project-column project-header project-start-date">START DATE</div>
                <div className="project-column project-header project-end-date">END DATE</div>
            </div>
            <div id="ProjectTableContainer">
                {projectsList}
            </div>
            </div>
        );
    }
}

export default ProjectTable;