export interface IOption {
  label: string | number;
  value: string | number;
}

export interface IItemProps {
  onClick?: () => void;
  key: string | number;
  className: string;
}

export interface IDropdownProps {
  data: IOption[];
  value?: IOption | null;
  isOpen?: boolean;
  onChange: (value: IOption | null) => void;
  placeholder?: string;
  menuItemRenderer?: (
    index: number,
    active: boolean,
    item: IOption,
    itemProps: IItemProps
  ) => JSX.Element;
  itemClassName?: string;
  trigerClassName?: string;
  dropdownClassName?: string;
  activeItemClassName?: string;
  menuContainerClassName?: string;
}
