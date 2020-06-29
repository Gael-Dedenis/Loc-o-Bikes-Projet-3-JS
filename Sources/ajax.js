"use strict";

class Ajax {

    /**
     * 
     * @param {string} url
     * @param {function} callback
     * 
     */

    constructor(url, callback = null) {
    this.request = new XMLHttpRequest();

    this.url = url;
    this.callback = callback;

    this.setCallback();
    this.getAjax();

    }

    //Création d'un appel par la méthode GET
    getAjax() {
        this.request.open("GET", "this.url");
        this.startAjax();
    }

    startAjax() {
        this.listenAjax();
        this.request.send();
    }

    setCallback(response) {
        if (this.callback === null) {
            this.callback = console.log(response);
        }
    }

    // Ajout écouteurs événements Ajax
    listenAjax() {
        this.request.addEventListener("load", this.listenLoad.bind(this));
        this.request.addEventListener("error", this.listenError.bind(this));
    }

    // Détection Fin de l'appel
    listenLoad() {
        if (this.request.status >= 200 && this.request.status < 400) {
        this.callback(this.request.responseText);

        } else {
            console.error(this.request.status + " " + this.request.statusText + " " + this.url);
        }
    }

    listenError() {
        console.error("Network Error @URL => " + this.url);
    }

}
