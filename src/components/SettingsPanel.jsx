import React from 'react';
import { useDrop } from 'react-dnd';

const ItemType = 'CITY';

const SettingsPanel = ({ droppedItems, setDroppedItems, selectedAlgorithm, setSelectedAlgorithm, handleOpenModal }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      if (!droppedItems.includes(item.city)) {
        setDroppedItems((prev) => [...prev, item.city]);
      }
    },
  }));

  const removeItem = (city) => {
    setDroppedItems((prev) => prev.filter((item) => item !== city));
  };

  return (
    <div className="p-4 bg-gray-100 h-full rounded-lg shadow-lg border border-gray-300 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Configuraciones</h2>
      <label className="block mb-2 text-sm font-medium text-gray-700">Selecciona un algoritmo:</label>
      <select
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecciona un algoritmo</option>
        <option value="Algoritmo 1">Algoritmo 1</option>
        <option value="Algoritmo 2">Algoritmo 2</option>
        <option value="Algoritmo 3">Algoritmo 3</option>
      </select>

      <div className="mt-4 flex-grow">
        <p className="text-sm text-gray-600">Arrastra destinos aquí:</p>
        <div
          ref={drop}
          className="h-[400px] bg-white rounded-lg border border-dashed border-gray-300 p-4 overflow-y-auto"
        >
          <ul className="space-y-2">
            {droppedItems.map((city, index) => (
              <li
                key={index}
                className="p-2 bg-blue-100 rounded-lg shadow border border-gray-300 text-sm flex justify-between items-center"
              >
                <span>{city}</span>
                <button
                  onClick={() => removeItem(city)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ajustando el botón para que esté bien dentro del contenedor */}
      <div className="mt-4 mb-4 w-full">
        <button
          onClick={handleOpenModal}
          className="p-2 bg-blue-500 text-white rounded-lg w-full disabled:opacity-50"
          disabled={!droppedItems.length || !selectedAlgorithm}
        >
          Ver resultado de ruta de vuelo
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
