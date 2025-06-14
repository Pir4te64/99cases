// src/components/Pagos/DatosDestinatario.tsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { validationSchema } from "@/components/Pagos/store/DatosDestinatario.data";
import usePaymentFormStore from "@/store/pagoStore";
import InputField from "@/components/Pagos/UI/InputField";
import SelectField from "@/components/Pagos/UI/SelectField";
import { tipoDocumentoOptions } from "@/components/Pagos/UI/estaticos";
import { API } from "@/utils/Api";

interface UbicacionOption {
  label: string;
  value: string; // códigoPostal
  localidad: string;
  provincia: string;
  codigoPostal: string;
}

const DatosDestinatario: React.FC = () => {
  // 1) Recuperamos el email de localStorage, si existe:
  const storedEmail = localStorage.getItem("userEmail") || "";

  const {
    nombre,
    apellido,
    telefono,
    provincia,
    localidad,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    tipoDocumento,
    numeroDocumento,
    setNombre,
    setApellido,
    setEmail,
    setTelefono,
    setProvincia,
    setLocalidad,
    setCodigoPostal,
    setCalle,
    setNumero,
    setSinNumero,
    setDepartamento,
    setTipoDocumento,
    setNumeroDocumento,
  } = usePaymentFormStore();

  const formik = useFormik({
    initialValues: {
      nombre,
      apellido,
      // inicializamos directamente el campo email con localStorage
      email: storedEmail,
      telefono,
      provincia,
      localidad,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      tipoDocumento,
      numeroDocumento,
    },
    validationSchema,
    onSubmit: () => {
      // tu lógica de submit aquí
    },
  });

  // 2) Sincronizamos la store con el email guardado en localStorage al montar
  useEffect(() => {
    if (storedEmail) {
      setEmail(storedEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3) Sincroniza store → Formik cuando cambian otros campos de la store
  useEffect(() => {
    formik.setValues({
      nombre,
      apellido,
      email: formik.values.email, // preservamos el email actual de Formik
      telefono,
      provincia,
      localidad,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      tipoDocumento,
      numeroDocumento,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nombre,
    apellido,
    telefono,
    provincia,
    localidad,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    tipoDocumento,
    numeroDocumento,
  ]);

  // 4) Función para cargar opciones de ubicación vía API
  const loadUbicaciones = async (inputValue: string) => {
    if (!inputValue) return [];
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        API.getLocation,
        { parametroBusqueda: inputValue },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      console.log("Respuesta completa getLocation:", resp.data);

      const lista = Array.isArray(resp.data.resultados)
        ? resp.data.resultados
        : [];
      return lista.map((item: any) => ({
        label: `${item.localidad} — ${item.provincia} (CP: ${item.codigoPostal})`,
        value: item.codigoPostal,
        localidad: item.localidad,
        provincia: item.provincia,
        codigoPostal: item.codigoPostal,
      }));
    } catch (error) {
      console.error("Error al cargar ubicaciones:", error);
      return [];
    }
  };

  return (
    <section className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="font-favoritExpanded text-xl font-bold uppercase text-gray-700">
        Datos del destinatario
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* E-mail */}
        <InputField
          id="email"
          label="E-mail"
          type="email"
          placeholder="nombre@ejemplo.com"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            setEmail(e.target.value);
          }}
          disabled
          onBlur={formik.handleBlur}
          error={formik.errors.email as string}
          touched={formik.touched.email}
        />

        {/* Nombre */}
        <InputField
          id="nombre"
          label="Nombre"
          value={formik.values.nombre}
          onChange={(e) => {
            formik.handleChange(e);
            setNombre(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.nombre as string}
          touched={formik.touched.nombre}
        />

        {/* Apellido */}
        <InputField
          id="apellido"
          label="Apellido"
          value={formik.values.apellido}
          onChange={(e) => {
            formik.handleChange(e);
            setApellido(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.apellido as string}
          touched={formik.touched.apellido}
        />

        {/* Teléfono */}
        <InputField
          id="telefono"
          label="Teléfono"
          value={formik.values.telefono}
          onChange={(e) => {
            formik.handleChange(e);
            setTelefono(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.telefono as string}
          touched={formik.touched.telefono}
        />

        {/* Tipo de documento */}
        <SelectField
          id="tipoDocumento"
          label="Tipo de documento"
          value={formik.values.tipoDocumento}
          options={tipoDocumentoOptions}
          onChange={(val) => {
            formik.setFieldValue("tipoDocumento", val);
            setTipoDocumento(val);
          }}
          onBlur={() => formik.setFieldTouched("tipoDocumento", true)}
          error={formik.errors.tipoDocumento as string}
          touched={formik.touched.tipoDocumento}
          placeholder="Selecciona un tipo de documento"
        />

        {/* Número de documento */}
        <InputField
          id="numeroDocumento"
          label="Número de documento"
          value={formik.values.numeroDocumento}
          onChange={(e) => {
            formik.handleChange(e);
            setNumeroDocumento(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.numeroDocumento as string}
          touched={formik.touched.numeroDocumento}
        />

        {/* Ubicación AsyncSelect */}
        <div className="my-4 relative">
          <label
            htmlFor="ubicacion-select"
            className="absolute -top-2  left-3 bg-white px-1 font-favoritExpandedBook text-xs font-medium text-gray-600 z-50"
          >
            Localidad / Código postal
          </label>
          <AsyncSelect<UbicacionOption, false>
            cacheOptions
            loadOptions={loadUbicaciones}
            defaultOptions
            loadingMessage={() => "Cargando..."}
            noOptionsMessage={() => "No hay resultados"}
            onChange={(option) => {
              if (!option) return;
              console.log("Seleccionado:", option);
              formik.setFieldValue("localidad", option.localidad);
              setLocalidad(option.localidad);
              formik.setFieldValue("provincia", option.provincia);
              setProvincia(option.provincia);
              formik.setFieldValue("codigoPostal", option.codigoPostal);
              setCodigoPostal(option.codigoPostal);
            }}
            className="font-favoritExpanded text-sm z-20"
            placeholder="Escribe una ubicación"
            classNamePrefix="react-select"
            inputId="ubicacion-select"
          />
        </div>

        {/* Calle */}
        <InputField
          id="calle"
          label="Calle"
          value={formik.values.calle}
          onChange={(e) => {
            formik.handleChange(e);
            setCalle(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.calle as string}
          touched={formik.touched.calle}
        />

        {/* Número / Sin número */}
        <div className="my-4 relative">
          <label
            htmlFor="numero"
            className="absolute -top-2 left-3 bg-white px-1 font-favoritExpandedBook text-xs font-medium text-gray-600 z-10"
          >
            Número
          </label>

          <div className="relative">
            <input
              id="numero"
              name="numero"
              type="text"
              value={formik.values.numero}
              onChange={(e) => {
                formik.handleChange(e);
                setNumero(e.target.value);
              }}
              onBlur={formik.handleBlur}
              disabled={formik.values.sinNumero}
              className="w-full rounded border border-gray-300 px-3 py-2 pr-32 font-favoritExpandedBook text-sm md:text-base"
              placeholder=""
            />

            <label className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center text-sm cursor-pointer">
              <div className="relative mr-2">
                <input
                  id="sinNumero"
                  name="sinNumero"
                  type="checkbox"
                  className="sr-only"
                  checked={formik.values.sinNumero}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSinNumero(e.target.checked);
                  }}
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    formik.values.sinNumero
                      ? "bg-gray-600 border-gray-600"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {formik.values.sinNumero && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              Sin número
            </label>
          </div>

          {formik.touched.numero && formik.errors.numero && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.numero}</p>
          )}
        </div>

        {/* Departamento */}
        <InputField
          id="departamento"
          label="Departamento (opcional)"
          value={formik.values.departamento}
          onChange={(e) => {
            formik.handleChange(e);
            setDepartamento(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.departamento as string}
          touched={formik.touched.departamento}
        />
      </form>
    </section>
  );
};

export default DatosDestinatario;
