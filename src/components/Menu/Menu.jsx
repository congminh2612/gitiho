import React, { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const Menu = ({ icon, items }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    useOnClickOutside(menuRef, () => {
        setMenuOpen(false);
    });

    return (
        <div className="relative" >
            <div className="flex items-center space-x-4 cursor-pointer" onClick={handleMenuToggle}>
                {icon}
            </div>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20" ref={menuRef}>
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-300 w-full text-left"
                            onClick={item.onClick}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
