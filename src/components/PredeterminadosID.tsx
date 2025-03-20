import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import imgVertical from "../assets/predetermiandasCases/List.png";
import imgHorizontal from "../assets/predetermiandasCases/horizontal.png";
import tarjetas from "../assets/predetermiandasCases/tarjetas.png";
import { Minus, Plus } from "lucide-react";
import ProductDetailLayout from "./PredeterminadoLayout";
import PredeterminadoLayout from "./PredeterminadoLayout";

const PredeterminadosID = () => {
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const product = location.state?.product;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.scrollTo(0, 0); // Esto hace que al cargar siempre se vea desde arriba
  }, [location]);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrement = () => setQuantity(quantity + 1);

  // Items del breadcrumb
  const breadcrumbItems = [
    { label: "Inicio", link: "/" },
    { label: "Fundas Predeterminadas", link: "/predeterminadas" },
    { label: product?.title || "Producto" },
  ];

  return (
    <PredeterminadoLayout>
      <div className="mx-auto px-4 py-6 bg-white text-black">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row lg:h-[600px] container mx-auto">
          {/* Columna 1 */}
          <div className="flex-none flex items-center justify-center">
            <img
              src={windowWidth < 1024 ? imgHorizontal : imgVertical}
              alt="Imagen del producto"
              className="max-h-full object-contain"
            />
          </div>

          {/* Columna 2 */}
          <div className="flex items-center justify-center">
            {product ? (
              <img
                src={product.imageSrc}
                alt={product.title}
                className="max-h-full object-contain"
              />
            ) : (
              <p>No se encontró la imagen del producto.</p>
            )}
          </div>

          {/* Columna 3 */}
          <div className="flex-1 flex flex-col p-4 overflow-y-auto font-favoritMono">
            {product ? (
              <>
                <h1 className="text-4xl md:text-7xl font-bold mb-2 w-full">
                  {product.title}
                </h1>
                <p className="text-lg text-red-600 font-semibold mb-2">
                  {product.price}{" "}
                  {product.oldPrice && (
                    <span className="line-through text-gray-500 ml-2">
                      {product.oldPrice}
                    </span>
                  )}
                </p>
                <p className="text-red-600 mb-2">
                  {product.cantidadesVendidos} VENDIDOS EN LAS ÚLTIMAS HORAS
                </p>

                {/* Contador */}
                <div className="flex items-center mb-4 w-full space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDecrement}
                      className="border border-gray-400 px-2 py-1 rounded hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      onClick={handleIncrement}
                      className="border border-gray-400 px-2 py-1 rounded hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    Agregar al Carrito
                  </button>
                </div>

                {/* Comprar ahora */}
                <button className="border border-black text-black px-4 py-2 rounded mb-4 hover:bg-black hover:text-white transition-colors">
                  Comprar Ahora
                </button>

                {/* Imagen de tarjetas */}
                <div className="flex justify-center items-center my-4">
                  <img
                    src={tarjetas}
                    alt="Tarjetas de pago"
                    className="max-w-full"
                  />
                </div>

                {/* Detalles */}
                <details className="mb-4">
                  <summary className="cursor-pointer font-bold mb-2">
                    Descripción del producto
                  </summary>
                  <p className="mb-2">
                    Nuestras fundas combinan diseño único y materiales premium:
                  </p>
                  <ul className="mb-2 list-disc list-inside">
                    <li>Parte trasera de aluminio.</li>
                    <li>Bordes de silicona reforzada.</li>
                    <li>Agarre antideslizante.</li>
                    <li>No se rayan</li>
                    <li>No se despintan</li>
                  </ul>
                </details>
                <details className="mb-4">
                  <summary className="cursor-pointer font-bold mb-2">
                    Información del envío
                  </summary>
                  <p className="mb-2">
                    🏭 Tiempo de producción: 1-3 días hábiles
                  </p>
                  <p className="mb-2">
                    ✈️ Tiempo de envío: Nuestros productos se fabrican y envían
                    desde nuestra oficina en Santa Fe (Arg) y la entrega demora
                    entre 1 y 5 días.
                  </p>
                </details>
              </>
            ) : (
              <p>No se encontró el producto.</p>
            )}
          </div>
        </div>
      </div>
    </PredeterminadoLayout>
  );
};

export default PredeterminadosID;
