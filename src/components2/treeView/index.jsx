import MenuList from './menu-list';

export default function ({ menus }) {
    return (
        <div>
            <MenuList list={menus} />;
        </div>
    )
}

// “MenuList will receive an array and loop over it.”