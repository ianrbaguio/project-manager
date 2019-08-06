import React from 'react';
//import logo from '../logo.svg';
import '../App.css';
import global from '../global/global.json';

class TaskRow extends React.Component{
    constructor(props){
        super(props);
        //state that sets backgroundColor to green (task is complete)
        this.state = {
            backgroundColor: '',
            isChecked: false,
        }
    };

    // checks if actual end date is something, then set background-color to green
    componentDidMount(){
        if(this.props.task.ActualEndDate !== ""){
            this.setState({
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                isChecked: true,
            });
        }
    }

    //checkbox check change
    handleChange = event => {
        // console.log("checkbox value: " + event.target.value);
        // console.log("checkbox checked: " + event.target.checked);
        // console.log("Actual End Date: " + this.props.task.ActualEndDate);

        //if it's checked, then disable checkbox and set background-color to green
        if(event.target.checked){
            const taskID = this.props.task.TaskID;
            event.target.disabled = true;
            event.target.checked = true;

            fetch(global.api + "/webService/completeTask?taskID=" + taskID)
            .then((res) => res.json())
            .then((data) => {
                if(data.return){
                    this.setState({
                        backgroundColor: "rgba(0, 255, 0, 0.2)",
                        isChecked: true,
                    });
                }
            })
            .catch(error => "GetProjects Error: " + error);
        }
    }

    render(){
        const { backgroundColor, isChecked } = this.state;
        return(
            <div className="project-task-row" style={{backgroundColor: backgroundColor}}>
                <div className="project-column project-hide-show-header">
                    <input type="checkbox" value={this.props.task.TaskID} onChange={this.handleChange} checked={isChecked} disabled={isChecked} />
                </div>
                <div className="project-column project-name">
                    {this.props.task.TaskName}
                </div>
                <div className="project-column project-start-date">
                    {this.props.task.StartDate}
                </div>
                <div className="project-column project-end-date">
                    {this.props.task.TargetEndDate}
                </div>
            </div>
        );
    }
}

export default TaskRow;