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

    constructor (element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 4,
            slideAuto: true
        }, options)
        let numberSlide = [].slice.call(element.children); // Création d'un tableau avec le nbr d'enfants
        this.currentSlide = 0; // Définit le 1er élément visible du carrousel
        this.root = this.createElmtWithClass("carousel"); // Conteneur du bloc mobile
        this.panorama = this.createElmtWithClass('carousel__panorama'); // Création du bloc "mobile" du carrousel
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
    }

    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement}
     * 
     */
    createElmtWithClass (className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    /**
     * Applique les dimensions aux différents éléments du carrousel
     */

    setStyle () {
        let ratio = this.items.length * 100;
        this.panorama.style.width = ratio + "%"; // Définition de la largeur du bloc mobile
        this.items.forEach(item => item.style.width = (100 / this.items.length) + "%"); // Définition de la largeur d'un slide
    }

    /**
     * Définitions des boutons de navigations du slider
     */

    setNavigation () {
        let nextButton = document.getElementById("controls__next");
        let previousButton = document.getElementById("controls__previous");
        nextButton.addEventListener('click', this.next.bind(this));
        previousButton.addEventListener('click', this.previous.bind(this));
    }

    next () {
        this.gotoSlide(this.currentSlide ++);
    }

    previous () {
        this.gotoSlide(this.currentSlide --);
    }

    /**
     * 
     * Déplace le carrousel vers l'élément ciblé.
     * @param {number} index 
     * 
     */
    gotoSlide (index) {
        if (index < 0) {
            index = this.items.length - 1;
            this.currentSlide = 3
        } else if (index >= this.items.length) {
            index = 0;
            this.currentSlide = 0;
        }
        let translateX = index * -100 / this.items.length;
        this.panorama.style.transform = "translate3d(" + translateX + "%, 0, 0)";
        this.currentItem = index;
    }
}