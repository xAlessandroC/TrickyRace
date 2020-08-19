


function setCamera(){
  if(game_env['car'] !== undefined){
    cameraPosition = [radius*Math.sin(phi)*Math.cos(theta),
                      radius*Math.sin(phi)*Math.sin(theta),
                      radius*Math.cos(phi)]
  }else{
    target = game_env['car'].center
    cameraPosition = [game_env['car'].center[0]+a,game_env['car'].center[1]+b,game_env['car'].center[2]+c]
  }
}
