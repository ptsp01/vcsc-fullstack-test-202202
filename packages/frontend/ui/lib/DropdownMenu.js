import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDropDownContext } from './Dropdown';
export const Item = ({ children, active, ...rest }) => {
    return (_jsx("div", { ...rest, className: `dropdown-item ${active ? 'active' : ''}`, children: children }));
};
export const Menu = React.forwardRef(({ children, menu }, ref) => {
    const { isOpen, setIsOpen, headRef, setMenuRef } = useDropDownContext();
    const [style, setStyle] = useState({});
    const menuRef = useRef();
    const appRef = document.body;
    useEffect(() => {
        const latestRect = headRef.current.getBoundingClientRect();
        setStyle({
            left: latestRect.x,
            top: latestRect.y + latestRect.height,
            minWidth: latestRect.width
        });
        setMenuRef(menuRef);
    }, []);
    if (!isOpen)
        return null;
    if (isOpen && !children) {
        return createPortal(_jsx("div", { className: "dropdown-menu", ref: menuRef, style: style, children: menu.map((m) => {
                if (m.active) {
                    return (_jsx(Item, { active: true, children: m.name }, m.id));
                }
                else {
                    return (_jsx(Item, { children: m.name }, m.id));
                }
            }) }), appRef);
    }
    if (isOpen && children) {
        return createPortal(_jsx("div", { className: "dropdown-menu", ref: menuRef, style: style, children: children }), appRef);
    }
});
