import {useEffect, useState, useRef} from 'react'
import clsx from 'clsx';

const DropDown = (props)=>{
    const {
        data, 
        isVisible = false,
        onChange = ()=>{},
        onClose= ()=> {},
        className = null,
        classItem = null,
        isClose = false
    } = props;

    const [currentClick, setCurrentClick] = useState(null)
    const [_isVisible, setVisible] = useState(null)
    const wrapperRef = useRef(null);

    useEffect(()=>{
        setVisible(isVisible)
    }, [isVisible])

    useEffect(() => {
        function handleClickOutside(event) {
            if (isClose && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
      
    const onSetIndex = (index, item)=>{
        setCurrentClick(index)
        onChange(item)
    }
   
    return(
        <div 
            ref={wrapperRef}
            className={clsx({
                [className]: className,
                '__isVisible': _isVisible,
            }, 'dropdown-content')}
        >
            {(data || []).map((item)=>{
                return(
                    <a href="#" key={item._id} className={clsx({
                        '__isActive': currentClick === item._id,
                        [classItem]: classItem
                    }, 'item-dropdown')} onClick={()=> onSetIndex(item._id, item)}>{item._s}</a>
                )
            })}
        </div>
    )
}

export default DropDown;