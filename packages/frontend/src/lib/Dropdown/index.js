import React from "react";
import { DContext } from "./DContext"

import "./style.scss"



export default function Dropdown ({ header, children }) {
  const [isExpand, setExpand] = React.useState(false);
  const dRef = React.useRef();

  const toggleExpand = (val) => {
    if (typeof val !== "number") {
      setExpand(!isExpand)
    } else {
      setExpand(Boolean(val))
    }
  }

  const handleClickOutside = (e) => {
    const isOutside = !dRef.current?.contains(e.target);
    if (isOutside) {
      toggleExpand(0);
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return<DContext.Provider value={{ isExpand, toggleExpand }}>
      <div ref={dRef} className='dropdown' onClick={toggleExpand} >
        {header}

        <ul className={`content ${isExpand ? 'expand': ''}`} >
          {children}
        </ul>
      </div>
    </DContext.Provider>
}