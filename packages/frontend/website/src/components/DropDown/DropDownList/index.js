import React from 'react';
const Component = (props) => {
    return <ul className={props.className} >
        {props.children}
    </ul>;
}
// class Component extends React.Component {
//     render() {
//         return <ul className={props.className} >
//             {this.props.children}
//         </ul>;
//     }
// }
export default Component;