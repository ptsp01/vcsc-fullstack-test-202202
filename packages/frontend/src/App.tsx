import React from "react";
import "./App.scss";
import { Dropdown, Item } from "./components/dropdown";

const options: Item[] = [
  { id: "1", label: "item 1", value: "value 1" },
  { id: "2", label: "item 2", value: "value 2" },
  { id: "3", label: "item 3", value: "value 3" },
  { id: "4", label: "item 4", value: "value 4" },
];

function App() {
  return (
    <div className="App">
      <Dropdown items={options} title="dropdown" />
    </div>
  );
}

export default App;
