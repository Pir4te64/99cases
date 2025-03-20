// CustomName.jsx
import React, { useState } from "react";

// Ejemplos de "estilos" para el nombre y el número
// Podrías personalizar tipografías, colores, etc.
const nameStyles = [
  "TU NOMBRE",
  "TU NOMBRE",
  "TU NOMBRE",
  "TU NOMBRE",
  "TU NOMBRE",
  "TU NOMBRE",
  "TU NOMBRE",
  "TU NOMBRE",
];
const numberStyles = ["15", "15", "15", "15", "15", "15", "15", "15"];

const CustomName = () => {
  const [userName, setUserName] = useState("");
  const [selectedNameStyle, setSelectedNameStyle] = useState<number | null>(
    null
  );

  const [userNumber, setUserNumber] = useState("");
  const [selectedNumberStyle, setSelectedNumberStyle] = useState<number | null>(
    null
  );

  return (
    <div className="space-y-8">
      {/* Bloque para el nombre */}
      <div>
        <label className="block mb-2 font-bold">Tu nombre</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Tu nombre"
        />

        {/* Opciones de estilo para el nombre */}
        <div className="grid grid-cols-4 gap-2">
          {nameStyles.map((style, index) => (
            <button
              key={index}
              onClick={() => setSelectedNameStyle(index)}
              className={`border border-gray-300 rounded p-2 text-center transition-colors
                ${
                  selectedNameStyle === index
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Bloque para el número */}
      <div>
        <label className="block mb-2 font-bold">Número</label>
        <input
          type="text"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="15"
        />

        {/* Opciones de estilo para el número */}
        <div className="grid grid-cols-4 gap-2">
          {numberStyles.map((style, index) => (
            <button
              key={index}
              onClick={() => setSelectedNumberStyle(index)}
              className={`border border-gray-300 rounded p-2 text-center transition-colors
                ${
                  selectedNumberStyle === index
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomName;
