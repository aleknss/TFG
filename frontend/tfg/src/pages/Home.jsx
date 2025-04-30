import React from "react";
import ap1 from "../assets/images/ap1.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="apartado1 flex h-[calc(100vh_-_96px)] mx-72 items-center">
        <div className="w-full flex gap-24 flex-col">
          <div className="flex w-full justify-between">
            <div className="w-3/5 flex flex-col gap-4 justify-center">
            <h1>Control de tu Inventario en<br/>Tiempo Real</h1>
              <p>
                Optimiza la gestión de tus productos, reduce costes y mejora la
                eficiencia de tus entregas con nuestra <span className="text-primary-color">solución integral de
                gestión de inventario.</span>
              </p>
              <div className="flex justify-between">
                <Link
                  to="/inventarios"
                  className="text-white bg-primary-color px-8 py-4 text-3xl font-montserrat font-semibold w-fit rounded-lg"
                >
                  + INFO
                </Link>
                <Link
                  to="/inventarios"
                  className="text-white bg-secondary-color px-8 py-4 text-3xl font-montserrat font-semibold w-fit rounded-lg"
                >
                  CONTACTO
                </Link>
              </div>
            </div>
            <div>
              <img src={ap1} alt="Imagen principal del primer apartado" />
            </div>
          </div>
          <div>
            <h2 className="text-primary-color flex-wrap">¿Qué hacemos?</h2>
            <p>Con nuestra tecnología, podrá predecir la demanda con mayor precisión, reducir costos operativos, evitar pérdidas por exceso o falta de stock, y lo más importante: mejorar significativamente la satisfacción de sus clientes al garantizar la disponibilidad de productos cuando los necesitan.</p>
          </div>
        </div>
      </div>

      <div className="apartado2 flex h-[calc(100vh_-_96px)] mx-48 items-center">
          <h1>¿A quién vamos dirigidos?</h1>
          
      </div>
    </div>
  );
}

export default Home;
