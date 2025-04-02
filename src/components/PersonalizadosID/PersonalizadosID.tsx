import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import imgVertical from "../../assets/predetermiandasCases/List.png";
import imgHorizontal from "../../assets/predetermiandasCases/horizontal.png";
import PersonalizadosLayout from "../PersonalizadosLayout";
import ProductDetails from "./ProductoDetalles";
import ProductImage from "./ProductoImagen";
import MarcaCelular from "./MarcaCelular";
import ProductInfo from "./ProductHeader";
import PurchaseActions from "./PurchaseActions";
import StepsButtons from "./StepsButtons";
import usePersonalizadoStore from "./usePersonalizadoStore";
import CustomName from "./CustomName";
import Colores from "./Colores";

const PersonalizadosID = () => {
  const location = useLocation();

  const product = usePersonalizadoStore((state: any) => state.product);
  const showMarca = usePersonalizadoStore((state: any) => state.showMarca);
  const step2Active = usePersonalizadoStore((state: any) => state.step2Active);
  const showColors = usePersonalizadoStore((state: any) => state.showColors);
  const setProduct = usePersonalizadoStore((state: any) => state.setProduct);
  const setWindowWidth = usePersonalizadoStore(
    (state: any) => state.setWindowWidth
  );

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

  return (
    <PersonalizadosLayout>
      <div className='mx-auto px-4 py-6 bg-white text-black'>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='flex flex-col lg:flex-row lg:h-[600px] container mx-auto px-4'>
          <ProductImage
            imgHorizontal={imgHorizontal}
            imgVertical={imgVertical}
          />

          <div className='flex items-center justify-center'>
            {product ? (
              <img
                src={product.imageSrc}
                alt={product.title}
                className='max-h-full object-contain'
              />
            ) : (
              <p className='font-favoritMono font-bold italic'>
                No se encontró la imagen del producto.
              </p>
            )}
          </div>

          {/* Columna 3 */}
          <div className='flex-1 flex flex-col p-4 py-10 overflow-y-auto font-favoritMono'>
            {product ? (
              <>
                <ProductInfo product={product} />

                {/* Botones de pasos */}
                <StepsButtons />

                {showMarca && <MarcaCelular />}
                {step2Active && <CustomName />}
                {showColors && <Colores />}
                {!(showMarca || step2Active || showColors) && (
                  <>
                    <PurchaseActions />
                    <ProductDetails />
                  </>
                )}
              </>
            ) : (
              <p className='font-favoritMono font-bold italic'>
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
