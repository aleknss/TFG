import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

import { useAuth } from "../../context/AuthContext";

const InventarioView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authIsLoading } = useAuth();

  const [inventario, setInventario] = useState(null);
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

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

  const colors = ["#FFD045", "#4193AC", "#E40039"];

  useEffect(() => {
    if (authIsLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      if (!id) {
        setError(new Error("ID de inventario no proporcionado."));
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      setAccessDenied(false);
      setSelectedFile(null);
      setImagePreviewUrl(null);
      setImageError("");
      setImageCacheKey(Date.now());

      try {
        const inventarioResponse = await fetchInventarioById(id);
        const fetchedInventario = inventarioResponse.data;

        if (
          user &&
          fetchedInventario &&
          typeof user.id !== "undefined" &&
          typeof fetchedInventario.usuario_id !== "undefined"
        ) {
          if (fetchedInventario.usuario_id !== user.id) {
            setAccessDenied(true);
            setInventario(null);
            setArticulos([]);
            setLoading(false);
            return;
          }
        } else {
          console.warn(
            "User ID or Inventario User ID is undefined, cannot perform access check."
          );
          setAccessDenied(true);
          setInventario(null);
          setArticulos([]);
          setLoading(false);
          return;
        }

        setInventario(fetchedInventario);
        setIsEditingName(false);
        setEditedName(fetchedInventario?.nombre || "");

        const articulosResponse = await fetchArticulosByInventory(id);
        const fetchedArticulos = articulosResponse.data || [];
        setArticulos(fetchedArticulos);
      } catch (err) {
        console.error("Error fetching inventory data:", err);
        if (err.response) {
          if (err.response.status === 404) {
            setError(new Error(`Inventario con ID ${id} no encontrado.`));
          } else if (err.response.status === 403) {
            setAccessDenied(true);
            setError(new Error("Acceso denegado por el servidor."));
          } else {
            setError(
              new Error(
                `Error al cargar datos: ${err.message} (status: ${err.response.status})`
              )
            );
          }
        } else {
          setError(new Error(`Error al cargar datos: ${err.message}`));
        }
        setInventario(null);
        setArticulos([]);
      } finally {
        setLoading(false);
      }
    };

    if (id && user) {
      loadData();
    } else if (!id) {
      setError(new Error("ID de inventario no proporcionado."));
      setLoading(false);
    }
  }, [id, isAuthenticated, authIsLoading, navigate]);

  useEffect(() => {
    if (accessDenied || !inventario || !articulos || articulos.length === 0) {
      setChartDatasets([]);
      setChartLoading(false);
      return;
    }
    setChartLoading(true);
    const loadHistoricalData = async () => {
      const articlesForChart = articulos.slice(
        0,
        Math.min(articulos.length, 3)
      );

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
          }
          return null;
        } catch (err) {
          console.error(
            `Error fetching history for articulo ${articulo.id} (${articulo.nombre}):`,
            err
          );
          return null;
        }
      });
      try {
        const resolvedDatasets = (await Promise.all(historyPromises)).filter(
          (ds) => ds !== null
        );
        setChartDatasets(resolvedDatasets);
      } catch (error) {
        console.error("Error resolving chart data promises:", error);
        setChartDatasets([]);
      } finally {
        setChartLoading(false);
      }
    };

    loadHistoricalData();
  }, [articulos, inventario, accessDenied]);

  const handleDelete = async () => {
    if (!inventario) return;
    if (
      window.confirm(
        `¿Estás seguro de que quieres borrar el inventario "${
          inventario.nombre || id
        }"? Esta acción no se puede deshacer.`
      )
    ) {
      setLoading(true);
      setError(null);
      try {
        await deleteInventario(id);
        navigate("/inventarios");
      } catch (err) {
        console.error("Error deleting inventory:", err);
        setError(
          new Error(
            `Error al borrar el inventario: ${
              err.response?.data?.detail || err.message
            }`
          )
        );
        setLoading(false);
      }
    }
  };

  const handleImageClick = () => {
    if (!inventario || imageLoading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    if (!inventario) return;
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageError("");
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null);
      setImageError(file ? "Archivo no válido. Selecciona una imagen." : "");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancelUpload = () => {
    if (!inventario) return;
    setSelectedFile(null);
    setImagePreviewUrl(null);
    setImageError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !id || !inventario) return;
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
      setImageCacheKey(Date.now());
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error uploading inventory cover:", err);
      setImageError(
        err.response?.data?.detail || err.message || "Error al subir la imagen."
      );
    } finally {
      setImageLoading(false);
    }
  };

  const handleEditNameClick = () => {
    if (!inventario) return;
    setEditedName(inventario.nombre || "");
    setIsEditingName(true);
    setNameError(null);
  };

  const handleCancelNameClick = () => {
    setIsEditingName(false);
    setNameError(null);
  };

  const handleSaveNameClick = async () => {
    if (!inventario) return;
    if (editedName.trim() === "") {
      setNameError("El nombre no puede estar vacío.");
      return;
    }
    if (editedName.trim() === inventario.nombre) {
      setIsEditingName(false);
      return;
    }
    setNameLoading(true);
    setNameError(null);
    try {
      await updateInventario(id, { nombre: editedName.trim() });
      setInventario((prev) => ({ ...prev, nombre: editedName.trim() }));
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
    if (!inventario) return;
    setArticulos((currentArticulos) =>
      currentArticulos.map((item) =>
        item.id === updatedArticuloId ? { ...item, ...updatedData } : item
      )
    );
  };

  if (authIsLoading) {
    return <div className="p-4 text-center">Verificando autenticación...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center text-rojo">
        Debes iniciar sesión para ver esta página.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        Cargando datos del inventario {id}...
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="p-4 text-center text-rojo">
        {error?.message ||
          "No tienes permiso para ver este inventario o no existe."}
      </div>
    );
  }

  if (error && !inventario) {
    return (
      <div className="p-4 text-center text-rojo">
        Error al cargar el inventario: {error.message || "Error desconocido"}
      </div>
    );
  }

  if (!inventario) {
    return (
      <div className="p-4 text-center">
        No se encontró el inventario con ID {id}, o no tienes acceso.
      </div>
    );
  }

  const numericId = parseInt(id, 10);

  return (
    <div
      className="w-full flex flex-col lg:flex-row gap-4 p-4 mb-32 lg:mb-0"
      id="main-inventario-view"
    >
      <div
        id="left-column"
        className="flex flex-col gap-4 w-full lg:w-2/5 xl:w-1/3"
      >
        <div
          id="inventario-info-section"
          className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex w-full max-w-[12rem] md:w-48 h-48 flex-shrink-0 group mx-auto md:mx-0">
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
              {!imageLoading && (
                <HiCamera className="text-white text-3xl md:text-4xl" />
              )}
              {imageLoading && (
                <div className="text-white text-sm animate-pulse">
                  Cargando...
                </div>
              )}
            </div>
            {selectedFile && !imageLoading && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-auto flex flex-col xs:flex-row justify-center gap-1 xs:gap-2 p-1 bg-black bg-opacity-60 rounded">
                <button
                  className="bg-primary-color text-white px-2 py-1 xs:px-3 rounded hover:bg-secondary-color disabled:opacity-50 text-xs flex items-center gap-1"
                  onClick={handleImageUpload}
                  disabled={imageLoading}
                >
                  <HiCheck className="w-3 h-3 xs:w-4 xs:h-4" /> Guardar
                </button>
                <button
                  className="bg-rojo text-white px-2 py-1 xs:px-3 rounded hover:bg-red-700 disabled:opacity-50 text-xs flex items-center gap-1"
                  onClick={handleCancelUpload}
                  disabled={imageLoading}
                >
                  <HiX className="w-3 h-3 xs:w-4 xs:h-4" /> Cancelar
                </button>
              </div>
            )}
            {imageError && (
              <div className="absolute top-1 left-1 right-1 text-center text-rojo bg-white bg-opacity-80 p-1 rounded text-xs font-medium">
                {imageError}
              </div>
            )}
          </div>

          <div className="flex-grow flex flex-col justify-between min-w-0">
            <div id="nombre-inventario" className="mb-2">
              {isEditingName ? (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="editedInventoryName"
                      className="text-base md:text-lg font-semibold flex-shrink-0 sr-only"
                    >
                      Nombre:
                    </label>
                    <input
                      id="editedInventoryName"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border rounded px-2 py-1 text-base md:text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-primary-color min-w-0"
                      disabled={nameLoading}
                      aria-label="Editar Nombre del Inventario"
                      autoFocus
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSaveNameClick()
                      }
                    />
                  </div>
                  {nameError && (
                    <p className="text-rojo text-xs mt-1">{nameError}</p>
                  )}
                  <div className="flex flex-col xs:flex-row gap-2 justify-start mt-2">
                    <button
                      onClick={handleCancelNameClick}
                      disabled={nameLoading}
                      className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      <HiX className="w-4 h-4" /> Cancelar
                    </button>
                    <button
                      onClick={handleSaveNameClick}
                      disabled={nameLoading || editedName.trim() === ""}
                      className={`px-3 py-1 text-sm text-white rounded ${
                        nameLoading || editedName.trim() === ""
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-primary-color hover:bg-tertiary-color"
                      } disabled:opacity-70 flex items-center justify-center gap-1`}
                    >
                      <HiCheck className="w-4 h-4" />
                      {nameLoading ? "Guardando..." : "Guardar"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-1">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 break-words hyphens-auto">
                    {inventario.nombre || "Inventario Sin Nombre"}
                  </h1>
                  <button
                    onClick={handleEditNameClick}
                    className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:text-blue-600 transition-all duration-150 flex-shrink-0 mt-0.5 md:mt-1"
                    aria-label="Editar nombre del inventario"
                  >
                    <HiPencil className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs md:text-sm text-gray-500">
              Creado:{" "}
              {inventario.creado_en
                ? new Date(inventario.creado_en).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
            {error && inventario && (
              <p className="text-rojo mt-1 text-xs">Error: {error.message}</p>
            )}
            <button
              onClick={handleDelete}
              className="mt-3 bg-rojo text-white px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-red-700 disabled:opacity-50 text-sm md:text-base w-full sm:w-auto self-start md:self-start"
              disabled={loading}
            >
              {loading && !nameLoading && !imageLoading
                ? "Procesando..."
                : "Borrar Inventario"}
            </button>
          </div>
        </div>

        <hr className="my-2 md:my-4" />

        <div
          id="articulos-section"
          className="bg-white shadow-md rounded-lg p-3 md:p-4"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-700">
            Artículos
          </h2>
          {articulos.length > 0 ? (
            <div className="space-y-2 md:space-y-3">
              {articulos.slice(0, 3).map((item, index) => {
                if (!item || typeof item.nombre === "undefined") {
                  console.warn(`Item at index ${index} is invalid:`, item);
                  return (
                    <div
                      key={`invalid-item-${index}`}
                      className="text-rojo p-2"
                    >
                      Artículo inválido detectado.
                    </div>
                  );
                }
                return (
                  <Articulo
                    key={item.id || `articulo-${index}`}
                    id={item.id}
                    articulo={item.nombre}
                    color={colors[index % colors.length]}
                    descripcion={item.descripcion}
                    cantidad={item.cantidad_actual}
                    onUpdateSuccess={handleUpdateSuccess}
                  />
                );
              })}
              {articulos.length > 3 && (
                <p className="text-xs md:text-sm text-gray-500 mt-2 pl-1">
                  Y {articulos.length - 3} más artículos...
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm md:text-base">
              No hay artículos en este inventario.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 box-border w-full lg:w-3/5 xl:w-2/3 flex-grow h-[400px] md:h-[500px] flex flex-col">
        <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-700 flex-shrink-0">
          Historial
        </h2>
        <div className="flex-grow min-h-0">
          {chartLoading ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              Cargando datos del gráfico...
            </div>
          ) : chartDatasets.length > 0 ? (
            <Grafico datasets={chartDatasets} />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              No hay datos históricos para mostrar o no hay artículos
              seleccionados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventarioView;
