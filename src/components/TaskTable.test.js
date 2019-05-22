import React from 'react';
import ReactDOM from 'react-dom';
import TaskTable from './TaskTable';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TaskTable/>, div);
    ReactDOM.unmountComponentAtNode(div);
});