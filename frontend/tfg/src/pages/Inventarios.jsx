import React from "react";
import InventarioItem from "../components/InventarioItem";

const Inventarios = () => {
  return (
    <div>
      <div className="fixed bg-primary-color w-1/12 h-5/6 m-4 rounded-lg">
        <InventarioItem />
      </div>
    </div>
  );
};

export default Inventarios;
