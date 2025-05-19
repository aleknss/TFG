// src/pages/MasInformacion.js (or your preferred location)
import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineCubeTransparent, // Changed from HiOutlineCubeTrendingUp for variety
  HiOutlineCurrencyDollar,
  HiOutlineShieldCheck,
  HiOutlineThumbUp,
  HiOutlineDesktopComputer,
  HiOutlineBell,
  HiOutlineDocumentReport,
  HiOutlineLink,
  HiOutlineDeviceMobile,
  HiOutlineUserAdd,
  HiOutlineCog,
  HiOutlinePlay,
  HiOutlineQuestionMarkCircle,
  HiArrowRight,
  HiOutlineCheckCircle,
  HiOutlineSparkles
} from "react-icons/hi";

const FeatureItem = ({ icon, title, children }) => (
  <div className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex-shrink-0">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary-color text-white">
        {React.cloneElement(icon, { className: "h-6 w-6" })}
      </span>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-base text-gray-600">{children}</p>
    </div>
  </div>
);

const StepItem = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <span className="text-secondary-color text-4xl mb-4">{icon}</span>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
    </div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-gray-800 hover:text-primary-color"
      >
        <span className="font-medium">{question}</span>
        <HiArrowRight className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};


const MasInformacion = () => {
  return (
    <div className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <HiOutlineSparkles className="mx-auto h-12 w-12 text-primary-color" />
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Descubre el Poder de una Gestión de Inventario Inteligente
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Transforma la manera en que controlas tus productos, optimizas tus
            recursos y satisfaces a tus clientes con nuestra solución integral.
          </p>
        </div>

        {/* Section 1: How We Revolutionize Your Management */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-secondary-color mb-10">
            ¿Cómo Revolucionamos tu Gestión?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureItem
              icon={<HiOutlineEye />}
              title="Control Total en Tiempo Real"
            >
              Visualiza el estado de tu inventario al instante, desde cualquier
              lugar y en cualquier dispositivo. Toma decisiones informadas
              basadas en datos precisos.
            </FeatureItem>
            <FeatureItem
              icon={<HiOutlineCubeTransparent />}
              title="Optimización Inteligente de Stock"
            >
              Evita el exceso o la falta de stock con predicciones de demanda y
              sugerencias de reabastecimiento automatizadas. Maximiza tu
              rentabilidad.
            </FeatureItem>
            <FeatureItem
              icon={<HiOutlineCurrencyDollar />}
              title="Reducción de Costos y Errores"
            >
              Minimiza pérdidas por obsolescencia, reduce errores manuales y
              optimiza los costos de almacenamiento y logística.
            </FeatureItem>
            <FeatureItem
              icon={<HiOutlineThumbUp />}
              title="Mejora la Satisfacción del Cliente"
            >
              Asegura la disponibilidad de productos cuando tus clientes los
              necesitan, mejorando su experiencia y fomentando la lealtad.
            </FeatureItem>
          </div>
        </section>

        {/* Section 2: Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary-color mb-10">
            Características Destacadas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <FeatureItem icon={<HiOutlineDesktopComputer />} title="Panel de Control Intuitivo">
              Interfaz amigable y fácil de usar que te permite gestionar todo tu inventario de forma centralizada.
            </FeatureItem>
            <FeatureItem icon={<HiOutlineBell />} title="Alertas y Notificaciones">
              Recibe alertas personalizadas sobre niveles bajos de stock, fechas de caducidad próximas y más.
            </FeatureItem>
            <FeatureItem icon={<HiOutlineDocumentReport />} title="Reportes Detallados">
              Genera informes exhaustivos para analizar tendencias, valorar tu inventario y tomar decisiones estratégicas.
            </FeatureItem>
            <FeatureItem icon={<HiOutlineLink />} title="Integración Sencilla">
              Conecta fácilmente con tus sistemas existentes de e-commerce, contabilidad y puntos de venta (POS).
            </FeatureItem>
            <FeatureItem icon={<HiOutlineDeviceMobile />} title="Acceso Multidispositivo">
              Gestiona tu inventario desde tu ordenador, tablet o smartphone, estés donde estés.
            </FeatureItem>
             <FeatureItem icon={<HiOutlineShieldCheck />} title="Seguridad y Confiabilidad">
              Tus datos están protegidos con los más altos estándares de seguridad y copias de respaldo automáticas.
            </FeatureItem>
          </div>
        </section>

        {/* Section 3: How to Get Started */}
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-secondary-color mb-10">¿Cómo Empezar? Es Fácil</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                <StepItem
                    icon={<HiOutlineUserAdd />}
                    title="1. Regístrate"
                    description="Crea tu cuenta en minutos y elige el plan que mejor se adapte a tus necesidades."
                />
                <StepItem
                    icon={<HiOutlineCog />}
                    title="2. Configura tu Inventario"
                    description="Importa tus productos fácilmente o añádelos manualmente. Nuestro equipo te ayudará si lo necesitas."
                />
                <StepItem
                    icon={<HiOutlinePlay />}
                    title="3. Comienza a Optimizar"
                    description="Disfruta de una visión clara de tu stock y empieza a tomar decisiones más inteligentes desde el primer día."
                />
            </div>
        </section>


        {/* Section 4: FAQ */}
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-primary-color mb-10">
                <HiOutlineQuestionMarkCircle className="inline h-8 w-8 mr-2 align-middle" />
                Preguntas Frecuentes
            </h2>
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <FaqItem question="¿Es difícil integrar esta solución con mi tienda online?" answer="No, ofrecemos integraciones sencillas con las plataformas de e-commerce más populares. Nuestro equipo de soporte también está disponible para ayudarte." />
                <FaqItem question="¿Qué tipo de soporte técnico ofrecen?" answer="Ofrecemos soporte técnico por correo electrónico y chat. Para planes premium, también disponemos de soporte telefónico y gestor de cuenta dedicado." />
                <FaqItem question="¿Puedo probar el sistema antes de contratar un plan?" answer="Sí, ofrecemos un período de prueba gratuito o una demostración personalizada para que puedas ver cómo nuestra solución se adapta a tu negocio." />
                <FaqItem question="¿Mis datos están seguros?" answer="Absolutamente. La seguridad de tus datos es nuestra máxima prioridad. Utilizamos encriptación avanzada y realizamos copias de seguridad periódicas." />
            </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ¿Listo para llevar tu gestión de inventario al siguiente nivel?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Únete a cientos de empresas que ya están optimizando sus operaciones y
            aumentando su rentabilidad con nuestra plataforma.
          </p>
          <Link
            to="/inventarios" // Or your signup/pricing page
            className="inline-flex items-center justify-center gap-2 bg-primary-color text-white hover:bg-primary-dark px-8 py-3 text-lg font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Ver mis Inventarios <HiArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default MasInformacion;