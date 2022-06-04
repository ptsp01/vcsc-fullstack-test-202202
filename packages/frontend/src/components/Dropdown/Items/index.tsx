import React, { useImperativeHandle, useState, useRef } from 'react';
import Classnames from 'classnames';
import styles from './styles.module.css';
import { IProps } from '~interfaces';

export interface IDropdownItemsProps extends IProps {
  type?: 'flat' | 'outline',
  size?: 's' | 'm' | 'l',
  parentRef: React.MutableRefObject<HTMLDivElement | null>,
  onClick?: React.MouseEventHandler,
  children: React.ReactNode,
}

const DropdownItems = ({
  type = 'outline',
  size = 'm',
  parentRef,
  className,
  onClick,
  children,
}: IDropdownItemsProps, ref) => {
  const [isVisible, setVisible] = useState(false);
  const activeIndex = useRef(-1);

  useImperativeHandle(ref, () => ({
    isVisible,
    setVisible,
  }));

  const parentBoundingClientRect = parentRef.current?.getBoundingClientRect()
  return (<>
    {
      isVisible && (
        <div
          ref={ref}
          className={Classnames(
            styles['dropdown-items'],
            styles['dropdown-items-' + type],
            styles['dropdown-items-' + size],
            isVisible && styles['dropdown-items-active'],
            className,
          )}
          style={{
            left: `${parentBoundingClientRect?.x}px`,
            top: `${parentBoundingClientRect!.y + parentBoundingClientRect!.height}px`,
            minWidth: `${parentBoundingClientRect!.width}px`,
          }}
        >
          {
            React.Children.map(children, (child: any, index) => {
              return React.cloneElement(child, {
                ...child.props,
                ...(index === activeIndex.current ? { active: '' } : {}),
                onClick: (e) => {
                  child.props.onClick?.(e);
                  activeIndex.current = index;
                }
              })
            })
          }
        </div>
      )
    }
  </>
  )
}

export default React.forwardRef(DropdownItems)












