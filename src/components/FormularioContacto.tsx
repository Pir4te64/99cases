import { useState, FormEvent } from "react";

const Registro = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log("Email ingresado:", email);
  };

  return (
    <div className="bg-black text-white w-full h-[500px] flex flex-col items-center space-y-4 justify-center text-center">
      <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-favoritMono">
        Regístrate y recibe nuestras ofertas.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center  w-full px-4"
      >
        <input
          type="email"
          placeholder="nombre@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 bg-black text-white border border-white rounded-sm md:rounded-s-md"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto mt-2 sm:mt-0 p-2 font-favoritMono bg-white text-black rounded-sm md:rounded-e-md hover:bg-black border border-black hover:border-white hover:text-white"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-base md:text-sm underline ">
        Al hacer clic en Registrarse <br></br> confirmo que acepto nuestros{" "}
        <a href="#">Términos y Condiciones</a>.
      </p>
    </div>
  );
};

export default Registro;
