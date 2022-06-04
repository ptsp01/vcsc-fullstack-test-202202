import React, { useState, useEffect, useRef } from 'react'

interface IProps {
  ref?: React.MutableRefObject<HTMLDivElement | null>,
  exludeChildren?: boolean,
  clickOutsideCallback?: Function,
  clickInsideCallback?: Function,
}
const useClickOutside = ({
  ref,
  exludeChildren = false,
  clickOutsideCallback,
  clickInsideCallback,
}: IProps) => {
  !ref && (ref = useRef(null));

  const handleClickOutside = event => {
    if (!(exludeChildren && ref?.current?.contains(event.target))) {
      const isClickOutside = !(!ref?.current || ref?.current?.contains(event.target));

      isClickOutside && clickOutsideCallback?.();
      !isClickOutside && clickInsideCallback?.();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref };
}

export default useClickOutside;