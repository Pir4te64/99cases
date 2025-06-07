import { customNameStyles, customNumberStyles } from "@/utils/textStyles";
import { orden } from "@/utils/orden";
import { useState, useEffect } from 'react';

interface CustomTextNumberProps {
    product: any;
    userNumber: string | number;
    userName: string | number;
    numFill: string;
    numBorder: string;
    numTextShadow: string;
    nFill: string;
    nBorder: string;
    nameTextShadow: string;
    selectedNumberStyle: string | number | null;
    selectedNameStyle: string | number | null;
}

function useScreenSize() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
}

export default function CustomTextNumber({
    product,
    userNumber,
    userName,
    numFill,
    numBorder,
    numTextShadow,
    nFill,
    nBorder,
    nameTextShadow,
    selectedNumberStyle,
    selectedNameStyle,
}: CustomTextNumberProps) {
    const productOrder = orden.find(item => item.title === product.title)?.orden || "NUMERO - TEXTO";
    const width = useScreenSize();

    // Definir tamaños responsivos para el nombre
    let nameFontSize = '1rem';
    if (width >= 640) nameFontSize = '1.3rem'; // sm
    if (width >= 768) nameFontSize = '1.8rem'; // md
    if (width >= 1024) nameFontSize = '2.5rem'; // lg

    const renderNumber = () => (
        <span
            style={{
                color: numFill,
                WebkitTextStroke: `2px ${numBorder}`,
                textShadow: numTextShadow,
                WebkitTextStrokeWidth: '2px',
                WebkitTextStrokeColor: numBorder,
                WebkitTextFillColor: numFill,
            }}
            className={`${product.title === "FUNDA 99% CASES - FOX 2"
                ? productOrder === "TEXTO - NUMERO"
                    ? "text-[100px] sm:text-[130px] md:text-[160px]"
                    : "text-[64px] sm:text-[80px] md:text-[120px]"
                : product.title === "FUNDA 99% CASES - SUZUKI"
                    ? "text-[74px] sm:text-[80px] md:text-[140px] mt-[4px] sm:mt-[10px]"
                    : product.title === "FUNDA 99% CASES - FASTHOUSE"
                        ? "text-[80px] sm:text-[100px] md:text-[140px] mt-[8px] sm:mt-[12px]"
                        : productOrder === "NUMERO - TEXTO"
                            ? "text-[72px] sm:text-[96px] md:text-[136px]"
                            : productOrder === "TEXTO - NUMERO"
                                ? "text-[80px] sm:text-[112px] md:text-[144px]"
                                : "text-[48px] sm:text-[64px] md:text-[96px]"} text-center ${selectedNumberStyle != null
                                    ? `font-${customNumberStyles[selectedNumberStyle]}`
                                    : "font-cmxShift2"
                }`}
        >
            {userNumber || "15"}
        </span>
    );

    const renderName = () => (
        <span
            style={{
                color: nFill,
                WebkitTextStroke: `2px ${nBorder}`,
                textShadow: nameTextShadow,
                WebkitTextStrokeWidth: '2px',
                WebkitTextStrokeColor: nBorder,
                WebkitTextFillColor: nFill,
                marginBottom: productOrder === "TEXTO - NUMERO" ? '8px' : undefined,
            }}
            className={`${product.title === "FUNDA 99% CASES - FOX 2"
                ? productOrder === "TEXTO - NUMERO"
                    ? "text-[19px] sm:text-[24px] md:text-[29px]"
                    : "text-[24px] sm:text-[32px] md:text-[46px]"
                : product.title === "FUNDA 99% CASES - SUZUKI"
                    ? "text-[13px] sm:text-[24px] md:text-[32px]"
                    : product.title === "FUNDA 99% CASES - FASTHOUSE"
                        ? "text-[16px] sm:text-[20px] md:text-[24px]"
                        : productOrder === "TEXTO - NUMERO"
                            ? "text-[14px] sm:text-[19px] md:text-[24px]"
                            : "text-[16px] sm:text-[24px] md:text-[32px]"} text-center -mt-[4px] uppercase ${selectedNameStyle != null
                                ? `font-${customNameStyles[selectedNameStyle]}`
                                : "font-cmxShift2"
                }`}
        >
            {userName || "TU NOMBRE"}
        </span>
    );

    return (
        <div id="texto-numeros-container" className={`pointer-events-none absolute inset-0 flex flex-col items-center  ${product.title === "FUNDA 99% CASES - SUZUKI"
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
            } pb-[40px]`}>
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