import { useEffect, useRef, useState } from "react";
import "./dropdown.scss";

export interface Item {
  label: string;
  id: string;
  value: string;
}

export function Dropdown({
  title,
  items,
  multiSelect = false,
}: {
  title: string;
  items: Item[];
  multiSelect?: boolean;
}) {
  const ref = useRef();

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<Item[]>([]);
  const toggle = () => setOpen(!open);

  useOnClickOutside(ref, () => setOpen(false));

  function handleOnClick(item: Item) {
    if (!selection.some((current) => current.value === item.value)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.value !== item.value
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  return (
    <div className="dropdown" ref={ref as any}>
      <div
        tabIndex={0}
        className="dropdown-header"
        role="button"
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        <div className="dropdown-header__title">
          <p className="dropdown-header__title--bold">{title}</p>
        </div>
      </div>
      {open && (
        <ul className="dropdown-list">
          {items.map((item) => (
            <li className="dropdown-list-item" key={item.value}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
