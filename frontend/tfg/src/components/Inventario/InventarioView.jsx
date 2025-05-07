import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { HiCamera, HiCheck, HiX, HiPencil } from "react-icons/hi";
import Articulo from "./InventarioView/Articulo";
import Grafico from "./InventarioView/Grafico";
import InventarioCover from "./InventarioView/InventarioCover";

import api from "../../services/api";
import {
  fetchInventarioById,
  deleteInventario,
  updateInventario,
} from "../../services/inventario";
import {
  fetchArticulosByInventory,
  fetchLastTenHistoryByArticulo,
} from "../../services/articulo";

const InventarioView = () => {
  const { id } = useParams();
  const [inventario, setInventario] = useState(null);
  const [articulos, setArticulos] = useState([]);
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

  const [chartDatasets, setChartDatasets] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  const colors = ["#E40039", "#4193AC", "#FFD045", "#00A859", "#F37021"];

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setError(new Error("ID de inventario no proporcionado."));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
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
      } catch (err) {
        console.error("Error fetching inventory data:", err);
        setError(new Error(`Error al cargar datos: ${err.message}`));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  useEffect(() => {
    const loadHistoricalData = async () => {
      setChartLoading(true);
      const articlesForChart = articulos.slice(0, 3);

      const historyPromises = articlesForChart.map(async (articulo, i) => {
        if (!articulo || !articulo.id) return null; 

        try {
          const historyResponse = await fetchLastTenHistoryByArticulo(
            articulo.id
          );

          if (historyResponse.data && historyResponse.data.length > 0) {
            const historyData = historyResponse.data
              .map((record) => ({
                tiempo: record.fecha_registro,
                valor: record.cantidad,
              }))
              .sort((a, b) => new Date(a.tiempo) - new Date(b.tiempo));

            return {
              label: articulo.nombre || `Artículo ${i + 1}`,
              data: historyData,
              borderColor: colors[i % colors.length],
              backgroundColor: `${colors[i % colors.length]}33`,
              tension: 0.1,
              fill: false,
            };
          } else {
            console.log(
              `No hay datos históricos para ${
                articulo.nombre || `Artículo ${i + 1}`
              }`
            );
            return null;
          }
        } catch (err) {
          console.error(
            `Error fetching history for articulo ${articulo.id} (${articulo.nombre}):`,
            err
          );
          return null;
        }
      });

      const resolvedDatasets = (await Promise.all(historyPromises)).filter(
        (ds) => ds !== null
      );

      setChartDatasets(resolvedDatasets);
      setChartLoading(false);
    };

    if (articulos && articulos.length > 0) {
      loadHistoricalData();
    } else {
      setChartDatasets([]);
      setChartLoading(false);
    }
  }, [articulos]);

  const handleDelete = async () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres borrar el inventario "${
          inventario?.nombre || id
        }"? Esta acción no se puede deshacer.`
      )
    ) {
      try {
        await deleteInventario(id);
        window.location.href = "/inventarios";
      } catch (err) {
        console.error("Error deleting inventory:", err);
        alert(`Error al borrar el inventario: ${err.message}`);
      }
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
    if (!id || editedName.trim() === "" || editedName === inventario?.nombre) {
      setIsEditingName(false);
      if (editedName.trim() === "")
        setNameError("El nombre no puede estar vacío.");
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

  const handleUpdateSuccess = (updatedArticuloId, updatedData) => {
    setArticulos((currentArticulos) =>
      currentArticulos.map((item) =>
        item.id === updatedArticuloId ? { ...item, ...updatedData } : item
      )
    );
    console.log(`Articulo ${updatedArticuloId} updated successfully!`);
  };

  if (loading && !inventario) {
    return (
      <div className="p-4 text-center">
        Cargando datos del inventario {id}...
      </div>
    );
  }

  if (error && !inventario) {
    return (
      <div className="p-4 text-center text-red-600">
        Error al cargar el inventario: {error.message || "Error desconocido"}
      </div>
    );
  }

  if (!inventario) {
    return (
      <div className="p-4 text-center">
        No se encontró el inventario con ID {id}.
      </div>
    );
  }

  const numericId = parseInt(id, 10);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 p-4" id="main">
      <div id="left" className="flex flex-col gap-4 w-full lg:w-2/6">
        <div
          id="inventario"
          className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex w-full md:w-48 h-48 flex-shrink-0 group mx-auto md:mx-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
              disabled={imageLoading}
            />
            <div className="w-full h-full rounded-md overflow-hidden border border-gray-300">
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  alt="Previsualización de portada"
                  className="object-cover w-full h-full"
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
              {imageLoading && (
                <div className="text-white animate-pulse">Cargando...</div>
              )}
            </div>
            {selectedFile && !imageLoading && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-auto flex justify-center gap-2 p-1 bg-black bg-opacity-60 rounded">
                <button
                  className="bg-primary-color text-white px-3 py-1 rounded hover:bg-secondary-color disabled:opacity-50 text-xs flex items-center gap-1"
                  onClick={handleImageUpload}
                  disabled={imageLoading}
                >
                  <HiCheck /> Guardar
                </button>
                <button
                  className="bg-rojo text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-xs flex items-center gap-1"
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

          <div className="flex-grow flex flex-col justify-between">
            <div id="nombre" className="mb-2">
              {isEditingName ? (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2">
                    <strong className="text-lg flex-shrink-0">Nombre:</strong>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border rounded px-2 py-1 text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-primary-color"
                      disabled={nameLoading}
                      aria-label="Editar Nombre del Inventario"
                      autoFocus
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSaveNameClick()
                      }
                    />
                  </div>
                  {nameError && (
                    <p className="text-red-500 text-xs mt-1">{nameError}</p>
                  )}
                  <div className="flex flex-row gap-2 justify-start mt-2">
                    <button
                      onClick={handleSaveNameClick}
                      disabled={nameLoading || editedName.trim() === ""}
                      className={`px-3 py-1 text-sm text-white rounded flex items-center gap-1 ${
                        nameLoading || editedName.trim() === ""
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
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
                    >
                      <HiX className="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-800 break-all">
                    {inventario.nombre || "Inventario Sin Nombre"}
                  </h1>
                  <button
                    onClick={handleEditNameClick}
                    className="ml-2 p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:text-blue-600 transition-all duration-150 flex-shrink-0"
                    aria-label="Editar nombre del inventario"
                  >
                    <HiPencil className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Creado:{" "}
              {inventario.creado_en
                ? new Date(inventario.creado_en).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
            {loading && inventario && (
              <p className="text-sm italic text-gray-500 mt-1">
                Actualizando datos...
              </p>
            )}
            {error && inventario && (
              <p className="text-orange-600 mt-1 text-sm">
                Advertencia: {error.message}
              </p>
            )}
            <button
              onClick={handleDelete}
              className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 text-base w-full md:w-auto self-start"
            >
              Borrar Inventario
            </button>
          </div>
        </div>

        <hr className="my-4" />

        <div id="articulos" className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">
            Artículos
          </h2>
          {articulos.length > 0 ? (
            <div className="space-y-3">
              {articulos.slice(0, 3).map((item, index) => {
                if (!item || typeof item.nombre === "undefined") {
                  console.warn(`Item at index ${index} is invalid:`, item);
                  return (
                    <div key={`invalid-item-${index}`} className="text-red-500">
                      Artículo inválido detectado.
                    </div>
                  );
                }
                const color = colors[index % colors.length];

                return (
                  <Articulo
                    key={item.id || `articulo-${index}`}
                    articulo={item.nombre}
                    color={color}
                    descripcion={item.descripcion}
                    cantidad={item.cantidad_actual}
                    onUpdateSuccess={(updatedData) =>
                      handleUpdateSuccess(item.id, updatedData)
                    }
                    id={item.id}
                  />
                );
              })}
              {articulos.length > 3 && (
                <p className="text-sm text-gray-500 mt-2">
                  Y {articulos.length - 3} más artículos...
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              No hay artículos en este inventario.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-12 box-border w-full lg:w-4/6 flex-grow h-[500px]">
        <h2 className="text-xl font-semibold mb-3">
          Historial
        </h2>
        {chartLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>Cargando datos del gráfico...</p>
          </div>
        ) : chartDatasets.length > 0 ? (
          <Grafico datasets={chartDatasets} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">
              No hay datos históricos para mostrar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventarioView;
