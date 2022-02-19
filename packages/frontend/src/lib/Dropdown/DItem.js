import "./style.scss";

export default function DItem({ children }) {
  return <li className="item" >
    {children}
  </li>
}