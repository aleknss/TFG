import React from "react";
import InventarioCover from "./InventarioCover";

const InventarioItem = ({ key, item }) => {
  return (
    <div className="flex flex-col gap-2 w-7/12">
      <div className="bg-gray-200 w-full h-24 rounded-md flex justify-center items-center hover:bg-white hover:cursor-pointer hover:shadow-2xl transition duration-300">
        <InventarioCover inventarioId={item.id} />
      </div>
      <p className="text-center text-gray-200 text-sm">{item.nombre}</p>
    </div>
  );
};

export default InventarioItem;
