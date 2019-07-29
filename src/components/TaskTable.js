import React from 'react';
//import logo from '../logo.svg';
import TaskRow from './TaskRow';
import '../App.css';

class TaskTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Tasks: [],
            isMounted: false
        }
        
    }
    componentDidMount(){

        this.setState({isMounted: true}, function(){
            if(this.state.isMounted){
                var projectID = this.props.projectID;
                console.log(projectID);
                if(projectID > 0){
                    fetch("http://localhost:9000/webService/getTasks?projectID=" + projectID)
                    .then(res => res.json())
                    .then((data) => {
                
                    this.setState({
                        Tasks: data.tasks
                    });
                    })
                    .catch(error => "Get Tasks Error: " + error);
                }
            }
        })
    }

    componentWillUnmount(){
        console.log("HERE");
        this.setState({isMounted: false});
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