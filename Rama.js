import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import { BufferGeometryUtils } from 'https://unpkg.com/three@0.118.3/examples/jsm/utils/BufferGeometryUtils.js';//'../threeLibs/build/three.module.js';'../threegit/examples/jsm/utils/BufferGeometryUtils.js';//from 'https://unpkg.com/three@0.118.3/examples/jsm/utils/BufferGeometryUtils.js';
export function getGeometriaRama(rIni,rFin,largo,q){
    var puntos = [];
    for(let i=0;i<7;i++){
        let a = -((Math.PI*2)/7)*i;
        let an = -((Math.PI*2)/7)*(i+1);
        let x = Math.cos(a);
        let z = Math.sin(a);
        let nx = Math.cos(an);
        let nz = Math.sin(an);
        let vertices = []
        vertices[0] = new THREE.Vector3(rIni*x,0,rIni*z);
        vertices[1] = new THREE.Vector3(rIni*nx,0,rIni*nz);
        vertices[2] = new THREE.Vector3(rFin*x,largo*10,rFin*z);
        vertices[3] = new THREE.Vector3(rIni*nx,0,rIni*nz);
        vertices[4] = new THREE.Vector3(rFin*nx,largo*10,rFin*nz);
        vertices[5] = new THREE.Vector3(rFin*x,largo*10,rFin*z);
        for(let j=0;j<6;j++){
            vertices[j].applyQuaternion( q );
            puntos.push(vertices[j].x,vertices[j].y,vertices[j].z);
        }
    }
    var geometria = new THREE.BufferGeometry();
    geometria.setAttribute( 'position', new THREE.Float32BufferAttribute( puntos, 3 ) );
    geometria.computeVertexNormals();
    return geometria;
}

export function getGeometria(){
    var geos=[];
    geos.push(getGeometriaRama(200,50,200));
    geos.push(getGeometriaRama(100,50,200));
    geos.push(getGeometriaRama(100,50,200));
    geos[0].translate(200,0,0);
    geos[0].rotateZ(90);
    //geos[0].rotateY(90);
    geos[1].translate(-200,0,0);
    geos[1].rotateZ(-90);
    //geos[1].rotateY(-90);
    var geo = BufferGeometryUtils.mergeBufferGeometries (geos,false);

    return geo;
}

export function getGeometriaTest(arreglo){
    var geos=[];
    for(let i=0; i<arreglo.length;i++){
        //if(!Number.isNaN(arreglo[i].posicion.x)){
            console.log(arreglo[i]);
            geos.push(getGeometriaRama(arreglo[i].base,arreglo[i].base*arreglo[i].reduccion,arreglo[i].largo,arreglo[i].rotacion));
            //geos.push(new THREE.BoxBufferGeometry( 1, 1, 1 ));
            geos[i].translate(arreglo[i].posicion.x,arreglo[i].posicion.y,arreglo[i].posicion.z);
        //}
    }

    var geo = BufferGeometryUtils.mergeBufferGeometries (geos,false);

    return geo;
}
