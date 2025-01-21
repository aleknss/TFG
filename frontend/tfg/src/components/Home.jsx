import React, { useEffect, useState } from "react";
import axios from "axios";
import caja from "../assets/images/caja.png";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llama al backend
    axios
      .get("http://127.0.0.1:8000/api/data")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  return (
    <div>
      <div className="apartado1 flex h-[600px] items-center mx-14">
        <div className="w-3/5 justify-center flex-col flex gap-4">
          <h1>
            Control Total de tu <br /> Inventario en Tiempo Real
          </h1>
          <p>
            Optimiza la gestión de tus productos, reduce costes y mejora la
            eficiencia de tus entregas con nuestra solución integral de gestión
            de inventario
          </p>
          <p className="boton">PRUÉBALO</p>
        </div>
        <div className="w-2/5 justify-center items-center flex">
          <img src={caja} alt="Caja" className="w-1/2" />
        </div>
      </div>

      <div className="apartado2 flex h-[600px] items-center">
        <div>
          <h1>¿A quién vamos dirigidos?</h1>
          <ul>
            <li>
              <p>Comercio</p>
            </li>
            <li>
              <p>Industria</p>
            </li>
            <li>
              <p>Bodegas</p>
            </li>
            <li>
              <p>Distribuidores</p>
            </li>
            <li>
              <p>Restaurantes</p>
            </li>
            <li>
              <p>Supermercados</p>
            </li>
            <li>
              <p>Casas</p>
            </li>
          </ul>
        </div>
      </div>

      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
