import React, { useState } from 'react';
import { HiPencil, HiCheck, HiX } from 'react-icons/hi';
import { updateArticulo } from '../../../services/articulo';

export default function Articulo({ id, color, articulo, descripcion, onUpdateSuccess }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedArticulo, setEditedArticulo] = useState(articulo);
    const [editedDescripcion, setEditedDescripcion] = useState(descripcion);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEditClick = () => {
        setEditedArticulo(articulo);
        setEditedDescripcion(descripcion);
        setIsEditing(true);
        setError(null);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setError(null);
    };

    const handleSaveClick = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedData = {
                nombre: editedArticulo,
                descripcion: editedDescripcion,
            };
            await updateArticulo(id, updatedData);
            setIsEditing(false);
            if (onUpdateSuccess) {
                onUpdateSuccess(id, updatedData);
            }
        } catch (err) {
            console.error("Failed to update item:", err);
            setError(err.message || "Failed to save changes. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isEditing) {
        return (
            <div className="flex flex-col gap-2 m-2 p-3 border rounded border-blue-300 bg-white shadow-sm">
                <div className="flex flex-row items-center gap-2">
                    <svg height="20" width="20" className="flex-shrink-0">
                        <circle r="10" cx="10" cy="10" fill={color} />
                    </svg>
                    <input
                        type="text"
                        value={editedArticulo}
                        onChange={(e) => setEditedArticulo(e.target.value)}
                        className="border rounded px-2 py-1 flex-grow text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isLoading}
                        aria-label="Edit Articulo Name"
                    />
                </div>
                <textarea
                    value={editedDescripcion}
                    onChange={(e) => setEditedDescripcion(e.target.value)}
                    className="border rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="3"
                    disabled={isLoading}
                    aria-label="Edit Articulo Description"
                />
                {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
                <div className="flex flex-row gap-2 justify-end mt-1">
                    <button
                        onClick={handleCancelClick}
                        disabled={isLoading}
                        className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1" 
                    >
                        <HiX className="w-4 h-4" />
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveClick}
                        disabled={isLoading}
                        className={`px-3 py-1 text-sm text-white rounded ${
                            isLoading
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                        } disabled:opacity-70 flex items-center gap-1`}
                    >
                        <HiCheck className="w-4 h-4" /> 
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row items-center gap-2 m-2 p-1 group hover:bg-gray-50 rounded transition-colors duration-150">
            <svg height="20" width="20" className="flex-shrink-0">
                <circle r="10" cx="10" cy="10" fill={color} />
            </svg>
            <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0"> 
                <span className="font-medium truncate">{articulo}</span> 
                <span className="text-gray-600 text-sm truncate">{descripcion}</span> 
            </div>
            <button
                 onClick={handleEditClick}
                 className="ml-auto p-1.5 rounded text-gray-500 hover:text-blue-600 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:text-blue-600 transition-all duration-150 flex-shrink-0" 
                 aria-label={`Edit ${articulo}`} 
            >
                <HiPencil className="w-5 h-5" /> 
            </button>
        </div>
    );
}
