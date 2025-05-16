// DatosDestinatario.data.ts
import * as Yup from "yup";

export const initialValues = {
  nombre: "",
  apellido: "",
  codigoPostal: "",
  calle: "",
  numero: "",
  sinNumero: false,
  departamento: "",
  barrio: "",
  ciudad: "",
};

export const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  codigoPostal: Yup.string().required("El código postal es obligatorio"),
  calle: Yup.string().required("La calle es obligatoria"),
  // Si "sinNumero" es false, se requiere que "numero" tenga valor
  numero: Yup.string().when("sinNumero", {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("El número es obligatorio"),
  }),
  sinNumero: Yup.boolean(),
  // "departamento" es opcional, no se valida required
  departamento: Yup.string(),
  barrio: Yup.string().required("El barrio es obligatorio"),
  ciudad: Yup.string().required("La ciudad es obligatoria"),
});
