import React from 'react';
import header from '../assets/Header.png';
import header1 from '../assets/Header1.png';

function Header() {
    return (
        <div>
            {/* Desktop header */}
            <img src={header} alt="header" className="w-full hidden md:block" />
            {/* Mobile header */}
            <img src={header1} alt="header" className="w-full block md:hidden" />
        </div>
    );
}

export default Header;
