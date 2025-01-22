import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
import InventarioList from "../components/InventarioList";
import InventarioForm from "../components/InventarioForm";

const InventariosPage = () => {
  return (
    <div>
      <h1>Inventarios</h1>
      <InventarioForm />
      <InventarioList />
    </div>
  );
};

export default InventariosPage;
