
import { EMPTY } from "../../constant";
import { DContext } from "./DContext";
import "./style.scss";

export default function DItem({ children, value, isActive }) {

  return <DContext.Consumer>
    {(ctx) => 
        <li className={`item ${isActive ? 'active' : EMPTY}`} 
          onClick={() => ctx.onSelect && ctx.onSelect(value) }
        >
        {children}
      </li>
    }
  </DContext.Consumer>
}