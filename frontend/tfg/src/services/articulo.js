import api from "./api";

/* Artículo */

export const fetchArticulos = () => {
    return api.get("/items");
};

export const fetchArticuloById = (id) => {
    return api.get(`/items/${id}`);
};

export const fetchArticulosByInventory = (inventory_id) => {
    return api.get(`/items/inv/${inventory_id}`);
};

/* Histórico */

export const fetchHistoryByArticulo = (articulo_id) => {
    return api.get(`/history/${articulo_id}`);
};

export const fetchLastTenHistoryByArticulo = (articulo_id) => {
    return api.get(`/history/ten/${articulo_id}`);
};