"use strict";

    // attente de la fin du chargement de la page
document.addEventListener("DOMContentLoaded", function () {

    // +++++ +++++ +++++ Carousel +++++ +++++ +++++
    let carousel = new Carousel(document.querySelector("#carousel--container"), {
        slidesToScroll: 4,
        slideAuto: true 
    });

    // +++++ +++++ +++++ Map +++++ +++++ +++++
    let map = new Map(document.querySelector("#leaflet--map"), 15, {
        lat: 45.750000,
        long: 4.850000
    });

    // +++++ +++++ +++++ Détails Stations +++++ +++++ +++++

    // +++++ +++++ +++++ Formulaire réservation +++++ +++++ +++++

    // +++++ +++++ +++++ Canvas Signature +++++ +++++ +++++

});