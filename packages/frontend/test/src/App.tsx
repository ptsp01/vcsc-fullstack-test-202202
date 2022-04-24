import './App.css';
import { Dropdown } from './Dropdown';
import { useState } from 'react';

function App() {
  let [defaultDropdownActiveItemIndex, setDefaultDropdownActiveItemIndex] = useState(0)
  let [customDropdownActiveItemIndex, setCustomDropdownActiveItemIndex] = useState(0)
  let [longDropdownActiveItemIndex, setLongDropdownActiveItemIndex] = useState(0)

  return (
    <div className="App">
      <Dropdown
        activeIndex={defaultDropdownActiveItemIndex}
        onItemClick={(index) => setDefaultDropdownActiveItemIndex(index)}
        values={[
          "A", 
          "B",
          "A", 
          "B",
          "A", 
        ]}
      />

      <Dropdown
        activeIndex={customDropdownActiveItemIndex}
        onItemClick={(index) => setCustomDropdownActiveItemIndex(index)}
        values={["A", "B"]}
        selectedDisplayStyles={{ backgroundColor: 'red' }}
        renderer={
          (val) => <div style={{ backgroundColor: 'yellow'}}>{val}</div>
        }
        optionListStyles={{ marginBottom: '50px'}}
        activeRenderer={(val) => <div style={{ backgroundColor: 'green'}}>{val} active</div>}
      />
      <Dropdown
        activeIndex={longDropdownActiveItemIndex}
        onItemClick={(index) => setLongDropdownActiveItemIndex(index)}
        values={["A", "B","A", "B","A", "B","A", "B","A", "B","A", "B","A", "B",]}
        maxOptionListHeightPx={100}
      ></Dropdown>
    </div>
  );
}

export default App;
