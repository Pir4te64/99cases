export interface DatosDestinatarioProps {
    /* Datos personales */
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;

    /* Domicilio */
    codigoPostal: string;
    calle: string;
    numero: string;
    sinNumero: boolean;
    departamento: string;
    localidad: string;
    provincia: string;

    /* Documento */
    tipoDocumento: string;
    numeroDocumento: string;

    /* Setters */
    setNombre: (v: string) => void;
    setApellido: (v: string) => void;
    setEmail: (v: string) => void;
    setTelefono: (v: string) => void;
    setCodigoPostal: (v: string) => void;
    setCalle: (v: string) => void;
    setNumero: (v: string) => void;
    setSinNumero: (v: boolean) => void;
    setDepartamento: (v: string) => void;
    setLocalidad: (v: string) => void;
    setProvincia: (v: string) => void;
    setTipoDocumento: (v: string) => void;
    setNumeroDocumento: (v: string) => void;
}
