import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import Breadcrumbs from "@/components/Breadcrumbs";
import imgVertical from "@/assets/predetermiandasCases/List.png";
import imgHorizontal from "@/assets/predetermiandasCases/horizontal.png";
import PersonalizadosLayout from "@/components/PersonalizadosLayout";
import ProductDetails from "@/components/PersonalizadosID/ProductoDetalles";
import ProductImage from "@/components/PersonalizadosID/ProductoImagen";
import MarcaCelular from "@/components/PersonalizadosID/Actions/MarcaCelular";
import ProductInfo from "@/components/PersonalizadosID/ProductHeader";
import PurchaseActions from "@/components/PersonalizadosID/PurchaseActions";
import StepsButtons from "@/components/PersonalizadosID/StepsButtons";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import CustomName from "@/components/PersonalizadosID/Actions/CustomName";
import Colores from "@/components/PersonalizadosID/Actions/Colores";
import PreviewOverlay from "@/components/PersonalizadosID/PreviewOverlay";
import DynamicCaseDesigner from "./DynamicCaseDesigner";
import CaseDesignerSimple from "./DynamicCaseDesigner";

const PersonalizadosID: React.FC = () => {
  const location = useLocation();
  const product = usePersonalizadoStore((s) => s.product);
  const showMarca = usePersonalizadoStore((s) => s.showMarca);
  const step2Active = usePersonalizadoStore((s) => s.step2Active);
  const showColors = usePersonalizadoStore((s) => s.showColors);
  const setProduct = usePersonalizadoStore((s) => s.setProduct);
  const setWindowWidth = usePersonalizadoStore((s) => s.setWindowWidth);
  console.log(product);
  
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

  // Captura y descarga del preview en 300 DPI
  const handleDownload = async () => {
    const el = document.getElementById("preview-container");
    if (!el) return;

    const targetDPI = 300;
    const cssInchesPerPx = 1 / 96;
    const scale = targetDPI * cssInchesPerPx;

    const canvas = await html2canvas(el, {
      scale,
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
      <div className="mx-auto bg-white px-4 py-6 text-black">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="container mx-auto flex flex-col px-4 lg:h-[600px] lg:flex-row">
          {/* Columna 1: selector de orientación */}
          <ProductImage imgHorizontal={imgHorizontal} imgVertical={imgVertical} />

          {/* Columna 2: preview */}
          <div className="flex items-center justify-center">
            {product ? (
              <div id="preview-container" className="h-full w-full">
               <CaseDesignerSimple frameUrl={product.imageSrc} />
              </div>
            ) : (
              <p className="font-favoritMono font-bold italic">
                No se encontró la imagen del producto.
              </p>
            )}
          </div>

          {/* Columna 3: ajustes y detalles */}
          <div className="flex flex-1 flex-col overflow-y-auto p-4 py-10 font-favoritMono">
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

                    {/* Botón de descarga */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={handleDownload}
                        className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
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
