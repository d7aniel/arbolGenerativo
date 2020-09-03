import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threegit/build/three.module.js';;//'https://unpkg.com/three@0.118.3/build/three.module.js';//'../threeLibs/build/three.module.js';
import { Evolucion } from './Evolucion.js';
import { crearArbol } from './funciones.js';
import { GeometriaArbol } from './Arbol.js';
import { OrbitControls } from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';//'../threegit/examples/jsm/controls/OrbitControls.js';;//'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://unpkg.com/three@0.118.3/examples/jsm/libs/dat.gui.module.js';//'../threegit/examples/jsm/libs/dat.gui.module.js';
import {getGeometria} from './Rama.js'
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var camera, scene, renderer, material;
var arbol;
var configuracion = [];

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 700;
	scene = new THREE.Scene();

    /*var light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( light );*/
   var lightp = new THREE.PointLight( 0xffffff, 0.9, 1500 );
    lightp.position.x = 0;
    lightp.position.y = 0;
    lightp.position.z = 500;
    scene.add( lightp );

    lightp = new THREE.PointLight( 0xffffff, 0.9, 1500 );
    lightp.position.x = 0;
    lightp.position.y = 0;
    lightp.position.z = -500;
    scene.add( lightp );

    lightp = new THREE.PointLight( 0xffffff, 0.9, 1500 );
    lightp.position.x = 500;
    lightp.position.y = 0;
    lightp.position.z = 0;
    scene.add( lightp );

    lightp = new THREE.PointLight( 0xffffff, 0.9, 1500 );
    lightp.position.x = -500;
    lightp.position.y = 0;
    lightp.position.z = 0;
    scene.add( lightp );


    //var geometria = getGeometria();/*new THREE.BufferGeometry();
    /*var vertices = getGeometriaRama(200,50,200);
    console.log(vertices);
    geometria.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometria.computeVertexNormals();*/


    createPanel();

    recrearArbol();
    scene.add(arbol);

    /*var geometria = new THREE.BoxBufferGeometry(150,150,150);
    var material = new THREE.MeshStandardMaterial();
    var mesh = new THREE.Mesh( geometria, material );
    var q = new THREE.Quaternion();
    q.setFromEuler(new THREE.Euler(0,0,-Math.PI*0.25));
    mesh.applyQuaternion(q);
    mesh.translateY(400);
    var a = new THREE.Vector3();
    mesh.getWorldPosition(a);
    console.log(a);
    q.setFromEuler(new THREE.Euler(0,0,-Math.PI*0.75));
    mesh.applyQuaternion(q);
    mesh.translateY(400);
    mesh.getWorldPosition(a);
    console.log(a);*/

    //document.getElementById( "cambiar" ).addEventListener( 'click', recrearArbol, false );





    //var object =

    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

    //--------- controles de mouse
   var controls = new OrbitControls( camera, renderer.domElement );
   controls.addEventListener( 'change', render );
   controls.enableKeys = false;
}
function recrearArbol(){
    let largos = new Evolucion( configuracion[0]['minimo inicial'] ,  configuracion[0]['maximo inicial'] ,  configuracion[0]['minimo final'] ,  configuracion[0]['maximo final'] );
    let angulos = new Evolucion( configuracion[1]['minimo inicial'] ,  configuracion[1]['maximo inicial'] ,  configuracion[1]['minimo final'] ,  configuracion[1]['maximo final'] );
    let segmentos = new Evolucion(configuracion[2]['minimo inicial'] ,  configuracion[2]['maximo inicial'] ,  configuracion[2]['minimo final'] ,  configuracion[2]['maximo final'] );
    let hijos = new Evolucion( configuracion[3]['minimo inicial'] ,  configuracion[3]['maximo inicial'] ,  configuracion[3]['minimo final'] ,  configuracion[3]['maximo final'] );
    let puntas = new Evolucion( configuracion[4]['minimo inicial'] ,  configuracion[4]['maximo inicial'] ,  configuracion[4]['minimo final'] ,  configuracion[4]['maximo final'] );
    //let grosorInicial = 9;//configuracion[5]['grosorInicial'];

      let cadena = crearArbol( 1 , 3 , angulos , THREE.MathUtils.randInt(2,5) , largos , puntas , segmentos , hijos , 1.0 , 0.8 , 1.0 );
      //console.log(cadena);
      //console.log("------------------");
      var arbolGeo = new GeometriaArbol(cadena,scene);
      var geometria = arbolGeo.crear();
      var material = new THREE.MeshNormalMaterial();

      if(arbol==undefined){
          arbol = new THREE.Mesh( geometria, material );
      }else{
          arbol.geometry.dispose();
          arbol.geometry.copy(geometria);
      }
      arbol.scale.x = 4;
      arbol.scale.y = 4;
      arbol.scale.z = 4;
      arbol.position.y = -250;
      console.log("pasa");
}
function createPanel() {
    var panel = new GUI( { width: 310 } );
    /*let  = new Evolucion( 1.0 , 2.5 , 0.7 , 1.9 );
    let  = new Evolucion( 0 , 2 , 40 , 90 );
    let  = new Evolucion( 4 , 9 , 1 , 1 );
    let  = new Evolucion( 2 , 3 , 1 , 1 );
    let  = new Evolucion( 7 , 8 , 3 , 3 );
    et grosorInicial = 3;*/
    var valoresIniciales = [];
    valoresIniciales[0] = [ 1.0 , 2.5 , 0.7 , 1.9 ];
    valoresIniciales[1] = [ 0 , 2 , 40 , 90 ];
    valoresIniciales[2] = [ 4 , 9 , 1 , 1 ];
    valoresIniciales[3] = [ 2 , 3 , 1 , 1 ];
    valoresIniciales[4] = [ 7 , 8 , 3 , 3 ];

    var minmaxpaso = [];
    minmaxpaso[0] = [ 0.0 , 5.0 , 0.01 ];
    minmaxpaso[1] = [ 0 , 360 , 1];
    minmaxpaso[2] = [ 1 , 15 , 1];
    minmaxpaso[3] = [ 0 , 7 , 1 ];
    minmaxpaso[4] = [ 0 , 10 , 1 ];

    /*configuracion[5] = {
        'grosorInicial' : 3
    };*/
    configuracion[5] = {
        'crear uno nuevo' : recrearArbol
    };
    //panel.add(configuracion[5],'grosorInicial',1,10,1).onChange( recrearArbol );//
    panel.add(configuracion[5],'crear uno nuevo');//.onChange( recrearArbol );//


    var carpetas = [];
    carpetas[0] = panel.addFolder( 'largos' );
    carpetas[1] = panel.addFolder( 'angulos' );
    carpetas[2] = panel.addFolder( 'segmentos' );
    carpetas[3] = panel.addFolder( 'hijos' );
    carpetas[4] = panel.addFolder( 'puntas' );
    //carpetas[5] = panel.addFolder( 'grosorInicial' );

    for(let i=0;i<5;i++){
        configuracion[i] = {
            'minimo inicial' : valoresIniciales[i][0],
            'maximo inicial' : valoresIniciales[i][1],
            'minimo final' : valoresIniciales[i][2],
            'maximo final' : valoresIniciales[i][3],
        };
        carpetas[i].add( configuracion[i], 'minimo inicial', minmaxpaso[i][0], minmaxpaso[i][1], minmaxpaso[i][2]  ).onChange( recrearArbol );//
        carpetas[i].add( configuracion[i], 'maximo inicial', minmaxpaso[i][0], minmaxpaso[i][1], minmaxpaso[i][2]  ).onChange( recrearArbol );//;//.onChange( showModel );
        carpetas[i].add( configuracion[i], 'minimo final', minmaxpaso[i][0], minmaxpaso[i][1], minmaxpaso[i][2]  ).onChange( recrearArbol );//;//.onChange( showModel );
        carpetas[i].add( configuracion[i], 'maximo final', minmaxpaso[i][0], minmaxpaso[i][1], minmaxpaso[i][2]  ).onChange( recrearArbol );//;//.onChange( showModel );
    }
}
function onWindowResize() {
	windowHalfX = window.innerWidth/2;
	windowHalfY = window.innerHeight/2;
	camera.aspect = (window.innerWidth / window.innerHeight);
	camera.updateProjectionMatrix();
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
    render();
}
function render() {
    var time = Date.now() * 0.005;
    renderer.render( scene, camera );
}
