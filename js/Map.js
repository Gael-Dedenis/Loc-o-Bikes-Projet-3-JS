"use strict";

class Map {

    container = false;
    coordonnees = {};
    zoomLevel = 0;
    getAjax = false;
    stations = false;

    /**
     * 
     * @param {HTMLElement} container
     * @param {Object} coordonnees
     * 
     */

    constructor(container, zoomLevel, coordonnees){

        this.container = container;
        this.coordonnees = coordonnees;
        this.zoomLevel = zoomLevel;

        this.nameStation = document.getElementById("nameStation");
        this.adressStation = document.getElementById("adressStation");
        this.statusStation = document.getElementById("statusStation");
        this.numberBikes = document.getElementById("numberBikes");
        this.numberPlaces = document.getElementById("numberPlaces");

        this.requetAjax = new Ajax("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=12eabafe239b1cf5964929dff783e2a53f297fc4", response => {
            this.stations = JSON.parse(response);
            this.setMarkerOnMap();
            });

        this.initMap();

    }

    // Création du fond de map
    initMap() {

        this.setLeafletMap();
        this.addTiles();

    }

    setLeafletMap() {

        this.map = L.map(this.container).setView([this.coordonnees.lat, this.coordonnees.long], this.zoomLevel);

    }

    addTiles() {

        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            minZoom: 14,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiZ2FlbC1kMDEiLCJhIjoiY2ticThwajhmMW1odjJ5cG9kc2l6bHNmYSJ9.hs-ROGcYy_M4O7LWX8mNTg"
        }).addTo(this.map);

    }

    setMarkerOnMap() {

        // créations des markeurs
        this.markerLeaflet = L.Icon.extend({
            options: {
                shadowUrl: "img/leafletjs-icons/pointeur-shadow.png",
                iconSize:     [35, 50],
                shadowSize:   [70, 70],
                iconAnchor:   [0, 0],
                shadowAnchor: [0, 0],
                popupAnchor:  [-3, -76]
            }
        });

        this.greenIcon = new this.markerLeaflet({iconUrl: "img/leafletjs-icons/pointeur-vert.png"});
        this.redIcon = new this.markerLeaflet({iconUrl: "img/leafletjs-icons/pointeur-rouge.png"});
        this.orangeIcon = new this.markerLeaflet({iconUrl: "img/leafletjs-icons/pointeur-orange.png"});
        this.greyIcon = new this.markerLeaflet({iconUrl: "img/leafletjs-icons/pointeur-gris.png"});

        // placement des marqueurs sur la map
        this.stations.forEach(station => {

            if (station.status === "CLOSED")
                return this.createMarker ({position : station.position, icon : this.greyIcon});

            if (station.available_bikes === 0 && station.available_bike_stands >= 1)
                return this.createMarker ({position : station.position, icon : this.redIcon});

            if (station.available_bike_stands > station.available_bikes &&  station.available_bikes > 1)
                return this.createMarker ({position : station.position, icon : this.orangeIcon});

            this.createMarker ({position : station.position, icon : this.greenIcon});

        });

    }

    createMarker(settings) {

        if (settings.position === undefined) throw new Error("Please provide a position");
        if (settings.icon === undefined) throw new Error("Please provide an icon");

        L.marker(settings.position, {icon: settings.icon}).addTo(this.map);

    }


}
