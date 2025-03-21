import { Instagram, Facebook } from "lucide-react";
import logo from "../assets/logo.png";
import tarjetas from "../assets/Tarjetas.png";
import andreani from "../assets/Andreani.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-auto">
      {/* Línea blanca superior centrada con ancho limitado */}
      <div className="mx-auto mb-6 w-10/12 border-t border-gray-100"></div>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col space-y-6">
        {/* Sección superior: Marca, Navegación, Redes */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Marca */}
          <div className="text-xl font-bold text-center">
            <picture>
              <img loading="lazy" src={logo} alt="logo" />
            </picture>
          </div>

          {/* Navegación */}
          <nav className="flex space-x-6 text-sm">
            <a href="/" className="hover:text-gray-300 transition-colors">
              Inicio
            </a>
            <a
              href="#productos"
              className="hover:text-gray-300 transition-colors"
            >
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
          <picture>
            <img
              loading="lazy"
              src={tarjetas}
              alt="tarjetas"
              className="w-full max-w-md md:max-w-full"
            />
          </picture>
        </div>

        {/* Sección de envío (Andreani) */}
        <div className="flex justify-center">
          <picture>
            <img loading="lazy" src={andreani} alt="andreani" />
          </picture>
        </div>

        {/* Derechos reservados */}
        <div className="text-center text-xs w-full text-gray-400">
          © 2025 – 99% CASES. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
