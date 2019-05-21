import React from 'react';
//import logo from '../logo.svg';
import ProjectRow from './ProjectRow';
import '../App.css';

class ProjectTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            error: ""
        };
    }

    componentDidMount(){
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

    render(){
        const projects = this.state.projects;
        
        /*  
            Renders all user's projects
        */
        var projectsList = projects.map((project) => {

            return(
                <ProjectRow project={project} key={project.ProjectID}/>
            );
        });

        return(
            <div id="ProjectTableContainer" className="project-table-container">
                {projectsList}
            </div>
        );
    }
}

export default ProjectTable;