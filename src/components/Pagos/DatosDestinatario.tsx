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
  value: string;         // códigoPostal
  localidad: string;
  provincia: string;
  codigoPostal: string;
}

const DatosDestinatario: React.FC = () => {
  const {
    nombre,
    apellido,
    email,
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
      email,
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
    onSubmit: () => { },
  });

  // Sincroniza store → Formik
  useEffect(() => {
    formik.setValues({
      nombre,
      apellido,
      email,
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
    email,
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

  // Llama al POST /CodigoPostal/getLocation con { parametroBusqueda }
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

      // Extrae el array de resultados
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
      <h2 className="text-xl font-bold text-gray-700">
        Datos del destinatario
      </h2>

      <form className="space-y-4">
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
          placeholder="Selecciona..."
          isSearchable
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
        <div className="space-y-2">
          <label
            htmlFor="ubicacion-select"
            className="block text-sm font-medium text-gray-700"
          >
            Ubicación
          </label>
          <AsyncSelect<UbicacionOption, false>
            cacheOptions
            loadOptions={loadUbicaciones}
            defaultOptions
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
            placeholder="Escribe una localidad..."
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
        <div className="space-y-2">
          <InputField
            id="numero"
            label="Número"
            value={formik.values.numero}
            onChange={(e) => {
              formik.handleChange(e);
              setNumero(e.target.value);
            }}
            onBlur={formik.handleBlur}
            error={formik.errors.numero as string}
            touched={formik.touched.numero}
            disabled={formik.values.sinNumero}
          />
          <label className="inline-flex items-center text-sm">
            <input
              id="sinNumero"
              name="sinNumero"
              type="checkbox"
              className="mr-2"
              checked={formik.values.sinNumero}
              onChange={(e) => {
                formik.handleChange(e);
                setSinNumero(e.target.checked);
              }}
            />
            Sin número
          </label>
        </div>

        {/* Departamento */}
        <InputField
          id="departamento"
          label="Departamento"
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
