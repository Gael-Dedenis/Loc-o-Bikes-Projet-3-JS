"use strict";

    // attente de la fin du chargement de la page
document.addEventListener("DOMContentLoaded", function () {

    // +++++ +++++ +++++ Carousel +++++ +++++ +++++
    let carousel = new Carousel(document.getElementById("carousel--container"), {
        slidesToScroll: 4,
        slideAuto: true 
    });

    // +++++ +++++ +++++ Map +++++ +++++ +++++
    let map = new Map(document.getElementById("leaflet--map"), 15, {
        lat: 45.750000,
        long: 4.850000
    });

    // +++++ +++++ +++++ Formulaire réservation +++++ +++++ +++++
    let reservation = new Reservation(document.getElementById("forms"));

    // +++++ +++++ +++++ Canvas Signature +++++ +++++ +++++
    let canvas = new Canvas(document.getElementById("canvas"), "2d");

});