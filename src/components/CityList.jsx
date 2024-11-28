import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';

// Definir el tipo de item para React DnD
const ItemType = 'CITY';

// Componente para cada ciudad que se puede arrastrar
const City = ({ city }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: city, // Pasamos toda la ciudad con coordenadas
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag} // Envolvemos el li con el drag ref
      className={`p-2 bg-white rounded-lg shadow border border-gray-300 flex items-center space-x-2 cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-600"
        readOnly
      />
      <span className="text-sm">{city.name}</span> {/* Mostramos solo el nombre de la ciudad */}
    </li>
  );
};

// Componente de la lista de ciudades
const CityList = ({ cities }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg border border-gray-300 flex flex-col h-full">
      <h2 className="text-lg font-bold mb-4">Escoge tus destinos</h2>
      <p className="text-sm text-gray-600 mb-4">Selecciona y arrástralos para trazar una ruta:</p>
      <div className="flex-grow max-h-[500px] overflow-y-auto scrollbar-hidden">
        <ul className="space-y-2">
          {/* Corregimos la forma de mapear las ciudades */}
          {cities && cities.map((city) => (
            <City key={city.id} city={city} /> // Cada ciudad debe tener un id único como key
          ))}
        </ul>
      </div>
    </div>
  );
};

// Componente principal
const App = () => {
  const [cities, setCities] = useState([]);

  // Simulación de carga de ciudades desde una API
  useEffect(() => {
    const fetchCities = async () => {
      // Agregar más ciudades aquí
      const citiesData = [
        // Ciudades de Argentina
        { id: 1, name: 'Buenos Aires', lat: -34.5956145, lng: -58.4431949, country: 'Argentina' },
        { id: 2, name: 'Córdoba', lat: -31.420083, lng: -64.188776, country: 'Argentina' },
        { id: 3, name: 'Mendoza', lat: -32.889458, lng: -68.846546, country: 'Argentina' },
        { id: 4, name: 'Rosario', lat: -32.946820, lng: -60.639318, country: 'Argentina' },
        { id: 5, name: 'La Plata', lat: -34.921801, lng: -57.954532, country: 'Argentina' },

        // Ciudades de Brasil
        { id: 6, name: 'São Paulo', lat: -23.550520, lng: -46.633308, country: 'Brasil' },
        { id: 7, name: 'Río de Janeiro', lat: -22.906847, lng: -43.172896, country: 'Brasil' },
        { id: 8, name: 'Brasília', lat: -15.780148, lng: -47.929222, country: 'Brasil' },
        { id: 9, name: 'Salvador', lat: -12.971390, lng: -38.501305, country: 'Brasil' },
        { id: 10, name: 'Fortaleza', lat: -3.717220, lng: -38.543230, country: 'Brasil' },

        // Ciudades de Estados Unidos
        { id: 11, name: 'Nueva York', lat: 40.712776, lng: -74.005974, country: 'Estados Unidos' },
        { id: 12, name: 'Los Ángeles', lat: 34.052235, lng: -118.243683, country: 'Estados Unidos' },
        { id: 13, name: 'Chicago', lat: 41.878113, lng: -87.629799, country: 'Estados Unidos' },
        { id: 14, name: 'Miami', lat: 25.761681, lng: -80.191788, country: 'Estados Unidos' },
        { id: 15, name: 'San Francisco', lat: 37.774929, lng: -122.419418, country: 'Estados Unidos' },

        // Agregar más ciudades según lo necesites
      ];

      setCities(citiesData); // Guardamos los datos de las ciudades en el estado
    };

    fetchCities(); // Llamada a la función que simula la carga de ciudades
  }, []);

  return (
    <div className="min-h-screen p-6">
      <CityList cities={cities} />
    </div>
  );
};

export default App;
