import React from 'react';
//import logo from '../logo.svg'
import '../App';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function MainNavbar(){
    return(
            <DropdownButton id="main-navbar-dropdown" color="#33658A" title="Projects">
                <Dropdown.Item className="main-navbar-dropdown-links" href="/editProject">Edit Project</Dropdown.Item>
                <Dropdown.Item className="main-navbar-dropdown-links" href="/deleteProject">Delete Project</Dropdown.Item>
            </DropdownButton>
    );
}

export default MainNavbar;