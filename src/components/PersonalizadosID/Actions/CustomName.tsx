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
        <label className="block mb-2 font-bold uppercase">Tu nombre</label>
        <input
          type="text"
          maxLength={10}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`
            w-full border uppercase border-gray-300 rounded p-2 mb-4
            text-2xl sm:text-4xl
            ${selectedNameStyle !== null
              ? `font-${customNameStyles[selectedNameStyle]}`
              : "font-cmxShift2"
            }
          `}
          placeholder="Tu nombre"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {customNameStyles.map((style, index) => (
            <button
              key={style}
              onClick={() => setSelectedNameStyle(index)}
              className={`
                border uppercase border-gray-300 rounded-md p-2 text-center
                transition-colors text-lg sm:text-xl
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
      </div>

      {/* Bloque para el NÚMERO */}
      <div>
        <label className="block mb-2 font-bold uppercase">Número</label>
        <input
          type="number"
          value={userNumber}
          onChange={(e) => {
            if (e.target.value.length <= 3) {
              setUserNumber(e.target.value);
            }
          }}
          className={`
            w-full border border-gray-300 rounded p-2 mb-4
            text-2xl sm:text-4xl
            ${selectedNumberStyle !== null
              ? `font-${customNumberStyles[selectedNumberStyle]}`
              : "font-cmxShift2"
            }
          `}
          placeholder="15"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {customNumberStyles.map((style, index) => (
            <button
              key={style}
              onClick={() => setSelectedNumberStyle(index)}
              className={`
                border border-gray-300 rounded-md p-2 text-center
                transition-colors text-lg sm:text-xl
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
      </div>
    </div>
  );
};

export default CustomName;
