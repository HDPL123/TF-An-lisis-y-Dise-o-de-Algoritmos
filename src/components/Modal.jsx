import React, { useState } from 'react';

const Modal = ({ setShowModal, routeData, saveRoute }) => {
  const [routeName, setRouteName] = useState(''); // Estado para el nombre de la ruta
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  const handleSaveRoute = () => {
    if (routeName.trim() !== '') {
      saveRoute(routeName);  // Guardar la ruta con el nombre ingresado
      setSuccessMessage('Ruta guardada exitosamente!'); // Mostrar mensaje de éxito
      setTimeout(() => {
        setSuccessMessage(''); // Limpiar mensaje después de 3 segundos
        setShowModal(false); // Cerrar el modal después de mostrar el mensaje
      }, 3000); // Mostrar el mensaje por 3 segundos
    } else {
      alert('Por favor, ingrese un nombre para la ruta');
    }
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 bg-black bg-opacity-50 flex justify-center z-40 p-4"
      onClick={handleCloseModal} // Cerrar al hacer clic fuera del modal
    >
      <div
        className="bg-white p-6 rounded-t-lg shadow-lg w-full max-w-7xl sm:w-[calc(100%-32px)] md:w-[calc(50%+16px)] mx-auto"
        onClick={(e) => e.stopPropagation()} // Evitar que el clic en el modal cierre la ventana
      >
        <div className="relative mb-4">
          {/* Tiempo de ejecución en la parte superior derecha */}
          <span className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            {routeData?.executionTime}
          </span>
        </div>

        <h2 className="text-lg font-bold mb-4">Resultados de la Ruta de Vuelo</h2>

        <div className="overflow-y-auto max-h-[300px]">
          <p className="mb-4">
            <strong>Ruta Optimizada:</strong> {routeData?.route?.map((city, index) => {
              return (index === routeData.route.length - 1) 
                ? `${city.name}`
                : `${city.name} → `;
            })}
          </p>

          <p className="mb-4"><strong>Algoritmo Usado:</strong> {routeData?.algorithm}</p>

          <table className="w-full mb-4 table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Destino</th>
                <th className="border px-4 py-2">Costo de Combustible</th>
                <th className="border px-4 py-2">Distancia</th>
                <th className="border px-4 py-2">Valor Promedio del Pasaje</th>
              </tr>
            </thead>
            <tbody>
              {routeData?.route?.map((city, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{city.name}</td>
                  <td className="border px-4 py-2">${city.fuelCost}</td>
                  <td className="border px-4 py-2">{city.distance} km</td>
                  <td className="border px-4 py-2">${city.ticketPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Campo para ingresar el nombre de la ruta */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre de la ruta"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mb-4 p-2 text-green-600 bg-green-100 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Botón para guardar la ruta */}
        <div className="text-right">
          <button
            onClick={handleSaveRoute}
            className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
          >
            Guardar Ruta
          </button>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
