export default function DropdownDocument() {
  return <div className="document" >
  <h3>Dropdown</h3>
  <ul>
    <li>
      <h5>ref: useRef()</h5>
      <code>Allow use to access to toggle() method, to expand/close dropdown</code>
    </li>

    <li>
      <h5>isFluid: Boolean</h5>
      <code>False,Width is dynamic base on content | True, width will expand fully to parent's element</code>
    </li>

    <li>
      <h5>header: Component</h5>
      <code>Apply Dropdown.Header or any thing you want!</code>
    </li>

    <li>
      <h5>onSelect: function</h5>
      <code>{`({item, value}) => {}`}, returning item that was clicked on</code>
    </li>

    <li>
      <h5>children: {`<Dropdown.Item /> []`}</h5>
      <code>{`({item, value}) => {}`}, returning item that was clicked on</code>
    </li>
  </ul>
  
  <h3>Dropdown.Header</h3>
  <ul>
    <li>
      <h5>style</h5>
      <code>Custom style for DropdownHeader</code>
    </li>
  </ul>
    
  <h3>Dropdown.Item</h3>
  <ul>
    <li>
      <h5>isActive: Boolean</h5>
      <code>The item is active or not</code>
    </li>
    <li>
      <h5>item: {`{ label: any, value: any }`}</h5>
      <code>The item is active or not</code>
    </li>
    <li>
      <h5>style</h5>
      <code>Custom style for DropdownItem</code>
    </li>
    <li>
      <h5>activeStyle</h5>
      <code>Custom style for Active DropdownItem</code>
    </li>
  </ul>
</div>
}