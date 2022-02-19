import React from "react";
import { DbContext } from "./DbContext"

import "./style.scss"



export default function Dropdown ({ header, children }) {
  const [isExpand, setExpand] = React.useState(false);
  const dbRef = React.useRef();

  const toggleExpand = (val) => {
    if (typeof val !== "number") {
      setExpand(!isExpand)
    } else {
      setExpand(Boolean(val))
    }
  }

  const handleClickOutside = (e) => {
    const isOutside = !dbRef.current?.contains(e.target);
    if (isOutside) {
      toggleExpand(0);
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return<DbContext.Provider value={{ isExpand, toggleExpand }}>
      <div ref={dbRef} className='dropdown' onClick={toggleExpand} >
        {header}

        <ul className={`dd-content ${isExpand ? 'expand': ''}`} >
          {children}
        </ul>
      </div>
    </DbContext.Provider>
}