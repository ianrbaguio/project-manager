import React from 'react';
//import logo from '../logo.svg';
import '../App.css';
import TaskTable from './TaskTable'

class ProjectRow extends React.Component{
    constructor(props){
        super(props);
    }
    
    showHideClick = () => {
        console.log("SHOW/HIDE CLICKED");
    }

    render(){
    var project = this.props.project;
        return(
            <div className="project-full-container">
                <div className="project-row-container">
                <div className="project-column project-hide-show-header" onClick={this.showHideClick}>HIDE</div>
                <div className="project-column project-name-header project-name">{project.ProjectName}</div>
                <div className="project-column project-start-date">{project.StartDate}</div>
                <div className="project-column project-end-date">{project.TargetEndDate}</div>
                </div>

                <div className="project-task-container">
                    <TaskTable projectID={project.ProjectID}/>
                </div>
            </div>
        );
    }
}

export default ProjectRow;