import { useState, FormEvent } from "react";

const Registro = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log("Email ingresado:", email);
  };

  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center space-y-4 bg-black text-center text-white">
      <h2 className="text-md mb-6 font-favoritExpanded sm:text-3xl md:text-xl">
        Regístrate y recibe nuestras ofertas.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center justify-center px-4 sm:flex-row"
      >
        <input
          type="email"
          placeholder="nombre@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-white bg-black px-4 py-2 font-favoritExpanded text-white sm:w-96 md:rounded-s-md"
          required
        />
        <button
          type="submit"
          className="mt-2 w-full rounded-sm border border-black bg-white p-2 font-favoritExpanded text-black hover:border-white hover:bg-black hover:text-white sm:mt-0 sm:w-auto md:rounded-e-md"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4 font-favoritExpanded text-base underline md:text-sm">
        Al hacer clic en Registrarse <br></br> confirmo que acepto nuestros{" "}
        <a href="#">Términos y Condiciones</a>.
      </p>
    </div>
  );
};

export default Registro;
