import React from "react";
import caja from "../assets/images/caja.png";

function Home() {
  return (
    <div>
      <div className="apartado1 flex h-[600px] items-center mx-48">
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
    </div>
  );
}

export default Home;
