import React, { useRef, useEffect } from "react";
import "./Dropdown.scss";
import DropdownOverplay from "./DropdownOverplay";

export interface DropdownProps {
  className?: string;
  overlayClassName?: string;
  trigger?: Array<string>;
  overlayStyle?: React.CSSProperties;
  overlay: React.ReactNode | Array<string>;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Dropdown = ({
  className = "",
  overlayClassName = "",
  trigger = ["click"],
  overlayStyle,
  style,
  children,
  overlay,
}: DropdownProps) => {
  const refOverplay = useRef<any>();
  const refDropdown = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!refDropdown.current.contains(event.target)) {
        refOverplay.current.setVisible(false);
      }
    };
    trigger.forEach((event) => {
      refDropdown.current.addEventListener(event, () =>
        refOverplay.current.setVisible(true)
      );
      document.addEventListener(event, handleClickOutside);
      return () => {
        document.removeEventListener(event, handleClickOutside);
      };
    });
  }, []);

  return (
    <div className={`bv-dropdown`} ref={refDropdown}>
      <button className={`${className} bv-dropdown-button`} style={style}>
        {children}
        <span className="bv-dropdown-button-icon--down"></span>
      </button>
      <DropdownOverplay
        ref={refOverplay}
        className={overlayClassName}
        style={overlayStyle}
        value={overlay}
      />
    </div>
  );
};

export default Dropdown;
