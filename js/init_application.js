var canvas, gl, program

var phi, theta, radius
var cameraPosition, up, target
var angle, ar, near, far

var game_env

// var a=-15,b=116,c=18
var a=-5,b=24,c=6
// -40/24/6
//b=116

// settings
var free_view = false

function loadTrack(){
  readMesh('track/cube.obj')
  .then((mesh)=>{
    game_env['track'] = new Track(mesh)
    // render()
    console.log("track caricato")
  })
}
function loadCar(){
  var temp = []
  readMesh('car/car.obj', 'car')
  .then((mesh)=>{ temp.push(mesh); return readMesh('car/w0.obj', 'w0') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('car/w1.obj', 'w0') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('car/w3.obj', 'w0') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('car/w4.obj', 'w0') })
  .then((mesh)=>{ temp.push(mesh);
   game_env['car'] = new Car(temp)

   target = game_env['car'].center

   cameraPosition = [game_env['car'].center[0]+a,game_env['car'].center[1]+b,game_env['car'].center[2]+c]

   render() })
}

function render(){
  clear()

  for (const [type, mesh] of Object.entries(game_env)) {

    if(free_view === true){
      cameraPosition = [radius*Math.sin(phi)*Math.cos(theta),
                        radius*Math.sin(phi)*Math.sin(theta),
                        radius*Math.cos(phi)]
    }else{
      if(game_env['car'] !== undefined){
        target = game_env['car'].center
        cameraPosition = [game_env['car'].center[0]+a,game_env['car'].center[1]+b,game_env['car'].center[2]+c]
      }
    }

    var matrix = m4.inverse(m4.lookAt(cameraPosition, target, up))
    var projectionMatrix = m4.perspective(degToRad(angle), ar, near, far);

    mesh.draw(matrix, projectionMatrix)
  }
  document.getElementById("a-b-c").innerHTML = ""+a+"/"+b+"/"+c
  // window.requestAnimationFrame(render)
}

function clear(){
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1);
  gl.clearDepth(1.0);
  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  // console.log(canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

///////////////////////// INIT FUNCTIONS /////////////////////////////////////////////////
function init_gl(){
  program = webglUtils.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"]);

  var matrix = m4.inverse(m4.lookAt(cameraPosition, target, up))
  var projectionMatrix = m4.perspective(degToRad(angle), ar, near, far);
  var res = m4.multiply(projectionMatrix, matrix)

  gl.useProgram(program.program)

  render()
}

function init_param(){
  phi = degToRad(0); theta = degToRad(0); radius = 75
  cameraPosition = [radius*Math.sin(phi)*Math.cos(theta),
                    radius*Math.sin(phi)*Math.sin(theta),
                    radius*Math.cos(phi)]
  up = [0, 1, 0]
  target = [0, 0, 0]

  ar = canvas.clientWidth/canvas.clientHeight
  angle = 50
  near = 1
  far = 1000
}

function init_canvas(){
  canvas = document.getElementById("my_Canvas")
  gl = canvas.getContext("webgl")

  // Adatto il canvas a ricoprire il browser
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  //mouse controls
  setUpMouseInteraction()
  keyboardSetUp()

  // Inizializzo game environment
  game_env = {}


  document.getElementById("Button7").onclick = function(){a+=5; render()};
  document.getElementById("Button8").onclick = function(){a-=5; render()};
  document.getElementById("Button9").onclick = function(){b+=1; render()};
  document.getElementById("Button10").onclick = function(){b-=1; render()};
  document.getElementById("Button11").onclick = function(){c+=1; render()};
  document.getElementById("Button12").onclick = function(){c-=1; render()};
  document.getElementById("a-b-c").innerHTML = ""+a+"/"+b+"/"+c
}

const FRAMES_PER_SECOND = 30;
const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
var lastFrameTime = 0;
function update(time){
    if(time-lastFrameTime < FRAME_MIN_TIME){
      if(game_env['car']!==undefined)
        (game_env['car']).carStep();
      window.requestAnimationFrame(update);
      return;
    }
    lastFrameTime = time;
    render();
    console.log("render")
    window.requestAnimationFrame(update);
}

init_canvas()
init_param()
init_gl()
loadTrack()
loadCar()
render()
window.requestAnimationFrame(update);
