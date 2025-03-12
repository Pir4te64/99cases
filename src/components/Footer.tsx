import { Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.png';
import tarjetas from '../assets/tarjetas.png';
import andreani from '../assets/Andreani.png';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-6 mt-auto">
            {/* Contenedor principal */}
            <div className="max-w-7xl mx-auto px-4 flex flex-col space-y-6">
                {/* Sección superior: Marca, Navegación, Redes */}
                <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    {/* Marca */}
                    <div className="text-xl font-bold text-center">
                        <img src={logo} alt="logo" />
                    </div>

                    {/* Navegación */}
                    <nav className="flex space-x-6 text-sm">
                        <a href="#" className="hover:text-gray-300 transition-colors">
                            Inicio
                        </a>
                        <a href="#" className="hover:text-gray-300 transition-colors">
                            Productos
                        </a>
                    </nav>

                    {/* Redes Sociales */}
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="hover:text-gray-300 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="hover:text-gray-300 transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Sección de métodos de pago */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <img
                        src={tarjetas}
                        alt="tarjetas"
                        className="w-full max-w-md md:max-w-full"
                    />
                </div>


                {/* Sección de envío (Andreani) */}
                <div className="flex justify-center">
                    <img src={andreani} alt="andreani" />
                </div>

                {/* Derechos reservados */}
                <div className="text-center text-xs justify-center items-center w-full text-gray-400">
                    © 2025 – 99% CASES. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
