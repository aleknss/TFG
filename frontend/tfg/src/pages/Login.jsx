import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import image from "../assets/images/login.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/cuenta");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(email, password);

      if (!success) {
        setError("Credenciales inválidas. Por favor, intenta de nuevo.");
      }
    } catch (err) {
      console.error("Error inesperado en handleSubmit:", err);
      setError("Ocurrió un error inesperado durante el inicio de sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_146px)] flex justify-center items-center w-full">
      <div className="flex flex-row justify-between w-2/3">
        <div className=" flex flex-col w-6/12 justify-center gap-8" id="izq">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-2xl font-montserrat font-semibold text-primary-color"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="bg-blue-100 w-full rounded-sm size-8 text-lg pl-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-2xl font-montserrat font-semibold text-primary-color"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="bg-blue-100 w-full rounded-sm size-8 text-lg pl-2"
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-color py-2 px-8 text-white rounded-md text-2xl w-fit flex justify-center font-montserrat font-semibold hover:bg-secondary-color transition-colors duration-300 ease-in-out"
            >
              {isSubmitting ? "Iniciando sesión..." : "ENTRAR"}
            </button>
          </form>
        </div>
        <div className="w-5/12 h-full">
          <img src={image}></img>
        </div>
      </div>
    </div>
  );
}

export default Login;
