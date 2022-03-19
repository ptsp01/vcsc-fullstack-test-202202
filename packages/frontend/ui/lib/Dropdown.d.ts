import React from 'react';
export declare type DropdownContextProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => boolean;
    headRef?: (element: HTMLElement | null) => any;
};
export declare type DropdownProps = {
    head: HTMLElement | string;
    arrow: boolean | string | HTMLElement;
    children?: React.ReactNode;
};
export declare const Dropdown: ({ head, arrow, children }: {
    head: any;
    arrow: any;
    children: any;
}) => JSX.Element;
export declare const useDropDownContext: () => DropdownContextProps;
