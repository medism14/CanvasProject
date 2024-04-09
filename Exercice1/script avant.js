//COPYRIGHT MEDISM !!! 27.11.2023

const canvas = document.getElementById('MyCanvas')
const ctx = canvas.getContext('2d')

var width = window.innerWidth / 2
var height = window.innerHeight

canvas.width = width
canvas.height = height
canvas.style.border = "1px solid black"


//Boutons pour la modifs
let speedRangeButton = document.getElementById('speedRange') // Bouton pour la vitesse
speedRangeButton.value = 30 //Vitesse par défaut
let sizeRangeButton = document.getElementById('sizeRange') //Bouton pour la taille
sizeRangeButton.value = 10 // Taille par défaut
let runButton = document.getElementById('run') // Bouton pour mettre en marche l'animation
let stopButton = document.getElementById('stop') // Bouton pour arrêter 
let stepByStepButton = document.getElementById('pap') // Bouton pour avancer de pas à pas
let razButton = document.getElementById('raz') // Bouton pour tout raser


class Diamond {
    constructor (range) {
        this.range = range
        this.decalage = 0
        this.speed = 50
        this.inc = 0
        this.position = 'left'
    } 

    draw (ctx) {
        ctx.beginPath()

        /**************************/
        //UP
        /**************************/
        if (this.position === 'up') {
            let startPoint = 5
            let middle = width / 2
            let lineLeft = middle - this.range
            let lineRight = middle + this.range

            if (startPoint + (this.range * 3 + this.decalage) >= height) {
                this.decalage = 0
            }

            //Commencement du dessin
            ctx.beginPath()

            //Milieu (de deux côtés)
            ctx.moveTo(middle, startPoint)
            ctx.lineTo(lineLeft, startPoint)
            ctx.lineTo(lineRight, startPoint)
            ctx.moveTo(lineRight + this.decalage / 5, startPoint + (this.range * 3) + this.decalage) //côté droite
            ctx.lineTo(lineLeft - this.decalage / 5, startPoint + (this.range * 3) + this.decalage)

            //Côté droit
            ctx.moveTo(lineRight, startPoint)
            ctx.lineTo(lineRight + this.range * 1.5 + this.decalage / 5, startPoint + this.range * 1.5 + this.decalage)
            ctx.lineTo(lineRight + this.decalage / 5, startPoint + (this.range * 1.5) * 2 + this.decalage)

            //Côté gauche
            ctx.moveTo(lineLeft, startPoint)
            ctx.lineTo(lineLeft - this.range * 1.5 - this.decalage / 5, startPoint + this.range * 1.5 + this.decalage)
            ctx.lineTo(lineLeft - this.decalage / 5, startPoint + (this.range * 1.5) * 2 + this.decalage)

            //Remplissange millieu
            ctx.moveTo(lineRight, startPoint)
            ctx.lineTo(lineRight + this.decalage / 5, startPoint + this.range * 3 + this.decalage)
            ctx.lineTo(lineLeft - this.decalage / 5, startPoint + this.range * 3 + this.decalage)
            ctx.lineTo(lineLeft, startPoint)

            ctx.lineWidth = 2
            ctx.strokeStyle = 'red'
            ctx.fillStyle = 'red'
            ctx.font = '15px Arial'
            ctx.fillText(this.inc, width - 40, 40)

            ctx.fill()
            ctx.stroke()
            ctx.closePath() 
            //Fin du dessin
        }

        /**************************/
        //LEFT
        /**************************/
        if (this.position === 'left') {
            let startPoint = 5
            let middle = height / 2
            let lineUp = middle - this.range 
            let lineDown = middle + this.range

            if (startPoint + (this.range * 3 + this.decalage) >= width) {
                this.decalage = 0
            }

            //Commencement du dessin
            ctx.beginPath()

            //Milieu (de deux côtés)
            ctx.moveTo(startPoint, middle)
            ctx.lineTo(startPoint, lineUp)
            ctx.lineTo(startPoint, lineDown)
            ctx.moveTo(startPoint + (this.range * 3 + this.decalage), lineUp - this.decalage / 5) //côté droite
            ctx.lineTo(startPoint + (this.range * 3 + this.decalage), (lineUp + (this.range * 2)) + this.decalage / 5)
            
            //Côté haut
            ctx.moveTo(startPoint, lineUp)
            ctx.lineTo(startPoint + (this.range * 1.5) + this.decalage, (lineUp - (this.range * 1.5)) - this.decalage / 5)
            ctx.lineTo((startPoint + ((this.range * 1.5)) * 2) + this.decalage, lineUp - this.decalage / 5)

            //Côté bat
            ctx.moveTo(startPoint, lineDown)
            ctx.lineTo(startPoint + (this.range * 1.5) + this.decalage, (lineDown + (this.range + (this.range / 2))) + this.decalage / 5)
            ctx.lineTo((startPoint + ((this.range * 1.5)) * 2) + this.decalage, lineDown + this.decalage / 5)

            //Remplissange millieu
            ctx.moveTo(startPoint, lineUp)
            ctx.lineTo(startPoint, lineDown)
            ctx.lineTo(startPoint + this.range * 3 + this.decalage, lineDown + this.decalage / 5)
            ctx.lineTo(startPoint + this.range * 3 + this.decalage, lineUp - this.decalage / 5)

            ctx.lineWidth = 2
            ctx.strokeStyle = 'red'
            ctx.fillStyle = 'red'
            ctx.font = '15px Arial'
            ctx.fillText(this.inc, width - 40, 40)

            ctx.fill()
            ctx.stroke()
            ctx.closePath() 
            //Fin du dessin
        }

        /**************************/
        //BOTTOM
        /**************************/
        if (this.position === 'bottom') {
            let startPoint = height - 5
            let middle = width / 2
            let lineLeft = middle - this.range
            let lineRight = middle + this.range

            if ((this.range * 3 + this.decalage) - startPoint >= 0) {
                this.decalage = 0
            }

            //Commencement du dessin
            ctx.beginPath()

            //Milieu (de deux côtés)
            ctx.moveTo(middle, startPoint)
            ctx.lineTo(lineLeft, startPoint)
            ctx.lineTo(lineRight, startPoint)
            ctx.moveTo(lineRight + this.decalage / 5, startPoint - (this.range * 3) - this.decalage) //côté droite
            ctx.lineTo(lineLeft - this.decalage / 5, startPoint - (this.range * 3) - this.decalage)

            //Côté droit
            ctx.moveTo(lineRight, startPoint)
            ctx.lineTo(lineRight + this.range * 1.5 + this.decalage / 5, startPoint - this.range * 1.5 - this.decalage)
            ctx.lineTo(lineRight + this.decalage / 5, startPoint - (this.range * 1.5) * 2 - this.decalage)

            //Côté gauche
            ctx.moveTo(lineLeft, startPoint)
            ctx.lineTo(lineLeft - this.range * 1.5 - this.decalage / 5, startPoint - this.range * 1.5 - this.decalage)
            ctx.lineTo(lineLeft - this.decalage / 5, startPoint - (this.range * 1.5) * 2 - this.decalage)

            //Remplissange millieu
            ctx.moveTo(lineRight, startPoint)
            ctx.lineTo(lineRight + this.decalage / 5, startPoint - this.range * 3 - this.decalage)
            ctx.lineTo(lineLeft - this.decalage / 5, startPoint - this.range * 3 - this.decalage)
            ctx.lineTo(lineLeft, startPoint)

            ctx.lineWidth = 2
            ctx.strokeStyle = 'red'
            ctx.fillStyle = 'red'
            ctx.font = '15px Arial'
            ctx.fillText(this.inc, width - 40, 40)

            ctx.fill()
            ctx.stroke()
            ctx.closePath() 
            //Fin du dessin
        }

        /**************************/
        //RIGHT
        /**************************/
        if (this.position === 'right') {
            let startPoint = width - 5
            let middle = height / 2
            let lineUp = middle - this.range 
            let lineDown = middle + this.range

            if ((this.range * 3 + this.decalage) - startPoint >= 0) {
                this.decalage = 0
            }

            //Commencement du dessin
            ctx.beginPath()

            //Milieu (de deux côtés)
            ctx.moveTo(startPoint, middle)
            ctx.lineTo(startPoint, lineUp)
            ctx.lineTo(startPoint, lineDown)
            ctx.moveTo(startPoint - (this.range * 3 + this.decalage), lineUp - this.decalage / 5) //côté droite
            ctx.lineTo(startPoint - (this.range * 3 + this.decalage), (lineUp + (this.range * 2)) + this.decalage / 5)
            
            //Côté haut
            ctx.moveTo(startPoint, lineUp)
            ctx.lineTo(startPoint - (this.range * 1.5) - this.decalage, (lineUp - (this.range * 1.5)) - this.decalage / 5)
            ctx.lineTo((startPoint - ((this.range * 1.5)) * 2) - this.decalage, lineUp - this.decalage / 5)

            //Côté bat
            ctx.moveTo(startPoint, lineDown)
            ctx.lineTo(startPoint - (this.range * 1.5) - this.decalage, (lineDown + (this.range + (this.range / 2))) + this.decalage / 5)
            ctx.lineTo((startPoint - ((this.range * 1.5)) * 2) - this.decalage, lineDown + this.decalage / 5)

            //Remplissange millieu
            ctx.moveTo(startPoint, lineUp)
            ctx.lineTo(startPoint, lineDown)
            ctx.lineTo(startPoint - this.range * 3 - this.decalage, lineDown + this.decalage / 5)
            ctx.lineTo(startPoint - this.range * 3 - this.decalage, lineUp - this.decalage / 5)

            ctx.lineWidth = 2
            ctx.strokeStyle = 'red'
            ctx.fillStyle = 'red'
            ctx.font = '15px Arial'
            ctx.fillText(this.inc, width - 40, 40)

            ctx.fill()
            ctx.stroke()
            ctx.closePath() 
            //Fin du dessin
        }        
    }

