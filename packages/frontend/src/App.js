import React from "react";
import Dropdown from "./lib/Dropdown";
import DHeader from "./lib/Dropdown/DHeader";
import DItem from "./lib/Dropdown/DItem";

import "./styles/app.scss"

function App() {
  const location = [
    {
      label: 'New York',
      value: 'newYork',
    },
    {
      label: 'Dublin',
      value: 'dublin',
    },
    {
      label: 'Istanbul',
      value: 'istanbul',
    },
    {
      label: 'California',
      value: 'colifornia',
    },
    {
      label: 'Izmir',
      value: 'izmir',
    },
    {
      label: 'Oslo',
      value: 'oslo',
    },
  ]
  return (
    <div className="App">
      <div className="component">
      <Dropdown header={<DHeader>Vo Thanh Trung is select value</DHeader>} >
        {
          location.map((item, index) => <DItem key={index}>{item.label}</DItem>)
        }
      </Dropdown>
      </div>
      <div className="document" >
        <h3>Dropdown component</h3>
      </div>
    </div>
  );
}

export default App;
