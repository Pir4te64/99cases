import { useState, useEffect } from "react";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { fetchPhoneModels, PhoneModel } from "./Peticiones/MarcaCelularesGET";

const MarcaCelularGET = () => {
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    const getPhoneModels = async () => {
      try {
        const models = await fetchPhoneModels();
        console.log(models);
        setPhoneModels(models);
      } catch (error) {
        console.error("Error al obtener los modelos:", error);
      }
    };
    getPhoneModels();
  }, []);

  const handleChange = (
    selectedOption: OnChangeValue<PhoneModel, false>,
    actionMeta: ActionMeta<PhoneModel>
  ) => {
    setSelectedModel(selectedOption);
  };

  // Filtrar los modelos según la marca seleccionada
  const filteredPhoneModels = selectedBrand
    ? phoneModels.filter((model) => model.marca === selectedBrand)
    : [];

  // Extraer las marcas únicas desde los datos recibidos
  const uniqueBrands = Array.from(
    new Set(phoneModels.map((model) => model.marca))
  );

  return (
    <div className='mb-4 w-full my-6'>
      {/* Selección de marca */}
      <p className='uppercase mb-2'>¿Cuál es la marca de tu celular?</p>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 w-full'>
        {uniqueBrands.map((brand) => (
          <button
            key={brand}
            onClick={() => {
              setSelectedBrand(brand);
              setSelectedModel(null); // Reinicia el modelo al cambiar de marca
            }}
            className={`border border-black bg-white rounded-md py-2 uppercase transition-colors ${
              selectedBrand === brand
                ? "bg-gray-400 border-gray-400 text-white"
                : "hover:bg-gray-400 hover:border-gray-400 hover:text-white"
            }`}>
            {brand}
          </button>
        ))}
      </div>

      {/* Línea divisoria */}
      <div className='my-4 h-px bg-gray-300' />

      {/* Selección de modelo */}
      <div className=' w-full'>
        <p className='uppercase mb-2'>¿Cuál es el modelo de tu celular?</p>
        <Select<PhoneModel, false>
          options={filteredPhoneModels}
          value={selectedModel}
          onChange={handleChange}
          noOptionsMessage={() => "No hay modelos disponibles"}
          placeholder={
            selectedBrand
              ? "Selecciona tu modelo de celular"
              : "Primero selecciona una marca"
          }
          isSearchable={true}
          inputValue={inputValue}
          onInputChange={setInputValue}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "48px",
            }),
          }}
          getOptionLabel={(option) => option.modelo}
          getOptionValue={(option) => option.id.toString()}
        />
      </div>
    </div>
  );
};

export default MarcaCelularGET;
