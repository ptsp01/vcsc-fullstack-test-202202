import React, { useState, CSSProperties } from 'react';
import { OverWriteStyles, DropdownItem } from './Dropdown';
import Dropdown from './Dropdown';

const Test = () => {
  const [state, setState] = useState<DropdownItem[]>([
    {
      id: 0,
      title: 'Item 1',
      selected: false,
      customRender: <div onClick={() => alert('You clicked on custom item!')}>Custom render</div>,
      selectStyle: { backgroundColor: 'yellow' } as CSSProperties,
    },
    {
      id: 1,
      title: 'Item 2',
      selected: false,
    },
    {
      id: 2,
      title: 'Item 3',
      selected: false,
    },
    {
      id: 3,
      title: 'Item 4',
      selected: false,
    },
    {
      id: 4,
      title: 'Item 5',
      selected: false,
    },
    {
      id: 5,
      title: 'Item 6',
      selected: false,
    },
  ]);

  const resetThenSet = (id: any) => {
    const temp = [...state];

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setState(temp);
  };

  const overWriteStyles: OverWriteStyles = {
    ddListItem: {
      backgroundColor: 'gray',
    },
    activeItem: {
      backgroundColor: 'pink',
    },
  };

  return (
    <div style={{ paddingTop: 200, paddingLeft: 200 }}>
      <Dropdown
        headerTitle={'Select value'}
        data={state}
        resetThenSet={resetThenSet}
        overWriteStyles={overWriteStyles}
      />
    </div>
  );
};

export default Test;
