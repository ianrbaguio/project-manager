import React from 'react';
import '../App.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class EditProject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ProjectID: 0,
            projects: [],
            success: "",
            error: ""
        };
    }

    componentDidMount(){
        var user = JSON.parse(sessionStorage.getItem("LoggedInUser"))
        var userID = user[0].UserID;
        fetch("http://localhost:9000/webService/getProjects?userID=" + userID)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                projects: data.projects
            });
        })
        .catch(err => console.log(err));
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    render(){
        const projects = this.state.projects;
        const projectRender = projects.map((project) => {
            return(
                <MenuItem value={project.ProjectID}>
                    <em>{project.ProjectName}</em>
                </MenuItem>
            )
        });

        return(
            <div id="dropdownlist-container" className="dropdownlist-container">
                <Select
            value={this.state.ProjectID}
            onChange={this.handleChange.bind(this)}
            inputProps={
                {
                    name: 'ProjectID',
                    id: 'project-dropdownlist'
                }
            }>
                <MenuItem value="0">
                    Select a project
                </MenuItem>
               {projectRender} 
            </Select>
            </div>
        );
    }
}

export default EditProject;