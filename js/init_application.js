var canvas, gl, program

var phi, theta, radius
var cameraPosition, up, target
var angle, ar, near, far

var game_env

function loadTrack(){
  readMesh('track/track.obj')
  .then((mesh)=>{
    game_env['track'] = new Track(mesh)
    render()
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

   render() })
}

function render(){
  clear()

  for (const [type, mesh] of Object.entries(game_env)) {

    cameraPosition = [radius*Math.sin(phi)*Math.cos(theta),
                      radius*Math.sin(phi)*Math.sin(theta),
                      radius*Math.cos(phi)]
    var matrix = m4.inverse(m4.lookAt(cameraPosition, target, up))
    var projectionMatrix = m4.perspective(degToRad(angle), ar, near, far);

    mesh.draw(matrix, projectionMatrix)
  }
  // window.requestAnimationFrame(render)
}

function clear(){
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1);
  gl.clearDepth(1.0);
  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  console.log(canvas.width, canvas.height);
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
  phi = degToRad(1); theta = degToRad(1); radius = 15
  cameraPosition = [radius*Math.sin(phi)*Math.cos(theta),
                    radius*Math.sin(phi)*Math.sin(theta),
                    radius*Math.cos(phi)]
  up = [0, 0, 1]
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

  // Inizializzo game environment
  game_env = {}
}

init_canvas()
init_param()
init_gl()
loadTrack()
loadCar()
render()
