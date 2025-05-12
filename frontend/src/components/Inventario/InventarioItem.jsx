import React from "react";
import InventarioCover from "./InventarioView/InventarioCover";

const InventarioItem = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <div
      className={`
        flex flex-col items-center transition-all duration-300
        w-16
        gap-1
        
        lg:w-7/12
        lg:gap-2
      `}
    >
      <div
        className={`
          bg-gray-200 rounded-md flex justify-center items-center
          hover:bg-white hover:cursor-pointer hover:shadow-lg lg:hover:shadow-2xl 
          transition duration-300 overflow-hidden
          w-16 h-16
          
          lg:w-full lg:h-24
        `}
      >
        <InventarioCover inventarioId={item.id} />
      </div>
      <p
        className={`
          text-center text-gray-200
          text-xs leading-tight max-w-full truncate
          
          lg:text-sm lg:leading-normal
        `}
      >
        {item.nombre}
      </p>
    </div>
  );
};

export default InventarioItem;