// src/components/Pagos/DatosDestinatario.tsx
import { useEffect } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@/components/Pagos/DatosDestinatario.data";
import { DatosDestinatarioProps } from "@/components/Pagos/Interface";
import InputField from "@/components/Pagos/InputField";
import SelectField from "@/components/Pagos/SelectField";

const DatosDestinatario: React.FC<DatosDestinatarioProps> = (props) => {
  const {
    /* setters */
    setNombre,
    setApellido,
    setEmail,
    setTelefono,
    setCodigoPostal,
    setCalle,
    setNumero,
    setSinNumero,
    setDepartamento,
    setBarrio,
    setLocalidad,
    setProvincia,
    setTipoDocumento,
    setNumeroDocumento,
    /* valores … */
    ...values
  } = props;

  const formik = useFormik({
    initialValues: values,
    validationSchema,
    onSubmit: () => { },
  });

  /* Sincronizar externos ↔ internos */
  useEffect(() => {
    formik.setValues(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(values));

  return (
    <section>
      <h2 className="mb-2 font-favoritExpandedBook text-lg font-bold md:text-xl">
        DATOS DEL DESTINATARIO
      </h2>

      {/* Email, Nombre, Apellido */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
      </div>

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
        label="Tipo de Documento"
        value={formik.values.tipoDocumento}
        options={[
          { value: "", text: "Selecciona..." },
          { value: "DNI", text: "DNI" },
          { value: "PASAPORTE", text: "Pasaporte" },
        ]}
        onChange={(e) => {
          formik.handleChange(e);
          setTipoDocumento(e.target.value);
        }}
        onBlur={formik.handleBlur}
        error={formik.errors.tipoDocumento as string}
        touched={formik.touched.tipoDocumento}
      />

      <InputField
        id="numeroDocumento"
        label="Número de Documento"
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
        label="Código Postal"
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

      {/* Número + Sin número + Departamento */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
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

          <div className="flex items-center">
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
            <label
              htmlFor="sinNumero"
              className="font-favoritExpandedBook text-sm md:text-base"
            >
              Sin Número
            </label>
          </div>

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
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          id="localidad"
          label="Localidad"
          value={formik.values.localidad}
          onChange={(e) => {
            formik.handleChange(e);
            setLocalidad(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.localidad as string}
          touched={formik.touched.localidad}
        />

        <InputField
          id="provincia"
          label="Provincia"
          value={formik.values.provincia}
          onChange={(e) => {
            formik.handleChange(e);
            setProvincia(e.target.value);
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.provincia as string}
          touched={formik.touched.provincia}
        />
      </div>
    </section>
  );
};

export default DatosDestinatario;
