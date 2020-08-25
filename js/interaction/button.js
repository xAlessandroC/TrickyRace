function ButtonSetUp(){
  window.addEventListener("mousedown", doMouseDown)
  window.addEventListener("mouseup", doMouseUp)
}

function doMouseDown(e){

  if (e.srcElement.id === "forward_button"){ key_forward=true; startPlayed = true } // W key

  if (e.srcElement.id === "backward_button"){ key_backward=true; startPlayed = true } // S key

  if (e.srcElement.id === "left_button"){ key_left=true; startPlayed = true } // A key

  if (e.srcElement.id === "right_button"){ key_right=true; startPlayed = true } // D KEY
}

function doMouseUp(e){

  if (e.srcElement.id === "forward_button"){ key_forward=false;} // W key

  if (e.srcElement.id === "backward_button"){ key_backward=false;} // S key

  if (e.srcElement.id === "left_button"){ key_left=false;} // A key

  if (e.srcElement.id === "right_button"){ key_right=false;} // D KEY

  if (e.srcElement.id === "boost_button"){
    if(speedBoost_number !== 0){
      speedBoost_number -= 1
      game_env['car'].speedBoost(1.8, 2000)
    }
  }

  if (e.srcElement.id === "camera_button"){
    third_person = !third_person
    if(third_person === true){
      a=0
      b=0
      c=0
      angle = 81
    }else{
      a=-7
      b=56
      c=-45
      angle = 50
    }
  }
}
