import React from 'react';
import headerDesktop from '../assets/Header.png';
import headerMobile from '../assets/Header1.png';

function Header() {
  return (
    <picture>
      {/* Imagen para dispositivos de escritorio */}
      <source media="(min-width: 768px)" srcSet={headerDesktop} />
      {/* Imagen para dispositivos móviles */}
      <source media="(max-width: 767px)" srcSet={headerMobile} />
      {/* Fallback: se usará la imagen de escritorio */}
      <img loading="lazy" src={headerDesktop} alt="header" className="w-full" />
    </picture>
  );
}

export default Header;
