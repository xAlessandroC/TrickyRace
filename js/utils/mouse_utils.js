function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();

  return { x: Math.round(x - bbox.left * (canvas.width  / bbox.width)),
           y: Math.round(y - bbox.top  * (canvas.height / bbox.height))
         };
}

function degToRad(degree){
  return degree * Math.PI / 180
}
