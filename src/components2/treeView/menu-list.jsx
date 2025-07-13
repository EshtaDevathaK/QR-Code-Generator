// ( menu-list.jsx )Parent file which holds link to child file menu-item.jsx

import MenuItem from './menu-item';

export default function MenuList({ list }){
    return (
        <>
        <ul>
            {list.map((item)=> (
                 <MenuList item={item}/>
            ))}
        </ul>
        </>
    );
}