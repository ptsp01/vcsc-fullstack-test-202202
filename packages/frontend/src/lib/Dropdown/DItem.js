
import { EMPTY } from "../../constant";
import { DContext } from "./DContext";
import "./style.scss";

export default function DItem({ children, item, isActive, style={}, activeStyle={} }) {

  return <DContext.Consumer>
    {(ctx) => 
      <li className={`item ${isActive ? 'active' : EMPTY}`}
          style={isActive ? {...style, ...activeStyle} : style}
          onClick={() => ctx.onSelect && ctx.onSelect(item) }
        >
        {children}
      </li>
    }
  </DContext.Consumer>
}