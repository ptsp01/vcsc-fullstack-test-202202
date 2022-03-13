import React from 'react';


const Component = (props) => {
    return <>
        <div className={props.className} onClick={() => props.toggling()}>
            {props.children}
        </div>
    </>;
}
export default Component;