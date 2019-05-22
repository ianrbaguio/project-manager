import React from 'react';
//import logo from '../logo.svg';
import '../App.css';
import TaskTable from './TaskTable'

class ProjectRow extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
    var project = this.props.project;
        return(
            <div className="project-full-container">
                <div className="project-row-container">
                <div className="project-column-header">HIDE</div>
                <div className="project-column-header">{project.ProjectName}</div>
                <div className="project-column-header">{project.StartDate}</div>
                <div className="project-column-header">{project.TargetEndDate}</div>
                </div>

                <div className="project-task-container">
                    <TaskTable projectID={project.ProjectID}/>
                </div>
            </div>
        );
    }
}

export default ProjectRow;