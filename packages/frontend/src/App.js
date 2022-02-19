import Dropdown from "./lib/Dropdown";
import DdHeader from "./lib/Dropdown/DdHeader";
import DbItem from "./lib/Dropdown/DdItem";

const data = [
  { label: "Item 1", value: "item-1" },
  { label: "Item 1", value: "item-1" },
  { label: "Item 1", value: "item-1" },
  { label: "Item 1", value: "item-1" },
]

function App() {
  return (
    <div className="App">
      <Dropdown header={<DdHeader>Header</DdHeader>} >
        {
          data.map((item, index) => <DbItem key={index}>{item.label}</DbItem>)
        }
      </Dropdown>
    </div>
  );
}

export default App;
