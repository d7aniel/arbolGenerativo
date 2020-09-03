import {MathUtils} from 'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';

export class Evolucion{

	constructor( minValorIni , maxValorIni , minValorFin , maxValorFin ){
		this.minValorIni = minValorIni;
		this.maxValorIni = maxValorIni;
		this.minValorFin = minValorFin;
		this.maxValorFin = maxValorFin;
	}

	valor( etapa , cantidadTotal ){
		let minimo = MathUtils.mapLinear( etapa , 1 , cantidadTotal , this.minValorIni, this.minValorFin );
		let maximo = MathUtils.mapLinear( etapa , 1 , cantidadTotal , this.maxValorIni, this.maxValorFin );
		return MathUtils.randFloat(minimo,maximo);
	}

	valorInterpolado( etapa , cantidadTotal , factor ){
		let minimo = MathUtils.mapLinear( etapa , 1 , cantidadTotal , this.minValorIni, this.minValorFin );
		let maximo = MathUtils.mapLinear( etapa , 1 , cantidadTotal , this.maxValorIni, this.maxValorFin );
		return MathUtils.mapLinear( factor , 0 , 1 , minimo , maximo );
	}

}
//-------------------------------------------------------------------------------

/*
*/
