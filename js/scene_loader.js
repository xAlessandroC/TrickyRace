function initScene(){
  loadTrack()
  loadF1()
  // loadF1_2()
  // loadObstacle(0, 0, 10.0, 10.0)
  // loadBoost(-25.5, 15.0, -6)
  loadRandomObstacle(10)
  loadRandomBoost(10)
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
  readMesh('track/track3.obj')
  .then((mesh)=>{
    game_env['track'] = new Track(mesh)
    // render()
    console.log("track caricato")
    readMesh('track/terrain.obj')
    .then((mesh)=>{
      game_env['terrain'] = new Track(mesh)
      console.log("terrain caricato")
      incrementLoading()
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
  readMesh('obstacle/obstacle.obj')
  .then((mesh)=>{
    game_env[name] = new Obstacle(mesh, name, angle, multiplier, translation1, translation2)

    game_env[name].setCollisionBox()
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
