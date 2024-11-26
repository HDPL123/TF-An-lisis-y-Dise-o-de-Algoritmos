import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CityList from './components/CityList';
import SettingsPanel from './components/SettingsPanel';
import MapView from './components/MapView';
import Modal from './components/Modal';
import axios from 'axios';

const App = () => {
  // Ciudades predeterminadas en caso de que la API no responda
  const defaultCities = [
    'Paris', 'London', 'Rome', 'Barcelona', 'Berlin', 'Vienna', 'Madrid', 'Prague', 'Lisbon', 'Amsterdam', 'Moscow',
    'New York', 'Los Angeles', 'Tokyo', 'Beijing', 'Sydney', 'Cape Town', 'Mexico City', 'Buenos Aires', 'Cairo',
    'Mumbai', 'Rio de Janeiro', 'Seoul', 'Singapore', 'Dubai', 'Bangkok', 'Istanbul', 'Hong Kong', 'Lima', 'Jakarta',
  ];

  // Estado para manejar los destinos cargados y los de la API
  const [cities, setCities] = useState(defaultCities); // Usamos las ciudades por defecto inicialmente
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [routeData, setRouteData] = useState(null);

  // Obtener las ciudades desde la API
  useEffect(() => {
    axios.get('http://localhost:5000/api/destinos')  // URL de tu API
      .then(response => {
        setCities(response.data);  // Actualizamos las ciudades con las que viene la API
      })
      .catch(error => {
        console.error('Error al cargar destinos:', error);
      });
  }, []);

  // Función para abrir el modal y mostrar los resultados de la ruta
  const handleOpenModal = () => {
    if (droppedItems.length > 0 && selectedAlgorithm) {
      // Llamamos a la API para calcular la ruta con los destinos y el algoritmo
      axios.post('http://localhost:5000/api/calcularRuta', {
        destinos: droppedItems,
        algoritmo: selectedAlgorithm,
      })
        .then(response => {
          setRouteData(response.data);  // Seteamos los resultados en el estado
          setShowModal(true);  // Mostramos el modal
        })
        .catch(error => {
          console.error('Error al calcular la ruta:', error);
        });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen space-x-4 p-4 bg-gray-100">
        {/* CityList: Lista de ciudades */}
        <div className="w-1/5">
          <CityList cities={cities} droppedItems={droppedItems} setDroppedItems={setDroppedItems} />
        </div>

        {/* Map view */}
        <div className={`flex-grow p-4 bg-white rounded-lg shadow-lg border border-gray-300 ${showModal ? 'h-1/2' : 'h-full'}`}>
          <MapView showModal={showModal} />
        </div>

        {/* SettingsPanel: Configuraciones */}
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
      {showModal && <Modal setShowModal={setShowModal} routeData={routeData} />}
    </DndProvider>
  );
};

export default App;
