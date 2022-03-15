import clsx from 'clsx'
import { forwardRef, useImperativeHandle } from 'react'
import './styles.scss'
export interface IDropDown {
  readonly id: number
  readonly title: string
}
type onFocusProps = {
  start: (val: IDropDown) => void
}
interface IProps {
  dataDropdown: IDropDown[]
  onSelect: (val: IDropDown) => void
  stylebtn?: React.CSSProperties
  styleDropDown?: React.CSSProperties
}
const Dropdown: React.ForwardRefRenderFunction<onFocusProps, IProps> = (
  props,
  ref
) => {
  const onselect = (val: IDropDown) => {
    props.onSelect(val)
  }
  useImperativeHandle(ref, () => ({
    start(val: IDropDown) {
      alert(val.title)
    },
  }))
  return (
    <div className="sec-center">
      <input
        className={clsx('dropdown')}
        type="checkbox"
        id="dropdown"
        name="dropdown"
      />
      <label className="for-dropdown" style={props.stylebtn} htmlFor="dropdown">
        Dropdown Menu
      </label>
      <div className="section-dropdown" style={props.styleDropDown}>
        <input
          className="dropdown-sub"
          type="checkbox"
          id="dropdown-sub"
          name="dropdown-sub"
        />
        {props.dataDropdown.map((item, index) => {
          return (
            <p key={index} onClick={() => onselect(item)} aria-hidden="true">
              {item.title}
            </p>
          )
        })}
        {/* <label className="for-dropdown-sub" htmlFor="dropdown-sub">
          item.title
        </label>
        <div className="section-dropdown-sub">
          <p>itemSub.title</p>
        </div> */}
      </div>
    </div>
  )
}
export default forwardRef(Dropdown)
