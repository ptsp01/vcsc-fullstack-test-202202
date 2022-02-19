import React from "react";
import Dropdown from "./lib/Dropdown";
import DdHeader from "./lib/Dropdown/DdHeader";
import DbItem from "./lib/Dropdown/DdItem";

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
      <Dropdown header={<DdHeader>Vo Thanh Trung is select value</DdHeader>} >
        {
          location.map((item, index) => <DbItem key={index}>{item.label}</DbItem>)
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
