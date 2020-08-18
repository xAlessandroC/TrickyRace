function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();

  return { x: Math.round(x - bbox.left * (canvas.width  / bbox.width)),
           y: Math.round(y - bbox.top  * (canvas.height / bbox.height))
         };
}

function degToRad(degree){
  return degree * Math.PI / 180
}

function setUpMouseInteraction(){
  canvas.addEventListener("mousedown", onMouseDown)
  canvas.addEventListener("mouseup", onMouseUp)
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener('contextmenu', e => { e.preventDefault(); });
}

var pressed_dx = 0
var start_x, start_y
var step_theta = 1 * Math.PI / 180
var step_phi = 1 * Math.PI / 180
function onMouseDown(e){
  if ( e.button == 2){
    canvas_coords = windowToCanvas(canvas, e.clientX, e.clientY)
    start_x = canvas_coords.x
    start_y = canvas_coords.y

    pressed_dx = 1
  }

  if ( e.button == 0){
    if(speedBoost_number !== 0){
      speedBoost_number -= 1
      game_env['car'].speedBoost(2, 2000)
    }
  }
}

function onMouseMove(e){
  if(pressed_dx == 1){
    canvas_coords = windowToCanvas(canvas, e.clientX, e.clientY)
    cc_x = canvas_coords.x
    cc_y = canvas_coords.y

    dx = start_x - cc_x
    dy = start_y - cc_y

    // cambio parametri secondo dx, dy
    theta += (step_theta * dx)
    phi += (step_phi * dy)

    start_x = cc_x
    start_y = cc_y

    document.getElementById("phi-theta").innerHTML=""+theta+"-"+phi

    render()
  }
}

function onMouseUp(e){
  if ( e.button == 2){
    start_x = -1
    start_y = -1

    pressed_dx = 0
  }
}
