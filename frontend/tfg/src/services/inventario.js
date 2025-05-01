import api from "./api";

export const fetchItemsByUser = (user_id) => {
  return api.get(`/inventories/user/${user_id}`);
};

export const fetchItemById = (id) => {
  return api.get(`/inventories/${id}`);
};
