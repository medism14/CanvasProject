//Mise en place et recuperation du canvas
const canvas = document.getElementById('monCanvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const canvasContainer = document.getElementById('canvasContainer')

	if (canvasContainer) {
		//Recuperation de la taille en hauteur et largeur
		var width: number = canvasContainer.offsetWidth
		var height: number = canvasContainer.offsetHeight

		//Modification et mise en place du canvas
		canvas.width = width
		canvas.height = height
		canvas.style.border = "1px solid black"
	}


//Initiliation de la difficulté
let inputDiff = document.getElementById('inputDiff') as HTMLInputElement
let difficulty: number = parseInt(inputDiff.value)

	//Initialisatoin du jeu
	let myGame: any = null

	//Classe du jeu
	class Game {
		//Propriétés	
		radius: number
		score: number
		rep: number
		countRep: number
		x: number
		y: number

		//Constructeur
		constructor(radius: number, rep: number) {
			this.radius = radius
			this.score = 0
			this.rep = rep
			this.countRep = 0
			this.x = 0;
			this.y = 0
		}

		//Dessiner le cercle
		draw (ctx: any): void {

			//Valeur x et y aléatoire
			let randomX: number
			let randomY: number

			this.countRep++

			let getRandomX = (): number => {
				let randomX: number = Math.random() * width

				return randomX
			}

			let getRandomY = (): number => {
				let randomY: number = Math.random() * height

				return randomY
			}

			randomX = getRandomX()
			randomY = getRandomY()

			while (randomX < this.radius * 2 || randomX > ((90 * width) / 100) - 10) {
				randomX = getRandomX()
			}

			while (randomY < this.radius * 2 || randomY > height - this.radius * 2) {
				randomY = getRandomY()
			}

			this.x = randomX
			this.y = randomY

			//Dessin du cercle

			this.writeScore(ctx)

			if (this.countRep == this.rep + 1) return

			//Commence a dessiner le cercle
			ctx.beginPath()

			ctx.arc(randomX, randomY, this.radius, Math.PI * 2, 0)

			ctx.lineWidth = 2
			ctx.strokeStyle = 'red'
			ctx.fillStyle = '#f5f5f5'


			ctx.fill()
			ctx.stroke()
			ctx.closePath()

			
		}

		//Pour voir si c'est cliqué suite a l'evenement
		clicked (x: number, y: number, ctx: any): boolean {
			//Distance eucludienne
			const distance = 
				Math.sqrt(
					((x - this.x) * (x - this.x))
					+
					((y - this.y) * (y - this.y))
				)
			if (distance < this.radius) {
				this.score += 10
				ctx.fillStyle = 'green'
				ctx.fill()
				return true
			}
			return false
		}

		//Pour ecrire le score
		writeScore(ctx: any): void {
			//Recuperation des données du score
			const scoreTextX: number = (90 * width) / 100
			const scoreTextY: number = 40
			
			//creer un score
			ctx.font = '15px Arial'
			ctx.fillStyle = 'black'
			ctx.fillText('Score: ' + this.score, scoreTextX, scoreTextY)
		}

		//Nombre repetitions normal
		getRep(): number {
			return this.rep + 1 // pour afficher le dernier score
		}

		//Nombre score
		getScore(): number {
			return this.score
		}

		//Nombre de repetitions en cours
		getCountRep(): number {
			return this.countRep
		}

	}

	//Variables utiles
	var intervalID: any
	let running: boolean
	var rep: number
	let radius: number
	let touched: boolean

	//Lancer le jeu
	let startGame = (): void => {
		if (!myGame) {
			let gameStatus = alert('Bon jeu !')

			rep = 10
			radius = 30

			myGame = new Game(radius, rep) // (radius, rep)
			setTimeout((): void => {
				running = true
				if (ctx) {
					myGame.draw(ctx)
				}

				//Animation à intervale de difficulté x 100
				intervalID = setInterval(() => {
					touched = false;
					if (ctx) {
						ctx.clearRect(0, 0, width, height)
						myGame.draw(ctx)
					}

					//Si la repetion prend fin
					if (myGame.getRep() < myGame.getCountRep()) {
						clearInterval(intervalID)
						gameFinish()			
					}

				}, (11 - difficulty) * 150)
					
			}, 200)	
		}
	}


	//Modification de la difficulté
	let diffmodif = (diff: HTMLInputElement): void => {
		difficulty = parseInt(diff.value);
	}

	//Jeu finis (en jouant)
	let gameFinish = (): void => {
		let scoreTotal = rep * 10
		alert('Vous avez un score de ' + myGame.getScore() + '/' + scoreTotal + ', soit un ' + (myGame.getScore() * 10) / scoreTotal + '/10')

		setTimeout(() => {
			endGame()
		}, 0)
	}

	//Finir le jeu
	let endGame = (): void => {
		clearInterval(intervalID)
		if (ctx) {
			ctx.clearRect(0, 0, width, height)
		}
		myGame = null;
		running = false
		touched = false
	}

	//Verifier si la souris est sur le cercle
	canvas.onmousemove = (event) => {

		if (myGame) {
			let { x, y } = myGame;
			const rect = canvas.getBoundingClientRect();
			let clientX = event.clientX - rect.left;
			let clientY = event.clientY - rect.top;
			 
			 const distance = Math.sqrt(
			 		((clientX - x) * (clientX - x))
			 		+
			 		((clientY - y) * (clientY - y))
			 	);

			 if (distance <= 30) {
			 	canvas.style.cursor = 'pointer';
			 } else {
			 	canvas.style.cursor = 'auto';
			 }

		} else {
			 canvas.style.cursor = 'auto';
		}
		
	}

	//Verifier s'il a cliqué sur le cercle
	document.onclick = (event) => {
		if (myGame) {
			const rect = canvas.getBoundingClientRect()
			let x = event.clientX - rect.left
			let y = event.clientY - rect.top

			if (!touched) {
				touched = myGame.clicked(x, y, ctx)
			}

		}
	}