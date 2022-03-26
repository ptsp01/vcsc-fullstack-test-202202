import { RefObject, useState, useEffect } from "react";

export const useOutsideClick = (
  el: RefObject<HTMLElement>,
  isOpen: boolean
) => {
  const [isActive, setIsActive] = useState(isOpen);

  useEffect(() => {
    const pageClickEvent = (e: Event) => {
      if (
        el.current !== null &&
        !el.current.contains(e.target as HTMLElement)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("mousedown", pageClickEvent);
    }

    return () => {
      window.removeEventListener("mousedown", pageClickEvent);
    };
  }, [isActive, el]);

  return [isActive, setIsActive] as const;
};
