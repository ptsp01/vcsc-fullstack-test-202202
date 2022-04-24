import React, { createRef, useEffect, useMemo, useState } from "react"
import styles from './Dropdown.module.scss'

export interface Renderer {
    (iNode: string | number): React.ReactElement
}

export interface Style {
    [index:string]: string
}

interface DropdownItemProps {
    isActive: boolean,
    value: string | number,
    renderer?: Renderer,
    activeRenderer?: Renderer,
}

const DropdownItem : (props: DropdownItemProps)=>React.ReactElement = (props: DropdownItemProps) => {
    const {isActive, value, renderer, activeRenderer} = props 
    
    let render = useMemo<React.ReactElement>(() => {
        if (renderer) {
            return renderer(value)
        } else {
            return <React.Fragment>{value}</React.Fragment>
        }
    }, [value, renderer])

    let activeRender = useMemo<React.ReactElement>(() => {
        if (activeRenderer) {
            return activeRenderer(value)
        } else {
            return <React.Fragment>{value}</React.Fragment>
        }
    }, [value, activeRenderer])

    if (isActive) {
        return activeRender
    }  else {
        return render
    }
}

export interface DropdownProps {
    values: (string|number)[],
    activeIndex: number,
    onItemClick: (index: number, val: string | number) => void,
    renderer?: Renderer,
    activeRenderer?: Renderer,
    selectedDisplayStyles?: Style,
    optionListStyles?: Style,
    maxOptionListHeightPx?: number,
} 


export const Dropdown = (props: DropdownProps) => {
    let [isCollapsed, setIsCollapsed] = useState(true)
    let [maxHeight, setMaxHeight] = useState<number>(0)
    let [childrenRefs, setChildrenRefs] = useState<React.RefObject<HTMLButtonElement>[]>([])

    useEffect(() => {
        let newRefs = []
        for (let i = 0; i < props.values.length; i++) {
            newRefs.push(createRef<HTMLButtonElement>())
        }
        setChildrenRefs(newRefs)
    }, [props.values])

    function onButtonClickGenerator(index: number) {
        return (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation()
            setIsCollapsed(true)
            props.onItemClick(index, props.values[index])
        }
    }  

    function displayChildren() {
            let ret: React.ReactNode[] = []
            let i = 0
            for (let child of props.values) {
                ret.push(<button onClick={ onButtonClickGenerator(i) } className={ styles.button } key={i} ref={childrenRefs[i]}>
                    <DropdownItem
                        renderer={props.renderer}
                        activeRenderer={props.activeRenderer}
                        value={child}
                        isActive={i === props.activeIndex}
                    ></DropdownItem>
                </button>)
                i++
            }
            return ret
    }

    useEffect(() => {
        let maxHeight = 0
        for (let ref of childrenRefs) {
            if (ref.current) {
                maxHeight += ref.current.getBoundingClientRect().height
            }
        }
        setMaxHeight(maxHeight)
    }, [childrenRefs])

    useEffect(() => {
        let onClickOustsideHandler = () => {
            setIsCollapsed(true)
        }

        document.addEventListener('click', onClickOustsideHandler)
        return () => document.removeEventListener('click', onClickOustsideHandler)
    }, [])

    return <div data-testid="dropdown" className={ styles.container }>
        <div className={ styles.selected_display } data-testid="selected-display" style={{
            ...props.selectedDisplayStyles,
            position: 'relative',
            display: 'flex',
        }} onClick={(event) => {
            setIsCollapsed(!isCollapsed)
            event.stopPropagation()
        }}>
            <div className={ styles.selected_display_value }>
                <span>{props.values[props.activeIndex ?? -1] !== undefined? props.values[props.activeIndex!] : ""}</span>
            </div>
            &nbsp;
            {
                (() => {
                    if (isCollapsed) {
                        return <span className={ styles.chevron_right }>&#x203A;</span>
                    } else {
                        return <span className={ styles.chevron_down }>&#8964;</span>
                    }
                })()
            }
        </div>
        <div className={ styles.select } data-testid="dropdown-list" style={{ 
            ...props.optionListStyles, 
            display: 'flex',
            flexDirection: 'column',
            maxHeight: isCollapsed? '0px' : `${props.maxOptionListHeightPx !== undefined? Math.min(props.maxOptionListHeightPx, maxHeight) : maxHeight}px`, 
            overflowY: isCollapsed? 'hidden' : 'auto' 
        }}>
            {displayChildren()}
        </div>
    </div>
}