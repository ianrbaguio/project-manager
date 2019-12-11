import React from "react";
//import logo from '../logo.svg';
import TaskRow from "./TaskRow";
import "../App.css";
import global from "../global/global.json";

class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Tasks: [],
      isMounted: false
    };
  }
  componentDidMount() {
    this.setState({ isMounted: true }, function() {
      if (this.state.isMounted) {
        var projectID = this.props.projectID;
        if (projectID > 0) {
          fetch(global.api + "/webService/getTasks?projectID=" + projectID)
            .then(res => res.json())
            .then(data => {
              this.setState({
                Tasks: data.tasks
              });
            })
            .catch(error => "Get Tasks Error: " + error);
        }
      }
    });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {
    const { Tasks } = this.state;
    return (
      <div>
        {Tasks.map(task => {
          let today = new Date();
          return <TaskRow task={task} key={task.TaskID} />;
        })}
      </div>
    );
  }
}

export default TaskTable;
