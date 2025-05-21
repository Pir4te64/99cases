// src/components/PersonalizadosID.tsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Breadcrumbs from "@/components/UI/Breadcrumbs";
import PersonalizadosLayout from "@/components/ProductsID/PersonalizadosLayout";
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
  const product = usePersonalizadoStore((s) => s.product);
  const showMarca = usePersonalizadoStore((s) => s.showMarca);
  const step2Active = usePersonalizadoStore((s) => s.step2Active);
  const showColors = usePersonalizadoStore((s) => s.showColors);
  const setProduct = usePersonalizadoStore((s) => s.setProduct);
  const setWindowWidth = usePersonalizadoStore((s) => s.setWindowWidth);

  const isConImagen = product?.tipo === "PERSONALIZADO_CON_IMAGEN";
  const isConCaracteres = product?.tipo === "PERSONALIZADO_CON_CARACTERES";
  const isPersonalizado = product?.tipo === "PERSONALIZADO";

  const offscreenRef = useRef<HTMLDivElement>(null);

  /* ---------- efectos ---------- */

  useEffect(() => {
    if (location.state?.product) setProduct(location.state.product);
    window.scrollTo(0, 0);
  }, [location.state, setProduct]);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setWindowWidth]);

  /* ---------- breadcrumbs ---------- */

  const breadcrumbItems = [
    { label: "Inicio", link: "/" },
    { label: "Fundas Personalizadas", link: "/personalizadas" },
    { label: product?.title || "Producto" },
  ];

  /* ---------- render ---------- */

  return (
    <PersonalizadosLayout>
      <div className="mx-auto bg-white px-4 py-6 text-black">
        <Breadcrumbs items={breadcrumbItems} />

        {/* GRID PRINCIPAL */}
        <div className="flex w-full flex-col gap-8 px-4 lg:flex-row lg:items-start">
          {/* ─────────── Columna 1 (angosta) ─────────── */}
          <div className="flex-shrink-0 lg:w-[20%] lg:pr-4">
            <div className="lg:sticky lg:top-24">
              <ProductImage
                imgHorizontal={imgHorizontal}
                imgVertical={imgVertical}
              />
            </div>
          </div>

          {/* ─────────── Columna 2 (pequeña) ─────────── */}
          <div className="flex-shrink-0 lg:w-[30%] lg:px-4">
            <div className="flex justify-start lg:sticky lg:top-24">
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
          </div>

          {/* ─────────── Columna 3 (muy ancha) ─────────── */}
          <div className="flex-1 space-y-4 overflow-y-auto py-10 font-favoritMono lg:w-[50%]">
            {product && <ProductInfo product={product} />}

            {product && (
              <>
                <StepsButtons />

                <MarcaCelular />

                <CustomName />

                <Colores />

                <>
                  <PurchaseActions product={product!} offscreenRef={offscreenRef} />
                  <ProductDetails />
                </>
              </>
            )}
          </div>
        </div>

        {/* Textura off-screen */}
        <OffscreenTexture ref={offscreenRef} />
      </div>
    </PersonalizadosLayout>
  );
};

export default PersonalizadosID;
