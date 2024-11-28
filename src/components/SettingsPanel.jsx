import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Modal from './Modal';
import SavedRoutesModal from './SavedRoutesModal';

const ItemType = 'CITY';

const SettingsPanel = ({ droppedItems, setDroppedItems, selectedAlgorithm, setSelectedAlgorithm }) => { 
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      if (!droppedItems.some((city) => city.id === item.id)) {
        setDroppedItems((prev) => [...prev, item]);
      }
    },
  }));

  const removeItem = (city) => {
    setDroppedItems((prev) => prev.filter((item) => item.id !== city.id));
  };

  const [showModal, setShowModal] = useState(false);
  const [showSavedRoutesModal, setShowSavedRoutesModal] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRoute = async () => {
    setLoading(true);
    setError(null);
    try {
      const selectedCities = droppedItems.map((item) => ({
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
      }));

      const simulatedResponse = {
        route: selectedCities,
        executionTime: '10s',
      };

      setRouteData({
        route: simulatedResponse.route,
        algorithm: selectedAlgorithm,
        executionTime: simulatedResponse.executionTime,
      });

    } catch (err) {
      setError('Error al obtener la ruta');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (droppedItems.length > 0 && selectedAlgorithm) {
      getRoute();
      setShowModal(true);
    } else {
      alert('Selecciona destinos y un algoritmo primero');
    }
  };

  const saveRoute = (routeName) => {
    if (routeData) {
      setSavedRoutes((prevRoutes) => [
        ...prevRoutes,
        { ...routeData, name: routeName },
      ]);
    } else {
      alert('No hay datos de ruta para guardar');
    }
  };

  const handleOpenSavedRoutesModal = () => {
    setShowSavedRoutesModal(true);
  };

  // Función para editar el nombre de la ruta
  const onEditRoute = (index, newName) => {
    setSavedRoutes((prevRoutes) => {
      const updatedRoutes = [...prevRoutes];
      updatedRoutes[index].name = newName;
      return updatedRoutes;
    });
  };

  // Función para eliminar una ruta
  const onDeleteRoute = (index) => {
    setSavedRoutes((prevRoutes) => prevRoutes.filter((_, idx) => idx !== index));
  };

  return (
    <div className="p-4 bg-gray-100 h-full rounded-lg shadow-lg border border-gray-300 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Configuraciones</h2>

      {/* Algoritmo selector */}
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

      {/* Destinos */}
      <div className="mt-4 flex-grow">
        <p className="text-sm text-gray-600">Arrastra destinos aquí:</p>
        <div ref={drop} className="h-[400px] bg-white rounded-lg border border-dashed border-gray-300 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {droppedItems.map((city) => (
              <li key={city.id} className="p-2 bg-blue-100 rounded-lg shadow border border-gray-300 text-sm flex justify-between items-center">
                <span>{city.name}</span>
                <button onClick={() => removeItem(city)} className="text-red-500 hover:text-red-700 focus:outline-none">×</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botones */}
      <button onClick={handleOpenModal} className="p-2 bg-blue-500 text-white rounded-lg w-full disabled:opacity-50" disabled={!droppedItems.length || !selectedAlgorithm}>
        Ver resultado de ruta de vuelo
      </button>
      <button onClick={handleOpenSavedRoutesModal} className="p-2 bg-green-500 text-white rounded-lg w-full disabled:opacity-50" disabled={savedRoutes.length === 0}>
        Ver rutas guardadas
      </button>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          routeData={routeData}
          saveRoute={saveRoute}
        />
      )}

      {showSavedRoutesModal && (
        <SavedRoutesModal
          savedRoutes={savedRoutes}
          setShowSavedRoutesModal={setShowSavedRoutesModal}
          onEditRoute={onEditRoute}
          onDeleteRoute={onDeleteRoute}
        />
      )}
    </div>
  );
};

export default SettingsPanel;
