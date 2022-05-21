import React, { useState, useEffect, useRef } from "react";
import "./newDropdown.scss";

export function DropDownContent(props) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  const closeOnClickOuside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOnClickOuside);

    // clean up event listener
    return () => {
      document.removeEventListener("mousedown", closeOnClickOuside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
      >
        {props.title}
      </button>
      {isOpen && (
        <div className="menu">
          {props.list.map((item) => (
            <a className="menu-item" key={item.id} href="/">
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
