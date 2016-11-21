var juego = {
		filas : [[], [], []],
		espacioVacio : {
			fila : 2,
			columna: 2
						},
		instalarPiezas : instalarPiezas,
		crearPieza : crearPieza,
		capturarTeclas : capturarTeclas,
		iniciar : iniciar,
		moverPiezaFilaColumna : moverPiezaFilaColumna,
		guardarEspacioVacio : guardarEspacioVacio,
		intercambiarPosicionConEspacioVacio : intercambiarPosicionConEspacioVacio,
		chequearSiGano : chequearSiGano,
		mezclarFichas : mezclarFichas,
		moverHaciaIzquierda: moverHaciaIzquierda,
		moverHaciaDerecha : moverHaciaDerecha,
		moverHaciaArriba: moverHaciaArriba,
		moverHaciaAbajo: moverHaciaAbajo

	};
$(window).ready( function () {
	var elemento = $("#juego");
	juego.iniciar(elemento); 
});
//juego.iniciar();
//juego.filas[1][1] = 3;
//console.log(juego.filas[1][1]);
//iniciar : function () {}  //funcion anónima sirve para cuando la función está adentro del mismo obj.
function iniciar(elemento){	
	juego.instalarPiezas(elemento);
	juego.capturarTeclas();
	juego.mezclarFichas(1000);
	}
function instalarPiezas (elemento) {
	var numero=1;
	for(fila=0 ; fila<3 ; fila++) {
		for (columna=0 ; columna<3 ; columna++) {	
			if (fila==juego.espacioVacio.fila && columna==juego.espacioVacio.columna){
				juego.filas[fila][columna]=null;
			}else 
			{
				var pieza  = juego.crearPieza(numero,fila,columna);
				elemento.append(pieza.elemento);
				juego.filas [fila] [columna] = pieza;
				numero=numero+1;
			};
		};
	};
	return elemento;
};
function crearPieza (numero, fila, columna) {
	var elemento = $("<div/>");
	elemento.addClass("pieza");
	elemento.css(
		{
		backgroundImage: 'url("piezas/' + numero + '.jpg")',
		top:fila*200,
		left:columna*200,
		 });
	return {
		elemento : elemento,
		filainicial : fila,
		columnainicial : columna,
	};	
};
function moverPiezaFilaColumna (pieza,fila,columna){
	pieza.elemento.css({
		top:fila*200, 
		left:columna*200
		})
};

function guardarEspacioVacio(fila,columna){
	juego.espacioVacio.fila = fila;
	juego.espacioVacio.columna = columna;
	juego.filas[fila][columna]=null; /*nuevo espacio vacio */
};

function intercambiarPosicionConEspacioVacio(fila, columna){
	var pieza = juego.filas[fila] && juego.filas[fila][columna];
   	if(pieza){
     		juego.filas[juego.espacioVacio.fila][juego.espacioVacio.columna] = pieza;
     		juego.moverPiezaFilaColumna(pieza,juego.espacioVacio.fila,juego.espacioVacio.columna);
     		juego.guardarEspacioVacio(fila,columna);
    		};
};

function moverHaciaAbajo(){
	var filaOrigen = juego.espacioVacio.fila-1;
    	var columnaOrigen = juego.espacioVacio.columna;
    	juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

function moverHaciaArriba(){
	var filaOrigen = juego.espacioVacio.fila+1;
    	var columnaOrigen = juego.espacioVacio.columna;
    	juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

function moverHaciaDerecha(){
	var filaOrigen = juego.espacioVacio.fila;
    	var columnaOrigen = juego.espacioVacio.columna-1;
    	juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

function moverHaciaIzquierda(){
	var filaOrigen = juego.espacioVacio.fila;
    	var columnaOrigen = juego.espacioVacio.columna+1;
    	juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
};

function capturarTeclas(){
    	$(document).keydown(function(event) { //funcion de jquery para leer las teclas.
      	switch(event.which){
        			case 40:
        			moverHaciaAbajo();
    				break; 

        			case 38:
        			moverHaciaArriba();
    				break;

    				case 39:
        			moverHaciaDerecha();
    				break;

    				case 37:
        			moverHaciaIzquierda();
    				break;

        			default: return; //Si toca otra tecla, que no haga nada.
    				};
    		event.preventDefault(); //Desprogramo la tecla en función del teclado.
    		juego.chequearSiGano();
    		})

};

function chequearSiGano() {
	for(var fila=0 ; fila<3 ; fila++) 
	{
		for (var columna=0 ; columna<3 ; columna++) 
		{
			if(juego.filas[fila][columna] && !(juego.filas[fila][columna].filainicial == fila && juego.filas[fila][columna].columnainicial==columna))
			{
				return false;	
  			}
		}
  	}
	alert('Felicitaciones, ganaste!');  	
  };
  function mezclarFichas(veces) {
   var mezclar = ['moverHaciaIzquierda','moverHaciaDerecha','moverHaciaArriba','moverHaciaAbajo'];
  	for (var x=0; x<veces ; x++) {
  		var numerorandom = Math.floor(Math.random() * 4) ;
  		var funcionmezclar = mezclar[numerorandom];
  	  	juego[funcionmezclar]();
  	  };
  }
 