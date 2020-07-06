"use strict";

class Map {

    container = false;
    coordonnees = {};
    zoomLevel = 0;
    getAjax = false;
    stations = [];

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

        this.getAjax = new Ajax("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=12eabafe239b1cf5964929dff783e2a53f297fc4", function(response) {
            this.stations = JSON.parse(response);
            });
        this.nameStation = document.getElementById("nameStation");
        this.adressStation = document.getElementById("adressStation");
        this.statusStation = document.getElementById("statusStation");
        this.numberBikes = document.getElementById("numberBikes");
        this.numberPlaces = document.getElementById("numberPlaces");


        this.initMap();
        this.setMarkerOnMap();
        this.setDetailsStations();


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
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiZ2FlbC1kMDEiLCJhIjoiY2ticThwajhmMW1odjJ5cG9kc2l6bHNmYSJ9.hs-ROGcYy_M4O7LWX8mNTg"
        }).addTo(this.map);

    }

    setMarkerOnMap() {

        // créations des markeurs
        this.LeafIcon = L.Icon.extend({
            options: {
                shadowUrl: "img/leafletjs-icons/pointeur-shadow.png",
                iconSize:     [38, 95],
                shadowSize:   [50, 64],
                iconAnchor:   [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor:  [-3, -76]
            }
        });

        this.greenIcon = new this.LeafIcon({iconUrl: "img/leafletjs-icons/pointeur-vert.png"});
        this.redIcon = new this.LeafIcon({iconUrl: "img/leafletjs-icons/pointeur-rouge.png"});
        this.orangeIcon = new this.LeafIcon({iconUrl: "img/leafletjs-icons/pointeur-orange.png"});
        this.greyIcon = new this.LeafIcon({iconUrl: "img/leafletjs-icons/pointeur-gris.png"});

        // placement des marqueurs sur la map
        this.stations.map((station) =>{

            switch (station) {
                case station.status !== OPEN:
                    L.marker(station.position, {icon: greyIcon}).addTo(this.map);
                    break;
                case station.available_bikes === 0 && station.avaible_bike_stands <=1:
                    L.marker(station.position, {icon: redIcon}).addTo(this.map);
                    break;
                case station.avaible_bike_stands > station.available_bikes &&  station.available_bikes > 1:
                    L.marker(station.position, {icon: orangeIcon}).addTo(this.map);
                    break;
                default:
                    L.marker(station.position, {icon: greenIcon}).addTo(this.map);
            }

        });

    }

    setDetailsStations() {

        // details station Data (JCDECAUX)
        this.setDetails = function (){
            this.nameStation.innerHTML = "<strong>Nom de la station</strong> : " + station.name;
            this.adressStation.innerHTML = "<strong>Adresse</strong> : " + station.address;
            this.numberBikes.innerHTML = station.available_bikes;
            this.numberPlaces.innerHTML = station.avaible_bike_stands;

            switch(station){
                case station.available_bikes === 0 :
                    this.statusStation.innerHTML = "Aucun vélos disponibles !";
                    break;

                case station.status !== OPEN :
                    this.statusStation.innerHTML = "Station hors service !";
                    break;

                default:
                    this.statusStation.innerHTML = "Station ouverte !";
            }
        }

    }

}
