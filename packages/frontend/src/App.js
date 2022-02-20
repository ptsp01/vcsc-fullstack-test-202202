import React from "react";
import { EMPTY } from "./constant";
import Dropdown from "./lib/Dropdown";

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

  const onSelect = (item) => {
    setValue(item.value);
  }

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <div className="component">
        <Dropdown 
          onSelect={onSelect}
          // isFluid
          header={
            <Dropdown.Header style={{
              backgroundColor: '#761593',
              borderColor: "#761593",
              width: "100%",
              color: "white",
              textAlign: "center"
            }} >
              {value ? `I want to go to ${value}` : 'Where do you want to travel?'}
            </Dropdown.Header>
          } 
        >
          {location.map((item, index) => 
            <Dropdown.Item
              isActive={value === item.value}
              key={item.value} 
              item={item}
              style={{ backgroundColor: "#df94f6", color: "white" }}
              activeStyle={{ fontWeight: "800" }}
            >
              {item.label}
            </Dropdown.Item>
          )}
        </Dropdown>

        <br />
        <br />
        <br />

        <Dropdown 
          onSelect={onSelect}
          // isFluid
          header={
            <Dropdown.Header style={{
              backgroundColor: '#761593',
              borderColor: "#761593",
              width: "100%",
              color: "white",
              textAlign: "center"
            }} >
              {value ? `I want to go to ${value}` : 'Where do you want to travel?'}
            </Dropdown.Header>
          } 
        >
          {location.map((item, index) => 
            <Dropdown.Item
              isActive={value === item.value}
              key={item.value} 
              item={item}
              style={{ backgroundColor: "#df94f6", color: "white" }}
              activeStyle={{ fontWeight: "800" }}
            >
              {item.label}
            </Dropdown.Item>
          )}
        </Dropdown>
      </div>

      <div className="document" >
        <h3>Dropdown component</h3>
      </div>
    </div>
  );
}

export default App;
