import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { HiCamera, HiCheck, HiX, HiPencil } from "react-icons/hi";
import Articulo from "./InventarioView/Articulo";
import { updateInventario } from "../../services/inventario";

import api from "../../services/api";
import {
  fetchInventarioById,
  deleteInventario,
} from "../../services/inventario";
import {
  fetchArticulosByInventory,
  fetchLastTenHistoryByArticulo,
} from "../../services/articulo";
import InventarioCover from "./InventarioView/InventarioCover";

const InventarioView = () => {
  const { id } = useParams();
  const [inventario, setInventario] = useState(null);
  const [articulos, setArticulos] = useState([]);
  const [historicos, setHistoricos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [imageCacheKey, setImageCacheKey] = useState(Date.now());
  const fileInputRef = useRef(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [nameError, setNameError] = useState(null);

  const colors = ["#E40039", "#4193AC", "#FFD045"];

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setError(new Error("ID de inventario no proporcionado."));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setArticulos([]);
      setHistoricos({});
      setSelectedFile(null);
      setImagePreviewUrl(null);
      setImageError("");
      setImageCacheKey(Date.now());

      try {
        const inventarioResponse = await fetchInventarioById(id);
        setInventario(inventarioResponse.data);

        const articulosResponse = await fetchArticulosByInventory(id);
        const fetchedArticulos = articulosResponse.data || [];
        setArticulos(fetchedArticulos);

        if (fetchedArticulos.length > 0) {
          const historyPromises = fetchedArticulos.map((articulo) =>
            fetchLastTenHistoryByArticulo(articulo.id)
              .then((response) => ({
                articuloId: articulo.id,
                data: response.data || [],
              }))
              .catch((err) => {
                console.warn(
                  `Error fetching history for articulo ${articulo.id}:`,
                  err
                );
                return { articuloId: articulo.id, data: [], error: true };
              })
          );
          const historyResults = await Promise.all(historyPromises);
          const newHistoricos = {};
          historyResults.forEach((result) => {
            if (result && !result.error) {
              newHistoricos[result.articuloId] = result.data;
            } else {
              newHistoricos[result.articuloId] = [];
            }
          });
          setHistoricos(newHistoricos);
        }
      } catch (err) {
        console.error("Error fetching inventory data:", err);
        if (!inventario) {
          setError(
            new Error(`Error al cargar el inventario base: ${err.message}`)
          );
        } else {
          setError(
            new Error(`Error al cargar artículos o historiales: ${err.message}`)
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteInventario(id);
      window.location.href = "/inventarios";
    } catch (err) {
      console.error("Error deleting inventory:", err);
    }
  };

  const handleImageClick = () => {
    if (!imageLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageError("");
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null);
      if (file) {
        setImageError("Archivo no válido. Selecciona una imagen.");
      } else {
        setImageError("");
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setImageError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !id) return;

    const formData = new FormData();
    formData.append("inventorycover", selectedFile);

    setImageLoading(true);
    setImageError("");

    try {
      await api.post(
        `/img/change-inventorycover?inventory_id=${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSelectedFile(null);
      setImagePreviewUrl(null);
      const newCacheKey = Date.now();
      setImageCacheKey(newCacheKey);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error uploading inventory cover:", err);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Error al subir la imagen.";
      setImageError(errorMessage);
    } finally {
      setImageLoading(false);
    }
  };

  // editar nombre
  const handleEditNameClick = () => {
    setEditedName(inventario?.nombre || "");
    setIsEditingName(true);
    setNameError(null);
  };

  const handleCancelNameClick = () => {
    setIsEditingName(false);
    setNameError(null);
  };

  const handleSaveNameClick = async () => {
    if (!id || editedName === inventario?.nombre) {
      setIsEditingName(false);
      return;
    }

    setNameLoading(true);
    setNameError(null);
    try {
      const updatedData = {
        nombre: editedName,
      };

      await updateInventario(id, updatedData);

      setInventario((prevInventario) => ({
        ...prevInventario,
        nombre: editedName,
      }));

      setIsEditingName(false);
    } catch (err) {
      console.error("Failed to update inventory name:", err);
      setNameError(
        err.response?.data?.detail ||
          err.message ||
          "Error al guardar el nombre."
      );
    } finally {
      setNameLoading(false);
    }
  };

  const handleUpdateSuccess = (id, updatedData) => {
    setArticulos((currentArticulos) =>
      currentArticulos.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
    console.log(`Articulo ${id} updated successfully!`);
  };

  if (loading && !inventario) {
    return <div>Cargando datos del inventario {id}...</div>;
  }

  if (error && !inventario) {
    return (
      <div>
        Error al cargar el inventario: {error.message || "Error desconocido"}
      </div>
    );
  }

  if (!inventario) {
    return <div>No se encontró el inventario con ID {id}.</div>;
  }

  const numericId = parseInt(id, 10);

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="relative w-full md:w-48 h-48 flex-shrink-0 group">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
            disabled={imageLoading}
          />

          <div className="w-full h-full">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Previsualización de portada"
                className="rounded-md object-cover w-full h-full border border-gray-300"
              />
            ) : (
              !isNaN(numericId) && (
                <InventarioCover
                  inventarioId={numericId}
                  cacheKey={imageCacheKey}
                />
              )
            )}
          </div>

          <div
            className={`absolute inset-0 bg-black flex items-center justify-center rounded-md transition-opacity duration-300 ${
              imageLoading
                ? "bg-opacity-50 cursor-default"
                : "bg-opacity-0 group-hover:bg-opacity-40 cursor-pointer opacity-0 group-hover:opacity-100"
            }`}
            onClick={handleImageClick}
            title="Cambiar imagen de portada"
          >
            {!imageLoading && <HiCamera className="text-white text-4xl" />}
            {imageLoading && <div className="text-white">Cargando...</div>}
          </div>

          {selectedFile && (
            <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2 p-1 bg-black bg-opacity-50 rounded">
              <button
                className="bg-primary-color text-white px-3 py-1 rounded hover:bg-secondary-color disabled:opacity-50 text-sm flex items-center gap-1"
                onClick={handleImageUpload}
                disabled={imageLoading}
              >
                <HiCheck /> {imageLoading ? "Subiendo..." : "Guardar"}
              </button>
              <button
                className="bg-rojo text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-sm flex items-center gap-1"
                onClick={handleCancelUpload}
                disabled={imageLoading}
              >
                <HiX /> Cancelar
              </button>
            </div>
          )}
          {imageError && (
            <div className="absolute top-2 left-2 right-2 text-center text-red-600 bg-white bg-opacity-80 p-1 rounded text-xs font-medium">
              {imageError}
            </div>
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {isEditingName ? (
              <div className="flex flex-col gap-1 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <strong className="flex-shrink-0">Nombre:</strong>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border rounded px-2 py-1 flex-grow text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={nameLoading}
                    aria-label="Editar Nombre del Inventario"
                    autoFocus
                  />
                </div>
                {nameError && (
                  <p className="text-red-500 text-xs mt-1">{nameError}</p>
                )}
                <div className="flex flex-row gap-2 justify-start mt-1">
                  <button
                    onClick={handleSaveNameClick}
                    disabled={nameLoading}
                    className={`px-3 py-1 text-sm text-white rounded flex items-center gap-1 ${
                      nameLoading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } disabled:opacity-70`}
                  >
                    <HiCheck className="w-4 h-4" />
                    {nameLoading ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    onClick={handleCancelNameClick}
                    disabled={nameLoading}
                    className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
                  >
                    <HiX className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="flex-grow min-w-0 text-lg">
                  <strong>Nombre:</strong> {inventario.nombre || "N/A"}
                </p>
                <button
                  onClick={handleEditNameClick}
                  className="ml-2 p-1.5 rounded text-gray-500 hover:text-blue-600 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:text-blue-600 transition-all duration-150 flex-shrink-0"
                  aria-label="Editar nombre del inventario"
                >
                  <HiPencil className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <p>
            <strong>Creado en:</strong>{" "}
            {inventario.creado_en
              ? new Date(inventario.creado_en).toLocaleString()
              : "N/A"}
          </p>
          {loading && inventario && (
            <p className="text-sm italic text-gray-500 mt-2">
              Actualizando datos...
            </p>
          )}
          {error && inventario && (
            <p className="text-orange-600 mt-2">Advertencia: {error.message}</p>
          )}

          <button
            onClick={handleDelete}
            className="mt-5 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-sm flex items-center gap-1"
          >
            Borrar
          </button>
        </div>
      </div>

      <hr className="my-5" />

      <h2 className="text-xl font-semibold mb-3">
        Artículos en este Inventario
      </h2>

      {articulos.slice(0, 3).map((item, index) => {
        if (!item || typeof item.nombre === "undefined") {
          console.warn(`Item at index ${index} is invalid:`, item);
          return null;
        }
        const color = colors[index];
        if (!color) {
          console.warn(`No corresponding color found for index ${index}`);
        }

        return (
          <Articulo
            key={item.id || `Artículo-${index}`}
            articulo={item.nombre}
            color={color}
            descripcion={item.descripcion}
            onUpdateSuccess={handleUpdateSuccess}
            id={item.id}
          />
        );
      })}
    </div>
  );
};

export default InventarioView;
