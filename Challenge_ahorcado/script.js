let homeScreen = document.getElementById('section_inicio');
let juegoScreen = document.getElementById('section_juego');
let ventanaModal = document.getElementById('div_modal');
let tituloModal = document.getElementById('h1_modal');
let parrafoModal = document.getElementById('p_modal');
let tablero = document.getElementById('canvas_tablero').getContext('2d');

let words = ["HOLA", "MEXICO", "RODAR"];
let palabraSecreta = '';

let intento = 0;
let acierto = 0;
let arrayLetrasMal = [];

function dibujarCanvas(){
    tablero.lineWidth = 7;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "rgba(255, 255, 255, 0.25)";
    tablero.strokeStyle = "#0A3871";

    tablero.roundRect(0,0,940,520,20);
    tablero.fill();
    tablero.beginPath();
    tablero.moveTo(400, 320);
    tablero.lineTo(500, 320);
    tablero.stroke();
    tablero.closePath();
}

function dibujarLineaHorca(xInicial, yInicial, xFinal, yFinal) {
	tablero.beginPath();
	tablero.moveTo(xInicial, yInicial);
	tablero.lineTo(xFinal, yFinal);
	tablero.stroke();
	tablero.closePath();
}

function dibujarHorca() {
	tablero.lineWidth = 7;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";

    switch(intento){
    	case 0:
    		dibujarLineaHorca(440, 320, 440, 80);
    		break;
    	case 1:
    		dibujarLineaHorca(440, 80, 550, 80);
    		break;
    	case 2:
    		dibujarLineaHorca(550, 80, 550, 105);
    		break;
    	case 3:
    		tablero.beginPath();
		    tablero.arc(550, 135, 30, 0, 2*3.14);
		    tablero.stroke();
		    tablero.closePath();
    		break;
    	case 4:
    		dibujarLineaHorca(550, 165, 550, 250);
    		break;
    	case 5:
    		dibujarLineaHorca(550, 250, 570, 280);
    		break;
    	case 6:
    		dibujarLineaHorca(550, 250, 530, 280);
    		break;
    	case 7:
    		dibujarLineaHorca(550, 180, 570, 210);
    		break;
    	case 8:
    		dibujarLineaHorca(550, 180, 530, 210);
    		break;

    	
    }
}

function dibujarLinea(){
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";

    let anchura = 550/palabraSecreta.length;
    for (let i = 0; i < palabraSecreta.length; i++){
        
        tablero.moveTo(200 + (anchura*i), 440)
        tablero.lineTo(250 + (anchura*i), 440)
    }

    tablero.stroke();
    tablero.closePath();
}

function dibujarLetra(index){
	tablero.font = "bold 35px Inter";
	tablero.lineWidth = 6;
	tablero.lineCap = "round";
	tablero.lineJoin = "round";
	tablero.fillStyle = "#0A3871";

	let anchura = 550/palabraSecreta.length;
	console.log(palabraSecreta[index]);
	tablero.fillText(palabraSecreta[index], 205 +(anchura*index), 420);
	tablero.stroke();
	tablero.closePath();
}

function dibujarLetraMal(letra) {
	tablero.font = "bold 25px Inter";
	tablero.lineWidth = 5;
	tablero.lineCap = "round";
	tablero.lineJoin = "round";
	tablero.fillStyle = "#0A3871";

	let anchura = 550/9;
	console.log('Dibujar letra mal: ' + letra);
	tablero.fillText(letra, 205 +(anchura*intento), 500);
	tablero.stroke();
	tablero.closePath();
}

function randWord() {
	let word = Math.round(Math.random() * (words.length-1));
	return word;
}

function ganador() {
	tituloModal.innerHTML = '¡Felicidades!¡Ganaste!';
	parrafoModal.innerHTML = 'Has adivinado la palabra secreta y lograste que Arturo no llegara a la hora. ¿Deseas volver a jugar?';
	ventanaModal.style.display = 'flex';
}

function perdedor() {
	tituloModal.innerHTML = '¡Suerte para la próxima!';
	parrafoModal.innerHTML = 'Lamentablemente Arturo llegó a la horca pero puedes volver a intentar salvarlo. ¿Deseas volver a jugar?';
	ventanaModal.style.display = 'flex';
}

function comprobarLetra(letra) {
	if(!(palabraSecreta.includes(letra))){
		if (!(arrayLetrasMal.includes(letra))) {
			dibujarLetraMal(letra);
			arrayLetrasMal.push(letra);
			dibujarHorca();
			intento++;
			if(intento > 8) {
				setTimeout(perdedor, 900);
			}
		}
	}else {
		for(let i = 0; i < palabraSecreta.length; i++) {
			if(palabraSecreta[i] === letra){
				dibujarLetra(i);
				acierto++;
			}
		}

		if(acierto > palabraSecreta.length -1) {
			setTimeout(ganador, 900);
		}
	}
}

function accion(event){
	let patron = /[A-Z]/;
		let tecla = event.key;
		if (tecla.match(patron)===null) {
			event.preventDefault();
			alert('Introduce solo letras MAYÚSCULAS')
		} else{
			console.log("addEventListener: " + tecla);
			/* event.keyCode is deprecated now event.which is the corect way*/
			if (event.which > 64 && event.which < 91) {
				comprobarLetra(tecla);
			}
		}
}

function iniciaJuego() {
	intento = 0;
	acierto = 0;
	arrayLetrasMal = [];
	homeScreen.style.display = 'none';
	juegoScreen.style.display = 'block';
	ventanaModal.style.display = 'none';
	tablero.clearRect(0,0,940,520);

	palabraSecreta = words[randWord()];

	console.log(palabraSecreta);

	dibujarCanvas();
	dibujarLinea();

	document.addEventListener('keydown',accion, false);
}

function desistir(){
	ventanaModal.style.display = 'none';
	section_juego.style.display = 'none';
	section_inicio.style.display = 'flex';
}





