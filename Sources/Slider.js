"use strict";

class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll Nombre d'éléments composant le carrousel
     * @param {Object} options.slideAuto Défilement automatique (activé par défaut)
     * 
     */

    constructor (element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 4,
            slideAuto: true
        }, options)
        let numberSlide = [].slice.call(element.children); // Création d'un tableau avec le nbr d'enfants
        this.root = this.createElmtWithClass('carousel'); // Conteneur du bloc mobile
        this.panorama = this.createElmtWithClass('carousel__panorama'); // Création du bloc "mobile" du carrousel
        root.appendChild(this.panorama);
        this.element.appendChild(this.root);
        this.items = numberSlide.map((slide) => {
            let item = this.createElmtWithClass("carousel__item");
            item.appendChild(slide);
            this.panorama.appendChild(item);
            return item;
        })
        this.setStyle();
    }

    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement}
     * 
     */
    createElmtWithClass (className) // fonction de création de blocs
    {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    /**
     * Donne les dimensions aux différents éléments du carrousel
     * 
     */

    setStyle () {
        let ratio = this.items.length * 100;
        this.panorama.style.width = ratio + "%"; // Définition de la largeur du bloc mobile
        this.items.forEach(item => item.style.width = (100 / this.items.length) + "%"); // Définition de la largeur d'un slide
    }

}