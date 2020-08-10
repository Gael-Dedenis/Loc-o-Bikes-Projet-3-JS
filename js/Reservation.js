"use strict";

class Reservation {

    constructor() {
        this.infosReservation = document.getElementById("infosReservation");
        this.lastName = document.getElementById("nom");
        this.firstName = document.getElementById("prenom");

        this.checkDataUser();
        this.setReservationEvents();
    }

    // Evenements
    setReservationEvents() {
        // Reserver btn
        let btnReserver = document.getElementById("reserver");

        btnReserver.addEventListener("click", (evt) => {
            evt.preventDefault();

            this.checkDataRsv();
/*            this.checkSign = sessionStorage.getItem("sign");
            console.log("checkSign = " + this.checkSign);

            if (this.lastName.value === "") {
                alert("Merci de renseigner votre nom pour valider votre réservation.");
            }else if(this.firstName.value === "") {
                alert("Merci de renseigner votre prénom pour valider votre réservation.");
            } else if(!this.checkSign === true) {
                alert("Merci d'ajouter votre signature pour valider votre réservation");
            }else {
                this.setDataLocalUser();
                this.setTimer();
                this.addInfosReservation();
                this.infosReservation.classList.remove("hidden");
            } */
        });

        // Cancel btn
        let cancelButton = document.getElementById("cancel");

        cancelButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            this.cancelReservation();
        });
    }

    // vérification des données renseignées
    checkDataUser() {
//        this.getDataLocalUser();
        this.storedLastName  = localStorage.getItem("lastname");
        this.storedFirstName = localStorage.getItem("firstname");
        console.log("Nom & prenoms = " + this.storedLastName + " " + this.storedFirstName);

        if (this.storedLastName !== undefined && this.storedFirstName !== undefined) {
            this.lastName.innerText  = this.storedLastName;
            this.firstName.innerText = this.storedFirstName;
        } else {
            return;
        }
    }

    // methode stockage localeStorage
    setDataLocalUser() {
        this.setDataLocalStorage("lastname", this.lastName.value);
        this.setDataLocalStorage("firstname", this.firstName.value);
    }

/*    getDataLocalUser() {
        this.storedLastName  = this.getDataLocalStorage("lastname");
        this.storedFirstName = this.getDataLocalStorage("firstname");
        console.log("Nom & prenoms = " + this.storedLastName + " " + this.storedFirstName);
    } */

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
        console.log("getNameStation = " + getNameStation);
        console.log("getAddressStation = " + getAddressStation);

        rsvInfos.innerHTML = '<p>Votre réservation est en cours : <br> A la station ' + getNameStation + '<br> Située : ' + getAddressStation + '<br>Réserver par : ' + this.storedFirstName + ' ' + this.storedLastName;
    }

    // méthode de vérification des données pour valider la réservation.
    checkDataRsv() {
        this.checkSign          = sessionStorage.getItem("sign");
        this.checkStationSelect = sessionStorage.getItem("stationSelect");

        if(!this.checkStationSelect === true) {
            alert("Merci de sélectionner une station de vélos valide"); 
        }else if(this.lastName.value === "") {
            alert("Merci de renseigner votre nom pour valider votre réservation.");
        }else if(this.firstName.value === "") {
            alert("Merci de renseigner votre prénom pour valider votre réservation.");
        } else if(!this.checkSign === true) {
            alert("Merci d'ajouter votre signature pour valider votre réservation");
        }else {
            this.setDataLocalUser();
            this.setTimer();
            this.addInfosReservation();
            this.infosReservation.classList.remove("hidden");
        }
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
