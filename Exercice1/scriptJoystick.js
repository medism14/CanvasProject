// Récupère le canvas et son contexte pour le joystick
const jcanvas = document.getElementById('joystick-canvas');
const jctx = jcanvas.getContext('2d');

// Initialise la largeur et la hauteur du canvas
var width = jcanvas.width;
var height = jcanvas.height;

// Classe pour le joystick de menu
class JoystickMenu {
    constructor(radius) {
        this.radius = radius;
        this.x = width / 2;
        this.y = height / 2;
    }

    // Dessine le joystick de menu
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.lineWidth = 2;
        ctx.fillStyle = 'gray';
        ctx.strokeStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

// Classe pour le joystick de mouvement
class JoystickMove {
    constructor(radius) {
        this.radius = radius;
        this.x = width / 2;
        this.y = height / 2;
        this.distance = 0;
    }

    // Dessine le joystick de mouvement
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.lineWidth = 1;
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    // Déplace le joystick de mouvement et met à jour le canvas
    move(x, y, joystickMenu, ctx, distance) {
        this.x = x;
        this.y = y;
        ctx.clearRect(0, 0, width, height);
        this.distance = distance;
        joystickMenu.draw(ctx);
        this.draw(ctx);
    }

    // Récupère les informations du joystick de mouvement (degré, angle, distance)
    getInfos(joystickMenu) {
        let angle = Math.atan2(this.y - joystickMenu.y, this.x - joystickMenu.x);
        let degree = angle * (180 / Math.PI);
        degree = (degree < 0) ? 360 + degree : degree;
        return {
            'degree': degree,
            'angle': angle,
            'distance': this.distance 
        };
    }
}

// Crée une instance de joystick de menu et le dessine sur le canvas
const joystickMenu = new JoystickMenu(70);
joystickMenu.draw(jctx);

// Crée une instance de joystick de mouvement et le dessine sur le canvas
const joystickMove = new JoystickMove(15);
joystickMove.draw(jctx);

let intervalId;
let isDraggling;

// Ajoute un écouteur d'événement pour déterminer le type de curseur en fonction de la position de la souris
jcanvas.addEventListener('mousemove', (event) => {

    const canvasRect = jcanvas.getBoundingClientRect();

    let mouseX = event.clientX - canvasRect.x;
    let mouseY = event.clientY - canvasRect.y;

    let joystickX = joystickMove.x;
    let joystickY = joystickMove.y;

    let joystickMX = joystickMenu.x;
    let joystickMY = joystickMenu.y;

    const distance = 
    Math.sqrt(
        ((mouseX - joystickX) * (mouseX - joystickX))
        +
        ((mouseY - joystickY) * (mouseY - joystickY))
    );

    // Détermine le type de curseur en fonction de la distance par rapport au joystick de mouvement
    if (distance < 15) {
        jcanvas.style.cursor = 'pointer';
    } else {
        jcanvas.style.cursor = 'auto';
    }

    // Si le joystick est en train d'être déplacé, met à jour sa position en fonction de la distance par rapport au joystick de menu
    if (isDraggling) {

        const distanceJ = Math.sqrt(
            ((mouseX - joystickMX) * (mouseX - joystickMX))
            +
            ((mouseY - joystickMY) * (mouseY - joystickMY))
        ); 

        if (distanceJ < 54) {
            joystickMove.move(mouseX, mouseY, joystickMenu, jctx, distanceJ);
        }
    }
});

// Ajoute un écouteur d'événement pour commencer le déplacement du joystick lorsque la souris est enfoncée
jcanvas.addEventListener('mousedown', (event) => {

    const canvasRect = jcanvas.getBoundingClientRect();

    let mouseX = event.clientX - canvasRect.x;
    let mouseY = event.clientY - canvasRect.y;

    let joystickX = joystickMove.x;
    let joystickY = joystickMove.y;

    const distance = 
    Math.sqrt(
        ((mouseX - joystickX) * (mouseX - joystickX))
        +
        ((mouseY - joystickY) * (mouseY - joystickY))
    );

    // Si la souris est sur le joystick de mouvement, commence le déplacement
    if (distance < 15) {
        isDraggling = true;
    }
});

// Ajoute un écouteur d'événement pour arrêter le déplacement du joystick lorsque la souris est relâchée
jcanvas.addEventListener('mouseup', (event) => {
    isDraggling = false;
});