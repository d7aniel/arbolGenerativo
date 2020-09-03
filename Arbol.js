import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';;'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import {getGeometriaTest} from './Rama.js'

//import { Evolucion } from './Evolucion.js';
export class GeometriaArbol{
	constructor( adn , e){
		this.escena = e;
		this.adn = adn;
		this.estado = "normal";
		this.variables = "";
		this.conVariables = false;
		this.conAltura = false;
		this.x = 0;
		this.y = 0;
		this.z = 0;

		this.cantidadPila = 0;
		this.pila = [];
		this.ultimoLargo = 0;
		this.pilaTrasnformacion = [];
		this.pilaRotacion = [];
		//this.ultimaPosicion = new THREE.Vector3();
		//this.ultimaRotacion = new THREE.Quaternion();
		this.objeto = new THREE.Object3D();
	}

	push(){
		//this.objeto.getWorldPosition(this.ultimaPosicion);
		//this.objeto.getWorldQuaternion(this.ultimaRotacion);
		this.pila[ this.cantidadPila ] = this.ultimoLargo;
		this.pilaTrasnformacion[ this.cantidadPila ] = this.objeto.position.clone();//this.ultimaPosicion.clone();
		this.pilaRotacion[ this.cantidadPila ] = this.objeto.rotation.clone();//this.ultimaRotacion.clone();
		this.cantidadPila ++;

		/*var geometria = new THREE.BoxBufferGeometry(2,2,2);
		var material = new THREE.MeshStandardMaterial();
		material.color.setRGB(255,0,0);
		var mesh = new THREE.Mesh( geometria, material );
		mesh.position.x = this.objeto.position.x-1;
		mesh.position.y = this.objeto.position.y-1;
		mesh.position.z = this.objeto.position.z-1;
		this.escena.add(mesh);*/

	}

	pop(){
		this.ultimoLargo = this.pila[ this.cantidadPila-1 ];
		//this.ultimaPosicion = this.pilaTrasnformacion[this.cantidadPila-1 ].clone();
		//this.ultimaRotacion = this.pilaRotacion[this.cantidadPila-1 ].clone();

		this.objeto.position.x = this.pilaTrasnformacion[this.cantidadPila-1 ].x;//this.ultimaPosicion.x;
		this.objeto.position.y = this.pilaTrasnformacion[this.cantidadPila-1 ].y;//this.ultimaPosicion.y;
		this.objeto.position.z = this.pilaTrasnformacion[this.cantidadPila-1 ].z;//this.ultimaPosicion.z;

		this.objeto.rotation.x = this.pilaRotacion[this.cantidadPila-1 ].x;//this.ultimaRotacion.x;
		this.objeto.rotation.y = this.pilaRotacion[this.cantidadPila-1 ].y;//this.ultimaRotacion.y;
		this.objeto.rotation.z = this.pilaRotacion[this.cantidadPila-1 ].z;//this.ultimaRotacion.z;
		this.objeto.rotation.w = this.pilaRotacion[this.cantidadPila-1 ].w;//this.ultimaRotacion.w;

		this.cantidadPila--;
	}

	crear(){
		var ramas = [];
		this.crearConAdn(this.adn,ramas);

		return getGeometriaTest(ramas);
	}
	crearConAdn(adn,ramas){
		for( let i=0 ; i<this.adn.length ; i++ ){
			let caracter = this.adn.charAt(i);
			this.procesar(caracter,ramas);
		}
		this.procesar("",ramas);
	}

	procesar(caracter,ramas){
		var nuevaRama =  undefined;
		if( caracter == '<' ){
			nuevaRama = this.revisarVariables();
			this.push();
		}else if( caracter == '>' ){
			nuevaRama = this.revisarVariables();
			this.pop();
		}else if( caracter == '*' ){
			nuevaRama = this.revisarVariables();
			this.trasladarParaSeguir();
		}else if( caracter == "" ){
			nuevaRama = this.revisarVariables();
		}else{
			this.variables += caracter;
		}
		if(nuevaRama!=undefined){
			ramas.push(nuevaRama);
		}
	}

	trasladarParaSeguir(){
        var posA = new THREE.Vector3(this.objeto.position.x,this.objeto.position.y,this.objeto.position.z);
		this.objeto.translateY(this.ultimoLargo * 10);
		var posB = new THREE.Vector3(this.objeto.position.x,this.objeto.position.y,this.objeto.position.z);

		var material = new THREE.LineBasicMaterial({
			color: 0x0000ff
		});
		material.depthTest = false;
		var points = [];
		points.push( posA );
		points.push( posB );

		var geometry = new THREE.BufferGeometry().setFromPoints( points );

		var line = new THREE.Line( geometry, material );
		line.renderOrder = 1;
		//this.escena.add( line );
	}

