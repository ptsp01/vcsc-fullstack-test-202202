import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const Head = React.forwardRef(({ children, arrow, menuRef }, ref) => {
    let arrowElement = "";
    if (typeof arrow === 'boolean') {
        arrowElement = _jsx(ArrowSvg, { show: true });
    }
    else {
        arrowElement = arrow;
    }
    return (_jsx("div", { className: "dropdown-btn", ref: ref, children: _jsxs("div", { className: "dropdown-btn-cursor", children: [children, " ", arrowElement] }) }));
});
const ArrowSvg = ({ show }) => {
    if (!show)
        return null;
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16", children: _jsx("path", { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" }) }));
};
