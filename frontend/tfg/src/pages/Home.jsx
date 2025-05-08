import React from "react";
import ap1 from "../assets/images/ap1.png"; // Make sure this path is correct
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiOutlineInformationCircle,
  HiOutlinePhone,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineShoppingCart,
  HiOutlineOfficeBuilding,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

const FeatureCard = ({ icon, title, children }) => (
  <div className="flex flex-col items-center bg-white text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <span className="text-primary-color text-4xl mb-4">{icon}</span>
    <h4 className="text-lg font-semibold text-gray-700 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);

const TargetAudienceCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-gray-50 text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <span className="text-secondary-color text-4xl mb-4">{icon}</span>
    <h4 className="text-lg font-semibold text-gray-700 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <section
        id="hero"
        className="flex items-center min-h-[calc(100vh_-_80px)] bg-gray-100 py-16 px-4 sm:px-8 md:px-12 lg:px-20"
      >
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5 flex flex-col gap-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Control de tu Inventario en
              <br />
              <span className="text-primary-color">Tiempo Real</span>
            </h1>
            <p className="text-lg text-gray-600">
              Optimiza la gestión de tus productos, reduce costes y mejora la
              eficiencia de tus entregas con nuestra{" "}
              <span className="font-semibold text-primary-color">
                solución integral de gestión de inventario.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
              <Link
                to="/info"
                className="flex items-center justify-center gap-2 text-white bg-primary-color hover:bg-primary-dark px-8 py-3 text-lg font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <HiOutlineInformationCircle className="h-6 w-6" />
                Más Información
              </Link>
              <Link
                to="/contacto" 
                className="flex items-center justify-center gap-2 text-white bg-secondary-color hover:bg-secondary-dark px-8 py-3 text-lg font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <HiOutlinePhone className="h-6 w-6" />
                Contacto
              </Link>
            </div>
          </div>
          <div className="lg:w-2/5 mt-10 lg:mt-0 flex justify-center">
            <img
              src={ap1}
              alt="Gestión de inventario en tiempo real"
              className="max-w-sm md:max-w-md lg:max-w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section
        id="features"
        className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-color mb-4">
            ¿Qué Hacemos?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Nuestra tecnología te permite predecir la demanda con mayor
            precisión, reducir costos operativos, evitar pérdidas por exceso o
            falta de stock, y mejorar la satisfacción del cliente garantizando
            la disponibilidad.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<HiOutlineChartBar />}
              title="Predicción de Demanda"
            >
              Anticípate a las necesidades del mercado con análisis predictivos
              avanzados.
            </FeatureCard>
            <FeatureCard icon={<HiOutlineCube />} title="Optimización de Stock">
              Minimiza pérdidas y asegura la disponibilidad óptima de tus
              productos.
            </FeatureCard>
            <FeatureCard
              icon={<HiOutlineLightBulb />}
              title="Eficiencia Operativa"
            >
              Automatiza procesos y reduce costos para una gestión más ágil y
              efectiva.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Who We Target Section */}
      <section
        id="target-audience"
        className="py-16 sm:py-24 bg-gray-100 px-4 sm:px-8 md:px-12 lg:px-20"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-color mb-12">
            ¿A Quién Vamos Dirigidos?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TargetAudienceCard
              icon={<HiOutlineShoppingCart />}
              title="Tiendas E-commerce"
              description="Sincroniza tu inventario online y físico, evitando ventas de productos agotados."
            />
            <TargetAudienceCard
              icon={<HiOutlineOfficeBuilding />}
              title="PYMEs y Minoristas"
              description="Gestiona múltiples ubicaciones o una sola tienda con facilidad y precisión."
            />
            <TargetAudienceCard
              icon={<HiOutlineGlobeAlt />}
              title="Distribuidores y Almacenes"
              description="Controla grandes volúmenes de stock y optimiza tu cadena de suministro."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="cta"
        className="py-16 sm:py-24 bg-primary-color text-white px-4 sm:px-8"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para Transformar tu Gestión de Inventario?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto text-white">
            Contáctanos si quieres tener asesoramiento y soluciones
            personalizadas que incluirán un dispositivo y una cuenta con acceso
            a tu próximo inventario.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary-color hover:bg-gray-100 px-10 py-4 text-xl font-montserrat font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Entra ahora <HiArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
