import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import imgVertical from "../../assets/predetermiandasCases/List.png";
import imgHorizontal from "../../assets/predetermiandasCases/horizontal.png";
import tarjetas from "../../assets/predetermiandasCases/tarjetas.png";
import { Minus, Plus } from "lucide-react";
import PersonalizadosLayout from "../PersonalizadosLayout";
import ProductDetails from "./ProductoDetalles";
import ProductImage from "./ProductoImagen";
import MarcaCelular from "./MarcaCelular";

const PersonalizadosID = () => {
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
    { label: "Fundas Personalizadas", link: "/personalizadas" },
    { label: product?.title || "Producto" },
  ];
  console.log(product);

  return (
    <PersonalizadosLayout>
      <div className="mx-auto px-4 py-6 bg-white text-black">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row lg:h-[600px] container mx-auto">
          {/* Columna 1 */}
          <ProductImage
            windowWidth={windowWidth}
            imgHorizontal={imgHorizontal}
            imgVertical={imgVertical}
          />

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

                {/* Botones de pasos */}
                <div className="flex items-center gap-2 mb-4">
                  {/* Paso 1 (activo) */}
                  <button className="flex items-center bg-red-500 text-white border border-black p-3 rounded-md tracking-widest text-5xl font-normal uppercase font-dharmaGothic hover:bg-red-600 transition-colors">
                    <span className="mr-2 text-4xl px-5 py-2 text-white bg-black rounded-md font-dharmaGothic">
                      1
                    </span>
                    Elegir Modelo
                  </button>

                  {/* Paso 2 (2 líneas) */}
                  <button className="flex items-center bg-transparent text-black border border-black p-3 rounded-md tracking-widest text-5xl font-normal uppercase font-dharmaGothic hover:bg-red-500 hover:text-white transition-colors">
                    <span className="mr-2 text-4xl px-5 py-2 text-white bg-black rounded-md font-dharmaGothic">
                      2
                    </span>
                    {/* Aquí el br para la segunda línea */}
                    Nombre, Número
                    <br />y Tipografía
                  </button>

                  {/* Paso 3 */}
                  <button className="flex items-center bg-transparent text-black border border-black p-3 rounded-md tracking-widest text-5xl font-normal uppercase font-dharmaGothic hover:bg-red-500 hover:text-white transition-colors">
                    <span className="mr-2 text-4xl px-5 py-2 text-white bg-black rounded-md font-dharmaGothic">
                      3
                    </span>
                    Colores
                  </button>
                </div>

                {/* Marcas de celular */}
                <MarcaCelular />
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
                <ProductDetails />
              </>
            ) : (
              <p>No se encontró el producto.</p>
            )}
          </div>
        </div>
      </div>
    </PersonalizadosLayout>
  );
};

export default PersonalizadosID;
