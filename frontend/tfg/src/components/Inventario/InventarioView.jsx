// src/views/InventarioView.jsx (o donde esté)
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { HiCamera, HiCheck, HiX } from "react-icons/hi";

import api from '../../services/api';
import { fetchInventarioById } from '../../services/inventario';
import { fetchArticulosByInventory, fetchLastTenHistoryByArticulo } from '../../services/articulo';
import InventarioCover from './InventarioCover';

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
                    const historyPromises = fetchedArticulos.map(articulo =>
                        fetchLastTenHistoryByArticulo(articulo.id)
                            .then(response => ({ articuloId: articulo.id, data: response.data || [] }))
                            .catch(err => {
                                console.warn(`Error fetching history for articulo ${articulo.id}:`, err);
                                return { articuloId: articulo.id, data: [], error: true };
                            })
                    );
                    const historyResults = await Promise.all(historyPromises);
                    const newHistoricos = {};
                    historyResults.forEach(result => {
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
                    setError(new Error(`Error al cargar el inventario base: ${err.message}`));
                } else {
                    setError(new Error(`Error al cargar artículos o historiales: ${err.message}`));
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
            await api.post(`/img/change-inventorycover?inventory_id=${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

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

    if (loading && !inventario) {
        return <div>Cargando datos del inventario {id}...</div>;
    }

    if (error && !inventario) {
        return <div>Error al cargar el inventario: {error.message || 'Error desconocido'}</div>;
    }

    if (!inventario) {
        return <div>No se encontró el inventario con ID {id}.</div>;
    }

    const numericId = parseInt(id, 10);

    return (
        <div className="p-5">

            <div className="flex flex-col md:flex-row gap-5 mb-5">

                <div className="relative w-full md:w-48 h-48 flex-shrink-0 group">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
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
                             !isNaN(numericId) && <InventarioCover inventarioId={numericId} cacheKey={imageCacheKey} />
                        )}
                    </div>

                    <div
                        className={`absolute inset-0 bg-black flex items-center justify-center rounded-md transition-opacity duration-300 ${
                            imageLoading
                                ? 'bg-opacity-50 cursor-default'
                                : 'bg-opacity-0 group-hover:bg-opacity-40 cursor-pointer opacity-0 group-hover:opacity-100'
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
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50 text-sm flex items-center gap-1"
                                onClick={handleImageUpload}
                                disabled={imageLoading}
                            >
                                <HiCheck /> {imageLoading ? "Subiendo..." : "Guardar"}
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-sm flex items-center gap-1"
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
                    <h1 className="text-2xl font-bold mb-2">Ver Inventario {id}</h1>
                    <p><strong>Nombre:</strong> {inventario.nombre || 'N/A'}</p>
                    <p><strong>Creado en:</strong> {inventario.creado_en ? new Date(inventario.creado_en).toLocaleString() : 'N/A'}</p>
                    {loading && inventario && <p className="text-sm italic text-gray-500 mt-2">Actualizando datos...</p>}
                    {error && inventario && <p className="text-orange-600 mt-2">Advertencia: {error.message}</p>}
                </div>
            </div>

            <hr className="my-5" />

            <h2 className="text-xl font-semibold mb-3">Artículos en este Inventario</h2>
            {articulos.length > 0 ? (
                 <ul>
                    {articulos.map(articulo => (
                        <li key={articulo.id} className="mb-5 pb-3 border-b border-gray-200">
                            <p><strong>Artículo ID:</strong> {articulo.id}</p>
                            <p><strong>Nombre:</strong> {articulo.nombre || 'Sin nombre'}</p>
                            <p><strong>Descripción:</strong> {articulo.descripcion || 'N/A'}</p>
                            <p><strong>Cantidad:</strong> {articulo.cantidad !== undefined ? articulo.cantidad : 'N/A'}</p>

                            <h4 className="font-semibold mt-2 mb-1">Últimos 10 Registros de Historial:</h4>
                            {historicos[articulo.id] ? (
                                historicos[articulo.id].length > 0 ? (
                                    <ul className="list-disc ml-5 text-sm space-y-1">
                                        {historicos[articulo.id].map((registro, index) => (
                                            <li key={registro.id || index}>
                                                <span className="text-gray-600">{registro.fecha ? new Date(registro.fecha).toLocaleString() : 'Fecha desconocida'}</span> -
                                                <strong> Acción:</strong> {registro.tipo_cambio || 'N/A'} |
                                                <strong> Cant. Anterior:</strong> {registro.cantidad_anterior ?? 'N/A'} |
                                                <strong> Cant. Nueva:</strong> {registro.cantidad_nueva ?? 'N/A'} |
                                                <strong> Usuario:</strong> {registro.usuario?.nombre || registro.usuario_id || 'N/A'}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">No hay registros de historial reciente para este artículo.</p>
                                )
                            ) : (
                                <p className="text-sm text-gray-500 italic">Historial no cargado o vacío.</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                 !error && <p className="text-gray-500">No se encontraron artículos asociados a este inventario.</p>
            )}
        </div>
    );
};

export default InventarioView;