import React from "react";
const Component = (props) => {
    return <div className={props.className} >
        {props.children}
    </div>;
}
export default Component;