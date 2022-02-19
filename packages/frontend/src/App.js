import React from "react";
import Dropdown from "./lib/Dropdown";
import DdHeader from "./lib/Dropdown/DdHeader";
import DbItem from "./lib/Dropdown/DdItem";

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
      <Dropdown header={<DdHeader>Header</DdHeader>} >
        {
          location.map((item, index) => <DbItem key={index}>{item.label}</DbItem>)
        }
      </Dropdown>
    </div>
  );
}

export default App;
