// src/components/PersonalizadosID.tsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Breadcrumbs from "@/components/Breadcrumbs";
import PersonalizadosLayout from "@/components/PersonalizadosLayout";
import imgVertical from "@/assets/predetermiandasCases/List.png";
import imgHorizontal from "@/assets/predetermiandasCases/horizontal.png";
import ProductImage from "@/components/PersonalizadosID/ProductoImagen";
import ProductInfo from "@/components/PersonalizadosID/UI/ProductHeader";
import ProductDetails from "@/components/PersonalizadosID/UI/ProductoDetalles";
import MarcaCelular from "@/components/PersonalizadosID/Actions/MarcaCelular";
import CustomName from "@/components/PersonalizadosID/Actions/CustomName";
import Colores from "@/components/PersonalizadosID/Actions/Colores";
import PreviewOverlay from "@/components/PersonalizadosID/PreviewOverlay";
import CaseDesignerSimple from "@/components/PersonalizadosID/CaseDesignerSimple";
import SvgColorEditor from "@/components/PersonalizadosID/SvgColorEditor";
import PurchaseActions from "@/components/PersonalizadosID/PurchaseActions";
import StepsButtons from "@/components/PersonalizadosID/StepsButtons";

import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

import OffscreenTexture from "@/components/PersonalizadosID/UI/OffscreenTexture";
import DownloadTextureButton from "@/components/PersonalizadosID/UI/DownloadTextureButton";

const PersonalizadosID: React.FC = () => {
  const location = useLocation();
  const product = usePersonalizadoStore(s => s.product);
  const showMarca = usePersonalizadoStore(s => s.showMarca);
  const step2Active = usePersonalizadoStore(s => s.step2Active);
  const showColors = usePersonalizadoStore(s => s.showColors);
  const setProduct = usePersonalizadoStore(s => s.setProduct);
  const setWindowWidth = usePersonalizadoStore(s => s.setWindowWidth);

  const isConImagen = product?.tipo === "PERSONALIZADO_CON_IMAGEN";
  const isConCaracteres = product?.tipo === "PERSONALIZADO_CON_CARACTERES";
  const isPersonalizado = product?.tipo === "PERSONALIZADO";

  // ref para el off-screen
  const offscreenRef = useRef<HTMLDivElement>(null);

  // inicializar producto desde router
  useEffect(() => {
    if (location.state?.product) setProduct(location.state.product);
    window.scrollTo(0, 0);
  }, [location.state, setProduct]);

  // trackear resize
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setWindowWidth]);

  const breadcrumbItems = [
    { label: "Inicio", link: "/" },
    { label: "Fundas Personalizadas", link: "/personalizadas" },
    { label: product?.title || "Producto" },
  ];

  return (
    <PersonalizadosLayout>
      <div className="mx-auto bg-white px-4 py-6 text-black">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="container mx-auto flex w-full flex-col px-4 lg:h-[600px] lg:flex-row">
          {/* Columna 1 */}
          <ProductImage imgHorizontal={imgHorizontal} imgVertical={imgVertical} />

          {/* Columna 2: preview on‐screen */}
          <div className="flex items-center justify-center">
            {product ? (
              <div id="preview-container" className="h-full w-full">
                {isConImagen && <CaseDesignerSimple frameUrl={product.imageSrc} />}
                {isConCaracteres && <PreviewOverlay />}
                {isPersonalizado && <SvgColorEditor svgUrl={product.imageSrc} />}
              </div>
            ) : (
              <p className="font-favoritMono font-bold italic">
                No se encontró la imagen del producto.
              </p>
            )}
          </div>

          {/* Columna 3: controles y acciones */}
          <div className="flex flex-1 flex-col overflow-y-auto p-4 py-10 font-favoritMono">
            {product && (
              <>
                <ProductInfo product={product} />
                <StepsButtons />
                {showMarca && <MarcaCelular />}
                {!isConImagen && step2Active && <CustomName />}
                {(isPersonalizado || isConCaracteres) && showColors && <Colores />}

                {/* Acciones finales */}
                {!(showMarca || step2Active || showColors) && (
                  <>
                    <PurchaseActions product={product} offscreenRef={offscreenRef} />
                    <ProductDetails />
                    <div className="mt-6 text-center">
                      <DownloadTextureButton offscreenRef={offscreenRef} />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* OFF‐SCREEN */}
        <OffscreenTexture ref={offscreenRef} />
      </div>
    </PersonalizadosLayout>
  );
};

export default PersonalizadosID;
