import React from 'react';

const Modal = ({ setShowModal, droppedItems }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-6 rounded-t-lg shadow-lg max-w-7xl w-full sm:w-[calc(100%-32px)] md:w-[calc(50%+16px)] mx-auto">
      <h2 className="text-lg font-bold mb-4">Resultados de la Ruta de Vuelo</h2>
      <div className="overflow-y-auto max-h-[300px]"> {/* Se añade desplazamiento */}
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Destino</th>
              <th className="border px-4 py-2">Costo de Combustible</th>
              <th className="border px-4 py-2">Distancia</th>
              <th className="border px-4 py-2">Valor Promedio del Pasaje</th>
            </tr>
          </thead>
          <tbody>
            {droppedItems.map((city, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{city}</td>
                <td className="border px-4 py-2">$200</td>
                <td className="border px-4 py-2">5000 km</td>
                <td className="border px-4 py-2">$800</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Rentabilidad: Alta</h3>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setShowModal(false)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