    run () {
        ctx.clearRect(0, 0, width, height)
        this.decalage += 5
        this.inc++
        this.draw(ctx)
    }

    changementVitesse (vitesse) {
        vitesse = parseInt(vitesse)
        this.speed = 101 - vitesse
    }

    changementTaille (taille) {
        taille = parseInt(taille)
        this.range = taille
    }

    updatePosition (position) {
        this.position = position
        ctx.clearRect(0, 0, width, height)
        this.decalage = 0
        this.draw(ctx)
    }
}


let myDiamond = new Diamond(parseInt(sizeRangeButton.value)); // (sa taille, son positionnement horizontale)
myDiamond.draw(ctx)

//Roses de vent position
let upButtonClicked = () => {
    stop()
    raz()
    myDiamond.updatePosition('up')
}

let leftButtonClicked = () => {
    stop()
    raz()
    myDiamond.updatePosition('left')
}

let bottomButtonClicked = () => {
    stop()
    raz()
    myDiamond.updatePosition('bottom')
}

let rightButtonClicked = () => {
    stop()
    raz()
    myDiamond.updatePosition('right')
}


let interValId //Pour pouvoir arrêter l'incrementation
let running = false //Pour voir si l'animation est en cours ou non

//Pour mettre en marche l'animation
let run = () => {
    if (!running) {
        running = true
        interValId = setInterval(() => {
            myDiamond.run()
        }, myDiamond.speed)
    }
}


//Pour arrêter l'animation
let stop = () => {
    if (running) {
        running = false
        clearInterval(interValId)
    }
}


//Pour changer la vitesse de l'animation
let changementVitesse = (vitesse) => {
    if (running) {
        stop()
        myDiamond.changementVitesse(vitesse)
        run()
    } else {
        myDiamond.changementVitesse(vitesse)
    }
}

let changementTaille = (taille) => {
    raz()
    myDiamond.changementTaille(taille)
}

//Pas à pas
let pap = () => {
    if (running) {
        stop()
    }
    myDiamond.run()
}

let raz = () => {
    ctx.clearRect(0, 0, width, height)
    stop()
    myDiamond.decalage = 0
    myDiamond.inc = 0
    running = false
    myDiamond.draw(ctx)
}