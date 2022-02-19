export default function Dropdown ({ header, children }) {
  return<>
    {header}
    <ul>
      {children}
    </ul>
    </>
}