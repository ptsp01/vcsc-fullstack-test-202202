import React from "react";
import DHeader from "./DHeader";
import DItem from "./DItem";
import { EMPTY } from "../../constant";
import { DContext } from "./DContext"

import "./style.scss"



function Dropdown ({ header, children, onSelect, label, isFluid }) {
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

  return<DContext.Provider value={{ onSelect }}>
      <div ref={dRef} className={`dropdown ${isFluid ? 'fluid' : EMPTY}`} onClick={toggleExpand} >
        { header }

        <ul className={`content ${isExpand ? 'expand': EMPTY}`} >
          { children }
        </ul>
      </div>
    </DContext.Provider>
}

export default Object.assign(Dropdown, {
  Header: DHeader,
  Item: DItem
})