"use strict";

class Canvas {

    constructor (container, canvascontext) {
        this.container = container;
        this.ctxCanvas = canvascontext;
        this.startDrawing = false;

        this.initCanvas();
    }

    //Init Canvas
    initCanvas() {
        this.getCanvasContext();
        this.setPointer();
        this.listenCanvasEventsMouse();
    }

    // Events Canvas
    listenCanvasEventsMouse() {
        //Au moment du clic sur la souris
        this.container.addEventListener("mousedown", (evnt) => {
            this.startDrawing = true;
            [this.X, this.Y] = [evnt.offsetX, evnt.offsetY];

            //Pendant le déplacement de la souris avec le clic enfoncer
            this.container.addEventListener("mousemove", (evnt) => {
                this.paintInCanvas(evnt.offsetX, evnt.offsetY);
            });
        });

        //Au moment ou l'on relache le clic de la souris
        this.container.addEventListener("mouseup", () => {
            this.startDrawing = false;
        });

        //Si la souris sort du champ
        this.container.addEventListener("mouseout", () => {
            this.startDrawing = false;
        });
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