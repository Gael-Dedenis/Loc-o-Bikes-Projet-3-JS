"use strict";

class Reservation {

    constructor() {
        this.infosReservation = document.getElementById("infosReservation");
        this.Canvas           = document.getElementById("canvas");
        this.lastName         = document.getElementById("nom");
        this.firstName        = document.getElementById("prenom");
        this.minute           = document.getElementById("mins");
        this.seconde          = document.getElementById("sec");
        this.storedLastName   = "";
        this.storedFirstName  = "";
        this.timer            = "";
        this.timeMin          = 20;
        this.timeSec          = 0;

        this.setUIReservationEvents();
        this.setReservationEvents();
    }

    // Evenements
    setReservationEvents() {
        // Reserver btn
        let btnReserver = document.getElementById("reserver");

        btnReserver.addEventListener("click", (evt) => {
            evt.preventDefault();

            let sign        = sessionStorage.getItem("sign");

            if (sign === "true") {
                this.setRsv();
                sign = false;

                sessionStorage.setItem("sign", sign);
            }
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
            if (this.firstName.value === "") {
                alert("Merci de renseigner un Prénom valide !");
            } else {
                if (this.lastName.value === "") {
                    alert("Merci de renseigner un Nom valide !")
                } else {
                    this.Canvas.classList.remove("hidden");
                }
            }
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

    addInfosReservation() {
        let rsvInfos = document.getElementById("rsvInfos");
        let getNameStation    = sessionStorage.getItem("stationName");
        let getAddressStation = sessionStorage.getItem("stationAddress");

        rsvInfos.innerHTML = "<h3>Votre réservation est en cours</h3> <p> A la station " + getNameStation + "<br> Située : " + getAddressStation + "<br>Réserver par : " + this.firstName.value + " " + this.lastName.value + ".</p>";
    }

    // méthode pour valider la réservation.
    setRsv() {
        this.timeSec = 0;
        this.timeMin = 20;
        clearInterval(this.timer);

        this.setDataLocalUser();
        this.setTimer();
        this.addInfosReservation();
        this.infosReservation.classList.remove("hidden");
    }

    // Timer reservation
    setTimer() {
        this.timer = setInterval(this.countDown.bind(this), 1000);
    }

    countDown() {
        sessionStorage.setItem("timeMin",this.timeMin);
        sessionStorage.setItem("timeSec",this.timeSec);

        if (this.timeSec <= 0) {
            this.timeSec = 60;
            this.timeMin--;
            this.minute.innerHTML = this.timeMin;
        }

        if (this.timeMin <= 0 && this.timeSec <= 0) {
            clearInterval(this.timer);

            this.timeSec = 60;
            this.timeMin = 20;

            sessionStorage.setItem("timeMin",this.timeMin);
            sessionStorage.setItem("timeSec",this.timeSec);
        }

        this.timeSec--;
        this.seconde.innerHTML = this.timeSec;
    }

    //Cancel reservation
    cancelReservation () {
        clearInterval(this.timer);

        this.timeSec = 60;
        this.timeMin = 20;
        sessionStorage.setItem("timeMin",this.timeMin);
        sessionStorage.setItem("timeSec",this.timeSec);

        this.infosReservation.classList.add("hidden");
    }

}
