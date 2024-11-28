import React, { useEffect, useRef } from "react";

const MapView = ({ droppedItems }) => {
  const mapRef = useRef(null); // Referencia al div donde irá el mapa

  useEffect(() => {
    const initMap = () => {
      // Si no hay destinos seleccionados, centramos el mapa en una ubicación predeterminada y con un zoom más lejano
      const defaultCoord = { lat: 0, lng: 0 }; // Puedes ajustar esto a una coordenada central del mundo
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: droppedItems.length === 0 ? 2 : droppedItems.length === 10 ? 0 : 10, // Primer destino: zoom 5, varios destinos: zoom 10
        center: droppedItems.length > 0 ? getCenterOfItems() : defaultCoord, // Centrado en los destinos seleccionados o en un punto predeterminado
      });

      // Si hay destinos seleccionados
      if (droppedItems.length > 0) {
        let bounds = new window.google.maps.LatLngBounds(); // Para ajustar el centro del mapa
        const path = []; // Aquí almacenaremos las coordenadas de los destinos para la línea

        droppedItems.forEach((city) => {
          const cityCoord = { lat: city.lat, lng: city.lng };
          
          // Marcador para cada ciudad
          new window.google.maps.Marker({
            position: cityCoord,
            map: map,
            title: city.name, // Usamos el nombre de la ciudad como título del marcador
          });

          // Añadimos la coordenada al array de la línea
          path.push(cityCoord);

          // Expandir los límites del mapa para ajustarlo a los destinos
          bounds.extend(cityCoord);
        });

        // Ajustar el centro del mapa para mostrar todos los destinos
        map.fitBounds(bounds);

        // Traza la línea conectando los destinos seleccionados
        new window.google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: "#FF0000", // Color de la línea
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map, // Asociamos la polilínea al mapa
        });
      }
    };

    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCG8iWtet8yVzI2xYXW_lhcuwilsqmMshE&callback=iniciarMap`;
        script.async = true;
        script.defer = true;
        script.onload = initMap; // Llama a initMap cuando se carga el script
        document.body.appendChild(script);
      } else {
        initMap(); // Si ya está cargado, inicializa directamente
      }
    };

    loadGoogleMapsScript();
  }, [droppedItems]); // Dependemos de droppedItems para recargar el mapa

  // Función para obtener el centro del mapa en base a los destinos seleccionados
  const getCenterOfItems = () => {
    if (droppedItems.length === 0) return { lat: 0, lng: 0 }; // Valor por defecto si no hay destinos

    let latSum = 0;
    let lngSum = 0;

    droppedItems.forEach((city) => {
      latSum += city.lat;
      lngSum += city.lng;
    });

    return {
      lat: latSum / droppedItems.length, // Promedio de las latitudes
      lng: lngSum / droppedItems.length, // Promedio de las longitudes
    };
  };

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
};

export default MapView;
