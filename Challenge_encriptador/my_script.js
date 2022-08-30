let txtInput = document.getElementById('input_uno');
console.log(txtInput.value);
let paragraph = document.getElementById('paragraph_output');
let imgMuneco = document.getElementById('img_muneco');
let imgMensaje = document.getElementById('img_sin_mensaje');
let btnCopiar = document.getElementById('button_copiar');
txtInput.focus();
/*txtInput.addEventListener('keypress', validarTexto);

let patron = /[a-z0-9,!]/;
	if (e.key.match(patron)===null) {
		e.preventDefault();
	}
*/

/*Función que se encarga de mostrar la salida, oculta las imagenes de inicio y muestra la salida de texto y el botón que permite copiarlo*/
function showOuput(){
	imgMuneco.style.display = 'none';
	imgMensaje.style.display = 'none';
	paragraph.style.display = 'block';
	btnCopiar.style.display = 'block';
}

/*Función que se encarga de limpiar el elemento de entrada de texto*/
function cleanInput(){
	txtInput.value ='';
	txtInput.focus();
}

function validarTexto(texto){
	// ^: el emparejamiento se debe realizar desde el principio de la cadena.
	// $: el emparejamiento se debe realizar hasta el final de la cadena.
	let patron = /^[a-z,!¡¿?\s\r\n]{1,500}$/;
	console.log("texto " +texto);
	let bandera = patron.test(texto);
	if (!bandera){
		alert("Ingresa solo letras minusculas sin caracteres especiales");
	}
	return bandera;
}

function encriptar(){
	let entrada = txtInput.value;
	let cadenaAux;
	console.log('Entrada: ' + entrada);
	if(validarTexto(entrada)){
		cadenaAux = entrada.replaceAll('e', 'enter');
		cadenaAux = cadenaAux.replaceAll('i', 'imes');
		cadenaAux = cadenaAux.replaceAll('a', 'ai');
		cadenaAux = cadenaAux.replaceAll('o', 'ober');
		cadenaAux = cadenaAux.replaceAll('u', 'ufat');

		paragraph.innerHTML = cadenaAux;

		showOuput();
		cleanInput();
	}
	
}

function desencriptar(){
	let entrada = txtInput.value;
	let cadenaAux;
	console.log('Entrada: ' + entrada);
	if (validarTexto(entrada)) {
		cadenaAux = entrada.replaceAll('enter', 'e');
		cadenaAux = cadenaAux.replaceAll('imes', 'i');
		cadenaAux = cadenaAux.replaceAll('ai', 'a');
		cadenaAux = cadenaAux.replaceAll('ober', 'o');
		cadenaAux = cadenaAux.replaceAll('ufat', 'u');

		paragraph.innerHTML = cadenaAux;

		showOuput();
		cleanInput();
	}
	
}

// Función que permite copiar texto de un elemento parrafo
// Nota: si el elemento de donde se desea copiar fuese directamente un input no es necesario crear uno nuevo para poder usar la funcion select()
function copy(){
	var inputAux = document.createElement("input");
	inputAux.setAttribute("value", paragraph.innerHTML);
	document.body.appendChild(inputAux);
	inputAux.select();
	document.execCommand("copy");
	document.body.removeChild(inputAux);
}