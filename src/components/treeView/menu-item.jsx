// 🔵 menu-item.jsx — the unit of one menu node
// This is the one row.

// Shows the label

// If it has children, shows + or - icon (toggle)

// If expanded, calls MenuList with its own children (recursive step)

// 1️⃣ Import React's useState hook to store toggle info
import { useState } from "react";

// 2️⃣ Import MenuList — will be used if this item has children
import MenuList from "./menu-list";

// 3️⃣ Import icons for + and - signs
import { FaMinus, FaPlus } from 'react-icons/fa';

// 4️⃣ Create the MenuItem component. It receives one item (like { label: "Profile", children: [...] })
export default function MenuItem({ item }) {

  // 5️⃣ State to track which labels are currently expanded (open)
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  // 6️⃣ Toggle the open/close status of a label (by flipping its boolean value)
  function handleToggleChildren(getCurrentlabel) {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentlabel]: !displayCurrentChildren[getCurrentlabel],
    });
  }

  // 7️⃣ Log the current open/close state in the browser console
  console.log(displayCurrentChildren);

  return (
    // 8️⃣ Start  item = list = menus for the current menu block
    <li>
      {/* 9️⃣ A div that wraps the label and the toggle icon */}
      <div className="menu-item">

        {/* 🔟 Show the label (like "Profile" or "Settings") */}
        <p>{item.label}</p>

        {/* 1️⃣1️⃣ If the item has children, show + or - icon */}
        {item && item.children && item.children.length ? (
          <span onClick={() => handleToggleChildren(item.label)}>
            {
              displayCurrentChildren[item.label]
                ? <FaMinus color="#fff" size={25} />  // 👈 if it's open, show "–"
                : <FaPlus color="#fff" size={25} />   // 👈 if it's closed, show "+"
            }
          </span>
        ) : null}
      </div>
 

      { /* 1️⃣2️⃣ Conditionally rendering children if they exist AND are expanded */}
      {item && item.children && item.children.length > 0 && displayCurrentChildren[item.label] ? (
        <MenuList list={item.children} />
      ) : null }
    </li>
  );
}

// 📌 Keyword: Handles ONE item + expansion logic

// | Code/Concept                                       | What it means / Why it's used                                                  |
// | -------------------------------------------------- | ------------------------------------------------------------------------------ |
// | `useState({})`                                     | Starts with an empty object to track **which menu items are open**             |
// | `displayCurrentChildren[item.label]`               | Checks if the specific item is **open (true)** or **closed (false/undefined)** |
// | `setDisplayCurrentChildren({ ... })`               | Updates the toggle status — keeps old ones, changes only the clicked one       |
// | `item && item.children && item.children.length`    | Checks: “Does this item even have children to expand?”                         |
// | `onClick={() => handleToggleChildren(item.label)}` | Clicking the icon **toggles** only that item’s open state                      |
// | `? <FaMinus /> : <FaPlus />`                       | Shows `-` if open, `+` if closed — **icon switch based on state**              |
// | `{ condition && <Component /> }`                   | Conditional rendering: If `condition` is true, only then render the component  |
