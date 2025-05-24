import { FaYoutube, FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";
import logo from "@/assets/99cases.svg";
import tarjetas from "@/assets/Tarjetas.png";
import andreani from "@/assets/Andreani.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto bg-black py-6 text-white">
      {/* Línea blanca superior centrada con ancho limitado */}
      <div className="mx-auto mb-6 w-10/12 border-t border-gray-100"></div>

      {/* Contenedor principal */}
      <div className="mx-auto flex max-w-7xl flex-col space-y-8 px-4 md:space-y-6">
        {/* Sección superior: Marca, Navegación, Redes */}
        <div className="flex flex-col items-center space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Marca */}
          <div className="text-center text-xl font-bold">
            <Link to="/">
              <picture>
                <img
                  loading="lazy"
                  src={logo}
                  alt="Logo de la marca 99% Cases"
                  className="h-20 w-20"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </picture>
            </Link>
          </div>

          {/* Navegación */}
          <nav className="flex space-x-6 text-sm">
            <a href="/" className="font-favoritExpanded transition-colors hover:text-gray-300">
              Inicio
            </a>
          </nav>

          {/* Redes Sociales */}
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/99cases_"
              className="transition-colors hover:text-gray-300"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/people/99-Cases/61573962440115/?mibextid=wwXIfr&rdid=yLj4G83UERq0v6Yq&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ANEgfNEZv%2F%3Fmibextid%3DwwXIfr"
              className="transition-colors hover:text-gray-300"
              aria-label="Facebook"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@99cases_"
              className="transition-colors hover:text-gray-300"
              aria-label="TikTok"
              title="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@99cases_1"
              className="transition-colors hover:text-gray-300"
              aria-label="YouTube"
              title="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Sección de métodos de pago */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <picture>
            <img
              loading="lazy"
              src={tarjetas}
              alt="Métodos de pago aceptados"
              className="max-w-md md:max-w-full"
              onContextMenu={(e) => e.preventDefault()}
            />
          </picture>
        </div>

        {/* Sección de envío (Andreani) */}
        <div className="flex justify-center">
          <picture>
            <img
              loading="lazy"
              src={andreani}
              alt="Logística con Andreani"
              onContextMenu={(e) => e.preventDefault()}
            />
          </picture>
        </div>

        {/* Derechos reservados */}
        <div className="w-full text-center font-favoritExpanded text-xs text-gray-200">
          © 2025 – 99% CASES. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
