// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/99cases.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const location = useLocation();
  const navigate = useNavigate();

  // Contador de items en carrito
  const lineCount = cartItems.length;
  // Detectar login
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    useAuthStore.getState().clearToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  // Scroll to top si ya estamos en "/"
  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {bannerOpen && (
        <div className="relative flex items-center justify-center bg-red-600 px-4 py-2 text-white">
          <p className="font-favoritMono text-sm italic">
            ENVÍO GRATIS A PARTIR DE $100.000
          </p>
          <button
            onClick={() => setBannerOpen(false)}
            className="absolute right-4"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-black p-4 text-white">
        {/* Desktop */}
        <div className="hidden items-center justify-between md:flex">
          {/* Productos + Sesión */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center transition-colors hover:text-gray-300"
              >
                Productos
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isOpen && (
                <div className="absolute left-0 z-10 mt-2 w-64 rounded border border-white bg-black py-2 text-white">
                  <Link
                    to="/predeterminadas"
                    className="block px-4 py-2 transition-colors hover:bg-white hover:text-black"
                  >
                    Fundas Exclusivas
                  </Link>
                  <Link
                    to="/personalizadas"
                    className="block px-4 py-2 transition-colors hover:bg-white hover:text-black"
                  >
                    Fundas Personalizadas
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 transition-colors hover:bg-white hover:text-black"
                  >
                    Calcos
                  </Link>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="transition-colors hover:text-gray-300"
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="transition-colors hover:text-gray-300"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="transition-colors hover:text-gray-300"
                >
                  Iniciar Sesión
                </Link>
              </>
            )}
          </div>

          {/* Logo */}
          <div className="logo text-center text-xl font-bold">
            <Link to="/" onClick={handleLogoClick}>
              <img
                src={logo}
                alt="logo"
                className="mx-auto h-12 md:h-16"
                onContextMenu={(e) => e.preventDefault()}
              />
            </Link>
          </div>

          {/* Carrito + Búsqueda */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative transition-colors hover:text-gray-300"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {lineCount}
              </span>
            </button>
            <button className="transition-colors hover:text-gray-300">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between md:hidden">
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="logo"
              className="h-12"
              onContextMenu={(e) => e.preventDefault()}
            />
          </Link>

          <div className="flex items-center space-x-4">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
            <button className="transition-colors hover:text-gray-300">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleCart}
              className="relative transition-colors hover:text-gray-300"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {lineCount}
              </span>
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        {menuOpen && (
          <div className="absolute left-0 top-full z-10 flex w-full flex-col space-y-4 bg-black p-4 text-white md:hidden">
            <Link
              to="/predeterminadas"
              className="transition-colors hover:text-gray-300"
            >
              Fundas Exclusivas
            </Link>
            <Link
              to="/personalizadas"
              className="transition-colors hover:text-gray-300"
            >
              Fundas Personalizadas
            </Link>
            <Link to="/" className="transition-colors hover:text-gray-300">
              Calcos
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-left transition-colors hover:text-gray-300"
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="transition-colors hover:text-gray-300"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="transition-colors hover:text-gray-300"
                >
                  Iniciar Sesión
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
