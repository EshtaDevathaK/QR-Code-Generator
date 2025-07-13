import MenuList from "./menu-list";
import './styles.css'

// We have define menus as list in TreeView
export default function TreeView({ menus = [] }) {
  return (
    <div className="tree-view-container">
      <MenuList list={menus} />
    </div>
  );
}

// 💥 Trick:
// TreeView() is the root-level component here.

// It starts the rendering.

// It receives the original menus prop.

// 👉 This means:
// TreeView = Top-most Parent.
// The flow starts here.


// 🟢 TreeView (index.jsx)
//     ⬇ passes `menus` as `list`
// 🟣 MenuList (menu-list.jsx)
//     ⬇ maps over `list` and passes each `item`
// 🔵 MenuItem (menu-item.jsx)

// | File            | Component  | Receives Prop     | Passes Down                    |
// | --------------- | ---------- | ----------------- | ------------------------------ |
// | `index.jsx`     | `TreeView` | `menus`           | ➡ `list` → MenuList            |
// | `menu-list.jsx` | `MenuList` | `list = menus`    | ➡ `item` → MenuItem            |
// | `menu-item.jsx` | `MenuItem` | `item = listItem` | Uses for rendering / recursion |



// ✅ Your Smart Observation:
// You said:

// “MenuList and MenuItem import each other. TreeView is not imported anywhere — only TreeView imports others.”

// 👇 Let’s rephrase this in logical terms:

// | File                   | Who it imports     | Who imports it          | Conclusion         |
// | ---------------------- | ------------------ | ----------------------- | ------------------ |
// | `menu-item`            | imports → MenuList | imported by MenuList    | 🧩 middle-child    |
// | `menu-list`            | imports → MenuItem | imported by TreeView    | 🧩 middle-child    |
// | `TreeView` (index.jsx) | imports → MenuList | ❌ not imported anywhere | 🏠 ROOT / PARENT ✅ |
