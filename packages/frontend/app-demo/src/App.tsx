import React from 'react';
import "./scss/style.scss"

import { Dropdown, Menu, Item } from "@vcsc-test/ui"

function App() {

  const menu = [
    {name: "Item 1", id: 1},
    {name: "Item 2", id: 2},
    {name: "Item 3", id: 3},
    {name: "Item 4", id: 4, active: true},
  ]

  return (
    <div className="App">

      <div className="demo-container">
        <h2>Static menu</h2>
        <Dropdown head="Click me header" arrow={true}>
          <Menu>
            <Item>Hello</Item>
            <Item active>Hello</Item>
          </Menu>
        </Dropdown>
      </div>

      <div className="demo-container"> 
      <h2>Dynamic menu</h2>
      <Dropdown head="Click me header" arrow={true}>
        <Menu menu={menu}/>
      </Dropdown>
     </div>

     <div className="demo-container">
      <h2>Dynamic menu</h2>
      <Dropdown head={<b>HTML header</b>} arrow="+">
        <Menu menu={menu}/>
      </Dropdown>
      </div> 
    </div>
  );
}

export default App;
