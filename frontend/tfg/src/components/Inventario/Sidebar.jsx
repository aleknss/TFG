import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiViewGridAdd } from 'react-icons/hi';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import InventarioItem from './InventarioItem';

function Sidebar({ loading, error, inventarios = [], user }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const visibleInventarios = inventarios.slice(startIndex, startIndex + itemsPerPage);

  const canGoUpOrLeft = startIndex > 0;
  const canGoDownOrRight = startIndex + itemsPerPage < inventarios.length;

  const handlePrevious = () => {
    if (canGoUpOrLeft) {
      setStartIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoDownOrRight) {
      setStartIndex(prevIndex => prevIndex + 1);
    }
  };

  const showNavigation = inventarios.length > itemsPerPage;

  return (
    <div
      id="sidebar"
      className={`
        fixed bg-primary-color z-50 transition-all duration-300 ease-in-out
        bottom-0 left-0 w-full h-24 flex flex-row items-center justify-between  shadow-top
        lg:shadow-none lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:w-1/12 lg:h-[80%] lg:m-4 lg:rounded-lg lg:flex-col lg:justify-evenly lg:py-4
      `}
    >

      <div className="flex flex-row items-center gap-2 lg:flex-col lg:w-full lg:px-2">
        <div className="flex flex-col items-center lg:w-full">
          <Link
            to="/inventarios/create"
            className={`
              bg-gray-200 rounded-md flex justify-center items-center
              hover:bg-white hover:cursor-pointer hover:shadow-2xl transition duration-300
              // Móvil
              w-16 h-16 p-1 
              // Desktop
              lg:w-7/12 lg:h-24 lg:mt-2
            `}
          >
            <HiViewGridAdd className="text-primary-color w-8 h-8 lg:w-12 lg:h-12" />
          </Link>
          <p className="text-center text-gray-200 text-xs mt-1 lg:text-sm lg:mt-0">
            Nuevo
            <span className="hidden sm:inline"> Inventario</span> 
          </p>
        </div>
        <div className="flex flex-col text-center lg:mt-2"> 
          {loading && <p className="text-white text-xs p-1 lg:p-2">Cargando...</p>}
          {error && <p className="text-red-300 text-xs p-1 lg:p-2">{error}</p>}
          {!loading && !error && inventarios.length === 0 && user && (
            <p className="text-gray-400 text-xs p-1 lg:p-2 text-center">
              No tienes inventarios.
            </p>
          )}
        </div>
      </div>

      {!loading && !error && inventarios.length > 0 && (
        <div className="flex flex-1 items-center justify-center gap-1 overflow-hidden lg:flex-col lg:w-full lg:gap-2">
          {showNavigation && (
            <button
              onClick={handlePrevious}
              disabled={!canGoUpOrLeft}
              className={`p-1 rounded-full ${
                canGoUpOrLeft
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-500 cursor-not-allowed'
              } transition duration-150`}
              aria-label="Inventarios anteriores"
            >
              <FaArrowLeft className="w-4 h-4 lg:hidden" />
              <FaArrowUp className="w-4 h-4 hidden lg:block" />
            </button>
          )}

          <div className="flex flex-row gap-2 items-center px-1 overflow-x-auto lg:flex-col lg:gap-4 lg:w-full lg:px-2 lg:overflow-y-auto lg:max-h-[calc(100%-80px)]"> 
            {visibleInventarios.map((inventario) => (
              <Link
                key={inventario.id}
                to={`/inventarios/${inventario.id}`}
                className="flex-shrink-0 lg:w-full lg:flex lg:justify-center"
              >
                <InventarioItem item={inventario} />
              </Link>
            ))}
          </div>

          {showNavigation && (
            <button
              onClick={handleNext}
              disabled={!canGoDownOrRight}
              className={`p-1 rounded-full ${
                canGoDownOrRight
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-500 cursor-not-allowed'
              } transition duration-150`}
              aria-label="Inventarios siguientes"
            >
              <FaArrowRight className="w-4 h-4 lg:hidden" /> 
              <FaArrowDown className="w-4 h-4 hidden lg:block" /> 
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;