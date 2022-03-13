import DropDownComponent from './components/DropDown/index'
import AnotherDropDown from './components/AnotherDropDown/index'
import React, { useState } from "react";
const MyCustomComponent = () => {
  const [show, setShow] = useState(false);
  return <>
    <button onClick={() => { setShow(!show) }}>Click to show</button>

    {show && <>
      <br />
      Show Another Component
    </>}
  </>;
}

const MyCustomListItem = (props) => {
  return <div>
    {props.text}
    {props.value}
    <br />
  </div>;
}

function App() {
  let dropdowns = [
    {
      title: "Dropdown Number 1",
      options: [
        {
          text: "Item 1",
          value: 1,
        },
        {
          text: "Item 2",
          value: 2,
        }
      ],
      setSelectedOption: (val) => {
        console.log(val)
      },
    },
    {
      title: "Dropdown Template",
      options: [
        {
          // text: "Item 1",
          template: <div>
            <h2 onClick={(event) => {
              alert("Custom Event Template")
            }}>React Is Awesome</h2>
          </div>,
          value: 1,
        },
        {
          template: <MyCustomComponent />,
          value: 2,
        }
      ],
      setSelectedOption: (val) => {
        console.log(val)
      },
    },
    {
      title: "Dropdown Number 3 (Close when choose)",
      options: [
        {
          text: "Item 1",
          value: 1,
        },
        {
          text: "Item 2",
          value: 2,
        }
      ],
      setSelectedOption: (val) => {
        alert(val)
      },
      closeTogglingWhenChoose: true
    },
    {
      title: "Custom Every Line Render",
      templateListItem: MyCustomListItem,
      options: [
        {
          text: "1 + 1 = ",
          value: 2,
        },
        {
          text: "2 + 2 = ",
          value: 4,
        }
      ],
      closeTogglingWhenChoose: true
    },
  ]
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: 'center' }}>
          vcsc-fullstack-test
        </h1>
        <div>
          {dropdowns.map(x => {
            return <div style={{ width: '20%', float: 'left', marginRight: '10px' }} key={Math.random()}>
              <DropDownComponent {...x} />

            </div>
          })}
          <div style={{ width: '20%', float: 'left', marginRight: '10px' }} >
            <AnotherDropDown {...{
              title: "Override Css",
              options: [
                {
                  text: "Item 1",
                  value: 1,
                },
                {
                  text: "Item 2",
                  value: 2,
                }
              ],
              setSelectedOption: (val) => {
                console.log(val)
              },
            }} />
          </div>

        </div>


      </header>
    </div>
  );
}

export default App;
