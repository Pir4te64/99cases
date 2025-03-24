import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerPOST from "./RegisterPOST";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registerPOST(email, password);
      console.log("Datos de registro:", result);
      if (result.token) {
        // Toast indicando que se ha registrado correctamente
        toast.success(
          "¡Registro exitoso! Dirígete a la página de login para iniciar sesión."
        );
        // Redirigimos al usuario a la página de login
        navigate("/login");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Error en el registro");
    }
  };

  // Validación: ambos campos deben tener contenido
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 rounded-sm border-2 border-red-500">
        <h2 className="text-center text-2xl font-bold">Registrarse</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-white placeholder-white text-white bg-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-white placeholder-white text-white bg-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`group relative w-full flex justify-center py-2 px-4 border border-white text-sm font-medium rounded transition-colors ${
                isFormValid
                  ? "hover:bg-white hover:text-black"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Registrarse
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="underline hover:text-gray-300 transition-colors"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
