function setUpMouseInteraction(){
  canvas.addEventListener("mousedown", onMouseDown)
  canvas.addEventListener('contextmenu', e => { e.preventDefault(); });

  overlay.addEventListener("mousedown", onMouseDown)
  overlay.addEventListener('contextmenu', e => { e.preventDefault(); });
}

function onMouseDown(e){
  if ( e.button == 0){
    if(speedBoost_number !== 0){
      speedBoost_number -= 1
      game_env['car'].speedBoost(1.8, 2000)
    }
  }

  if ( e.button == 1){
    e.preventDefault()

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
