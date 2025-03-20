import { useState } from "react";
import Select, { ActionMeta, OnChangeValue } from "react-select";

interface PhoneModel {
  value: string;
  label: string;
}

// Lista de modelos de ejemplo
const phoneModels: PhoneModel[] = [
  { value: "iphone-14-pro-max", label: "iPhone 14 Pro Max" },
  { value: "iphone-13", label: "iPhone 13" },
  { value: "samsung-galaxy-s23", label: "Samsung Galaxy S23" },
  { value: "motorola-edge-30", label: "Motorola Edge 30" },
  { value: "xiaomi-12-pro", label: "Xiaomi 12 Pro" },
];

const MarcaCelular = () => {
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (
    selectedOption: OnChangeValue<PhoneModel, false>,
    actionMeta: ActionMeta<PhoneModel>
  ) => {
    setSelectedModel(selectedOption);
  };

  return (
    <div className="mb-4 w-full my-4">
      {/* Selección de marca */}
      <p className="uppercase mb-2">¿Cuál es la marca de tu celular?</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        <button className="border border-black bg-white rounded-md py-2 uppercase hover:bg-gray-400 hover:border-gray-400 hover:text-white transition-colors">
          Apple
        </button>
        <button className="border border-black bg-white rounded-md py-2 uppercase hover:bg-gray-400 hover:border-gray-400 hover:text-white transition-colors">
          Samsung
        </button>
        <button className="border border-black bg-white rounded-md py-2 uppercase hover:bg-gray-400 hover:border-gray-400 hover:text-white transition-colors">
          Motorola
        </button>
        <button className="border border-black bg-white rounded-md py-2 uppercase hover:bg-gray-400 hover:border-gray-400 hover:text-white transition-colors">
          Xiaomi
        </button>
      </div>

      {/* Línea divisoria */}
      <div className="my-4 h-px bg-gray-300" />

      {/* Selección de modelo */}
      <div className="mb-4 w-full">
        <p className="uppercase mb-2 ">¿Cuál es el modelo de tu celular?</p>
        <Select<PhoneModel, false>
          options={phoneModels}
          value={selectedModel}
          onChange={handleChange}
          placeholder="Selecciona tu modelo de celular"
          isSearchable={true}
          inputValue={inputValue}
          onInputChange={setInputValue}
          // Aquí personalizas la altura del Select
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "48px", // Aumenta la altura mínima
            }),
          }}
        />
      </div>
    </div>
  );
};

export default MarcaCelular;
