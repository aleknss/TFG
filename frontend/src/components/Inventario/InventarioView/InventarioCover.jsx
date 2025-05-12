import React, { useState, useEffect } from "react";

export default function InventarioCover({ inventarioId, cacheKey }) {
  const [failed, setFailed] = useState(false);
 
  const url = `${import.meta.env.VITE_API_BASE_URL}/img/inventorycover/${inventarioId}?cache=${cacheKey || Date.now()}`;

  useEffect(() => {
    setFailed(false);
  }, [inventarioId, cacheKey]); 

  if (failed || !inventarioId) {
    return (
        <div className="rounded-md bg-gray-200 w-full h-full border border-gray-300 flex items-center justify-center text-gray-500">
            <span>Sin imagen</span>
        </div>
    );
  }

  return (
    <img
      key={url}
      src={url}
      alt={`Portada inventario ${inventarioId}`}
      className="rounded-md object-cover w-full h-full border border-gray-300"
      onError={() => {
        setFailed(true);
      }}
    />
  );
}