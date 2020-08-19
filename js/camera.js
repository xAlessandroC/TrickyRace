function setCamera(){
  if(game_env['car'] === undefined || free_view === true){
    cameraPosition = [radius*Math.sin(phi)*Math.cos(theta),
                      radius*Math.sin(phi)*Math.sin(theta),
                      radius*Math.cos(phi)]
  }else{
    var center = [0,0,0,1]
    center = (m4.multiply(game_env['car'].chassis.getMatrix(), center)).slice(0, 3);
    center[1] += 2
    cameraPosition = [center[0]+a,center[1]+b,center[2]+c]

    if(third_person === true){
      var dimensions = computeDimensions([game_env['car'].chassis,game_env['car'].w0, game_env['car'].w1, game_env['car'].w2, game_env['car'].w3])
      var temp = [dimensions[0]/2, 0, dimensions[2]/2, 1.0]
      var temp2 = [-dimensions[0]-7, dimensions[1]*0/2, dimensions[2]+10, 1.0]
      target = (m4.multiply(game_env['car'].chassis.getMatrix(), temp)).slice(0, 3);
      cameraPosition = (m4.multiply(game_env['car'].chassis.getMatrix(), temp2)).slice(0, 3);
    }else{
      target = center
    }
  }
}
