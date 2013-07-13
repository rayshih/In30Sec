View.Skills = function ( $el, widget ){
  this.$el = $el;
  this.widget = widget;

  this.run();
};

View.Skills.prototype = new View.Base();

View.Skills.prototype.run = function(){
  var self = this;
  var BarChartWidth = 800, BarChartHeight = 400;

  var camera, scene, renderer;

  //BarChart
  var CUBE_LENGTH = 50, CUBE_HEIGHT = 10, CUBE_DEPTH = 50, CUBE_SPACE = 3;
  var cubes;
  var CubeTopVertices = [0,1,4,5];

  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera( 60, BarChartWidth / BarChartHeight, 1, 1000 );
    camera.position.set( 0, 200, 500 );
    camera.lookAt( new THREE.Vector3(0,0,0) );

    scene = new THREE.Scene();

    // cubes
    cubes = new THREE.Object3D();
    var geometry;
    var material = new THREE.MeshPhongMaterial( { color: 0x77ffff, transparent: true, opacity: 0.9 } );

    for ( var i = 0; i < 10; i ++ ) {
      geometry = new THREE.CubeGeometry( CUBE_LENGTH, CUBE_HEIGHT, CUBE_DEPTH );
      var cube = new THREE.Mesh( geometry, material );

      cube.position.x = ( i % 10 ) * (CUBE_LENGTH + CUBE_SPACE) - (CUBE_LENGTH + CUBE_SPACE / 2) * 5;

      cube.geometry.verticesNeedUpdate = true;

      cubes.add( cube );
      scene.add( cubes );
    }

    // Lights
    var ambientLight = new THREE.AmbientLight( 0x3f3f3f );
    scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 1, 5000 );
    scene.add( pointLight );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( BarChartWidth, BarChartHeight );
    self.$el.append( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    startBarChartAnimation();
  }

  function startBarChartAnimation(){
    // Tween
    for( var i = 0; i < cubes.children.length; i++ ){
      for(var number in CubeTopVertices){
        new TWEEN.Tween( cubes.children[i].geometry.vertices[CubeTopVertices[number]] )
          .to({y: 10*i+20}, 3000)
          .easing( TWEEN.Easing.Bounce.Out)
          .delay(i*50)
          .start();
      }
    }
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

  }

  function render() {

    if( cubes.children.length > 0 ){
      for(var i=0;i< cubes.children.length;i++){
        cubes.children[i].geometry.verticesNeedUpdate = true;
      }
    }

    renderer.render( scene, camera );
  }
};
