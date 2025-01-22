// src/pages/ArticulosPage.jsx
import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
import ArticuloList from "../components/ArticuloList";
import ArticuloForm from "../components/ArticuloForm";

const ArticulosPage = () => {
  return (
    <div>
      <h1>Artículos</h1>
      <ArticuloForm />
      <ArticuloList />
    </div>
  );
};

export default ArticulosPage;
