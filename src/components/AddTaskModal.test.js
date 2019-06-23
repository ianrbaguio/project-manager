import React from 'react';
import ReactDOM from 'react-dom';
import AddTaskModal from './AddTaskModal';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddTaskModal/>, div);
    ReactDOM.unmountComponentAtNode(div);
})