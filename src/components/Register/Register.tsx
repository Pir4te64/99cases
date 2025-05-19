import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerPOST from "@/components/Register/RegisterPOST";
import loginPOST from "@/components/Login/LoginPOST"; // Asegúrate de que la ruta sea la correcta
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await registerPOST(email, password);
      console.log("Datos de registro:", result);
      if (result.token) {
        toast.success("¡Registro exitoso! Iniciando sesión...");
        try {
          const loginResult = await loginPOST(email, password);
          if (loginResult.token) {
            // Guardar el token en el localStorage
            localStorage.setItem("token", loginResult.token);
            navigate("/");
          } else {
            toast.error("Error al iniciar sesión");
          }
        } catch (loginError) {
          console.error("Error en el login:", loginError);
          toast.error("Error al iniciar sesión");
        }
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Error en el registro");
    } finally {
      setLoading(false);
    }
  };

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
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-white placeholder-white text-white bg-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              disabled={!isFormValid || loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-white text-sm font-medium rounded transition-colors ${
                isFormValid && !loading
                  ? "hover:bg-white hover:text-black"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Cargando..." : "Registrarse"}
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
