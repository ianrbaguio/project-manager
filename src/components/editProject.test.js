import React from 'react';
import ReactDOM from 'react-dom';
import EditProject from './editProject';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditProject/>, div);
    ReactDOM.unmountComponentAtNode(div);
});