import { useEffect, useState, useRef, useMemo } from 'react'
import DropDown from './Dropdown'
import './basic.scss'
import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
  &:hover{
    color: #1e3c77;
  }
`

const TextAll = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #4e68df;
`

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const dataSample = [
  {_id: 0, _s: 'Stock 1', _m: 'HOSE'},
  {_id: 1, _s: 'Stock 2', _m: 'VN'},
  {_id: 2, _s: 'Stock 3', _m: 'VN'},
  {_id: 3, _s: 'Stock 4', _m: 'HOSE'},
  {_id: 4, _s: 'Stock 5', _m: 'HOSE'},
  {_id: 5, _s: 'Stock 6', _m: 'VN'},
  {_id: 6, _s: 'Stock 7', _m: 'HOSE'},
  {_id: 7, _s: 'Stock 8', _m: 'VN'},
  {_id: 8, _s: 'Stock 9', _m: 'HOSE'},
  {_id: 9, _s: 'Stock 10', _m: 'VN'},
  {_id: 10, _s: 'Stock 11', _m: 'HOSE'},
  {_id: 11, _s: 'Stock 12', _m: 'HOSE'},
  {_id: 12, _s: 'Stock 13', _m: 'HOSE'},
  {_id: 13, _s: 'Stock 14', _m: 'HOSE'},
  {_id: 14, _s: 'Stock 15', _m: 'HOSE'},
  {_id: 15, _s: 'Stock 16', _m: 'HOSE'},
]

function App() {

  const [_isVisible, setVisible] = useState(false)
 
  const getStockHose = useMemo(()=>{
    const hoseTmp = (dataSample || []).filter(item => item._m === 'HOSE')
    return hoseTmp;
  }, [])

  const openDropDown = ()=>{
    setVisible(!_isVisible)
  }

  const _onChange = (value)=>{
    console.log(value, " value")
    setVisible(false)
  }

  const onCloseDropDown =()=>{
    setVisible(false)
  }

  return (
    <>
      <Wrapper className="main-component__dropdown">
        <div className="wrap-container">
          <Button onClick={openDropDown}>
            Click to open dropdown
          </Button>
          <DropDown
            isVisible={_isVisible}
            data={getStockHose}
            onChange={_onChange}
            isClose={true}
            onClose={onCloseDropDown}
            className="custom-dropdown"
            classItem="custom-dropdown-item"
          />
         
          <div className="box-stock">
            <TextAll>DANH SÁCH CỔ PHIẾU</TextAll>
            {(dataSample || []).map((item)=>{
                return(
                  <p key={item._id}>{item._s}</p>
                )
            })}
          </div>
        </div>
      </Wrapper>
    </>  
  );
}

export default App;
