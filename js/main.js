var contexto;//variable para guardar el contexto 2D del canvas
var intentos = -1;//variable para guardar el nº de fallos acumulados.
var maximo = 5;//nº de fallos permitidos.

var opciones = ["mortadelo","abundancia","bombachos","cachetada","daltónico","optimismo","galactica","granizada","golosinas"];
var palabra ;

var aciertosAcumulados = 0;
var diferencia ;
var letra;//variable para guardar el array de la palabra a adivinar.
var letras;// variable para guardar el array de las casillas con la solución.

//Inicia la página.
function iniciar(){
	//Se asigna el input que contendra la letra elegida a la variable letra.
	letra = document.getElementById("letra");
	//Asignar el canvas a la variable contexto.
	var canvas = document.getElementById('c');
	canvas.width = 700;
	canvas.height = 768;
	contexto = canvas.getContext("2d");

	//Asignar las imagenes a sus objetos.
	fondo.imagen = new Image();//Una nueva imagen a la propiedad imagen del objeto fondo.
	fondo.imagen.src = fondo.imagenURL;//La dirección de la imagen.
	fondo.imagen.onload = confirmarFondo;//La carga de la imagen.

	fondoFinal.imagen = new Image();
	fondoFinal.imagen.src = fondoFinal.imagenURL;
	fondoFinal.imagen.onload = confirmarFondoFinal;

	intJugamos.imagen = new Image();
	intJugamos.imagen.src = intJugamos.imagenURL;
	intJugamos.imagen.onload = confirmarIntJugamos;

	int00.imagen = new Image();
	int00.imagen.src = int00.imagenURL;
	int00.imagen.onload = confirmarInt00;

	int01.imagen = new Image();
	int01.imagen.src = int01.imagenURL;
	int01.imagen.onload = confirmarInt01;

	int02.imagen = new Image();
	int02.imagen.src = int02.imagenURL;
	int02.imagen.onload = confirmarInt02;

	int03.imagen = new Image();
	int03.imagen.src = int03.imagenURL;
	int03.imagen.onload = confirmarInt03;

	int04.imagen = new Image();
	int04.imagen.src = int04.imagenURL;
	int04.imagen.onload = confirmarInt04;

	int05.imagen = new Image();
	int05.imagen.src = int05.imagenURL;
	int05.imagen.onload = confirmarInt05;

	victoria.imagen = new Image();
	victoria.imagen.src = victoria.imagenURL;
	victoria.imagen.onload = confirmarVictoria;

	dibujar();
}
//Comienza el juego
function comenzamos(){
	masUnError();//Para saltar a la pantalla inicial de la partida.
	//Ocultar el boton inicial.
	var botonInicio = document.getElementById("botonInicio");
	botonInicio.classList.remove("visible");
	botonInicio.classList.add("invisible");
	//Mostrar el contedor del juego.
	var contenedor = document.getElementById("contenedor");
	contenedor.classList.remove("invisible");
	contenedor.classList.add("visible");
	//Colocamos el foco en la letra
	reiniciarLetra();
	//Sorteo la palabra oculta
	sorteo();
}
//Crear los objetos con las imagenes que representan el estado del nº de intentos fallados.
	var fondo = {
		imagenURL: "img/fondo.png"
	};
	var fondoFinal = {
		imagenURL : "img/fondo_final.png"
	};
	var intJugamos = {
		imagenURL : "img/intentos_-1.png"
	};
	var int00 = {
		imagenURL : "img/intentos_0.png"
	};
	var int01 = {
		imagenURL : "img/intentos_1.png"
	};
	var int02 = {
		imagenURL : "img/intentos_2.png"
	};
	var int03 = {
		imagenURL : "img/intentos_3.png"
	};
	var int04 = {
		imagenURL : "img/intentos_4.png"
	};
	var int05 = {
		imagenURL : "img/intentos_5.png"
	};
	var victoria = {
		imagenURL : "img/victoria.png"
	};
//Confirmar la carga de las imágenes.
	function confirmarFondo(){
		fondo.imagenOK = true;
		dibujar();
	}
	function confirmarFondoFinal(){
		fondoFinal.imagenOK = true;
		dibujar();
	}
	function confirmarIntJugamos(){
		intJugamos.imagenOK = true;
		dibujar();
	}
	function confirmarInt00(){
		int00.imagenOK = true;
		dibujar();
	}
	function confirmarInt01(){
		int01.imagenOK = true;
		dibujar();
	}
	function confirmarInt02(){
		int02.imagenOK = true;
		dibujar();
	}
	function confirmarInt03(){
		int03.imagenOK = true;
		dibujar();
	}
	function confirmarInt04(){
		int04.imagenOK = true;
		dibujar();
	}
	function confirmarInt05(){
		int05.imagenOK = true;
		dibujar();
	}
	function confirmarVictoria(){
		victoria.imagenOK = true;
		dibujar();
	}
