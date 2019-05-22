import React from 'react';
//import logo from '../logo.svg';
import '../App.css';

class TaskRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="project-task-row">
                <div className="project-column-header">
                    <input type="checkbox" value={this.props.TaskID} />
                </div>
                <div className="project-column-header">
                    {this.props.task.TaskName}
                </div>
                <div className="project-column-header">
                    {this.props.task.StartDate}
                </div>
                <div className="project-column-header">
                    {this.props.task.TargetEndDate}
                </div>
            </div>
        );
    }
}

export default TaskRow;