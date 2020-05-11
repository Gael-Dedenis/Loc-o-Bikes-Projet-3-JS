# Mon Vélo  
__________________________________________________________________________________________________________________________________________

Ce projet est le 3ème dans le parcours de formation d'Openclassrooms. Correspondant au métier du front-end avec l'utilisation de Javascript(JS).  

**Rappel des besoins**:  
- Développer une "Single page application".  
- En haut de la page, nous devons trouver un diaporama expliquant le fonctionnement de l'application. Chaque diapos doit défiler toutes les 5 secondes.  
- Le Diaporama doit pouvoir être mis en pause, ainsi que de pouvoir défiler manuellement avec un clic de souris et les flèches directionnelles droite et gauche.  
- En dessous du diaporama, nous retrouverons une carte avec la liste des stations de vélos signalées par des marqueurs (de différentes couleurs).
- Les couleurs des marqueurs désigneront un état de la station de vélo.(disponnible, presque plus de vélo disponnible, indisponnible)
- La localisation et l'état de chaque station (ouverte, en travaux, combien de vélos et de places sont disponibles, etc.) est fourni via la plateforme OpenData de JC Decaux.(Les données doivent provenir de l'API temps réel)  
- Un clic sur un marqueur affiche l’état de la station dans un panneau construit en HTML et CSS à côté de la carte.  
- La carte doit être générée dynamiquement via un service de cartographie.  
- Il doit être possible de réserver un vélo disponible à la station sélectionnée. Pour cela l'utilisateur devra renseigner son nom et son prénom. IL signera aussi dans un champ libre implémenté avec l'API Canvas(HTML5).  
- Une fois la réservation validée,  un vélo est marqué comme réservé à cette station.  
- Les données de réservation seront stockées dans le navigateur à l’aide de l’API Web Storage et affichées en dessous du panneau.  
- L'état de la réservation (s’il y en a une) est ainsi affiché, avec un décompte dynamique du temps restant avant expiration de la réservation.(Au bout de 20 minutes la réservation expire)
- Il ne peut y avoir qu'une réservation à la fois. Si une nouvelle réservation a lieu, elle remplace la précédente.  

**Conditions de réalisation**:
- Le code JavaScript doit être conçu en Programmation Orientée Objet.  
- Le code doit exploiter une API cartographique et l'API temps réel de API JCDecaux.  
- Il doit également utiliser les API Web Storage et Canvas.

__________________________________________________________________________________________________________________________________________


## Createur
Gael Dedenis.  
