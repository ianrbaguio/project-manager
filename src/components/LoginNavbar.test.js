import React from 'react';
import ReactDOM from 'react-dom';
import LoginNavbar from './LoginNavbar';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginNavbar />, div);
    ReactDOM.unmountComponentAtNode(div);
});