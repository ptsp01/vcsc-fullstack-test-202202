import React, { forwardRef, useImperativeHandle, useState } from "react";
export interface DropdownOverplayProps {
  className?: string;
  style?: React.CSSProperties;
  value: React.ReactNode | Array<string>;
}
const DropdownOverplay = forwardRef(
  ({ className = "", style, value }: DropdownOverplayProps, ref: any) => {
    const [visibleState, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      setVisible,
    }));
    return (
      <div
        className={`${className} bv-dropdown-overplay ${
          !visibleState ? "hide" : ""
        }`}
        style={style}
      >
        {Array.isArray(value) ? (
          <ul>
            {value.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        ) : (
          value
        )}
      </div>
    );
  }
);
export default DropdownOverplay;
