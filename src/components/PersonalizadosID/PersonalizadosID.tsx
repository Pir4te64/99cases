// src/components/PersonalizadosID.tsx

import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Breadcrumbs from "@/components/UI/Breadcrumbs";
import PersonalizadosLayout from "@/components/ProductsID/PersonalizadosLayout";
import ProductInfo from "@/components/PersonalizadosID/UI/ProductHeader";
import ProductDetails from "@/components/PersonalizadosID/UI/ProductoDetalles";
import MarcaCelular from "@/components/PersonalizadosID/Actions/MarcaCelular";
import CustomName from "@/components/PersonalizadosID/Actions/CustomName";
import Colores from "@/components/PersonalizadosID/Actions/Colores";
import CaseTextoNumero from "@/components/PersonalizadosID/CaseTextoNumero";
import CaseTuFoto from "@/components/PersonalizadosID/CaseDesignerSimple";
import PurchaseActions from "@/components/PersonalizadosID/PurchaseActions";
import StepsButtons from "@/components/PersonalizadosID/StepsButtons";

import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";
import FileUploader from "@/components/PersonalizadosID/Actions/FileUploader";
import Features from "@/components/Features";
import premiumCase from "@/assets/marcas/premiumcase.svg";

const PersonalizadosID: React.FC = () => {
  const location = useLocation();
  const product = usePersonalizadoStore((s) => s.product);
  const setProduct = usePersonalizadoStore((s) => s.setProduct);
  const setWindowWidth = usePersonalizadoStore((s) => s.setWindowWidth);
  const activeStep = usePersonalizadoStore((s) => s.activeStep);
  const isConImagen = product?.tipo === "PERSONALIZADO_CON_IMAGEN";
  const isConCaracteres = product?.description === "PERSONALIZADO_CON_CARACTERES_DOWN";

  const previewRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (location.state?.product) setProduct(location.state.product);
    window.scrollTo(0, 0);
  }, [location.state, setProduct]);

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
      <div className="mx-auto bg-white px-0 py-6 text-black md:px-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="relative flex h-[calc(100vh-64px)] w-full flex-col gap-8 lg:flex-row lg:items-start">
          {/* Columna 1 */}
          <div className="hidden lg:block lg:w-1/12">
            <Features />
          </div>

          {/* Columna 2: preview */}
          <div className="absolute left-0 top-0 z-10 w-full bg-white px-0 lg:relative lg:z-0 lg:w-[30%] lg:flex-shrink-0 lg:px-4">
            <div className="flex justify-start lg:sticky lg:top-24">
              {product ? (
                <div
                  id="preview-container"
                  ref={previewRef}
                  className="relative mx-auto h-full w-full max-w-[200px] lg:max-w-none"
                >
                  {isConImagen && (
                    <>
                      <CaseTuFoto frameUrl={product.imageSrc} />
                      {/* Banner "Premium Case" superpuesto solo en mobile */}
                      <img
                        src={premiumCase}
                        alt="Premium Case"
                        onContextMenu={(e) => e.preventDefault()}
                        className="pointer-events-none absolute -bottom-0 -right-28 z-10 block w-20 sm:hidden"
                      />
                      {/* Banner "Premium Case" superpuesto solo en desktop */}
                      <img
                        src={premiumCase}
                        alt="Premium Case"
                        onContextMenu={(e) => e.preventDefault()}
                        className="pointer-events-none absolute bottom-0 right-0 z-10 hidden w-28 sm:block sm:scale-100"
                      />
                    </>
                  )}
                  {isConCaracteres && <CaseTextoNumero ref={textOverlayRef} />}
                </div>
              ) : (
                <p className="font-favoritMono font-bold italic">
                  No se encontró la imagen del producto.
                </p>
              )}
            </div>
          </div>

          {/* Columna 3: detalles y acciones */}
          <div className="mt-[280px] h-[calc(100vh-64px)] flex-1 space-y-4 overflow-y-auto px-2 py-4 font-favoritMono scrollbar-hide lg:mt-0 lg:w-[50%] lg:px-4 lg:py-10">
            {product && <ProductInfo product={product} />}

            {product && (
              <>
                <StepsButtons />

                {/* Renderizado condicional basado en activeStep */}
                {activeStep === 1 && <MarcaCelular />}

                {activeStep === 2 && !isConImagen && <CustomName />}

                {activeStep === 3 && !isConImagen && <Colores />}

                {isConImagen && activeStep === 1 && (
                  <div className="md:col-span-3">
                    <FileUploader />
                  </div>
                )}

                {/* Siempre visibles: */}
                <PurchaseActions
                  product={{
                    id: product.id,
                    title: product.title,
                    imageSrc: product.imageSrc,
                    price: product.price,
                    tipo: product.tipo,
                    imageFinal: product.imageFinal,
                  }}
                  previewRef={isConCaracteres ? textOverlayRef : previewRef}
                />
                <ProductDetails />
              </>
            )}
          </div>
        </div>
      </div>
    </PersonalizadosLayout>
  );
};

export default PersonalizadosID;