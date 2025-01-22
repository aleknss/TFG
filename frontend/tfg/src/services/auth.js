import api from "./api";

export const registerUser = async (nombre, email, password) => {
  const response = await api.post("/usuarios/", { nombre, email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/usuarios/login", { email, password });
  return response.data;
};
