// src/components/PersonalizadosID.tsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";

import Breadcrumbs from "@/components/Breadcrumbs";
import PersonalizadosLayout from "@/components/PersonalizadosLayout";

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
import { customNameStyles, customNumberStyles } from "@/utils/textStyles";

import imgVertical from "@/assets/predetermiandasCases/List.png";   // textura para preview on‐screen
import imgFinal from "@/assets/predetermiandasCases/fondo.svg";  // textura para descarga
import imgHorizontal from "@/assets/predetermiandasCases/horizontal.png";

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

  // ref al div off‐screen para descarga
  const downloadRef = useRef<HTMLDivElement>(null);

  // 1) Leer tamaño real del SVG
  const [imgSize, setImgSize] = useState({ width: 600, height: 600 });
  useEffect(() => {
    fetch(imgFinal)
      .then(r => r.text())
      .then(svgText => {
        const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const svgEl = doc.querySelector("svg");
        if (!svgEl) return;
        let w = 0, h = 0;
        const vb = svgEl.getAttribute("viewBox");
        if (vb) {
          const [, , ww, hh] = vb.split(/\s+|,/).map(Number);
          w = ww; h = hh;
        } else {
          w = parseFloat(svgEl.getAttribute("width") || "0");
          h = parseFloat(svgEl.getAttribute("height") || "0");
        }
        if (w && h) setImgSize({ width: w, height: h });
      })
      .catch(console.error);
  }, []);

  // cargar producto desde router
  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    }
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

  // descargar solo textura + texto
  const handleDownloadTextura = async () => {
    if (!downloadRef.current) return;
    const canvas = await html2canvas(downloadRef.current, {
      useCORS: true,
      backgroundColor: null,
      width: imgSize.width,
      height: imgSize.height,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "textura_texto.png";
    link.click();
  };

  // datos del overlay de texto
  const userName = usePersonalizadoStore(s => s.userName);
  const userNumber = usePersonalizadoStore(s => s.userNumber);
  const selectedColors = usePersonalizadoStore(s => s.selectedColors);
  const selectedNameStyle = usePersonalizadoStore(s => s.selectedNameStyle);
  const selectedNumberStyle = usePersonalizadoStore(s => s.selectedNumberStyle);

  const [
    nFill, nBorder, nBorder2,
    numFill, numBorder, numBorder2
  ] = [
      selectedColors[0] || "#ffffff",
      selectedColors[1] || "transparent",
      selectedColors[2] || "transparent",
      selectedColors[3] || "#ffffff",
      selectedColors[4] || "transparent",
      selectedColors[5] || "transparent",
    ];

  const makeShadow = (color: string, off = 2) =>
    color === "transparent"
      ? "none"
      : [
        `${-off}px ${-off}px ${color}`,
        `${off}px ${-off}px ${color}`,
        `${-off}px ${off}px ${color}`,
        `${off}px ${off}px ${color}`
      ].join(",");

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

          {/* Columna 3: controles y descarga */}
          <div className="flex flex-1 flex-col overflow-y-auto p-4 py-10 font-favoritMono">
            {product &&
              <>
                <ProductInfo product={product} />
                <StepsButtons />
                {showMarca && <MarcaCelular />}
                {!isConImagen && step2Active && <CustomName />}
                {(isPersonalizado || isConCaracteres) && showColors && <Colores />}

                {/* Botón de descarga */}
                {!(showMarca || step2Active || showColors) && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={handleDownloadTextura}
                      className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                    >
                      Descargar textura + texto
                    </button>
                  </div>
                )}
              </>
            }
          </div>
        </div>

        {/* OFF‐SCREEN: textura + texto centrado, con tamaño real SVG */}
        <div
          ref={downloadRef}
          style={{
            position: "absolute",
            top: -9999,
            left: -9999,
            width: imgSize.width,
            height: imgSize.height,
            backgroundImage: `url(${imgFinal})`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        >
          {isConCaracteres && (
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              {/* número arriba, todavía más grande */}
              <span
                style={{
                  color: numFill,
                  WebkitTextStroke: `1px ${numBorder}`,
                  textShadow: makeShadow(numBorder2, 2),
                }}
                className={`text-[14rem] sm:text-[18rem] text-center font-bold ${selectedNumberStyle != null
                  ? `font-${customNumberStyles[selectedNumberStyle]}`
                  : "font-cmxShift2"
                  }`}
              >
                {userNumber || "15"}
              </span>
              {/* nombre abajo */}
              <span
                style={{
                  color: nFill,
                  WebkitTextStroke: `1px ${nBorder}`,
                  textShadow: makeShadow(nBorder2, 2),
                }}
                className={` text-8xl  text-center font-bold ${selectedNameStyle != null
                  ? `font-${customNameStyles[selectedNameStyle]}`
                  : "font-cmxShift2"
                  }`}
              >
                {userName || "TU NOMBRE"}
              </span>
            </div>
          )}
        </div>
      </div>
    </PersonalizadosLayout>
  );
};

export default PersonalizadosID;
