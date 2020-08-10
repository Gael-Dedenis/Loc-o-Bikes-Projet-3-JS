"use strict";

class Canvas {

    constructor (container, ctxCanvas) {
        this.container    = container;
        this.ctxCanvas    = ctxCanvas;
        this.startDrawing = false;
        this.sign         = false;

        this.initCanvas();
    }

    //Init Canvas
    initCanvas() {
        this.getCanvasContext();
        this.setPointer();
        this.listenCanvasEventsMouse();
        this.listenCanvasEventsTouch();
    }

    // Events Canvas Souris
    listenCanvasEventsMouse() {
        this.container.addEventListener("mousedown", (evnt) => {
            this.startDrawing = true;
            [this.X, this.Y] = [evnt.offsetX, evnt.offsetY];
        });

        this.container.addEventListener("mousemove", (evnt) => {
            this.paintInCanvas(evnt.offsetX, evnt.offsetY);
        });

        this.container.addEventListener("mouseup", () => {
            this.startDrawing = false;
            this.sign         = true;
            sessionStorage.setItem("sign", this.sign);
        });

        this.container.addEventListener("mouseout", () => {
            this.startDrawing = false;
        });
    }

    // Events Canvas Mobile
    listenCanvasEventsTouch() {

        this.container.addEventListener("touchstart", (evnt) => {
            this.startDrawing = true;
            this.getTouchPosition(evnt);
            [this.X, this.Y] = [this.touchX, this.touchY];
        });

        this.container.addEventListener("touchmove", (evnt) => {
            evnt.preventDefault();
            this.paintInCanvas(this.touchX, this.touchY);
        });

        this.container.addEventListener("touchend", () => {
            this.startDrawing = false;
            this.sign         = true;
            sessionStorage.setItem("sign", this.sign);
        });

        this.container.addEventListener("touchOut", () => {
            this.startDrawing = false;
        });
    }

    getTouchPosition(evnt) {
        let canvasAttributes = evnt.target.getBoundingClientRect();

        this.touchX = evnt.targetTouches[0].clientX - canvasAttributes.left;
        this.touchY = evnt.targetTouches[0].clientY - canvasAttributes.top;
    }

    // methode get context
    getCanvasContext() {
        this.ctx = this.container.getContext(this.ctxCanvas);
    }

    // definition du pointeur
    setPointer() {
        this.ctx.lineJoin  = "round";
        this.ctx.lineCap   = "round";
        this.ctx.lineWidth = 3;
    }

    paintInCanvas(X, Y) {
        if (!this.startDrawing) {
            return;
        }
        this.ctx.strokeStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.moveTo(this.X, this.Y);
        this.ctx.lineTo(X, Y);
        this.ctx.stroke();
        [this.X, this.Y] = [X, Y];
    }

}