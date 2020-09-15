function initScene(){
  loadTrack()
  loadF1()

  loadSkyBox()


  loadLight("light1", [0, 100, 300], [1.0,1.0,1.0], [1.0,1.0,1.0])
  loadLight("light2", [-250, 100, 0], [1.0,1.0,1.0], [1.0,1.0,1.0])
  loadLight("light3", [0, 100, -300], [1.0,1.0,1.0], [1.0,1.0,1.0])
  // loadLight("light4", [250, 100, 0], [1.0,1.0,1.0], [1.0,1.0,1.0])
  loadLight("carlight", [0, 100, 0], [1.0, 0.75, 0.0], [1.0, 0.75, 0.0])

  //obstacle
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -6, 20, "obstacle1")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -6, 35, "obstacle2")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -9, 45, "obstacle3")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -20, 77, "obstacle4")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -37, 138, "obstacle5")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -13, 115, "obstacle6")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -8, 99, "obstacle7")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -3, 83, "obstacle8")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 30, 22, "obstacle9")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 15, 5, "obstacle10")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 35, -10, "obstacle11")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 63, -30, "obstacle12")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 63, -40, "obstacle13")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 66, -60, "obstacle14")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 66, -70, "obstacle15")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 55, -100, "obstacle16")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 44, -108, "obstacle17")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, 33, -109, "obstacle18")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -10, -84, "obstacle19")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -18, -95, "obstacle20")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -40, -115, "obstacle21")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -55, -85, "obstacle22")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -52, -25, "obstacle23")
  loadObstacle(Math.random(333)*360, Math.random(333)*20, -44, -45, "obstacle24")

  //boost
  loadBoost(-39, 175, 0, "boost1")
  loadBoost(55, 170, 0, "boost2")
  loadBoost(185, -50, 0, "boost3")
  loadBoost(10, -240, 0, "boost4")
  loadBoost(-110, -220, 0, "boost5")
}

function loadRandomObstacle(num){
  var i = 0
  for(i = 0; i<num; i++){
    var t1 = Math.random(1231) * 100
    var t2 = Math.random(333) * 100
    loadObstacle(Math.random(333)*360, Math.random(333)*20, t1, t2, "obstacle"+i)
    console.log("loaded obstacle"+i+" in " + t1 + " " + t2)
  }
  console.log("finito")
}
function loadRandomBoost(num){
  var i = 0
  for(i = 0; i<num; i++){
    var t1 = Math.random(1231) * 100
    var t2 = Math.random(333) * 100
    loadBoost(t1, t2, 0, "boost"+i)
    console.log("loaded boost"+i+" in " + t1 + " " + t2)
  }
  console.log("finito")
}

function loadTrack(){
  readMesh('track/track4.obj')
  .then((mesh)=>{
    game_env['track'] = new GenericObj(mesh, 'track')

    var mesh_mtx = game_env['track'].track.getMatrix()
    mesh_mtx = m4.scale(mesh_mtx, 3.0, 0.2, 4.0)
    mesh_mtx = m4.translate(mesh_mtx, 0.0, -18.0, 0.0)
    game_env['track'].track.setMatrix(mesh_mtx)


    // render()
    console.log("track caricato")
    incrementLoading()
    return readMesh('track/terrain.obj')
  })
  .then((mesh)=>{
    game_env['terrain'] = new GenericObj(mesh)

    var mesh_mtx = game_env['terrain'].track.getMatrix()
    mesh_mtx = m4.scale(mesh_mtx, 3.0, 0.2, 4.0)
    mesh_mtx = m4.translate(mesh_mtx, 0.0, -18.0, 0.0)
    game_env['terrain'].track.setMatrix(mesh_mtx)

    console.log("terrain caricato")
    incrementLoading()
    return readMesh('track/finish.obj')
  })
  // .then((mesh)=>{
  //   game_env['arena'] = new GenericObj(mesh, 'arena')
  //
  //   var mesh_mtx = game_env['arena'].track.getMatrix()
  //   mesh_mtx = m4.scale(mesh_mtx, 3.9, 3.9, 3.9)
  //   mesh_mtx = m4.translate(mesh_mtx, 0.0, -1.0, 10.0)
  //   game_env['arena'].track.setMatrix(mesh_mtx)
  //
  //   console.log("arena caricato")
  //   incrementLoading()
  //   return readMesh('track/finish.obj')
  // })
  .then((mesh)=>{
    game_env['finish'] = new GenericObj(mesh, 'finish')

    var mesh_mtx = game_env['finish'].track.getMatrix()
    mesh_mtx = m4.scale(mesh_mtx, 1.5, 1.5, 1.5)
    mesh_mtx = m4.yRotate(mesh_mtx, degToRad(96))
    mesh_mtx = m4.translate(mesh_mtx, 10.0, 0.5, -19.0)
    game_env['finish'].track.setMatrix(mesh_mtx)

    game_env['finish'].setCollisionBox()

    console.log("finish caricato")
    incrementLoading()
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
   game_env['car'].setEnvironment()
   incrementLoading()
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

function loadObstacle(angle, multiplier, translation1, translation2, name){
  var temp = []
  readMesh('obstacle/obstacle2.obj')
  .then((mesh)=>{
    game_env[name] = new Obstacle(mesh, name, angle, multiplier, translation1, translation2)

    game_env[name].setCollisionBox()
    game_env[name].setEnvironment()
    incrementLoading()
  })
}

function loadBoost(translation1, translation2, angle, name){
  var temp = []
  readMesh('speed_boost/boost.obj')
  .then((mesh)=>{
    game_env[name] = new Boost(mesh, name, translation1, translation2, angle)

    game_env[name].setCollisionBox()
    incrementLoading()
  })
}

function loadLight(name, position, diffuse, specular){
  game_env[name] = new Light(position, diffuse, specular, name)
  game_env[name].setCollisionBox()
}

function loadSkyBox(){
  var temp = []
  readMesh('sky/sky.obj')
  .then((mesh)=>{
    game_env['skybox'] = new GenericObj(mesh, 'skybox')

    var mesh_mtx = game_env['skybox'].track.getMatrix()
    mesh_mtx = m4.translate(mesh_mtx, 0.0, 70.0, 50.0)
    mesh_mtx = m4.scale(mesh_mtx, 450, 450, 450)
    mesh_mtx = m4.xRotate(mesh_mtx, degToRad(180))
    game_env['skybox'].track.setMatrix(mesh_mtx)
    incrementLoading()
  })
}
