import { useState, useEffect } from "react";
import Select, { OnChangeValue } from "react-select";
import { fetchPhoneModels, PhoneModel } from "./Peticiones/MarcaCelularesGET";
import { usePhoneSelectionStore } from "./phoneSelectionStore";
// Importa el store

const MarcaCelularGET = () => {
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(null);
  const [inputValue, setInputValue] = useState("");

  // Extraemos las funciones del store para actualizar la marca y el modelo.
  const {
    selectedBrand,
    setSelectedBrand,
    setSelectedModel: setStoreSelectedModel,
  } = usePhoneSelectionStore();

  useEffect(() => {
    const getPhoneModels = async () => {
      try {
        const models = await fetchPhoneModels();
        setPhoneModels(models);
      } catch (error) {
        console.error("Error al obtener los modelos:", error);
      }
    };
    getPhoneModels();
  }, []);

  // Al seleccionar un modelo en el dropdown, actualizamos tanto el estado local como el store
  const handleChange = (selectedOption: OnChangeValue<PhoneModel, false>) => {
    setSelectedModel(selectedOption);
    setStoreSelectedModel(selectedOption);
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
              setSelectedBrand(brand); // Actualiza el store
              setSelectedModel(null); // Reinicia el modelo local
              setStoreSelectedModel(null); // Reinicia el modelo en el store también
            }}
            className={`border border-black bg-white rounded-md py-2 uppercase transition-colors ${
              selectedBrand === brand
                ? "bg-gray-400 border-gray-400 text-red-700 font-bold"
                : "hover:bg-gray-400 hover:border-gray-400 hover:text-white"
            }`}>
            {brand}
          </button>
        ))}
      </div>

      {/* Línea divisoria */}
      <div className='my-4 h-px bg-gray-300' />

      {/* Selección de modelo */}
      <div className='w-full'>
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
