import React, { 
  useState,
  useReducer,  
  useEffect, 
  createContext, 
  useContext,
  useRef } from 'react';


import { DropdownContainer } from './styles';
import { Head } from './DropdownHead';

export type DropdownContextProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => boolean
  headRef?: (element: HTMLElement | null) => any;
};

const DropdownContext = createContext<DropdownContextProps>({
  isOpen: false,
  setIsOpen: () => false,
  headRef: null
})

export type DropdownProps = {
  head: HTMLElement | string
  arrow: boolean | string | HTMLElement
  children?: React.ReactNode
}

export const Dropdown = ({ head, arrow, children }) => {
  const ref = useRef<HTMLDivElement>()
  const headRef = useRef<HTMLDivElement>()

  const [isOpen, setIsOpen] = useState(false)
  const [menuRef, setMenuRef] = useState(null)

  const handleClick = (e) =>{
    //if click on btn -> cursor, toggle
    if(headRef.current.contains(e.target) && headRef.current !== e.target){
      setIsOpen(!isOpen)
    }
    //if menu is open and not click inside menu or button
    if(menuRef?.current){
      if(!menuRef?.current.contains(e.target) && !headRef.current.contains(e.target)){
        setIsOpen(false)
      }
    }
    e.preventDefault()
  }

  useEffect(() =>{
    document.addEventListener("click", handleClick)
  })

  return (
    <DropdownContext.Provider value={{isOpen, setIsOpen, headRef, setMenuRef}}>
      <DropdownContainer ref={ref}>
        <Head arrow={arrow} ref={headRef} menuRef={menuRef}>{head}</Head>
        {children}
      </DropdownContainer>
    </DropdownContext.Provider>
  )
}

export const useDropDownContext = () => {
  return useContext(DropdownContext)
}



