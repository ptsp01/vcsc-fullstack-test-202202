import React from "react";
import DropdownDocument from "./componet/DropdownDocument";
import { EMPTY } from "./constant";
import Dropdown from "./lib/Dropdown";

import "./styles/app.scss"

const location = [
  {
    label: "No select",
    value: EMPTY
  },
  {
    label: 'New York',
    value: 'newYork',
  },
  {
    label: 'California',
    value: 'colifornia',
  },
]

const vehicles = [
  {
    label: "No select",
    value: EMPTY
  },
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
  const destRef = React.useRef();

  const onSelectDesti = (item) => {
    setDestination(item.value);
  }

  const onSelectVehicle = (item) => {
    setVehicle(item.value);
  }

  React.useEffect(() => {
    // destRef.current.toggle();
    console.log(destRef.current);
  }, [])

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <div className="component">
        {/* DESTINATION */}
        <h5>Choose you destination!</h5>
        <Dropdown
          ref={destRef}
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

        
        {/* VEHICLE */}
        <h5>Choose you vehicle!</h5>
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
      <DropdownDocument />
    </div>
  );
}

export default App;
