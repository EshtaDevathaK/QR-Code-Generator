// 🟣 menu-list.jsx — the list of items
// It just loops over the array and renders a MenuItem for each.

// Like:

// <ul>
//   <MenuItem item={...} />
//   <MenuItem item={...} />
// </ul>
// 📌 Keyword: Loops over many items, no toggle logic


// 1️⃣ *** We have define menus as list in TreeView

// Import the MenuItem component 
import MenuItem from "./menu-item";

// 2️⃣ Define the MenuList component
// The list prop receives the value of the menus array.
// This value is passed from the TreeView component via <MenuList list={menus} />.'
export default function MenuList({ list = [] }) {
  return (
    // 3️⃣ Create an unordered list to hold all menu items visually
    <ul className="menu-list-container">

      {/* 4️⃣ If the list(nothing but the menus later defined as listItem) has items, map through each one and render a MenuItem */}
      { list && list.length
        ? list.map((listItem) => <MenuItem item={listItem} />)
        : null }
    </ul>
    );
}

// | Code                                                   | What It Means                                               |
// | ------------------------------------------------------ | ----------------------------------------------------------- |
// | `import MenuItem from "./menu-item"`                   | Pulls in the component that will handle one menu block      |
// | `function MenuList({ list = [] })`                     | A component that receives an array (list of menu items)     |
// | `<ul className="menu-list-container">`                 | Renders a container to visually list all items              |
// | `list && list.length ?`                                | If the list is not empty, then continue                     |
// | `list.map((listItem) => <MenuItem item={listItem} />)` | Loop through every item in the list and send it to MenuItem |
// | `: null`                                               | If there are no items, render nothing                       |


// list = menus = [{ label: "Home" }, { label: "About", children: [...] }, ...]