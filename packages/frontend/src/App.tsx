import React from "react";
import { DropdownList } from "./components";
import { IOption, IItemProps } from "./components/DropdownList/types";
import "./index.css";

function App() {
  const [selected, setSelected] = React.useState<IOption | null>(null);

  const data = [
    {
      label: "Option 1",
      value: "1",
    },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  // const menuItemRenderer = (
  //   index: number,
  //   active: boolean,
  //   item: IOption,
  //   itemProps: IItemProps
  // ) => {
  //   return (
  //     <div {...itemProps}>
  //       {active ? "Item Active" : "Item"}: {item.label}
  //     </div>
  //   );
  // };

  return (
    <div className="App">
      <header className="App-header">
        <DropdownList
          data={data}
          onChange={setSelected}
          value={selected}
          // placeholder={"Custom placeholder"}
          // dropdownClassName="dropdown-custom-style"
          // menuContainerClassName="container-custom-style"
          // itemClassName="menu-item-custom-style"
          // activeItemClassName="menu-item-active-custom-style"
          // trigerClassName="trigger-custom-style"
          // menuItemRenderer={menuItemRenderer}
        />
      </header>
      {JSON.stringify(selected)}
    </div>
  );
}

export default App;
