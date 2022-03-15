import {useState} from 'react'

const DropDown = (props)=>{
    const {
        data, 
        isVisible = false,
        setVisible
    } = props;

    const [currentClick, setCurrentClick] = useState(null)
      
    const onSetIndex = (index)=>{
        setCurrentClick(index)
        setVisible(false)
    }
   
    return(
        <div className={`dropdown-content ${isVisible ? '__isVisible' : ''}`}>
            {(data || []).map((item)=>{
                return(
                    <a href="#" key={item._id} className={currentClick === item._id ? "__isActive" : ''} onClick={()=> onSetIndex(item._id)}>{item._s}</a>
                )
            })}
        </div>
    )
}

export default DropDown;