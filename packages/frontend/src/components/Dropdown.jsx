import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.scss";

const Dropdown = (props) => {
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
    <>
      <div className="container">
        <button
          className="button"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div class="dropdown">
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
