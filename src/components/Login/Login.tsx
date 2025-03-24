import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginPOST from "./LoginPOST";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginPOST(email, password);
      // Si la respuesta es exitosa, mostramos un toast
      toast.success("¡Logeo exitoso!");
      console.log("Datos de login:", result);
      // Guardamos el token en localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      // Aquí podrías redirigir al usuario o ejecutar otra acción
    } catch (error) {
      console.error("Error de autenticación:", error);
      toast.error("Error en la autenticación");
    }
  };

  // Validación simple: ambos campos deben tener contenido
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 rounded-sm border-2 border-red-500">
        <h2 className="text-center text-2xl font-bold">Iniciar Sesión</h2>
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
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="underline hover:text-gray-300 transition-colors"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
