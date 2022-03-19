import React from 'react';
export declare type ItemProps = {
    children: React.ReactNode;
    active?: boolean;
    rest?: any;
};
export declare const Item: ({ children, active, ...rest }: ItemProps) => JSX.Element;
declare type MenuProps = {
    children?: React.ReactNode;
    menu?: React.ReactNode | [];
    headRef?: (element: HTMLElement | null) => any;
};
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
