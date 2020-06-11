"use strict";

class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll Nombre d'éléments composant le carrousel
     * @param {boolean} [options.slideAuto = true] Défilement automatique 
     * 
     */

    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 4,
            slideAuto: true
        }, options)
        let numberSlide = [].slice.call(element.children); // Création d'un tableau avec le nbr d'enfants
        this.index = 0; // débute sur la slide 1
        this.slideAuto = this.options.slideAuto;
        // Modif DOM
        this.root = this.createElmtWithClass("carousel"); // Conteneur du bloc mobile
        this.panorama = this.createElmtWithClass('carousel__panorama'); // Création du bloc "mobile" du carrousel
        this.root.setAttribute('tabindex', '0');
        this.root.appendChild(this.panorama);
        this.element.appendChild(this.root);
        this.items = numberSlide.map((slide) => {
            let item = this.createElmtWithClass("carousel__item");
            item.appendChild(slide);
            this.panorama.appendChild(item);
            return item;
        });
        this.setStyle();
        this.setNavigation();
        this.slideSlider();

        // Evenements sur le carrousel
        document.addEventListener("keyup", this.keyControl);
    }

    /**
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createElmtWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    //Applique les dimensions aux différents éléments du carrousel
    setStyle() {
        let ratio = this.items.length * 100;
        this.panorama.style.width = ratio + "%"; // Définition de la largeur du bloc mobile
        this.items.forEach(item => item.style.width = (100 / this.items.length) + "%"); // Définition de la largeur d'un slide
    }

    //Définitions des boutons de navigations du slider
    setNavigation() {
        var nextButton = document.getElementById("controls__next");
        var previousButton = document.getElementById("controls__previous");
        nextButton.addEventListener('click', this.goNext.bind(this));
        previousButton.addEventListener('click', this.goPrevious.bind(this));
    }

    goNext() {
        this.gotoSlide(this.index ++);
        console.log('next');
    }

    goPrevious() {
        this.gotoSlide(this.index --);
        console.log('previous');
    }

    //Déplace le carrousel vers l'élément ciblé.
    gotoSlide() {
        if(this.index < 0) {
            this.index = this.items.length - 1;
        } else if(this.index >= this.items.length) {
            this.index = 0;
        }
        let translateX = this.index * -100 / this.items.length;
        this.panorama.style.transform = "translate3d(" + translateX + "%, 0, 0)";
        this.currentItem = this.index;
    }

    // controls au clavier
    keyControl = function(evt) {
        console.log(evt.code);
        if(evt.keyCode === 37) {
            this.index --;
        } else if(evt.keyCode === 39) {
            this.index ++;
        }
    }

    // slide automatiquement play et stop
    slideSlider = setTimeout(function() {
        let interval = null;
        if(this.slideAuto === true) {
            interval = setInterval(this.goNext(), 5000);
        }
        else if(this.slideAuto === false) {
            clearInterval(interval);
        }
        let playButton = document.getElementById("controls__play");
        let stopButton = document.getElementById("controls__stop");
        playButton.addEventListener('click', function() {
            if(this.slideAuto === false){
                this.slideAuto = true;
                slideSlider(this.slideAuto);
            } else {
                return;
            }
        });
        stopButton.addEventListener('click', function() {
            if(this.slideAuto === true){
                this.slideAuto = false;
                slideSlider(this.slideAuto);
            } else {
                return;
            }
        });
    }, 5000);

}