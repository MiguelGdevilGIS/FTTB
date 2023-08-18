(function (window) {
    'use strict';

    function initMap() {
        var control;
        var L = window.L;

        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });

        // Cambia la variable 'map' a nivel global para acceder a ella desde diferentes funciones
        window.map = L.map('map', {
            center: [-12.0464, -77.0428], // Coordenadas de Lima, Perú
            zoom: 12,
            layers: [osm] // Agrega la capa base de OpenStreetMap por defecto
        });

        // Función para cambiar la capa base
        function changeBaseLayer(layer) {
            window.map.eachLayer(function (currentLayer) {
                window.map.removeLayer(currentLayer);
            });
            layer.addTo(window.map);
        }

        var style = {
            color: 'yellow',
            opacity: 1.0,
            fillOpacity: 0.2,
            weight: 1,
            clickable: true
        };

        L.Control.FileLayerLoad.LABEL = '<img class="icon" src="folder.svg" alt="file icon"/>';

        control = L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                pointToLayer: function (data, latlng) {
                    return L.circleMarker(
                        latlng,
                        { style: style }
                    );
                }
            }
        });
        control.addTo(window.map);

        control.loader.on('data:loaded', function (e) {
            var layer = e.layer;
            console.log(layer);
        });

        // Cambiar la capa base cuando se seleccione una opción en el selector
        var baseMapSelect = document.getElementById('baseMapSelect');
        baseMapSelect.addEventListener('change', function () {
            var selectedValue = baseMapSelect.value;
            if (selectedValue === 'osm') {
                changeBaseLayer(osm);
            } else if (selectedValue === 'google') {
                // Agregar la capa de Google Maps usando leaflet-google-layer
                var googleLayer = new L.Google('ROADMAP');
                changeBaseLayer(googleLayer);
            }
        });
    }

    window.addEventListener('load', function () {
        initMap();
    });
}(window));
