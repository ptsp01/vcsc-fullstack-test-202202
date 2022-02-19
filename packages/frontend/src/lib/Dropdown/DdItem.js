import "./style.scss";

export default function DbItem({ children }) {
  return <li className="db-item" >
    {children}
  </li>
}