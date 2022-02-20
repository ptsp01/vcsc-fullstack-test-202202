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

const vehicles = [
  {
    label: 'Taxi',
    value: 'taxi',
  },
  {
    label: 'Police car',
    value: 'police-car',
  },
  {
    label: 'Ambulance',
    value: 'ambulance',
  },
  {
    label: 'Bicycle',
    value: 'bicycle',
  }
]

function App() {
  const [destination, setDestination] = React.useState(EMPTY);
  const [vehicle, setVehicle] = React.useState(EMPTY);

  const onSelectDesti = (item) => {
    setDestination(item.value);
  }

  const onSelectVehicle = (item) => {
    setVehicle(item.value);
  }

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <div className="component">
        <Dropdown 
          onSelect={onSelectDesti}
          // isFluid
          header={
            <Dropdown.Header style={{
              backgroundColor: '#761593',
              borderColor: "#761593",
              width: "100%",
              color: "white",
              textAlign: "center"
            }} >
              {destination ? `I want to go to ${destination}` : 'Where do you want to travel?'}
            </Dropdown.Header>
          } 
        >
          {location.map((item, index) => 
            <Dropdown.Item
              isActive={destination === item.value}
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
          onSelect={onSelectVehicle}
          isFluid
          header={
            <Dropdown.Header style={{ textAlign: "center" }} >
              {vehicle ? `By ${vehicle}` : 'Why kind of transportation do you want to travel?'}
            </Dropdown.Header>
          } 
        >
          {vehicles.map((item) => 
            <Dropdown.Item
              isActive={vehicle === item.value}
              key={item.value} 
              item={item}
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
