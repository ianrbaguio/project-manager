import React from 'react';
//import logo from '../logo.svg';
import '../App.css';
import TaskTable from './TaskTable'

class ProjectRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showTasks: true
        }
    }
    
    /*
    * Function that shows or hides the selected project's tasks
    */
    showHideClick = () => {
        this.setState({
            showTasks: this.state.showTasks ? false : true
        })
    }

    /*
    *   Function that remove's selected project from user's list
    *   calls renderProjects function from ProjectTable component
    */
    removeProject = () =>{
        var projectID = this.props.project.ProjectID;
        var user = JSON.parse(sessionStorage.getItem("LoggedInUser"));
        var userID = user[0].UserID;

        fetch("http://localhost:9000/webService/removeProject?projectID=" + projectID + "&userID=" + userID)
        .then(response => response.json())
        .then((data) => {
            if(data.return){
                this.props.renderProjects();
            }
        })
        .catch(err => console.log("Remove Project Error: " + err));
    }

    render(){
    var project = this.props.project;
    var {showTasks} = this.state;
        return(
            <div className="project-full-container">
                <div className="project-row-container">
                <div className="project-column-inline project-hide-show-header">
                    <div onClick={this.showHideClick}>{this.state.showTasks ? "HIDE" : "SHOW"}</div>
                    <div onClick={this.removeProject}>REMOVE</div>
                </div>
                <div className="project-column project-name-header project-name">{project.ProjectName}</div>
                <div className="project-column project-start-date">{project.StartDate}</div>
                <div className="project-column project-end-date">{project.TargetEndDate}</div>
                </div>

                <div className="project-task-container" style={{display:showTasks}}>
                    {this.state.showTasks && <TaskTable projectID={project.ProjectID}/>}
                </div>
            </div>
        );
    }
}

export default ProjectRow;