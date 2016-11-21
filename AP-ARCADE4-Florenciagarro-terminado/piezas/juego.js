var juego = {
		filas : [[], [], []],
		espacioVacio : {
			fila : 2,
			columna: 2
						},
		instalarPiezas : instalarPiezas,
		crearPieza : crearPieza,
	};

 function iniciar(obj){
     console.log(obj);
}

$(window).ready( function () {
	var j = $("#juego");
	iniciar(j); 
});

//juego.iniciar();
//juego.filas[1][1] = 3;
//console.log(juego.filas[1][1]);
function instalarPiezas (elemento) {
	for(fila=0 ; fila<3 ; fila++) {
		for (columna=0 ; columna<3 ; columna++)
		{	
			if (fila==juego.espacioVacio.fila && columna==juego.espacioVacio.columna){
				juego.filas[fila][columna]=null;
		} else 
		{
			var pieza  = juego.crearPieza;
			elemento.append(pieza);
			juego.filas [fila] [columna] = pieza;
		};
	};
};
function crearPieza (numero, fila, columna) {
	var elemento = $("</div>");
	elemento.addClass("pieza");
	elemento
	
}