import React from "react";
//import logo from '../logo.svg';
import "../App.css";
import global from "../global/global.json";

class TaskRow extends React.Component {
  constructor(props) {
    super(props);
    //state that sets backgroundColor to green (task is complete)
    this.state = {
      backgroundColor: "",
      isChecked: false
    };
  }

  // checks if actual end date is something, then set background-color to green
  componentDidMount() {
    let today = new Date();
    let taskEndDate = Date.parse(this.props.task.TargetEndDate);
    let backgroundColor = "";
    let isChecked = false;

    // If there is an actual end date then set background color to green
    if (this.props.task.ActualEndDate !== "") {
      backgroundColor = "rgba(0,255,0,0.2)";
      isChecked = true;
      // Planned End Date already passed from today's date set background color to red
    } else if (taskEndDate < today) {
      backgroundColor = "rgba(255,0,0,0.2)";
      isChecked = false;
    }

    this.setState({
      backgroundColor: backgroundColor,
      isChecked: isChecked
    });
  }

  //checkbox check change
  handleChange = event => {
    //if it's checked, then disable checkbox and set background-color to green
    if (event.target.checked) {
      const taskID = this.props.task.TaskID;
      event.target.disabled = true;
      event.target.checked = true;

      fetch(global.api + "/webService/completeTask?taskID=" + taskID)
        .then(res => res.json())
        .then(data => {
          if (data.return) {
            this.setState({
              backgroundColor: "rgba(0, 255, 0, 0.2)",
              isChecked: true
            });
          }
        })
        .catch(error => "GetProjects Error: " + error);
    }
  };

  render() {
    const { backgroundColor, isChecked } = this.state;
    return (
      <div
        className="project-task-row"
        style={{ backgroundColor: backgroundColor }}
      >
        <div className="project-column project-hide-show-header">
          <input
            type="checkbox"
            value={this.props.task.TaskID}
            onChange={this.handleChange}
            checked={isChecked}
            disabled={isChecked}
          />
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
