// Récupération du canvas et du contexte 2D
const canvas = document.getElementById('MyCanvas')
const ctx = canvas.getContext('2d')

// Définition de la moitié de la largeur et de la hauteur de la fenêtre
var width = window.innerWidth / 2
var height = window.innerHeight

// Assignation des dimensions au canvas et ajout d'une bordure
canvas.width = width
canvas.height = height
canvas.style.border = "1px solid black"

// Boutons pour les modifications
let speedRangeButton = document.getElementById('speedRange') // Bouton pour la vitesse
speedRangeButton.value = 85 // Vitesse par défaut
let sizeRangeButton = document.getElementById('sizeRange') // Bouton pour la taille
sizeRangeButton.value = 20 // Taille par défaut
let runButton = document.getElementById('run') // Bouton pour mettre en marche l'animation
let stopButton = document.getElementById('stop') // Bouton pour arrêter 
let stepByStepButton = document.getElementById('pap') // Bouton pour avancer de pas à pas
let razButton = document.getElementById('raz') // Bouton pour tout raser

// Définition d'une classe Square pour représenter le carré
class Square {
    constructor(range) {
        // Propriétés du Square
        this.range = range; // Taille du carré
        this.decalage = 0; // Décalage initial
        this.speed = 50; // Vitesse d'animation par défaut
        this.inc = 0; // Incrémenteur pour le dessin
        // this.startPoint = 5; // Point de départ horizontal
        this.startPoint = width / 2; // Point de départ horizontal
        this.middle = height / 2; // Position verticale médiane
        this.lineUp = this.middle - range; // Ligne supérieure du carré
        this.lineDown = this.middle + range; // Ligne inférieure du carré

        // Propriétés pour le mouvement du carré
        this.moveTop = 0;
        this.moveBottom = 0;
        this.moveRight = 0;
        this.moveLeft = 0;

        // Coordonnées des sommets du carré
        this.x1 = 0;
        this.x2 = 0;
        this.y1 = 0;
        this.y2 = 0;

        this.position = 'middle'; // Position initiale du carré
        this.degree;
    } 

    // Méthode pour dessiner le carré sur le canvas
    draw(ctx) {
        // Logique de dessin du Square
        ctx.beginPath()

        // Gestion du décalage pour éviter le dépassement horizontal
        if (this.startPoint + (this.range * 3 + this.decalage) >= width) {
            this.decalage = 0
        }

        // Logique de déplacement en fonction de la position actuelle
        switch (this.position) {
            //BOTTOM
            case 'bottom':
                this.moveBottom++;
                break; 

            //TOP
            case 'top':
                this.moveTop++;
                break; 

            //LEFT
            case 'left':
                this.moveLeft++;
                break; 

            //LEFT TOP
            case 'left-top':
                this.moveLeft++;
                this.moveTop++;
                break;

            // LEFT BOTTOM
            case 'left-bottom':
                this.moveLeft++;
                this.moveBottom++;
                break;

            //RIGHT
            case 'right':
                this.moveRight++;
                this.y3 = this.y2 - this.range;
                break; 

            //RIGHT TOP
            case 'right-top':
                this.moveRight++;
                this.moveTop++;
                break;

            // RIGHT BOTTOM
            case 'right-bottom':
                this.moveRight++;
                this.moveBottom++;
                break;

            //MIDDLE
            case 'middle':
                this.moveRight++;
                break; 
        }

        // Commencement du dessin
        ctx.beginPath()

        // Calcul des coordonnées des sommets du carré
        this.x1 = this.startPoint - this.moveLeft;
        this.x2 = this.startPoint + this.range * 3 + this.moveRight;
        this.y1 = this.lineUp - this.moveTop;
        this.y2 = this.lineDown + this.moveBottom;

        // Dessin du carré
        ctx.moveTo(this.x1, this.y1) 
        ctx.lineTo(this.x1, this.y2) 
        ctx.lineTo(this.x2, this.y2) 
        ctx.lineTo(this.x2, this.y1) 
        ctx.lineTo(this.x1, this.y1) 

        // Paramètres de style
        ctx.lineWidth = 2
        ctx.strokeStyle = 'red'
        ctx.fillStyle = 'red'
        ctx.font = '15px Arial'
        ctx.fillText(this.inc, width - 40, 40)

        ctx.fill()
        ctx.stroke()
        ctx.closePath() 
    }

