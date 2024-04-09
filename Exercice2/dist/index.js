"use strict";
//Mise en place et recuperation du canvas
const canvas = document.getElementById('monCanvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');
if (canvasContainer) {
    //Recuperation de la taille en hauteur et largeur
    var width = canvasContainer.offsetWidth;
    var height = canvasContainer.offsetHeight;
    //Modification et mise en place du canvas
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "1px solid black";
}
//Initiliation de la difficulté
let inputDiff = document.getElementById('inputDiff');
let difficulty = parseInt(inputDiff.value);
//Initialisatoin du jeu
let myGame = null;
//Classe du jeu
class Game {
    //Constructeur
    constructor(radius, rep) {
        this.radius = radius;
        this.score = 0;
        this.rep = rep;
        this.countRep = 0;
        this.x = 0;
        this.y = 0;
    }
    //Dessiner le cercle
    draw(ctx) {
        //Valeur x et y aléatoire
        let randomX;
        let randomY;
        this.countRep++;
        let getRandomX = () => {
            let randomX = Math.random() * width;
            return randomX;
        };
        let getRandomY = () => {
            let randomY = Math.random() * height;
            return randomY;
        };
        randomX = getRandomX();
        randomY = getRandomY();
        while (randomX < this.radius * 2 || randomX > ((90 * width) / 100) - 10) {
            randomX = getRandomX();
        }
        while (randomY < this.radius * 2 || randomY > height - this.radius * 2) {
            randomY = getRandomY();
        }
        this.x = randomX;
        this.y = randomY;
        //Dessin du cercle
        this.writeScore(ctx);
        if (this.countRep == this.rep + 1)
            return;
        ctx.beginPath();
        ctx.arc(randomX, randomY, this.radius, Math.PI * 2, 0);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = '#f5f5f5';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    //Pour voir si c'est cliqué suite a l'evenement
    clicked(x, y, ctx) {
        //Distance eucludienne
        const distance = Math.sqrt(((x - this.x) * (x - this.x))
            +
                ((y - this.y) * (y - this.y)));
        if (distance < this.radius) {
            this.score += 10;
            ctx.fillStyle = 'green';
            ctx.fill();
            return true;
        }
        return false;
    }
    //Pour ecrire le score
    writeScore(ctx) {
        //Recuperation des données du score
        const scoreTextX = (90 * width) / 100;
        const scoreTextY = 40;
        //creer un score
        ctx.font = '15px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Score: ' + this.score, scoreTextX, scoreTextY);
    }
    //Nombre repetitions normal
    getRep() {
        return this.rep + 1; // pour afficher le dernier score
    }
    //Nombre score
    getScore() {
        return this.score;
    }
    //Nombre de repetitions en cours
    getCountRep() {
        return this.countRep;
    }
}
//Variables utiles
var intervalID;
let running;
var rep;
let radius;
let touched;
//Lancer le jeu
let startGame = () => {
    if (!myGame) {
        let gameStatus = alert('Bon jeu !');
        rep = 10;
        radius = 30;
        myGame = new Game(radius, rep); // (radius, rep)
        setTimeout(() => {
            running = true;
            if (ctx) {
                myGame.draw(ctx);
            }
            //Animation à intervale de difficulté x 100
            intervalID = setInterval(() => {
                touched = false;
                if (ctx) {
                    ctx.clearRect(0, 0, width, height);
                    myGame.draw(ctx);
                }
                //Si la repetion prend fin
                if (myGame.getRep() < myGame.getCountRep()) {
                    clearInterval(intervalID);
                    gameFinish();
                }
            }, (11 - difficulty) * 150);
        }, 200);
    }
};
//Modification de la difficulté
let diffmodif = (diff) => {
    difficulty = parseInt(diff.value);
};
//Jeu finis (en jouant)
let gameFinish = () => {
    let scoreTotal = rep * 10;
    alert('Vous avez un score de ' + myGame.getScore() + '/' + scoreTotal + ', soit un ' + (myGame.getScore() * 10) / scoreTotal + '/10');
    setTimeout(() => {
        endGame();
    }, 0);
};
//Finir le jeu
let endGame = () => {
    clearInterval(intervalID);
    if (ctx) {
        ctx.clearRect(0, 0, width, height);
    }
    myGame = null;
    running = false;
    touched = false;
};
//Verifier si la souris est sur le cercle
canvas.onmousemove = (event) => {
    if (myGame) {
        let { x, y } = myGame;
        const rect = canvas.getBoundingClientRect();
        let clientX = event.clientX - rect.left;
        let clientY = event.clientY - rect.top;
        const distance = Math.sqrt(((clientX - x) * (clientX - x))
            +
                ((clientY - y) * (clientY - y)));
        if (distance <= 30) {
            canvas.style.cursor = 'pointer';
        }
        else {
            canvas.style.cursor = 'auto';
        }
    }
    else {
        canvas.style.cursor = 'auto';
    }
};
//Verifier s'il a cliqué sur le cercle
document.onclick = (event) => {
    if (myGame) {
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        if (!touched) {
            touched = myGame.clicked(x, y, ctx);
        }
    }
};
