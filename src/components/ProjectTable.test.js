import React from 'react';
import ReactDOM from 'react-dom';
import ProjecTable from './ProjectTable';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProjectTable/>, div);
    ReactDOM.unmountComponentAtNode(div);
});