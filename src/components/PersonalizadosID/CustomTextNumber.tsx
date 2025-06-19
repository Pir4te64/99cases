import { customNameStyles, customNumberStyles } from "@/utils/textStyles";
import { orden } from "@/utils/orden";
import { useState, useEffect } from "react";

interface CustomTextNumberProps {
  product: any;
  userNumber: string | number;
  userName: string | number;
  numFill: string;
  numBorder: string;
  numBorder2: string;
  numTextShadow: string;
  nFill: string;
  nBorder: string;
  nameTextShadow: string;
  selectedNumberStyle: string | number | null;
  selectedNameStyle: string | number | null;
}

function useScreenSize() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export default function CustomTextNumber({
  product,
  userNumber,
  userName,
  numFill,
  numBorder,
  numBorder2,
  numTextShadow,
  nFill,
  nBorder,
  nameTextShadow,
  selectedNumberStyle,
  selectedNameStyle,
}: CustomTextNumberProps) {
  const productOrder =
    orden.find((item) => item.title === product.title)?.orden ||
    "NUMERO - TEXTO";
  const width = useScreenSize();

  // Definir tamaños responsivos para el nombre
  let nameFontSize = "1rem";
  if (width >= 640) nameFontSize = "1.3rem"; // sm
  if (width >= 768) nameFontSize = "1.8rem"; // md
  if (width >= 1024) nameFontSize = "2.5rem"; // lg

  const renderNumber = () => (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* Borde 2 (más externo, detrás) */}
      <span
        style={{
          color: "transparent",
          WebkitTextStroke: `16px ${numBorder2}`,
          WebkitTextFillColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
        className={`w-full h-full left-0 top-0 absolute select-none pointer-events-none ${
          product.title === "FUNDA 99% CASES - FOX 2"
            ? productOrder === "TEXTO - NUMERO"
              ? "text-[90px] sm:text-[117px] md:text-[144px]"
              : "text-[58px] sm:text-[72px] md:text-[108px]"
            : product.title === "FUNDA 99% CASES - SUZUKI"
            ? "text-[67px] sm:text-[72px] md:text-[126px] mt-[4px] sm:mt-[10px]"
            : product.title === "FUNDA 99% CASES - FASTHOUSE"
            ? "text-[72px] sm:text-[90px] md:text-[126px] mt-[8px] sm:mt-[12px]"
            : productOrder === "NUMERO - TEXTO"
            ? "text-[65px] sm:text-[86px] md:text-[122px]"
            : productOrder === "TEXTO - NUMERO"
            ? "text-[72px] sm:text-[101px] md:text-[130px]"
            : "text-[43px] sm:text-[58px] md:text-[86px]"
        } text-center ${
          selectedNumberStyle != null
            ? `font-${customNumberStyles[selectedNumberStyle]}`
            : "font-cmxShift2"
        }`}
      >
        {userNumber || "15"}
      </span>
      {/* Borde 1 (interno, encima) */}
      <span
        style={{
          color: "transparent",
          WebkitTextStroke: `5px ${numBorder}`,
          WebkitTextFillColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
        aria-hidden="true"
        className={`w-full h-full left-0 top-0 absolute select-none pointer-events-none ${
          product.title === "FUNDA 99% CASES - FOX 2"
            ? productOrder === "TEXTO - NUMERO"
              ? "text-[90px] sm:text-[117px] md:text-[144px]"
              : "text-[58px] sm:text-[72px] md:text-[108px]"
            : product.title === "FUNDA 99% CASES - SUZUKI"
            ? "text-[67px] sm:text-[72px] md:text-[126px] mt-[4px] sm:mt-[10px]"
            : product.title === "FUNDA 99% CASES - FASTHOUSE"
            ? "text-[72px] sm:text-[90px] md:text-[126px] mt-[8px] sm:mt-[12px]"
            : productOrder === "NUMERO - TEXTO"
            ? "text-[65px] sm:text-[86px] md:text-[122px]"
            : productOrder === "TEXTO - NUMERO"
            ? "text-[72px] sm:text-[101px] md:text-[130px]"
            : "text-[43px] sm:text-[58px] md:text-[86px]"
        } text-center ${
          selectedNumberStyle != null
            ? `font-${customNumberStyles[selectedNumberStyle]}`
            : "font-cmxShift2"
        }`}
      >
        {userNumber || "15"}
      </span>
      {/* Número con relleno */}
      <span
        style={{
          color: numFill,
          WebkitTextStroke: "0px transparent",
          WebkitTextFillColor: numFill,
          position: "relative",
          zIndex: 3,
        }}
        className={`select-none pointer-events-none ${
          product.title === "FUNDA 99% CASES - FOX 2"
            ? productOrder === "TEXTO - NUMERO"
              ? "text-[90px] sm:text-[117px] md:text-[144px]"
              : "text-[58px] sm:text-[72px] md:text-[108px]"
            : product.title === "FUNDA 99% CASES - SUZUKI"
            ? "text-[67px] sm:text-[72px] md:text-[126px] mt-[4px] sm:mt-[10px]"
            : product.title === "FUNDA 99% CASES - FASTHOUSE"
            ? "text-[72px] sm:text-[90px] md:text-[126px] mt-[8px] sm:mt-[12px]"
            : productOrder === "NUMERO - TEXTO"
            ? "text-[65px] sm:text-[86px] md:text-[122px]"
            : productOrder === "TEXTO - NUMERO"
            ? "text-[72px] sm:text-[101px] md:text-[130px]"
            : "text-[43px] sm:text-[58px] md:text-[86px]"
        } text-center ${
          selectedNumberStyle != null
            ? `font-${customNumberStyles[selectedNumberStyle]}`
            : "font-cmxShift2"
        }`}
      >
        {userNumber || "15"}
      </span>
    </span>
  );

  const renderName = () => (
    <div className="relative" style={{ transform: "translateY(-24px)" }}>
      {/* Borde externo (detrás) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          color: "transparent",
          WebkitTextStroke: `6px ${nBorder}`,
          WebkitTextFillColor: "transparent",
          zIndex: 1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
        className={`
          ${String(userName).length > 10
            ? "text-[10px] sm:text-[14px] md:text-[18px]"
            : product.title === "FUNDA 99% CASES - FOX 2"
              ? productOrder === "TEXTO - NUMERO"
                ? "text-[19px] sm:text-[24px] md:text-[29px]"
                : "text-[24px] sm:text-[32px] md:text-[46px]"
              : product.title === "FUNDA 99% CASES - SUZUKI"
              ? "text-[13px] sm:text-[24px] md:text-[32px]"
              : product.title === "FUNDA 99% CASES - FASTHOUSE"
              ? "text-[16px] sm:text-[20px] md:text-[24px]"
              : productOrder === "TEXTO - NUMERO"
              ? "text-[14px] sm:text-[19px] md:text-[24px]"
              : "text-[16px] sm:text-[24px] md:text-[32px]"
          }
          text-center uppercase leading-none ${
          selectedNameStyle != null
            ? `font-${customNameStyles[selectedNameStyle]}`
            : "font-cmxShift2"
        }`}
      >
        {userName || "TU NOMBRE"}
      </div>
      {/* Nombre con relleno */}
      <div
        style={{
          position: "relative",
          color: nFill,
          WebkitTextStroke: "0px transparent",
          WebkitTextFillColor: nFill,
          zIndex: 2,
        }}
        className={`
          ${String(userName).length > 10
            ? "text-[10px] sm:text-[14px] md:text-[18px]"
            : product.title === "FUNDA 99% CASES - FOX 2"
              ? productOrder === "TEXTO - NUMERO"
                ? "text-[19px] sm:text-[24px] md:text-[29px]"
                : "text-[24px] sm:text-[32px] md:text-[46px]"
              : product.title === "FUNDA 99% CASES - SUZUKI"
              ? "text-[13px] sm:text-[24px] md:text-[32px]"
              : product.title === "FUNDA 99% CASES - FASTHOUSE"
              ? "text-[16px] sm:text-[20px] md:text-[24px]"
              : productOrder === "TEXTO - NUMERO"
              ? "text-[14px] sm:text-[19px] md:text-[24px]"
              : "text-[16px] sm:text-[24px] md:text-[32px]"
          }
          text-center uppercase leading-none ${
          selectedNameStyle != null
            ? `font-${customNameStyles[selectedNameStyle]}`
            : "font-cmxShift2"
        }`}
      >
        {userName || "TU NOMBRE"}
      </div>
    </div>
  );

  return (
    <div
      id="texto-numeros-container"
      className={`pointer-events-none absolute inset-0 flex flex-col items-center  ${
        product.title === "FUNDA 99% CASES - SUZUKI"
          ? "justify-center translate-y-[80px] sm:translate-y-[128px]"
          : product.title === "FUNDA 99% CASES - FOX 2"
          ? productOrder === "TEXTO - NUMERO"
            ? "justify-center translate-y-[64px] sm:translate-y-[128px]"
            : "justify-center translate-y-[64px] sm:translate-y-[112px]"
          : product.title === "FUNDA 99% CASES - FASTHOUSE"
          ? "justify-end md:mb-[112px] mb-[40px] sm:translate-y-0"
          : productOrder === "NUMERO - TEXTO"
          ? "justify-end translate-y-[24px] sm:translate-y-0"
          : productOrder === "TEXTO - NUMERO"
          ? "justify-end translate-y-[24px] sm:translate-y-0"
          : "justify-end"
      } pb-[40px]`}
    >
      <div className="flex flex-col items-center leading-none">
        {productOrder === "NUMERO - TEXTO" ? (
          <>
            {renderNumber()}
            {renderName()}
          </>
        ) : (
          <>
            {renderName()}
            {renderNumber()}
          </>
        )}
      </div>
    </div>
  );
}
