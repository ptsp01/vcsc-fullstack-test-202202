import React from 'react';
const Component = (props) => {
    return (
        <li {...props}>
            {props.children}
        </li>);
}
export default Component;