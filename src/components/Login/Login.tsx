import { useState } from "react";
import { Link } from "react-router-dom";
import loginPOST from "@/components/Login/LoginPOST";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "@/store/authStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setToken = useAuthStore((state: any) => state.setToken);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginPOST(email, password);
      // Si la respuesta es exitosa, mostramos un toast
      toast.success("¡Logeo exitoso!");
      // Guardamos el token en localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);
        sessionStorage.setItem("token", result.token);
        setToken(result.token);
      }
      // Redirigir al usuario a la página de inicio
      window.location.href = "/";
    } catch (error) {
      console.error("Error de autenticación:", error.response.data.message);
      toast.error(error.response.data.message || "Error en la autenticación");
    }
  };

  // Validación simple: ambos campos deben tener contenido
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <ToastContainer />
      <div className="w-full max-w-md space-y-6 rounded-sm border-2 border-red-500 p-8">
        <h2 className="text-center text-2xl font-bold">Iniciar Sesión</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full appearance-none rounded-t-md border border-white bg-black px-3 py-2 text-white placeholder-white focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="relative block w-full appearance-none rounded-b-md border border-white bg-black px-3 py-2 text-white placeholder-white focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`group relative w-full flex justify-center py-2 px-4 border border-white text-sm font-medium rounded transition-colors ${isFormValid
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
              className="underline transition-colors hover:text-gray-300"
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
