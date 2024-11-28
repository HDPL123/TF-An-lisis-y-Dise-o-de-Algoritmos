// App.jsx
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CityList from './components/CityList';
import SettingsPanel from './components/SettingsPanel';
import MapView from './components/MapView';
import Modal from './components/Modal';
import axios from 'axios';

const App = () => {
  const defaultCities = [
    'Paris', 'London', 'Rome', 'Barcelona', 'Berlin', 'Vienna', 'Madrid', 'Prague', 'Lisbon', 'Amsterdam', 'Moscow',
    'New York', 'Los Angeles', 'Tokyo', 'Beijing', 'Sydney', 'Cape Town', 'Mexico City', 'Buenos Aires', 'Cairo',
    'Mumbai', 'Rio de Janeiro', 'Seoul', 'Singapore', 'Dubai', 'Bangkok', 'Istanbul', 'Hong Kong', 'Lima', 'Jakarta',
  ];

  const [cities, setCities] = useState(defaultCities); // Ciudades por defecto
  const [droppedItems, setDroppedItems] = useState([]); // Ciudades seleccionadas
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(''); // Algoritmo seleccionado
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [routeData, setRouteData] = useState(null); // Datos de la ruta
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener ciudades desde la API
  useEffect(() => {
    axios.get('http://localhost:5000/api/destinos')
      .then(response => {
        const cityData = response.data.map(city => ({
          _id: city._id,
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude
        }));
        setCities(cityData); // Actualizar las ciudades
      })
      .catch(error => {
        console.error('Error al cargar destinos:', error);
        setCities(defaultCities); // Fallback a ciudades predeterminadas
      });
  }, []);

  // Obtener la ruta optimizada
  const getRoute = async () => {
    setLoading(true);
    setError(null);
    try {
      const selectedCities = droppedItems.map(item => ({
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude
      }));

      const response = await axios.post('http://localhost:5000/api/optimizarRuta', { cities: selectedCities });

      setRouteData({
        route: response.data.route,
        algorithm: selectedAlgorithm,
        executionTime: response.data.executionTime,
      });
    } catch (error) {
      setError('Error al obtener la ruta');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para abrir el modal
  const handleOpenModal = () => {
    if (droppedItems.length > 0 && selectedAlgorithm) {
      getRoute(); // Llamar a getRoute para obtener la ruta
    } else {
      console.log('No hay destinos seleccionados o algoritmo no definido');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen space-x-4 p-4 bg-gray-100">
        {/* CityList */}
        <div className="w-1/5">
          <CityList cities={cities} droppedItems={droppedItems} setDroppedItems={setDroppedItems} />
        </div>

        {/* MapView */}
        <div className={`flex-grow p-4 bg-white rounded-lg shadow-lg border border-gray-300 ${showModal ? 'h-1/2' : 'h-full'}`}>
          <MapView droppedItems={droppedItems} />
        </div>

        {/* SettingsPanel */}
        <div className="w-1/5">
          <SettingsPanel
            droppedItems={droppedItems}
            setDroppedItems={setDroppedItems}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            handleOpenModal={handleOpenModal}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && routeData && (
        <Modal
          setShowModal={setShowModal}
          routeData={routeData}
          selectedAlgorithm={routeData.algorithm}
          executionTime={routeData.executionTime}
        />
      )}
    </DndProvider>
  );
};

export default App;
