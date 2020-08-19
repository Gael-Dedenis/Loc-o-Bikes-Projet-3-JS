"use strict";

class Reservation {

    constructor() {
        this.infosReservation = document.getElementById("infosReservation");
        this.Canvas           = document.getElementById("canvas");
        this.lastName         = document.getElementById("nom");
        this.firstName        = document.getElementById("prenom");
        this.storedLastName   = "";
        this.storedFirstName  = "";

        this.setUIReservationEvents();
        this.setReservationEvents();
    }

    // Evenements
    setReservationEvents() {
        // Reserver btn
        let btnReserver = document.getElementById("reserver");

        btnReserver.addEventListener("click", (evt) => {
            evt.preventDefault();
            this.setRsv();
        });

        // Cancel btn
        let cancelButton = document.getElementById("cancel");

        cancelButton.addEventListener("click", (evt) => {
            evt.preventDefault();
            this.cancelReservation();
        });
    }

    setUIReservationEvents() {
        this.checkDataUser();

        this.lastName.onchange = () => {
            if (this.firstName.value !== "") {
                throw new Error("Merci de renseigner un Prénoms valide !");
            }else {
                if (this.lastName.value !== "") {

                }
                this.Canvas.classList.remove("hidden");
            }
        }
    }

    checkConditions() {
        this.checkSign          = sessionStorage.getItem("sign");
        this.checkStationSelect = sessionStorage.getItem("stationSelect");
    }

    checkDataInput() {
        let regEx = /^([a-zA-Z_]){3, 12}$/ ;
        if (this.firstName.value.match(regEx) || this.lastName.value.match(regEx)){

        }
    }

    // vérification des données renseignées
    checkDataUser() {
        this.storedLastName  = localStorage.getItem("lastname");
        this.storedFirstName = localStorage.getItem("firstname");

        if (this.storedLastName !== "" && this.storedFirstName !== "") {
            this.lastName.value  = this.storedLastName;
            this.firstName.value = this.storedFirstName;
        }
    }

    // methode stockage localeStorage
    setDataLocalUser() {
        this.setDataLocalStorage("lastname", this.lastName.value);
        this.setDataLocalStorage("firstname", this.firstName.value);
    }

    setDataLocalStorage(setKeyLocal, setValueLocal) {
        localStorage.setItem(setKeyLocal, setValueLocal);
    }

    getDataLocalStorage(nameKeyLocal) {
        localStorage.getItem(nameKeyLocal);
    }

    // methode stockage sessionStorage
    checkDataSessionStorage(keySession, valueSession) {

        if (keySession   === undefined) {
            throw new Error("Merci de renseigner un NOM pour la clé du jeux de données de la session !");
        }

        if (valueSession === undefined) {
            throw new Error("Merci de renseigner une valeur !");
        }

        this.setDataSession(keySession, valueSession);
    }

    setDataSessionStorage(keySession, valueSession) {
        this.setKeySession   = keySession;
        this.setValueSession = valueSession;

        sessionStorage.setItem(this.setKeySession, this.setValueSession);
    }

    getDataSessionStorage(nameSession, keySession) {
        this.getNameSession  = nameSession;
        this.getKeySession   = keySession;

        this.getNameSession  = sessionStorage.getItem(this.getKeySession);
    }

    addInfosReservation() {
        let rsvInfos = document.getElementById("rsvInfos");
        let getNameStation    = sessionStorage.getItem("stationName");
        let getAddressStation = sessionStorage.getItem("stationAddress");

        rsvInfos.innerHTML = "<p>Votre réservation est en cours : <br> A la station " + getNameStation + "<br> Située : " + getAddressStation + "<br>Réserver par : " + this.storedFirstName + " " + this.storedLastName + ".</p>";
    }

    // méthode pour valider la réservation.
    setRsv() {
        this.setDataLocalUser();
        this.setTimer();
        this.addInfosReservation();
        this.infosReservation.classList.remove("hidden");
    }

    // Timer reservation
    setTimer() {
        this.timer   = "";

        this.minute  = document.getElementById("mins");
        this.seconde = document.getElementById("sec");

        this.timeMin = 20;
        this.timeSec = 0;

        this.timer = setInterval(this.countDown.bind(this), 1000);
    }

    countDown() {
        sessionStorage.setItem("timeMin",this.timeMin);
        sessionStorage.setItem("timeSec",this.timeSec);

        this.timeSec--;
        this.seconde.innerHTML = this.timeSec;

        if (this.timeSec <= 0) {
            this.timeSec = 59;
            this.timeMin--;
            this.minute.innerHTML = this.timeMin;
        }

        if (this.timeMin < 0) {
            clearInterval(this.timer);
        }
    }

    //Cancel reservation
    cancelReservation () {
        clearInterval(this.timer);
        this.infosReservation.classList.add("hidden");
    }

}
