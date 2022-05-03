import { FC } from "react";
import "./App.scss";
import Dropdown from "./component/Dropdown";

const App: FC = () => {
  const overplayCustom = () => {
    return (
      <div>
        <div>
          <a target="_blank" href="https://www.google.com/" rel="noreferrer">
            Google
          </a>
        </div>
        <div>
          <a target="_blank" href="https://www.youtube.com/" rel="noreferrer">
            Youtube
          </a>
        </div>
        <div>
          <a target="_blank" href="https://twitter.com/" rel="noreferrer">
            Twitter
          </a>
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Dropdown overlay={["A", "B", "C"]}>Dropdown</Dropdown>
        <Dropdown
          overlay={overplayCustom()}
          className="custom"
          overlayClassName="overplay-custom"
          trigger={["mouseover", "click"]}
          style={{ backgroundColor: "#7c7ccf", margin: "0 px" }}
          overlayStyle={{ textAlign: "center", width: "200%" }}
        >
          Dropdown Custom
        </Dropdown>
      </div>
    </div>
  );
};

export default App;
