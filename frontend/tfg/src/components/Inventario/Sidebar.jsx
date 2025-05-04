import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiViewGridAdd } from 'react-icons/hi';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import InventarioItem from './InventarioItem';

function Sidebar({ loading, error, inventarios = [], user }) {

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const visibleInventarios = inventarios.slice(startIndex, startIndex + itemsPerPage);

  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + itemsPerPage < inventarios.length;

  const handlePrevious = () => {
    if (canGoUp) {
      setStartIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoDown) {
      setStartIndex(prevIndex => prevIndex + 1);
    }
  };

  const showNavigation = inventarios.length > itemsPerPage;

  return (
    <div
      id="sidebar"
      className="fixed bg-primary-color w-1/12 h-5/6 m-4 rounded-lg flex flex-col justify-evenly items-center py-4"
    >
      <div className="w-full flex flex-col items-center gap-2 px-2">
        <div className="w-7/12 flex flex-col gap-2">
          <Link
            to="/inventarios/create"
            className="bg-gray-200 w-full h-24 mt-2 rounded-md flex justify-center items-center hover:bg-white hover:cursor-pointer hover:shadow-2xl transition duration-300"
          >
            <HiViewGridAdd className="w-12 h-12 text-primary-color" />
          </Link>
          <p className="text-center text-gray-200 text-sm">Nuevo inventario</p>
        </div>
        {loading && <p className="text-white text-xs p-2">Cargando...</p>}
        {error && <p className="text-red-300 text-xs p-2">{error}</p>}
        {!loading && !error && inventarios.length === 0 && user && (
          <p className="text-gray-400 text-xs p-2 text-center">
            No tienes inventarios aún.
          </p>
        )}
      </div>

      {!loading && !error && inventarios.length > 0 && (
        <div className="flex flex-col items-center w-full gap-2 overflow-hidden">
          {showNavigation && (
            <button
              onClick={handlePrevious}
              disabled={!canGoUp}
              className={`p-1 rounded-full ${
                canGoUp
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-500 cursor-not-allowed'
              } transition duration-150`}
              aria-label="Inventarios anteriores"
            >
              <FaArrowUp className="w-4 h-4" />
            </button>
          )}

          <div className="flex flex-col gap-4 items-center w-full px-2">
            {visibleInventarios.map((inventario) => (
              <Link
                key={inventario.id}
                to={`/inventarios/${inventario.id}`}
                className="w-full flex justify-center"
              >
                <InventarioItem item={inventario} />
              </Link>
            ))}
          </div>

          {showNavigation && (
            <button
              onClick={handleNext}
              disabled={!canGoDown}
              className={`p-1 rounded-full ${
                canGoDown
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-500 cursor-not-allowed'
              } transition duration-150`}
              aria-label="Inventarios siguientes"
            >
              <FaArrowDown className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;