// src/components/PersonalizadosID.tsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import Breadcrumbs from "@/components/Breadcrumbs";
import imgVertical from "@/assets/predetermiandasCases/List.png";
import imgHorizontal from "@/assets/predetermiandasCases/horizontal.png";
import PersonalizadosLayout from "@/components/PersonalizadosLayout";
import ProductDetails from "@/components/PersonalizadosID/ProductoDetalles";
import ProductImage from "@/components/PersonalizadosID/ProductoImagen";
import MarcaCelular from "@/components/PersonalizadosID/MarcaCelular";
import ProductInfo from "@/components/PersonalizadosID/ProductHeader";
import PurchaseActions from "@/components/PersonalizadosID/PurchaseActions";
import StepsButtons from "@/components/PersonalizadosID/StepsButtons";
import usePersonalizadoStore from "@/components/PersonalizadosID/usePersonalizadoStore";
import CustomName from "@/components/PersonalizadosID/CustomName";
import Colores from "@/components/PersonalizadosID/Colores";
import PreviewOverlay from "@/components/PersonalizadosID/PreviewOverlay";

const PersonalizadosID: React.FC = () => {
  const location = useLocation();
  const product = usePersonalizadoStore(s => s.product);
  const showMarca = usePersonalizadoStore(s => s.showMarca);
  const step2Active = usePersonalizadoStore(s => s.step2Active);
  const showColors = usePersonalizadoStore(s => s.showColors);
  const setProduct = usePersonalizadoStore(s => s.setProduct);
  const setWindowWidth = usePersonalizadoStore(s => s.setWindowWidth);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    }
    window.scrollTo(0, 0);
  }, [location, setProduct]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowWidth]);

  const breadcrumbItems = [
    { label: "Inicio", link: "/" },
    { label: "Fundas Personalizadas", link: "/personalizadas" },
    { label: product?.title || "Producto" },
  ];

  // Función para capturar y descargar el preview
  const handleDownload = async () => {
    const el = document.getElementById("preview-container");
    if (!el) return;

    // Define aquí tu DPI objetivo y tu tamaño de impresión en pulgadas:
    const targetDPI = 300;                     // lo que te pide la imprenta
    const cssInchesPerPx = 1 / 96;             // 96px == 1" en CSS
    const scale = targetDPI * cssInchesPerPx;  // ≃ 3.125

    const canvas = await html2canvas(el, {
      scale,          // escala el canvas para generar más píxeles
      useCORS: true,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "producto_300dpi.png";
    link.click();
  };

  return (
    <PersonalizadosLayout>
      <div className="mx-auto px-4 py-6 bg-white text-black">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row lg:h-[600px] container mx-auto px-4">

          {/* Columna 1: selector de orientación */}
          <ProductImage
            imgHorizontal={imgHorizontal}
            imgVertical={imgVertical}
          />

          {/* Columna 2: preview */}
          <div className="flex items-center justify-center">
            {product ? (
              // este div es el que capturamos con html2canvas
              <div id="preview-container" className="w-full h-full">
                <PreviewOverlay />
              </div>
            ) : (
              <p className="font-favoritMono font-bold italic">
                No se encontró la imagen del producto.
              </p>
            )}
          </div>

          {/* Columna 3: ajustes y detalles */}
          <div className="flex-1 flex flex-col p-4 py-10 overflow-y-auto font-favoritMono">
            {product ? (
              <>
                <ProductInfo product={product} />

                <StepsButtons />

                {showMarca && <MarcaCelular />}
                {step2Active && <CustomName />}
                {showColors && <Colores />}

                {!(showMarca || step2Active || showColors) && (
                  <>
                    <PurchaseActions product={product} />
                    <ProductDetails />

                    {/* Aquí colocamos el botón de descarga justo debajo de ProductDetails */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Descargar imagen
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="font-favoritMono font-bold italic">
                No se encontró el producto.
              </p>
            )}
          </div>
        </div>
      </div>
    </PersonalizadosLayout>
  );
};

export default PersonalizadosID;