	revisarVariables(){
		let corteVar = this.variables.split( '/' );
		corteVar = corteVar.map((x)=>{return parseFloat(x);})
		var objeto = {};
		if( corteVar.length>=5 ){
			objeto['largo'] = corteVar[3];
			objeto['base'] = corteVar[2];
			if( corteVar.length>=6 ){

				//var posA = new THREE.Vector3(this.objeto.position.x,this.objeto.position.y,this.objeto.position.z);
				this.objeto.translateY(this.ultimoLargo * 10 * corteVar[5]);
				//var posB = new THREE.Vector3(this.objeto.position.x,this.objeto.position.y,this.objeto.position.z);

				/*var material = new THREE.LineBasicMaterial({
					color: 0x00ffff
				});
				material.depthTest = false;
				var points = [];
				points.push( posA );
				points.push( posB );

				var geometry = new THREE.BufferGeometry().setFromPoints( points );

				var line = new THREE.Line( geometry, material );
				line.renderOrder = 1;
				//this.escena.add( line );*/
			}
			//var q = new THREE.Quaternion();
			//q.setFromEuler( new THREE.Euler( 0, THREE.MathUtils.degToRad(corteVar[1]), THREE.MathUtils.degToRad(corteVar[0]), 'XYZ' ));

			/*var q = new THREE.Quaternion();
			q.setFromEuler( new THREE.Euler( 0, 0, THREE.MathUtils.degToRad(corteVar[0]), 'XYZ' ));
			this.objeto.applyQuaternion(q);
			q = new THREE.Quaternion();
			q.setFromEuler( new THREE.Euler( 0, , 0, 'XYZ' ));

			this.objeto.applyQuaternion(q);*/
			var qY = new THREE.Quaternion();
			//q.setFromEuler( new THREE.Euler( 0, THREE.MathUtils.degToRad(-THREE.MathUtils.mapLinear(corteVar[1],0,360,360,0)),0, 'XYZ' ));
			qY.setFromEuler( new THREE.Euler( 0, THREE.MathUtils.degToRad(corteVar[1]),0, 'XYZ' ));



			var qZ = new THREE.Quaternion();
			qZ.setFromEuler( new THREE.Euler( 0, 0, THREE.MathUtils.degToRad(corteVar[0]), 'XYZ' ));

			//this.objeto.applyQuaternion(qZ);
			//this.objeto.applyQuaternion(qY);
			this.objeto.rotateY(THREE.MathUtils.degToRad(corteVar[1]));
			this.objeto.rotateZ(-THREE.MathUtils.degToRad(corteVar[0]));
			//this.objeto.applyQuaternion(q);

			//this.objeto.applyQuaternion(q);

			/*var q = new THREE.Quaternion();
			//q.setFromEuler( new THREE.Euler( 0, THREE.MathUtils.degToRad(-THREE.MathUtils.mapLinear(corteVar[1],0,360,360,0)),0, 'XYZ' ));
			q.setFromEuler( new THREE.Euler( 0, THREE.MathUtils.degToRad(-THREE.MathUtils.mapLinear(corteVar[1],0,360,360,0)),THREE.MathUtils.degToRad(corteVar[0]), 'XYZ' ));
			this.objeto.applyQuaternion(q);*/

			/*this.objeto.rotation.x = q.x;
			this.objeto.rotation.y = q.y;
			this.objeto.rotation.z = q.z;
			this.objeto.rotation.w = q.w;*/
			//this.objeto.applyQuaternion(q);
			//let vPos = new THREE.Vector3();
			//this.objeto.getWorldPosition(vPos);
			objeto['posicion'] = this.objeto.position.clone();//vPos;
			//let qRot = new THREE.Quaternion();
			//this.objeto.getWorldQuaternion(qRot);
			objeto['rotacion'] = this.objeto.quaternion.clone();//qRot;
			objeto['reduccion'] = THREE.MathUtils.mapLinear(corteVar[4],0,10,0,1);//this.objeto.quaternion.clone();
			/*var posA = new THREE.Vector3(this.objeto.position.x,this.objeto.position.y,this.objeto.position.z);
			var objClone = this.objeto.clone();
			objClone.translateY(10);
			var posB = new THREE.Vector3(objClone.position.x,objClone.position.y,objClone.position.z);
			var material = new THREE.LineBasicMaterial({
				color: 0xff0000
			});
			material.depthTest = false;
			var points = [];
			points.push( posA );
			points.push( posB );
			var geometry = new THREE.BufferGeometry().setFromPoints( points );
			var line = new THREE.Line( geometry, material );
			line.renderOrder = 1;
			this.escena.add( line );*/
			this.ultimoLargo = corteVar[3];
		}else{
			this.variables = "";
			return undefined;
		}
		this.variables = "";
		return objeto;
	}
}
/*
class EstructuraArbol{
	constructor(sup){
		this.supeiror = sup;
		this.inferior = new EstrcuturaArbol(this);
		this.pos;
		this.rot;
	}

	setPos(){
		this.pos = p;
	}
	setRot(){
		this.rot = r;
	}
}*/
