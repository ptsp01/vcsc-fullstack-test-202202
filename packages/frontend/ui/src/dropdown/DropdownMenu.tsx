import React, { 
  useState,
  useReducer,  
  useEffect, 
  createContext, 
  useContext,
  useRef } from 'react';

import { createPortal } from 'react-dom';

import { useDropDownContext } from './Dropdown';
export type ItemProps = {
  children: React.ReactNode,
  active?: boolean
  rest?: any
}
export const Item = ({ children, active,...rest }: ItemProps) => {
  return (
    <div {...rest} className={`dropdown-item ${active ? 'active' : ''}`}>{ children }</div>
  )
}

type MenuProps = {
  children?: React.ReactNode
  menu?: React.ReactNode | []
  headRef?: (element: HTMLElement | null) => any;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(({ children, menu }, ref) => {
  const {isOpen, setIsOpen, headRef, setMenuRef} = useDropDownContext()
  const [style, setStyle] = useState({})
  const menuRef = useRef()
  const appRef = document.body

  useEffect(() => {
    const latestRect = headRef.current.getBoundingClientRect()
    setStyle({
      left: latestRect.x,
      top: latestRect.y + latestRect.height,
      minWidth: latestRect.width
    })
    setMenuRef(menuRef)
  }, [])
  
  
  if(!isOpen) return null

  if(isOpen && !children){
    return createPortal(
      <div className="dropdown-menu" ref={menuRef} style={style}>
        {menu.map((m) =>{
          if(m.active){
            return (<Item key={m.id} active>{m.name}</Item>) 
          }else{
            return (<Item key={m.id}>{m.name}</Item>)
          }
        })}
      </div> 
    , appRef)
  }

  if(isOpen && children){
    return createPortal(
      <div className="dropdown-menu" ref={menuRef} style={style}>
        { children }
      </div> 
    , appRef) 
  }

})
