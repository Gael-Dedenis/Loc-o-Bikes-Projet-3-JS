"use strict";

function newCall(url, callback) {

    var request = new XMLHttpRequest();

    request.open("GET", url);

    // Control de l'avancement de la requette
    request.onreadystatechange = function() {
        console.log("Avancement de la requête : " + request.readyState + " /4");
    }

    // Détection Fin de l'appel
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Toutes les ressources sont chargées !");
            let jsonResponse = JSON.parse(this.response);
            callback(jsonResponse);
        } else {
            console.error(request.status + " " + request.statusText + " " + url);
        }
    });

    req.send(null);
}