// src/components/CustomName.tsx

import { customNameStyles, customNumberStyles } from "@/utils/textStyles";
import usePersonalizadoStore from "@/components/PersonalizadosID/store/usePersonalizadoStore";

const CustomName = () => {
  const {
    userName,
    setUserName,
    selectedNameStyle,
    setSelectedNameStyle,
    userNumber,
    setUserNumber,
    selectedNumberStyle,
    setSelectedNumberStyle,
  } = usePersonalizadoStore();

  return (
    <div className="space-y-8">
      {/* Bloque para el NOMBRE */}
      <div>
        <label className="mb-2 block font-favoritExpanded text-xs uppercase">
          Tu nombre
        </label>
        <input
          type="text"
          maxLength={12}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`
            w-full border uppercase border-gray-300 rounded p-2 mb-4
            ${userName.length > 12
              ? "text-lg sm:text-2xl md:text-3xl"
              : "text-2xl sm:text-4xl"
            }
            ${selectedNameStyle !== null
              ? `font-${customNameStyles[selectedNameStyle]}`
              : "font-cmxShift2"
            }
          `}
          placeholder="Tu nombre"
        />
        <hr className="mb-4 text-gray-500" />

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {customNameStyles.map((style, index) => (
            <button
              key={style}
              onClick={() => setSelectedNameStyle(index)}
              className={`
                border uppercase border-gray-300 rounded-md p-2 text-center
                transition-colors
                ${userName.length > 12
                  ? "text-sm sm:text-base"
                  : "text-lg sm:text-xl"
                }
                ${selectedNameStyle === index
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
                font-${style}
              `}
            >
              {userName || "TU NOMBRE"}
            </button>
          ))}
        </div>
        <hr className="mt-4 text-gray-500" />
      </div>

      {/* Bloque para el NÚMERO */}
      <div>
        <label className="mb-2 block font-favoritExpanded text-xs uppercase">
          Número
        </label>
        <input
          type="number"
          value={userNumber}
          onChange={(e) => {
            if (e.target.value.length <= 3) {
              setUserNumber(e.target.value);
            }
          }}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          className={`
            w-full border border-gray-300 rounded p-2 mb-4
            text-2xl sm:text-4xl
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            ${selectedNumberStyle !== null
              ? `font-${customNumberStyles[selectedNumberStyle]}`
              : "font-cmxShift2"
            }
          `}
          placeholder="15"
        />
        <hr className="mb-4 text-gray-500" />

        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {customNumberStyles.map((style, index) => (
            <button
              key={style}
              onClick={() => setSelectedNumberStyle(index)}
              className={`
                border border-gray-300 rounded-md p-1 sm:p-2 text-center
                transition-colors text-sm sm:text-xl
                ${selectedNumberStyle === index
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
                font-${style}
              `}
            >
              {userNumber || "15"}
            </button>
          ))}
        </div>
        <hr className="mt-4 text-gray-500" />
      </div>
    </div>
  );
};

export default CustomName;
