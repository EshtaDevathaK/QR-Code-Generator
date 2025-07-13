import { useState } from 'react';

import MenuList from "./menu-list"; //If the current menu item has children (like submenus), we’ll ask MenuList to display them.

import { FaMinus, FaPlus } from "react-icons/fa";

export default function MenuItem( { item } ){
    const [isOpen, setIsOpen] = useState(false); //🟡 We are creating state to track whether this menu is open or not.
   
    function handleToggle(){ //🟡 We are writing a function to flip the open/closed status.
        setIsOpen(!isOpen);
    }
    return(
        <>
        <li>
 <div className="menu-item">     {/* The className="menu-item" helps us style it later using CSS. */}

        <p>{item.label}</p>      {/* Displays the name of the menu item. For example, if item.label = "Profile", you’ll see: */}

{/* 🧠 Check if this item has any children , If yes → Show toggle button (➕ ➖) ,   If no children → Don’t show toggle button */}
  {/* Clicking this icon runs handleToggle() to open/close the menu 
  If isOpen is true → show - icon

If isOpen is false → show + icon*/}
        {item.children && item.children.length > 0 && (
          <span onClick={handleToggle}>
            {isOpen ? <FaMinus color="#fff" size={20} /> : <FaPlus color="#fff" size={20} />}
          </span>
        )}
      </div>

      {item.children && isOpen && (
        <MenuList list={item.children} />
      )}
        </li>
        </>
    )

}