"use strict";

class Reservations {

    constructor() {

        this.infosReservation = document.getElementById("infosReservation");

        this.setReservationEvents();
    }

    // Evenements
    setReservationEvents() {

        //recup données formulaire
        this.btnReserver = document.getElementById("reserver");

        this.btnReserver.addEventListener("click", (evt) => {
            evt.preventDefault();

            this.checkDataReservation();
            this.setTimer();
        });

        //Cancel btn
        let cancelButton = document.getElementById("cancel");

        cancelButton.addEventListener("click", this.cancelReservation());
    }

    // vérification des données renseignées
    checkDataReservation() {
        this.lastName = document.getElementById("nom");
        this.firstName = document.getElementById("prenom");

        if (this.lastName.value === "") {
            alert("Merci de renseigner votre nom pour valider votre réservation.");
        }else if(this.firstName.value === "") {
            alert("Merci de renseigner votre prénom pour valider votre réservation.");
        } else {
            this.setDataLocalStorage.bind(this);
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

    getDataLocalStorage(nameLocal, keylocal) {
        this.getNameLocal  = nameLocal;
        this.getKeyLocal   = keylocal;

        this.getNameLocal = localStorage.getItem(this.getKeyLocal);
    }

    // methode stockage sessionStorage
    checkDataSessionStorage(keySession, valueSession) {
        if(keySession   === undefined) throw new Error("Merci de renseigner un NOM pour la clé du jeux de données de la session !");
        if(valueSession === undefined) throw new Error("Merci de renseigner une valeur !");

        this.setDataSession(keySession, v);
    }

    setDataSessionStorage(keySession, valueSession) {
        this.setKeySession   = keySession;
        this.setValueSession = valueSession;

        sessionStorage.setItem(this.setKeySession, this.setValueSession);
    }

    getDataSessionStorage(nameSession, keySession) {
        this.getNameSession  = nameSession;
        this.getKeySession   = keySession;

        this.getNameSession = sessionStorage.getItem(this.getKeySession);
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
