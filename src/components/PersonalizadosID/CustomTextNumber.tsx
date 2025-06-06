import { customNameStyles, customNumberStyles } from "@/utils/textStyles";

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
                <span
                    style={{
                        color: nFill,
                        WebkitTextStroke: `2px ${nBorder}`,
                        textShadow: nameTextShadow,
                        WebkitTextStrokeWidth: '2px',
                        WebkitTextStrokeColor: nBorder,
                        WebkitTextFillColor: nFill,
                    }}
                    className={`${product.title === "FUNDA 99% CASES - FOX 2" ||
                        product.title === "FUNDA 99% CASES - SUZUKI" ||
                        product.title === "FUNDA 99% CASES - FASTHOUSE"
                        ? "text-[1.5rem] sm:text-[2rem] md:text-[2.9rem]"
                        : "text-[1.3rem] sm:text-[2rem] md:text-[2.9rem]"} text-center -mt-1 uppercase ${selectedNameStyle != null
                            ? `font-${customNameStyles[selectedNameStyle]}`
                            : "font-cmxShift2"
                        }`}
                >
                    {userName || "TU NOMBRE"}
                </span>
            </div>
        </div>
    );
} 