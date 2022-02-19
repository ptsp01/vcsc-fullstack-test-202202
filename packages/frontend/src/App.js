import React from "react";
import { EMPTY } from "./constant";
import Dropdown from "./lib/Dropdown";
import DHeader from "./lib/Dropdown/DHeader";
import DItem from "./lib/Dropdown/DItem";

import "./styles/app.scss"

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

function App() {
  const [value, setValue] = React.useState(EMPTY);

  const onSelect = (v) => {
    setValue(v);
  }

  return (
    <div className="App">
      <div className="component">
        <Dropdown 
          onSelect={onSelect}
          label="Survey"
          header={
            <DHeader>
              {value ? `I want to go to ${value}` : 'Where do you want to travel'}
            </DHeader>
          } 
        >
          {
            location.map((item, index) => 
              <DItem key={index} value={item.value} >{item.label}</DItem>
            )
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
