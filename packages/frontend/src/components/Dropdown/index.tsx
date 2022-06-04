import React, { useRef } from 'react';
import Classnames from 'classnames';
import styles from './styles.module.css';
import { useClickOutside } from '../../hooks';
import { IProps } from '~interfaces';
import { usePortal } from '~hooks';
import DropdownItems from './Items';
import { TPlancement } from '~types';

export interface IDropdownProps extends IProps {
  type?: 'flat' | 'outline',
  size?: 's' | 'm' | 'l',
  isDisabled?: boolean,
  isLoading?: boolean,
  placement?: TPlancement,
  onClick?: React.MouseEventHandler,
  children: React.ReactNode,
}

const Dropdown = ({
  type = 'outline',
  size = 'm',
  isDisabled = false,
  isLoading = false,
  placement = 'bl',
  className,
  onClick,
  children
}: IDropdownProps) => {
  const dropdownItemsRef = useRef<any>(null);
  const { ref } = useClickOutside({
    clickInsideCallback: () => dropdownItemsRef.current?.setVisible(true),
    clickOutsideCallback: () => dropdownItemsRef.current?.setVisible(false),
  });

  const clonedChildren: any = React.Children.toArray(React.Children.map<any, any>(children, child => (
    React.cloneElement(child, {
      ...child?.props,
    })
  )));

  const Label = clonedChildren.shift();

  const ItemsPortal = usePortal(document.querySelector('body')!);

  return (
    <div
      className={Classnames(
        styles['dropdown'],
        styles['dropdown-' + type],
        styles['dropdown-' + size],
        styles['dropdown-placement-' + placement],
        isDisabled && styles['dropdown-disabled'],
        className,
      )}
      onClick={(e) => !isDisabled && !isLoading && onClick?.(e)}
    >
      <div
        ref={ref}
        className={Classnames(
          styles['dropdown-label'],
        )}
      >
        {
          React.cloneElement(Label, {
            ...Label?.props,
          })
        }
      </div>
      <ItemsPortal>
        <div id='overlay'>
          <DropdownItems
            ref={dropdownItemsRef}
            parentRef={ref}
            className={Classnames(styles['dropdown-items'])}
          >
            {clonedChildren}
          </DropdownItems>
        </div>
      </ItemsPortal>
    </div>
  )
}

export default Dropdown












