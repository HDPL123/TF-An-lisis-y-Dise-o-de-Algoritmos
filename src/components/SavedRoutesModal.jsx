import React, { useState } from 'react';

const SavedRoutesModal = ({ savedRoutes, setShowSavedRoutesModal, onEditRoute, onDeleteRoute }) => {
  const [editingRouteIndex, setEditingRouteIndex] = useState(null);
  const [newRouteName, setNewRouteName] = useState('');

  const handleEditRoute = (index) => {
    // Establecer el índice de la ruta que se va a editar y cargar su nombre actual
    setEditingRouteIndex(index);
    setNewRouteName(savedRoutes[index].name);
  };

  const handleSaveEditedRoute = () => {
    if (newRouteName.trim()) {
      onEditRoute(editingRouteIndex, newRouteName); // Llamar la función para modificar el nombre
      setEditingRouteIndex(null); // Cerrar el editor
      setNewRouteName(''); // Limpiar el campo de entrada
    } else {
      alert('Por favor, ingrese un nombre válido para la ruta.');
    }
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 bg-black bg-opacity-50 flex justify-center z-40 p-4"
      onClick={() => setShowSavedRoutesModal(false)}
    >
      <div
        className="bg-white p-6 rounded-t-lg shadow-lg w-full max-w-7xl sm:w-[calc(100%-32px)] md:w-[calc(50%+16px)] mx-auto"
        onClick={(e) => e.stopPropagation()} // Evitar que el clic en el modal cierre la ventana
      >
        <h2 className="text-lg font-bold mb-4">Rutas Guardadas</h2>

        {savedRoutes.length === 0 ? (
          <p>No hay rutas guardadas.</p>
        ) : (
          <ul className="space-y-2">
            {savedRoutes.map((route, index) => (
              <li key={index} className="border p-2 rounded-lg shadow">
                <strong>{route.name}</strong>
                <ul className="text-sm mt-2">
                  {route.route.map((city, idx) => (
                    <li key={idx}>{city.name}</li>
                  ))}
                </ul>

                {/* Botones de acción: Modificar y Eliminar */}
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleEditRoute(index)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => onDeleteRoute(index)} // Eliminar la ruta
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Modal de edición para cambiar el nombre de la ruta */}
        {editingRouteIndex !== null && (
          <div className="mt-4">
            <h3 className="font-semibold">Editar nombre de la ruta</h3>
            <input
              type="text"
              value={newRouteName}
              onChange={(e) => setNewRouteName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleSaveEditedRoute} // Guardar cambios
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingRouteIndex(null)} // Cancelar edición
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="text-right mt-4">
          <button
            onClick={() => setShowSavedRoutesModal(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedRoutesModal;
