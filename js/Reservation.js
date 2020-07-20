"use strict";

class Reservations {

    constructor(container) {

        this.infosReservation = document.getElementById("infosReservation");

    }

    // Evenements
    setReservationEvents() {

        //Cancel btn
        let cancelButton = document.getElementById("cancel");

        cancelButton.addEventListener("click", this.cancelReservation());
    }


    // methode stockage localeStorage
    setDataLocalStorage (nameLocal, keyLocal, valueLocal) {

        this.nameLocal = nameLocal;
        this.keyLocal = keyLocal;
        this.valueLocal = valueLocal;

        this.nameLocal = localStorage.setItem(this.keyLocal, this.valueLocal);

    }

    // methode stockage sessionStorage
    setDataSessionStorage (nameSession, keySession, valueSession) {

        this.nameSession = nameSession;
        this.keySession = keySession;
        this.valueSession = valueSession;

        this.nameSession = sessionStorage.setItem(this.keySession, this.valueSession);

    }

    // Timer reservation
    setTimer() {

        this.timer = "";
        this.minute = document.getElementById("mins");
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
        console.log("seconde :" + this.timeSec);
        if (this.timeSec <= 0) {
            this.timeSec = 59;
            this.timeMin--;
            this.minute.innerHTML = this.timeMin;
            console.log("timer : " + this.timeMin + "min " + this.timeSec + "sec");
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
