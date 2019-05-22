import React from 'react';
//import logo from '../logo.svg';
import TaskRow from './TaskRow';
import '../App.css';

class TaskTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Tasks: [],
        }
    }

    componentDidMount(){
        var projectID = this.props.projectID;
        console.log("ProjectID: " + projectID);
        fetch("http://localhost:9000/webService/getTasks?projectID=" + projectID)
        .then(res => res.json())
        .then((data) => {
            this.setState({
                Tasks: data.tasks
            });
        })
        .catch(error => "Get Tasks Error: " + error);
    }

    render(){
        const {Tasks} = this.state;
        return(
            <div>
                {
                Tasks.map((task) => {
                    return(
                        <TaskRow task={task} key={task.TaskID} />
                    );
                })}
            </div>
        );
    }
}

export default TaskTable;