import React, { useState, useRef, useEffect, forwardRef } from "react";
import * as Components from './exportChild';
import OutSideClick from '../OutSideClick/index'

import './style.scss';



let defaultOptions = [
    {
        // text: "Item 1",
        template: <h1>Template</h1>,
        value: 1,
    },
    {
        text: "Item 2",
        template: <h1>Template 2</h1>,
        value: 2,
    }
]



const DropDownComponent = (props) => {
    let initialProps = {
        title: "Choose Your Item",
        options: defaultOptions,
        setSelectedOption: (val) => { },
        closeTogglingWhenChoose: false,
        onOptionClicked: function (value) {
            this.setSelectedOption(value);
            if (this.closeTogglingWhenChoose) {
                setIsOpen(false);
            }
        },
        className: {
            DropDownContainer: "DropDown_Container",
            DropDownHeader: "Header",
            DropDownListContainer: "ListContainer",
            DropDownList: "ListContainer",
            ListItem: "ListItem",
        }
    }
    let myProps = { ...initialProps, ...props };
    const [isOpen, setIsOpen] = useState(false);

    const toggling = () => {
        setIsOpen(!isOpen);
    };
    return <>
        <OutSideClick
            onOutsideClick={() => {
                setIsOpen(false);
            }}
        >
            <Components.DropDownContainer
                className={myProps.className.DropDownContainer}
            >
                <Components.DropDownHeader
                    className={myProps.className.DropDownHeader}
                    toggling={toggling}>
                    {myProps.title}
                </Components.DropDownHeader>
                {isOpen && (
                    <Components.DropDownListContainer
                        className={myProps.className.DropDownListContainer}

                    >
                        <Components.DropDownList
                            className={myProps.className.DropDownListContainer}

                        >
                            {myProps.options.map(option => {
                                if (myProps.templateListItem != null) {
                                    return <myProps.templateListItem {...option} key={Math.random()} />
                                }
                                else return (
                                    <Components.ListItem
                                        className={myProps.className.ListItem}

                                        onClick={() => { myProps.onOptionClicked(option.value); }} key={Math.random()}>
                                        {option?.text ? option?.text : option.template}
                                    </Components.ListItem>
                                )
                            })}
                        </Components.DropDownList>
                    </Components.DropDownListContainer>
                )}
            </Components.DropDownContainer>
        </OutSideClick>

    </>;
}
export default DropDownComponent;