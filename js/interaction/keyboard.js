var key_forward = false
var key_backward = false
var key_right = false
var key_left = false

function keyboardSetUp(){
  window.addEventListener('keydown', doKeyDown, true);
  window.addEventListener('keyup', doKeyUp, true);
}

function doKeyDown(e){

  if (e.keyCode == 87){ key_forward=true; startPlayed = true } // W key

  if (e.keyCode == 83){ key_backward=true; startPlayed = true } // S key

  if (e.keyCode == 65){ key_left=true; startPlayed = true } // A key

  if (e.keyCode == 68){ key_right=true; startPlayed = true } // D KEY
}
function doKeyUp(e){

  if (e.keyCode == 87) key_forward=false; // W key

  if (e.keyCode == 83) key_backward=false; // S key

  if (e.keyCode == 65) key_left=false; // A key

  if (e.keyCode == 68) key_right=false; // D KEY
}
