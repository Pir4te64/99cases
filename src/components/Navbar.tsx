import { useState } from 'react';
import { ShoppingCart, Search, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-black text-white p-5 mx-5 relative">
            {/* Desktop Navbar */}
            <div className="hidden md:flex items-center justify-between">
                {/* Izquierda: Enlaces */}
                <div className="flex items-center space-x-6">
                    <a href="#" className="hover:text-gray-300 transition-colors font-favorit">
                        Inicio
                    </a>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center hover:text-gray-300 transition-colors"
                        >
                            Productos
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {isOpen && (
                            <div className="absolute left-0 mt-2 bg-black text-white rounded py-2 w-64 border border-white">
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-white hover:text-black transition-colors"
                                >
                                    Fundas Predeterminadas
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-white hover:text-black transition-colors"
                                >
                                    Fundas Personalizadas
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Centro: Logo */}
                <div className="text-xl font-bold text-center">
                    <img src={logo} alt="logo" />
                </div>

                {/* Derecha: Íconos */}
                <div className="flex items-center space-x-4">
                    <button className="hover:text-gray-300 transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                    <button className="hover:text-gray-300 transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden flex items-center justify-between">
                {/* Logo a la izquierda, más pequeño */}
                <div className="text-xl font-bold">
                    <img src={logo} alt="logo" className="h-12" />
                </div>

                {/* Íconos a la derecha: hamburguesa, búsqueda y carrito */}
                <div className="flex items-center space-x-4">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <X className="h-6 w-6 text-white" />
                        ) : (
                            <Menu className="h-6 w-6 text-white" />
                        )}
                    </button>
                    <div className="flex space-x-4">
                        <button className="hover:text-gray-300 transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="hover:text-gray-300 transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú de navegación en mobile */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black text-white p-4 flex flex-col space-y-4">
                    <a href="#" className="hover:text-gray-300 transition-colors">
                        Productos
                    </a>
                    <a href="#" className="hover:text-gray-300 transition-colors">
                        Fundas Predeterminadas
                    </a>
                    <a href="#" className="hover:text-gray-300 transition-colors">
                        Fundas Personalizadas
                    </a>
                </div>
            )}
        </nav>
    );
}
