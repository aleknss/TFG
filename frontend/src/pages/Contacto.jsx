import React from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineChatAlt2,
  HiPaperAirplane,
} from "react-icons/hi";

const Contacto = () => {
  const handleFormClick = (e) => {
    e.preventDefault();
    alert("Esta es una demostración visual. El formulario no se enviará.");
  };

  return (
    <div className="min-h-[calc(100vh_-_80px)] bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <HiOutlineChatAlt2 className="mx-auto h-12 w-12 text-primary-color" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ponte en Contacto
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o quieres saber más sobre nuestros
            servicios? No dudes en contactarnos. Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-8 items-start">
          <div className="bg-white p-6 sm:p-8 shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Envíanos un Mensaje
            </h2>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Tu Nombre"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm bg-gray-50 cursor-default"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="tu@correo.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm bg-gray-50 cursor-default"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asunto
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Asunto del Mensaje"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm bg-gray-50 cursor-default"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm bg-gray-50 cursor-default"
                ></textarea>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleFormClick}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-color hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color cursor-pointer"
                >
                  <HiPaperAirplane className="h-5 w-5 mr-2 transform rotate-[-45deg]" />
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10 lg:mt-0 bg-white p-6 sm:p-8 shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Información de Contacto
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <HiOutlineMail className="flex-shrink-0 h-6 w-6 text-secondary-color mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Correo Electrónico
                  </h3>
                  <a
                    href="mailto:info@tuempresa.com"
                    className="text-base text-primary-color hover:text-primary-dark"
                  >
                    info@ordenna.com
                  </a>
                  <p className="text-sm text-gray-500">
                    Te responderemos cuanto antes.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <HiOutlinePhone className="flex-shrink-0 h-6 w-6 text-secondary-color mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Teléfono
                  </h3>
                  <a
                    href="tel:+1234567890"
                    className="text-base text-primary-color hover:text-primary-dark"
                  >
                    +34 662 412 450
                  </a>
                  <p className="text-sm text-gray-500">
                    Lunes a Viernes, 9am - 5pm.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <HiOutlineLocationMarker className="flex-shrink-0 h-6 w-6 text-secondary-color mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Oficina Principal
                  </h3>
                  <p className="text-base text-gray-600">
                    Calle del Laurel, Logroño
                    <br />
                    España, CP 26001
                  </p>
                  <a
                    href="https://maps.google.com/?q=Calle+del+Laurel,+Logroño,+España,+CP+26001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-color hover:text-primary-dark"
                  >
                    Ver en mapa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
