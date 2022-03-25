import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import styles from './dropdown.module.scss';

export interface DropdownItem {
  id: number;
  title: string;
  selected: boolean;
  customRender?: any; // component: custom renderer for downdown line
  selectStyle?: CSSProperties; // set style for active dropdown line
}

// set style overwrite default dropdown
export interface OverWriteStyles {
  arrowUp?: CSSProperties;
  arrowDown?: CSSProperties;
  ddHeader?: CSSProperties;
  ddHeaderTitle?: CSSProperties;
  ddWrapper?: CSSProperties;
  ddList?: CSSProperties;
  ddListItem?: CSSProperties;
  activeItem?: CSSProperties;
}

interface Props {
  headerTitle: string;
  data: DropdownItem[];
  resetThenSet: Function;
  overWriteStyles: OverWriteStyles;
}

interface State {
  title: any;
  isOpen: boolean;
  data: DropdownItem[];
}

const Dropdown = (props: Props) => {
  const { headerTitle, data, resetThenSet, overWriteStyles } = props;

  const [state, setState] = useState<State>({
    title: headerTitle,
    isOpen: false,
    data: data,
  });

  const handleToggle = () => {
    setState((prevState: State) => {
      return {
        ...prevState,
        isOpen: !prevState.isOpen,
      };
    });
  };

  const selectItem = (item: DropdownItem) => {
    const { title, customRender, id } = item;
    setState((prevState: State) => {
      return {
        ...prevState,
        title: customRender ? customRender : title,
      };
    });
    resetThenSet(id);
  };

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setState((prevState: any) => {
            return {
              ...prevState,
              isOpen: false,
            };
          });
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div
      className={styles.ddWrapper}
      ref={wrapperRef}
      style={overWriteStyles?.ddWrapper}
    >
      <button type="button" className={styles.ddHeader} style={overWriteStyles?.ddHeader} onClick={handleToggle}>
        <div className={styles.ddHeaderTitle} style={overWriteStyles?.ddHeaderTitle}>
          {state.title}
          {state.isOpen ? (
            <i
              className={`${styles.arrow} ${styles.up}`}
              style={overWriteStyles?.arrowUp}
            ></i>
          ) : (
            <i
              className={`${styles.arrow} ${styles.down}`}
              style={overWriteStyles?.arrowDown}
            ></i>
          )}
        </div>
      </button>
      {state.isOpen && (
        <div className={styles.ddList} style={overWriteStyles?.ddList}>
          {state.data.map((item: DropdownItem) => (
            <button
              type="button"
              className={`${styles.ddListItem} ${
                item.selected ? styles.activeItem : ''
              }`}
              key={item.id}
              onClick={() => selectItem(item)}
              style={{
                ...(overWriteStyles.ddListItem
                  ? overWriteStyles.ddListItem
                  : {}),
                ...(item.selected && overWriteStyles.activeItem
                  ? overWriteStyles.activeItem
                  : {}),
                ...(item.selected && item?.selectStyle ? item.selectStyle : {}),
              }}
            >
              {item?.customRender ? item.customRender : item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
