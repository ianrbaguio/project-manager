import React from 'react';
import '../App.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import ProjectRow from './ProjectRow';
import AddTaskModal from './AddTaskModal';

class EditProject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            project: [],
            projects: [],
            ProjectID: 0,
            success: "",
            error: "",
            addTaskModalShow: false,
            addTaskModalContent: false,
        };
    }

    componentDidMount(){
        this._isMounted = true;
        var user = JSON.parse(sessionStorage.getItem("LoggedInUser"))
        var userID = user[0].UserID;
        fetch("http://localhost:9000/webService/getProjects?userID=" + userID)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                projects: data.projects,
            });
        })
        .catch(err => console.log(err));
    }

    /*
        Function that will close the modal dialog and re-renders the project table
    */
   addProjectModalClose = () => {
    this.setState({addTaskModalShow: false});
    this.setProject(this.state.ProjectID);
    };

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });

        this.setProject(event.target.value);
      }

    setProject(projectid){
        
        if(!isNaN(projectid)){

            if(projectid > 0)
                this.setState({addTaskModalContent: true});
            else   
                this.setState({addTaskModalContent: false});
                
            var user = JSON.parse(sessionStorage.getItem("LoggedInUser"))
            var userID = user[0].UserID;

            fetch("http://localhost:9000/webService/getProject?userID=" + userID + "&projectID=" + projectid)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    project: data.project,
                });
            })
            .catch(err => console.log(err));
        }
        else{
            this.setState({
                project: [],
            });
        }
        
    }

    render(){
        const project = this.state.project; //selected project
        const projects = this.state.projects; //list of user's projects for select dropdownlist

        //renders all user's project in select dropdownlist
        if(projects){
            var projectsRender = projects.map((project) => {
                return(
                    <MenuItem value={project.ProjectID} key={project.ProjectID}>
                        <em>{project.ProjectName}</em>
                    </MenuItem>
                )
            });
        }

        //renders the selected ProjectID from dropdownlist
        if(project){
            var projectSelected = project.map((project) => {
                return(
                    <ProjectRow project={project} key={this.state.ProjectID}/>
                );
            });
        }

        return(
            <div>
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
               {projectsRender} 
            </Select>
            </div>
            {
                this.state.addTaskModalContent ?
                <div className="add-project-container">
            <ButtonToolbar>
                    <Button variant="primary"
                            onClick={() => this.setState({addTaskModalShow: true})}
                            > + NEW TASK</Button>

                    <AddTaskModal
                        show={this.state.addTaskModalShow}
                        onHide={this.addProjectModalClose}
                        id="AddTaskModal"
                        project={project}
                        projectid={this.state.ProjectID}
                    />
                </ButtonToolbar>
            </div>
            : ''
            }

            <div className="project-headers-container">
                {projectSelected}
            </div>
            </div>
        );
    }
}

export default EditProject;