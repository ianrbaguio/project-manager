import React from 'react';
import ReactDOM from 'react-dom';
import EditProject from './EditProject';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditProject/>, div);
    ReactDOM.unmountComponentAtNode(div);
});