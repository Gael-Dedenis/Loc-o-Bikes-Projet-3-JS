"use strict";

class Map {

    container = false;
    coordonnees = {};
    zoomLvl = 0;

    /**
     * 
     * @param {HTMLElement} container
     * @param {Object} coordonnees
     * 
     */

    constructor(container, zoomLvl, coordonnees){

        this.container = container;
        this.coordonnees = coordonnees;
        this.zoomLvl = zoomLvl;

        this.initMap();

    }

    // Création du fond de map
    initMap() {
        this.setLeafletMap();
        this.addTiles();
    }

    setLeafletMap() {
        this.map = L.map(this.container).setView([this.coordonnees.lat, this.coordonnees.lng], this.zoomLvl);
    }

    addTiles() {
        setTiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZ2FlbC1kMDEiLCJhIjoiY2ticThwajhmMW1odjJ5cG9kc2l6bHNmYSJ9.hs-ROGcYy_M4O7LWX8mNTg'
        }).addTo(this.map);
    }

}
