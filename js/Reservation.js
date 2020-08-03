"use strict";

class Reservation {

    constructor() {

        this.infosReservation = document.getElementById("infosReservation");
        this.lastName = document.getElementById("nom");
        this.firstName = document.getElementById("prenom");

        this.setReservationEvents();
    }

    // Evenements
    setReservationEvents() {

        //recup données formulaire
        let btnReserver = document.getElementById("reserver");

        btnReserver.addEventListener("click", (evt) => {
            evt.preventDefault();

            this.checkDataReservation();
        });

        //Cancel btn
        let cancelButton = document.getElementById("cancel");

        cancelButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            this.cancelReservation();
        });
    }

    // vérification des données renseignées
    checkDataReservation() {

        this.stockedLastName  = this.getDataLocalStorage("lastname");
        this.stockedFirstName = this.getDataLocalStorage("firstname");

        if (this.stockedLastName !== undefined && this.stockedFirstName !== undefined) {
            this.lastName.innerHTML  = this.stockedLastName;
            this.firstName.innerHTML = this.stockedFirstName;
        } else {
            console.log("Alors enregistront les données")
            if (this.lastName.value === "") {
                alert("Merci de renseigner votre nom pour valider votre réservation.");
            }else if(this.firstName.value === "") {
                alert("Merci de renseigner votre prénom pour valider votre réservation.");
            } else {
                this.setDataLocalUser();
                this.setTimer();

                this.infosReservation.classList.remove("hidden");
            }
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

    getDataLocalStorage(keylocal) {
        this.getKeyLocal = keylocal;

        localStorage.getItem(this.getKeyLocal);
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
