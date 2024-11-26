import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CityList from './components/CityList';
import SettingsPanel from './components/SettingsPanel';
import MapView from './components/MapView';
import Modal from './components/Modal';

const App = () => {
  const cities = [
    'Paris', 'London', 'Rome', 'Barcelona', 'Berlin', 'Vienna', 'Madrid', 'Prague', 'Lisbon', 'Amsterdam', 'Moscow',
    'New York', 'Los Angeles', 'Tokyo', 'Beijing', 'Sydney', 'Cape Town', 'Mexico City', 'Buenos Aires', 'Cairo',
    'Mumbai', 'Rio de Janeiro', 'Seoul', 'Singapore', 'Dubai', 'Bangkok', 'Istanbul', 'Hong Kong', 'Lima', 'Jakarta',
  ];

  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    // Solo abre el modal si hay destinos seleccionados y un algoritmo elegido
    if (droppedItems.length > 0 && selectedAlgorithm) {
      setShowModal(true);
    } else {
      // Opción para manejar el caso en que no se seleccionen destinos o algoritmo
      alert("Por favor, selecciona al menos un destino y un algoritmo");
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
      {showModal && <Modal setShowModal={setShowModal} droppedItems={droppedItems} />}
    </DndProvider>
  );
};

export default App;
