"use strict";

class Canvas {
    /**
     * @param {string} container nom du containeur du Canvas 
     * @param {string} contextCanvas context rechercher sur le Canvas
     * @param {string} color couleur à utiliser pour tracer les points
     */
    constructor (container, contextCanvas, color) {
        this.container        = container;
        this.contextCanvas    = contextCanvas;
        this.strokeStyleColor = color;

        this.start  = false;
        this.touchX = 0;
        this.touchY = 0;
        this.sign   = false;

        this.initCanvas();
    }

    // initialisation du Canvas
    initCanvas() {
        this.getCanvasContext();
        this.setOptionCanvas();
        this.setListeners();
    }

    // récupération du context sur le Canvas
    getCanvasContext() {
        this.ctx = this.container.getContext(this.contextCanvas);
    }

    // réglage des options du Canvas
    setOptionCanvas() {
        this.ctx.lineJoin  = "round";
        this.ctx.lineCap   = "round";
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.strokeStyleColor;
    }

    // écouteurs d'événements
    setListeners() {
        // écoute d'événements de type "souris"
        this.container.addEventListener("mousedown", this.mouseDown.bind(this));
        this.container.addEventListener("mouseup", this.mouseUp.bind(this));
        this.container.addEventListener("mousemove", this.mouseDrawing.bind(this));
        this.container.addEventListener("mouseout", this.mouseUp.bind(this));

        // écoute d'événements de type "touch"
        this.container.addEventListener("touchstart", this.touchStart.bind(this));
        this.container.addEventListener("touchend", this.touchEnd.bind(this));
        this.container.addEventListener("touchmove", this.touchDrawing.bind(this));
        this.container.addEventListener("touchcancel", this.touchEnd.bind(this));

    }

// ----- ----- ----- Méthodes dédié à la souris ----- ----- -----

    // methode suite au début d'un click sur la souris
    mouseDown(event) {
        this.start = true;

        this.ctx.beginPath();
        this.ctx.moveTo(event.offsetX, event.offsetY);
    }

    // methode suite à la fin d'un click sur la souris
    mouseUp() {
        this.start = false;
    }

    // methode appeler pour dessiner les positions "mouse"
    mouseDrawing(event) {
        if (!this.start) return;
        this.ctx.lineTo(event.offsetX, event.offsetY);
        this.ctx.stroke();

        this.sign  = true;
        sessionStorage.setItem("sign", this.sign);

        let submit = document.getElementById("reserver");
        submit.classList.remove("hidden");
    }

// ----- ----- ----- Méthodes dédié au Touch ----- ----- -----

    // methode suite au début d'un "touch"
    touchStart(event) {
        console.log("Touch start !");
        this.start = true;
        this.ctx.beginPath();
        this.touchLocation(event);
        this.ctx.moveTo(this.touchX, this.touchY);
    }

    // methode suite à la fin d'un "touch"
    touchEnd() {
        console.log("Touch end !")
        this.start = false;
    }

    // methode pour récuperer la position du "touch" par rapport au point d'origine [0, 0] = coin haut gauche 
    touchLocation(event) {
        console.log("In touchPosition !");
        let position = event.target.getBoundingClientRect();

        this.touchX = event.targetTouches[0].clientX - position.left;
        this.touchY = event.targetTouches[0].clientY - position.top;
        console.log("X = " + this.touchX + " Y = " + this.touchY);
    }

    // methode appeler pour dessiner les positions "touch"
    touchDrawing(event) {
        console.log("Draw now ! :D");
        event.preventDefault();
        if (!this.start) return;
        this.touchLocation(event);
        this.ctx.lineTo(this.touchX, this.touchY);
        this.ctx.stroke();

        this.sign  = true;
        sessionStorage.setItem("sign", this.sign);

        let submit = document.getElementById("reserver");
        submit.classList.remove("hidden");
    }
}