import Dropdown, { IDropDown } from './components/Dropdown'
import { useRef } from 'react'

const array: IDropDown[] = [
  { id: 0, title: 'Dropdown 1' },
  { id: 1, title: 'Dropdown 2' },
  { id: 2, title: 'Dropdown 3' },
]

export default function App() {
  type DropdownHandle = React.ElementRef<typeof Dropdown>
  const refDrop = useRef<DropdownHandle>(null)

  const onSelect = (val: IDropDown) => {
    console.log(val)
    refDrop.current?.start(val)
  }
  return (
    <Dropdown
      ref={refDrop}
      dataDropdown={array}
      onSelect={onSelect}
      stylebtn={{ border: 'blue', color: 'pink' }}
      //   styleDropDown={{
      //     background: 'pink',
      //   }}
    />
  )
}
