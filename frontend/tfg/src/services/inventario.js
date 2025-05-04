import api from "./api";

export const fetchInventariosByUser = (user_id) => {
  return api.get(`/inventories/user/${user_id}`);
};

export const fetchInventarioById = (id) => {
  return api.get(`/inventories/${id}`);
};

export const createInventario = (data) => {
  return api.post("/inventories", data);
};
