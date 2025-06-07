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
            className={`${product.title === "FUNDA 99% CASES - FOX 2" ||
                product.title === "FUNDA 99% CASES - SUZUKI" ||
                product.title === "FUNDA 99% CASES - FASTHOUSE"
                ? "text-[4rem] sm:text-[5rem] md:text-[7.5rem] mt-5"
                : "text-[3.5rem] sm:text-[5rem] md:text-[7.5rem]"} text-center ${selectedNumberStyle != null
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
                fontSize: productOrder === "TEXTO - NUMERO" ? nameFontSize : undefined,
                marginBottom: productOrder === "TEXTO - NUMERO" ? '0.5rem' : undefined,
            }}
            className={`${product.title === "FUNDA 99% CASES - FOX 2" ||
                product.title === "FUNDA 99% CASES - SUZUKI" ||
                product.title === "FUNDA 99% CASES - FASTHOUSE"
                ? "text-[1.5rem] sm:text-[2rem] md:text-[2.9rem]"
                : productOrder === "TEXTO - NUMERO"
                    ? "text-[1.3rem] sm:text-[1.8rem] md:text-[2.5rem]"
                    : "text-[1.3rem] sm:text-[2rem] md:text-[2.9rem]"} text-center -mt-1 uppercase ${selectedNameStyle != null
                    ? `font-${customNameStyles[selectedNameStyle]}`
                    : "font-cmxShift2"
                }`}
        >
            {userName || "TU NOMBRE"}
        </span>
    );

    return (
        <div id="texto-numeros-container" className={`pointer-events-none absolute inset-0 flex flex-col items-center  ${product.title === "FUNDA 99% CASES - SUZUKI"
            ? "justify-center translate-y-16 sm:translate-y-24"
            : product.title === "FUNDA 99% CASES - FOX 2"
                ? "justify-center translate-y-16 sm:translate-y-28"
                : product.title === "FUNDA 99% CASES - FASTHOUSE"
                    ? "justify-end md:mb-28 mb-10 sm:translate-y-0"
                    : "justify-end"
            } pb-10`}>
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