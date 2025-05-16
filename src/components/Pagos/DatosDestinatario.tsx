// src/components/Pagos/DatosDestinatario.tsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@/components/Pagos/store/DatosDestinatario.data";
import usePaymentFormStore from "@/store/pagoStore";
import InputField from "@/components/Pagos/UI/InputField";
import SelectField from "@/components/Pagos/UI/SelectField";
import { citiesByProvince, tipoDocumentoOptions } from "@/components/Pagos/UI/estaticos";
import { provinces } from "@/components/Pagos/UI/estaticos";

const DatosDestinatario: React.FC = () => {
  const {
    nombre,
    apellido,
    email,
    telefono,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    localidad,
    provincia,
    tipoDocumento,
    numeroDocumento,
    setNombre,
    setApellido,
    setEmail,
    setTelefono,
    setCodigoPostal,
    setCalle,
    setNumero,
    setSinNumero,
    setDepartamento,
    setLocalidad,
    setProvincia,
    setTipoDocumento,
    setNumeroDocumento,
  } = usePaymentFormStore();

  const formik = useFormik({
    initialValues: {
      nombre,
      apellido,
      email,
      telefono,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      localidad,
      provincia,
      tipoDocumento,
      numeroDocumento,
    },
    validationSchema,
    onSubmit: () => { },
  });

  useEffect(() => {
    formik.setValues({
      nombre,
      apellido,
      email,
      telefono,
      codigoPostal,
      calle,
      numero,
      sinNumero,
      departamento,
      localidad,
      provincia,
      tipoDocumento,
      numeroDocumento,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nombre,
    apellido,
    email,
    telefono,
    codigoPostal,
    calle,
    numero,
    sinNumero,
    departamento,
    localidad,
    provincia,
    tipoDocumento,
    numeroDocumento,
  ]);

  const provinceOptions = provinces.map((p) => ({ value: p, text: p }));
  const cityOptions = citiesByProvince[formik.values.provincia] || [];

  return (
    <section className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-700">
        Datos del destinatario
      </h2>

      <form className="space-y-4">
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

        <InputField
          id="codigoPostal"
          label="Código postal"
          value={formik.values.codigoPostal}
          onChange={(e) => {
            formik.handleChange(e);
            setCodigoPostal(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.codigoPostal as string}
          touched={formik.touched.codigoPostal}
        />

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

        <SelectField
          id="provincia"
          label="Provincia"
          value={formik.values.provincia}
          options={provinceOptions}
          onChange={(val) => {
            formik.setFieldValue("provincia", val);
            setProvincia(val);
            formik.setFieldValue("localidad", "");
            setLocalidad("");
          }}
          onBlur={() => formik.setFieldTouched("provincia", true)}
          error={formik.errors.provincia as string}
          touched={formik.touched.provincia}
          placeholder="Selecciona provincia"
          isSearchable
        />

        <SelectField
          id="localidad"
          label="Ciudad"
          value={formik.values.localidad}
          options={cityOptions}
          onChange={(val) => {
            formik.setFieldValue("localidad", val);
            setLocalidad(val);
          }}
          onBlur={() => formik.setFieldTouched("localidad", true)}
          error={formik.errors.localidad as string}
          touched={formik.touched.localidad}
          placeholder="Selecciona ciudad"
          isSearchable
        />
      </form>
    </section>
  );
};

export default DatosDestinatario;
