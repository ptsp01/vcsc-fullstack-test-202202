import React from "react";
import ReactDOM from "react-dom";
import "~css/default.css";
import "~css/variables.css";
import Dropdown from "~components/Dropdown";

const App = (): React.ReactElement => {
  return (
    <>
      <div style={{ background: '#b7f2ff', padding: '50px' }}>
        <Dropdown
          style={{ background: 'white' }}
        >
          <a style={{ fontSize: '20px', cursor: 'pointer' }}>Click me</a>
          <a>Item 1</a>
          <a>Item 2</a>
          <a>Item 3</a>
          <a>Item 4</a>
        </Dropdown>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));