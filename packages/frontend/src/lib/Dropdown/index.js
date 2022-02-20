import React from "react";
import ReactDom from "react-dom";
import DHeader from "./DHeader";
import DItem from "./DItem";
import { EMPTY, PORTAL } from "../../constant";
import { DContext } from "./DContext"

import "./style.scss"

const portalEl = document.querySelector(`#${PORTAL}`);

function Dropdown ({ header, children, onSelect, isFluid }) {
  const [isExpand, setExpand] = React.useState(false);
  const [coordinate, setCoordinate] = React.useState({ top: 0, left: 0, width: 0 })
  const renderEl = React.useRef(document.createElement(`div`));
  const dRef = React.useRef();

  const toggleExpand = (val) => {
    if (typeof val !== "number") {
      setExpand(!isExpand)
    } else {
      setExpand(Boolean(val))
    }
  }

  const handleClickOutside = (e) => {
    const isOutside = !dRef.current?.contains(e.target) 
      && !renderEl.current?.contains(e.target);
    if (isOutside) {
      toggleExpand(0);
    }
  }

  const dropDownContent = <ul style={{...coordinate}} className={`content ${isExpand ? 'expand': EMPTY}`} >
    { children }
  </ul>;

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    portalEl.appendChild(renderEl.current)
    renderEl.current?.classList?.add("dropdown")
    const _renderEl = renderEl.current;

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      portalEl.removeChild(_renderEl)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const _cor = dRef.current.getBoundingClientRect();
    setCoordinate({ top: _cor.bottom, left: _cor.left, width: _cor.width })
  }, [header])

  return<DContext.Provider value={{ onSelect }}>
      <div ref={dRef} className={`dropdown ${isFluid ? 'fluid' : EMPTY}`} onClick={toggleExpand} >
        { header }
        { ReactDom.createPortal(dropDownContent, renderEl.current) }
      </div>
    </DContext.Provider>
}

export default Object.assign(Dropdown, {
  Header: DHeader,
  Item: DItem
})