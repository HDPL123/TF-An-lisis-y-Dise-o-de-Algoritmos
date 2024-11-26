import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'CITY';

const City = ({ city }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { city },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={`p-2 bg-white rounded-lg shadow border border-gray-300 flex items-center space-x-2 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-600"
        readOnly
      />
      <span className="text-sm">{city}</span>
    </li>
  );
};

const CityList = ({ cities }) => {
  return (
    <div className="h-full p-4 bg-gray-100 rounded-lg shadow-lg border border-gray-300 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Escoge tus destinos</h2>
      <p className="text-sm text-gray-600 mb-4">Selecciona y arrástralos para trazar una ruta:</p>
      <div className="flex-grow overflow-y-scroll scrollbar-hide">
        <ul className="space-y-2">
          {cities.map((city, index) => (
            <City key={index} city={city} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityList;
