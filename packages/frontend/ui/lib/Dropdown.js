import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { DropdownContainer } from './styles';
import { Head } from './DropdownHead';
const DropdownContext = createContext({
    isOpen: false,
    setIsOpen: () => false,
    headRef: null
});
export const Dropdown = ({ head, arrow, children }) => {
    const ref = useRef();
    const headRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [menuRef, setMenuRef] = useState(null);
    const handleClick = (e) => {
        //if click on btn -> cursor, toggle
        if (headRef.current.contains(e.target) && headRef.current !== e.target) {
            setIsOpen(!isOpen);
        }
        //if menu is open and not click inside menu or button
        if (menuRef?.current) {
            if (!menuRef?.current.contains(e.target) && !headRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        e.preventDefault();
    };
    useEffect(() => {
        document.addEventListener("click", handleClick);
    });
    return (_jsx(DropdownContext.Provider, { value: { isOpen, setIsOpen, headRef, setMenuRef }, children: _jsxs(DropdownContainer, { ref: ref, children: [_jsx(Head, { arrow: arrow, ref: headRef, menuRef: menuRef, children: head }), children] }) }));
};
export const useDropDownContext = () => {
    return useContext(DropdownContext);
};
