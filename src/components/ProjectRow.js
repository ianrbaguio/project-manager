import React from 'react';
//import logo from '../logo.svg';
import '../App.css';

class ProjectRow extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
    var project = this.props.project;
        return(
            <div className="project-row-container">
                <div className="project-column-header">HIDE</div>
                <div className="project-column-header">{project.ProjectName}</div>
                <div className="project-column-header">{project.StartDate}</div>
                <div className="project-column-header">{project.TargetEndDate}</div>
            </div>
        );
    }
}

export default ProjectRow;