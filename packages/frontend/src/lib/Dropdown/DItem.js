
import { DContext } from "./DContext";
import "./style.scss";

export default function DItem({ children, value }) {

  return <DContext.Consumer>
    {
      (ctx) => 
        <li className="item" onClick={() => ctx.onSelect && ctx.onSelect(value) } >
        {children}
    </li>
    }
  </DContext.Consumer>
}