    // Méthode pour exécuter l'animation du carré en fonction du joystick
    run(joystick) {

        // Efface le contenu précédent du canvas
        ctx.clearRect(0, 0, width, height);

        // Récupère l'angle (degré) du joystick
        let degree = joystick.degree;

        // Variables locales
        let pos = this.position; // Mémorise la position actuelle du carré

        // Vérifie si la distance du joystick est inférieure à 10
        if (joystick.distance < 10) {
            this.position = 'middle'; // Si oui, positionne le carré au centre (middle)
        } else {
            // Logique de positionnement en fonction des angles du joystick

            // Right side
            if (degree < 360 && degree > 280 || degree > 0 && degree < 80) {
                if (degree < 350 && degree > 280) {
                    this.position = 'right-top';
                } else if (degree > 10 && degree < 80){
                    this.position = 'right-bottom';
                } else {
                    this.position = 'right';
                }
            } 
            // Left side
            else if (degree < 260 && degree > 100) {
                if (degree < 260 && degree > 190) {
                    this.position = 'left-top';
                } else if (degree < 170 && degree > 100) {
                    this.position = 'left-bottom';
                } else {
                    this.position = 'left';
                }
            }
            // Bottom side
            else if (degree < 100 && degree > 80) {
                this.position = 'bottom';
            }
            // Top side
            else {
                this.position = 'top';
            }

            // Mémorise l'angle actuel du joystick
            this.degree = joystick.degree;
        }

        // Effectue des ajustements
        this.decalage += 5; // Ajuste le décalage
        this.inc++; // Incrémente le compteur
        this.draw(ctx); // Dessine le carré sur le canvas
    }

    // Méthode pour remettre le carré à sa configuration initiale (RAZ: Remise À Zéro)
    raz() {
        ctx.clearRect(0, 0, width, height); // Efface le contenu précédent du canvas
        this.decalage = 0; // Réinitialise le décalage
        this.inc = 0; // Réinitialise le compteur
        this.move = 0; // Réinitialise le mouvement

        // Réinitialise les mouvements dans les différentes directions
        this.moveTop = 0;
        this.moveBottom = 0;
        this.moveRight = 0;
        this.moveLeft = 0;

        // Réinitialise les coordonnées du carré
        this.x1 = this.startPoint;
        this.x2 = this.startPoint + this.range * 3;
        this.y1 = this.lineUp;
        this.y2 = this.lineDown;
    }

    // Méthode pour changer la vitesse du mouvement du carré
    changementVitesse(vitesse) {
        vitesse = parseInt(vitesse); // Convertit la vitesse en entier
        this.speed = 101 - vitesse; // Ajuste la vitesse en fonction de la valeur du bouton
    }

    // Méthode pour changer la taille du carré
    changementTaille(taille) {
        taille = parseInt(taille); // Convertit la taille en entier
        this.range = taille; // Ajuste la taille du carré
        this.lineUp = this.middle - this.range; // Ajuste la position de la ligne supérieure
        this.lineDown = this.middle + this.range; // Ajuste la position de la ligne inférieure
    }

    // Méthode pour mettre à jour la position du carré
    updatePosition(position) {
        this.position = position; // Met à jour la position du carré
        ctx.clearRect(0, 0, width, height); // Efface le contenu précédent du canvas
        this.decalage = 0; // Réinitialise le décalage
        this.draw(ctx); // Redessine le carré à sa nouvelle position
    }
}


// Crée une instance de la classe Square avec la taille initiale définie par le bouton
let mySquare = new Square(parseInt(sizeRangeButton.value));
mySquare.draw(ctx); // Dessine le carré initial sur le canvas

let interValId; // Variable pour pouvoir arrêter l'incrémentation
let running = false; // Variable pour voir si l'animation est en cours ou non

// Fonction pour mettre en marche l'animation du carré
let run = () => {
    if (!running) {
        running = true;
        // Utilise setInterval pour exécuter la fonction run à intervalles réguliers
        interValId = setInterval(() => {
            mySquare.run(joystickMove.getInfos(joystickMenu)); // Exécute la fonction run du carré avec les informations du joystick
        }, mySquare.speed); // Utilise la vitesse définie pour le carré
    }
}

// Fonction pour arrêter l'animation du carré
let stop = () => {
    if (running) {
        running = false;
        clearInterval(interValId); // Arrête l'incrémentation à intervalles réguliers
    }
}

// Fonction pour changer la vitesse de l'animation du carré
let changementVitesse = (vitesse) => {
    if (running) {
        stop(); // Arrête l'animation en cours
        mySquare.changementVitesse(vitesse); // Change la vitesse du carré
        run(); // Relance l'animation avec la nouvelle vitesse
    } else {
        mySquare.changementVitesse(vitesse); // Change la vitesse du carré sans relancer l'animation
    }
}

// Fonction pour changer la taille du carré et réinitialiser
let changementTaille = (taille) => {
    raz(); // Remet à zéro le carré
    mySquare.changementTaille(taille); // Change la taille du carré
}

// Fonction pour exécuter une étape (pas à pas) de l'animation du carré
let pap = () => {
    if (running) {
        stop(); // Arrête l'animation en cours pour permettre le pas à pas
    }
    mySquare.run(joystickMove.getInfos(joystickMenu)); // Exécute une étape de l'animation avec les informations du joystick
}

// Fonction pour remettre à zéro le carré
let raz = () => {
    stop(); // Arrête l'animation en cours
    running = false; // Met à jour le statut de l'animation
    mySquare.raz(); // Remet à zéro le carré
    mySquare.draw(ctx); // Dessine le carré remis à zéro sur le canvas
}