//Elegir la letra
function elegirLetra(){
	//El jugador escribe una letra y al pulsar el boton se lee.
	letraElegida = letra.value;
	letraElegida = letraElegida.toLowerCase();
	//alert("Tu letra es: " + letraElegida);

	//Asignar las casillas de la solucion 
	solucion = document.getElementById("solucion");//Asignar el div con los input a la varible solucion
	letras = solucion.getElementsByTagName("input");//Asignar los input al array letras.
	//Se exige una letra antes de comenzar la comprobacion para evitar errores por celda vacia.
	if(letraElegida!=="")
	{
		//Instanciamos la funcion que comprueba la letra elegida.
		comprobarLetra();
	}
	else
	{
		alert("Debes elegir una letra");
	}
}
//Función comprobacion de la existencia de la letra elegida en la palabra oculta.
function comprobarLetra(){
	presente = false;//la letra elegida de inicio no esta en la palabra
	//Bucle para comprobar si la letra elegida esta en la palabra.
	var i;
	for(i=0; i< palabra.length; i++)
		{
			if(letraElegida == palabra[i]){
				//alert("La letra " + letraElegida + " esta en la posicion " + (i+1));
				letras[i].value = letraElegida;//Colocar la letra acertada en su posición.
				letras[i].style.backgroundColor = "#B3E0B9";//Remarcar los aciertos.s
				presente = true;//la letra elegida esta en la palabra
				masUnAcierto();
				var aciertosNecesarios = palabra.length;
				diferencia = (aciertosNecesarios - aciertosAcumulados);
				//alert("Te faltan " + diferencia + " aciertos. " );
			}
				if(aciertosNecesarios == aciertosAcumulados)
				{
					console.log("diferencia: " + diferencia);
					dibujar();
				}
		}

	incrementoError();
	//Si termina el bucle y la letra no esta se ejecuta la funcion que aumenta el numero de intentos fallados.
	function incrementoError()
	{
		if(presente === false)
		{
			masUnError();//Instanciar la función que aumenta los fallos acumulados.
		}
	}
	reiniciarLetra();//Instanciar la funcion que reinicia la celda.
}
//Vaciar la casilla y se le devuelve el foco 
function reiniciarLetra(){
	letra.value = "";
	letra.focus();
}
//Funcion masUnError icrementa los errores acumulados.
function masUnError(){
	intentos++;
	dibujar();
}
//Funcion masUnAcierto icrementa los aciertos acumulados.
function masUnAcierto(){
	aciertosAcumulados++;
	dibujar();
}
//Regresar a la pantalla de inicio.
function reinicio(){
	for(i=0; i<letras.length; i++)
	{
		letras[i].value = "*";
	}
	location.reload();
}
//Oculta el panel de juego.
function ocultarPanelJuego(){
	var panel = document.getElementById("panel");
	panel.classList.add("invisible");
}
//Cargar las imagenes dependiendo del estado de los intentos fallados.
function dibujar(){
	
	if(intentos<5)
	{
		contexto.drawImage(fondo.imagen, 0,0);
	}
	if(intentos == -1)
	{
		contexto.drawImage(intJugamos.imagen, 0,0);
	}
	if(intentos === 0)
	{
		contexto.drawImage(int00.imagen, 0,0);
	}
	if(intentos == 1)
	{
		contexto.drawImage(int01.imagen, 0,0);
	}
	if(intentos == 2)
	{
		contexto.drawImage(int02.imagen, 0,0);
	}
	if(intentos == 3)
	{
		contexto.drawImage(int03.imagen, 0,0);
	}
	if(intentos == 4)
	{
		contexto.drawImage(int04.imagen, 0,0);
	}

	if(intentos == 5)
		{
			contexto.drawImage(fondoFinal.imagen, 0,0);
			contexto.drawImage(int05.imagen, 0,0);
			ocultarPanelJuego();
			window.setTimeout("reinicio()", 5000);//Volver a la pantalla de inicio despúes de 6 segundos.
			resolver()
		}
	if(diferencia === 0)
	{
		contexto.drawImage(victoria.imagen, 0,0);
		ocultarPanelJuego();
		window.setTimeout("reinicio()", 5000);//Volver a la pantalla de inicio despúes de 5 segundos.

	}
}
//Sortear la palabra oculta
function sorteo(){
	var numOpciones = opciones.length;
	var aleatorio = Math.round(Math.random()*numOpciones);
	palabra = opciones[aleatorio];
	// alert(aleatorio + " "+palabra);
}
//Mostrar palabra oculta
function resolver()
{
	for(i=0; i<palabra.length; i++){
		letras[i].value = palabra[i];
	}
}