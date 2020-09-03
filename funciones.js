import {MathUtils} from 'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';

//import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
//-------------------------------------------------------------------------------
export function crearArbol( etapa , cantidadEtapas , angulos , grosorInicial , largos,
	puntas , segmentos , hijos , factorMax , factorMin , factorActual ){

	let cadena = "";

	let grosor = grosorInicial;
	let cantidadSegmentos = parseInt( segmentos.valor( etapa, cantidadEtapas ) );
	let tasaDec = parseInt( puntas.valor( etapa, cantidadEtapas ) );

	//console.log( factorActual );

	for( let i=0 ; i<cantidadSegmentos ; i++ ){

		let factorEste = MathUtils.mapLinear( i , 0 , cantidadSegmentos , factorMax , factorMin );
		//console.log( i +"  " + factorEste );
		let anguloActual  = parseInt( angulos.valor( etapa , cantidadEtapas ) );

		if( i==0 && etapa==1 ){
			cadena += "0";
		}else{
			cadena += String( anguloActual );
		}
		cadena += "/"+String(MathUtils.randInt(0,360))+"/"+String(parseInt(grosor*10)/10);

		let largoActual = largos.valor( etapa , cantidadEtapas ) * factorEste * factorActual;
		largoActual = parseInt( largoActual*100) / 100;
		let posicion = MathUtils.randInt(0,10)/10;
		let factor = MathUtils.mapLinear( posicion , 0 , 1 , 10 , tasaDec );

		cadena += "/"+largoActual+"/"+tasaDec;
		if( etapa>1 && i==0 ){
			cadena += "/"+posicion;
		}

		if( etapa < cantidadEtapas && i>0 ){
			let cuantosHijos = parseInt( hijos.valor( etapa , cantidadEtapas ) );

			for( let j=0 ; j<cuantosHijos ; j++ ){
				cadena += "<"+crearArbol( etapa+1 , cantidadEtapas, angulos,
				grosor * factor/10.0, largos, puntas, segmentos , hijos ,
				factorMax , factorMin , factorActual*factorEste )+">";
			}
		}

		if( i<cantidadSegmentos-1 ){
			cadena +="*";
		}
		grosor = grosor * tasaDec / 10;
		//grosor = int( grosor*100)/100.0;
	}

	return cadena;
}
