import React from 'react';
import ReactDOM from 'react-dom';
import TaskRow from './TaskRow';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TaskRow/>, div);
    ReactDOM.unmountComponentAtNode(div);
});