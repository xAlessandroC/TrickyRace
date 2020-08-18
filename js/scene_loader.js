function initScene(){
  loadTrack()
  loadF1()
  // loadF1_2()
  loadObstacle(0, 0, 10.0, 10.0)
  loadBoost(-25.5, 15.0, -6)
}

function loadTrack(){
  readMesh('track/track3.obj')
  .then((mesh)=>{
    game_env['track'] = new Track(mesh)
    // render()
    console.log("track caricato")
    readMesh('track/terrain.obj')
    .then((mesh)=>{
      game_env['terrain'] = new Track(mesh)
      console.log("terrain caricato")
    })
  })
}

function loadF1(){
  var temp = []
  readMesh('f1_car/chassis.obj')
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w0.obj') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w1.obj') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w2.obj') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w3.obj') })
  .then((mesh)=>{ temp.push(mesh);
   game_env['car'] = new Car(temp, "car")

   game_env['car'].setCollisionBox()

   target = game_env['car'].center
   cameraPosition = [game_env['car'].center[0]+a,game_env['car'].center[1]+b,game_env['car'].center[2]+c]
  })
}

function loadF1_2(){
  var temp = []
  readMesh('f1_car/chassis.obj')
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w0.obj') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w1.obj') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w2.obj') })
  .then((mesh)=>{ temp.push(mesh); return readMesh('f1_car/w3.obj') })
  .then((mesh)=>{ temp.push(mesh);
   game_env['car2'] = new Car(temp, "car2")

   game_env['car2'].setCollisionBox()
  })
}

function loadObstacle(angle, multiplier, translation1, translation2){
  var temp = []
  readMesh('obstacle/obstacle.obj')
  .then((mesh)=>{
    game_env['obstacle1'] = new Obstacle(mesh, "obstacle1", angle, multiplier, translation1, translation2)

    game_env['obstacle1'].setCollisionBox()
  })
}

function loadBoost(translation1, translation2, angle){
  var temp = []
  readMesh('speed_boost/boost.obj')
  .then((mesh)=>{
    game_env['boost1'] = new Boost(mesh, "boost1", translation1, translation2, angle)

    game_env['boost1'].setCollisionBox()
  })
}
