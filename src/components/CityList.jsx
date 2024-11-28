import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import Papa from 'papaparse';

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
          {/* Mapeamos las ciudades */}
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
  const [cities, setCities] = useState([]); // Estado para almacenar las ciudades

  // Función para cargar las ciudades desde un archivo CSV en public
  const loadCitiesFromCSV = (csvText) => {
    Papa.parse(csvText, {
      complete: (result) => {
        const citiesData = result.data.map((row, index) => ({
          id: index + 1, // Usamos el índice como ID
          name: row.Ciudad || 'Nombre no disponible', // Ahora mapeamos con 'Ciudad'
          lat: parseFloat(row.Latitud) || 0, // Mapeamos 'Latitud'
          lng: parseFloat(row.Longitud) || 0, // Mapeamos 'Longitud'
          country: row.País || 'País no disponible', // Mapeamos 'País'
        }));
        setCities(citiesData); // Guardamos los datos de las ciudades en el estado
      },
      header: true, // Asume que el archivo CSV tiene encabezado
    });
  };

  // Cargar el archivo CSV desde la carpeta public al montar el componente
  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/Ciudades_Europeas.csv'); // Ruta relativa al archivo CSV en public
      const csvText = await response.text(); // Leemos el contenido como texto
      loadCitiesFromCSV(csvText); // Pasamos el texto a PapaParse
    };

    fetchCSV(); // Llamamos a la función para cargar el CSV
  }, []); // El efecto solo se ejecuta una vez al montar el componente

  return (
    <div className="min-h-screen p-6">
      <CityList cities={cities} />
    </div>
  );
};

export default App;
