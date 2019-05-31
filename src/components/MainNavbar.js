import React from 'react';
//import logo from '../logo.svg'
import '../App';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function MainNavbar(){
    return(
        <div>
                <DropdownButton id="main-navbar-dropdown" title="Projects">
                    <Dropdown.Item href="/editProjects">Edit Projects</Dropdown.Item>
                </DropdownButton>
        </div>
    );
}

export default MainNavbar;