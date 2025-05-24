import { useState, useEffect } from "react";
import { ShoppingCart, Search, ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/99cases.svg";
import { Link, useLocation } from "react-router-dom";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    setMenuOpen(false);
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    useAuthStore.getState().clearToken();
    window.location.href = "/";
  };
  const cartItems = useCartStore((state) => state.cartItems);

  // si quieres mostrar la cantidad de líneas:
  const lineCount = cartItems.length;
  // o si cada item tiene una propiedad quantity y quieres el total:
  const totalCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);
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

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-black p-4 text-white">
        {/* Desktop Navbar */}
        <div className="hidden items-center justify-between md:flex">
          {/* Izquierda: Productos + Sesión */}
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
                    Fundas Predeterminadas
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

          {/* Centro: Logo */}
          <div className="logo text-center text-xl font-bold">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="mx-auto h-12 md:h-16"
                onContextMenu={(e) => e.preventDefault()}
              />
            </Link>
          </div>

          {/* Derecha: Carrito y Búsqueda */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative transition-colors hover:text-gray-300"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCount >= 0 && (
                <span className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {totalCount}
                </span>
              )}
            </button>
            <button className="transition-colors hover:text-gray-300">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex items-center justify-between md:hidden">
          <Link to="/">
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
              {lineCount >= 0 && (
                <span className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {lineCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Menú de navegación en Mobile */}
        {menuOpen && (
          <div className="absolute left-0 top-full z-10 flex w-full flex-col space-y-4 bg-black p-4 text-white md:hidden">
            <Link
              to="/predeterminadas"
              className="transition-colors hover:text-gray-300"
            >
              Fundas Predeterminadas
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
