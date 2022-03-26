import React, { useRef, useState } from "react";
import classnames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./DropdownList.module.scss";
import { IOption, IDropdownProps, IItemProps } from "./types";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const DropdownList = (props: IDropdownProps) => {
  const dropdownRef = useRef(null);

  const {
    data,
    value,
    isOpen,
    onChange,
    placeholder,
    menuItemRenderer,
    itemClassName,
    trigerClassName,
    dropdownClassName,
    activeItemClassName,
    menuContainerClassName,
  } = props;

  const filterValue = data.find(
    (item) => item?.value === value?.value && item?.label === value?.label
  );

  const [isActive, setIsActive] = useOutsideClick(dropdownRef, isOpen || false);

  const [dropdownValue, setDropdownValue] = useState<
    IOption | null | undefined
  >(filterValue ? value : null);

  const handleDropdownClick = () => setIsActive(!isActive);

  const handleChange = (item: IOption) => {
    setIsActive(false);
    setDropdownValue(item);
    onChange?.(item);
  };

  const handleRemove = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsActive(false);
    setDropdownValue(null);
    onChange?.(null);
  };

  const renderItem = (index: number, active: boolean, item: IOption) => {
    const itemProps: IItemProps = {
      onClick: () => handleChange(item),
      key: item.value,
      className: classnames([
        styles["item"],
        itemClassName,
        active ? styles["item--active"] : "",
        active && activeItemClassName ? activeItemClassName : "",
      ]),
    };

    return (
      menuItemRenderer?.(index, active, item, itemProps) || (
        <div {...itemProps}>{item?.label}</div>
      )
    );
  };

  return (
    <div className={classnames([styles["container"], dropdownClassName])}>
      <span
        onClick={handleDropdownClick}
        className={classnames([styles["trigger"], trigerClassName])}
      >
        <span className={classnames([styles["label"]])}>
          {dropdownValue?.label || placeholder}
        </span>
        {dropdownValue && (
          <button className={styles.removeBtn} onClick={handleRemove}>
            ✕
          </button>
        )}
      </span>
      {isActive && data.length > 0 && (
        <div
          ref={dropdownRef}
          className={classnames([styles["menu"], menuContainerClassName])}
        >
          {data.map((item, index) => {
            const active = item.value === dropdownValue?.value;
            return renderItem(index, active, item);
          })}
        </div>
      )}
    </div>
  );
};

DropdownList.defaultProps = {
  isOpen: false,
  data: [],
  placeholder: "Choose Option",
};

DropdownList.propTypes = {
  placeholder: PropTypes.string,
  isOpen: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired
  ).isRequired,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  menuItemRenderer: PropTypes.func,
  menuContainerClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  trigerClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
};

export default DropdownList;
