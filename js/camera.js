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
      var obj = game_env['car']
      var temp = [obj.width/2, 0, obj.height/2, 1.0]
      var temp2 = [-obj.width-7, 0, obj.height+10, 1.0]
      target = (m4.multiply(game_env['car'].chassis.getMatrix(), temp)).slice(0, 3);
      cameraPosition = (m4.multiply(game_env['car'].chassis.getMatrix(), temp2)).slice(0, 3);
    }else{
      target = center
    }

    var temp_l = [game_env['car'].width/2, 0, game_env['car'].height/2, 1.0]
    temp_l = (m4.multiply(game_env['car'].chassis.getMatrix(), temp_l)).slice(0, 3);
    game_env['carlight'].update(temp_l[0],temp_l[1],temp_l[2])

  }
}
