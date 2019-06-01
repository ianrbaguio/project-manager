import React from 'react';
import '../App.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class EditProject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ProjectID: 0,
            success: "",
            error: ""
        };
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    render(){
        console.log("ProjectID: " + this.state.ProjectID);
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
                    <em>Select a project</em>
                </MenuItem>
                <MenuItem value="1">
                    <em>Project Manager</em>
                </MenuItem>
                <MenuItem value="2">
                    <em>Project Manager 2</em>
                </MenuItem>
            </Select>
            </div>
        );
    }
}

export default EditProject;