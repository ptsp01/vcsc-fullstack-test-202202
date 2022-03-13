import React from 'react';
class Component extends React.Component {
    render() {
        return <>
            {this.props.children}
        </>;
    }
}
export default Component;