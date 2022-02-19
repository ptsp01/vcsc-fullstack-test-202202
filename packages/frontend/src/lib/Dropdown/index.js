import React from "react";
import { DbContext } from "./DbContext"

import "./style.scss"



export default function Dropdown ({ header, children }) {
  const [isExpand, setExpand] = React.useState(false);

  const toggleExpand = (val) => {
    if (typeof val !== "number") {
      setExpand(!isExpand)
    } else {
      setExpand(Boolean(val))
    }
  }

  return<DbContext.Provider value={{ isExpand, toggleExpand }}>
      <div className='dropdown' onClick={toggleExpand} >
        {header}

        <ul className={`dropdown-content ${isExpand ? 'expand': ''}`} >
          {children}
        </ul>
      </div>
    </DbContext.Provider>
}