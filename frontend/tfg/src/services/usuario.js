import api from "./api";

export const getAvatarUrl = (userId) => {
  const base = api.defaults.baseURL?.replace(/\/+$/, "") || "";
  return `${base}/img/avatar/${userId}`;
};

export const fetchUsers = (user_id) => {
  return api.get(`/users/${user_id}`);
};
