View.Skills = function ( $el, widget ){
  this.$el = $el;
  this.widget = widget;

  this.run();
};

View.Skills.prototype = new View.Base();

View.Skills.prototype.run = function(){

  var BarChartWidth = this.widget.rect.w, BarChartHeight = this.widget.rect.h;

  var camera, scene, renderer, controls;

  //BarChart
  var CUBE_LENGTH = 50, CUBE_HEIGHT = 10, CUBE_DEPTH = 50, CUBE_SPACE = 3;
  var cubes;
  var CubeTopVertices = [0,1,4,5];

  var skills = this.widget.data.skills;

  function init() {

    camera = new THREE.PerspectiveCamera( 60, BarChartWidth / BarChartHeight, 1, 1000 );
    camera.position.set( 0, 200, 500 );
    camera.lookAt( new THREE.Vector3(0,0,0) );

    scene = new THREE.Scene();

    // cubes
    cubes = new THREE.Object3D();

    for ( var i = 0; i < skills.length && i < 5; i ++ ) {
      create3DBarChart(i);
    }

    cubes.rotation.y = -Math.PI/2;
    scene.add( cubes );

    // Lights
    //var ambientLight = new THREE.AmbientLight( 0x3f3f3f );
    //scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 1.5, 5000 );
    pointLight.position = camera.position;
    scene.add( pointLight );    

    var container = document.getElementById( 'widget-Skills' );

    controls = new THREE.OrbitControls( camera, container );
    controls.addEventListener( 'change', render );              

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( BarChartWidth, BarChartHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    container.addEventListener('mousedown', onMouseDown, false);

  }

  function create3DBarChart(i){
    var geometry;       
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('/images/bar.jpg'), transparent: true, opacity: 0.9 } );

    geometry = new THREE.CubeGeometry( CUBE_LENGTH, CUBE_HEIGHT, CUBE_DEPTH );
    var cube = new THREE.Mesh( geometry, material );

    cube.position.x = ( i % skills.length ) * (CUBE_LENGTH + CUBE_SPACE) - (CUBE_LENGTH + CUBE_SPACE / 2) * skills.length/2;
    cube.skillname = skills[i].name;
    cube.ability = skills[i].ability;

    cube.geometry.verticesNeedUpdate = true;
    var textMesh = create3DText( cube.skillname );
    textMesh.position.set(0,0,-30);
    textMesh.rotation.set(-Math.PI/2,0,Math.PI/2);
    cube.add( textMesh );

    cubes.add( cube );

    geometry = new THREE.CubeGeometry( CUBE_LENGTH, CUBE_HEIGHT, CUBE_DEPTH );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('/images/bar.jpg'), transparent: true, color: 0xf37756, opacity: 0.9 } );       
    var cube2 = new THREE.Mesh( geometry, material );
    cube2.position.x = ( i % skills.length ) * (CUBE_LENGTH + CUBE_SPACE) - (CUBE_LENGTH + CUBE_SPACE / 2) * skills.length/2;
    cube2.position.z = 53;
    cube2.skillname = skills[i].name;
    cube2.ability = skills[i].ability*Math.random();

    cube2.geometry.verticesNeedUpdate = true;

    cubes.add( cube2 );                                 

  }

  function startBarChartAnimation(){
    // Tween
    for( var i = 0; i < cubes.children.length; i++ ){
      for(var number in CubeTopVertices){     
        if( number != "remove"){                    
          new TWEEN.Tween( cubes.children[i].geometry.vertices[CubeTopVertices[number]] )
            .to({y: 50*cubes.children[i].ability+20}, 3000)
            .easing( TWEEN.Easing.Bounce.Out)
            .delay(i*50)
            .start();
        }
      }
    }
  }

  function create3DText( text ){

    var textGeo = new THREE.TextGeometry( text, {

      size: 30,
        height: 2,
        curveSegments: 5,

        font: "helvetiker",
        weight: "bold",
        style: "normal",

        bevelThickness: 2,
        bevelSize: 1,
        bevelEnabled: true

    });

    var textMat = new THREE.MeshLambertMaterial({color: 0xdddddd, shininess: 60, specular: 0x000000, transparent: true});
    textMeshPoint = new THREE.Mesh( textGeo, textMat );
    return textMeshPoint;
  }           

  function onMouseDown( event ){
    startBarChartAnimation();
    this.addEventListener('mousemove', onMouseMove, false);
  }

  function onMouseMove( event ){          

    // this.style.top = event.clientY-BarChartHeight/2+"px";
    // this.style.left = event.clientX-BarChartWidth/2+"px";
    this.addEventListener('mouseup', onMouseUp, false);
  }

  function onMouseUp( event ){
    this.removeEventListener('mousemove', onMouseMove, false);
    this.removeEventListener('mouseup', onMouseUp, false);
  }

  function onWindowResize() {

    camera.aspect = BarChartWidth / BarChartHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( BarChartWidth, BarChartHeight );

  }

  function animate() {

    requestAnimationFrame( animate );

    render();
    TWEEN.update();
    controls.update();
  }

  function render() {

    if( cubes.children.length > 0 ){
      for(var i=0;i< cubes.children.length;i++){
        cubes.children[i].geometry.verticesNeedUpdate = true;
      }
    }

    renderer.render( scene, camera );
  }


  init();
  animate();
};
