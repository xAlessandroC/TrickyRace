class Car {
  constructor(components, name) {
    this.id = name
    this.chassis = components[0]
    this.w0 = components[1]
    this.w1 = components[2]
    this.w2 = components[3]
    this.w3 = components[4]

    this.collisionBox = undefined

    initialize_position_car(components);

    this.center = computeCenter(this.chassis, this, this.chassis.getMatrix())
    this.centerw0 = computeCenter(this.w0)
    this.centerw1 = computeCenter(this.w1)
    this.centerw2 = computeCenter(this.w2)
    this.centerw3 = computeCenter(this.w3)

    this.shift_chassis = -this.center[0]
    this.center = (m4.multiply(this.chassis.getMatrix(), this.center)).slice(0, 3);

    this.acceleration = 0.6
    this.attritoZ = 0.991; this.attritoX = 0.8; this.attritoY = 1.0
    this.vx = 0; this.vy = 0; this.vz = 0
    this.facing = 0; this.grip = 0.45
    this.sterzo = 0; this.vsterzo = 1.4; this.rsterzo = 0.75
    this.mozzo = 0;
    this.raggio = 0.5
  }

  carStep(){
    // console.log("[CAR STEP]:\nFORWARD:" + key_forward + "\nBACKWARD:" + key_backward + "\nLEFT:" + key_left + "\nRIGHT:" + key_right)
    if (key_forward === true)
      this.vx += this.acceleration
    if (key_backward === true)
      this.vx -= this.acceleration

    if (key_left === true)
      this.sterzo += this.vsterzo;
    if (key_right === true)
      this.sterzo -= this.vsterzo;
    this.sterzo *= this.rsterzo;
    if(Math.abs(this.sterzo) < 0.0001) this.sterzo = 0

    this.vx *= this.attritoX; if(Math.abs(this.vx) < 0.0001) this.vx = 0
    this.vy *= this.attritoY; if(Math.abs(this.vy) < 0.0001) this.vy = 0
    this.vz *= this.attritoZ; if(Math.abs(this.vz) < 0.0001) this.vz = 0

    this.facing = (this.vx*this.grip)*this.sterzo;

    var da ;
    da = (180.0*this.vx)/(Math.PI*this.raggio);
    this.mozzo+=da;

    // console.log("[CAR STEP]: position ["+this.vx+","+this.vy+","+this.vz+","+this.sterzo+"]")
    document.getElementById("sterzo").innerHTML = "sterzo " + this.sterzo
    this.updatePosition()
  }

  updatePosition(){
    var mtx = m4.translate(this.chassis.getMatrix(), this.vx, this.vy, this.vz)
    var sterzo_multiplier = 30/4.2

    // chassis
    var mtx_c = m4.copy(mtx)
    mtx_c = m4.zRotate(mtx_c, degToRad(this.facing));
    this.chassis.setMatrix(mtx_c)

    this.center = [0,0,0,1]
    this.center = (m4.multiply(this.chassis.getMatrix(), this.center)).slice(0, 3);
    // this.collisionBox.center = this.center

    // wheel 1
    var mtx_w0 = m4.copy(this.chassis.getMatrix())
    mtx_w0 = m4.translate(mtx_w0, this.centerw0[0],this.centerw0[1],this.centerw0[2])
    mtx_w0 = m4.zRotate(mtx_w0, degToRad(this.sterzo*sterzo_multiplier));
    mtx_w0 = m4.yRotate(mtx_w0, degToRad(this.mozzo));
    mtx_w0 = m4.translate(mtx_w0, -this.centerw0[0],-this.centerw0[1],-this.centerw0[2])
    this.w0.setMatrix(m4.copy(mtx_w0))

    // wheel 2
    var mtx_w1 = m4.copy(this.chassis.getMatrix())
    mtx_w1 = m4.translate(mtx_w1, this.centerw1[0],this.centerw1[1],this.centerw1[2])
    mtx_w1 = m4.yRotate(mtx_w1, degToRad(this.mozzo));
    mtx_w1 = m4.translate(mtx_w1, -this.centerw1[0],-this.centerw1[1],-this.centerw1[2])
    this.w1.setMatrix(m4.copy(mtx_w1))

    // wheel 3
    var mtx_w2 = m4.copy(this.chassis.getMatrix())
    mtx_w2 = m4.translate(mtx_w2, this.centerw2[0],this.centerw2[1],this.centerw2[2])
    mtx_w2 = m4.yRotate(mtx_w2, degToRad(this.mozzo));
    mtx_w2 = m4.translate(mtx_w2, -this.centerw2[0],-this.centerw2[1],-this.centerw2[2])
    this.w2.setMatrix(m4.copy(mtx_w2))

    // wheel 4
    var mtx_w3 = m4.copy(this.chassis.getMatrix())
    mtx_w3 = m4.translate(mtx_w3, this.centerw3[0],this.centerw3[1],this.centerw3[2])
    mtx_w3 = m4.zRotate(mtx_w3, degToRad(this.sterzo*sterzo_multiplier));
    mtx_w3 = m4.yRotate(mtx_w3, degToRad(this.mozzo));
    mtx_w3 = m4.translate(mtx_w3, -this.centerw3[0],-this.centerw3[1],-this.centerw3[2])
    this.w3.setMatrix(m4.copy(mtx_w3))

    // collision box
    if (this.collisionBox !== undefined){
      this.collisionBox.center = [this.center[0]+this.shift_chassis,this.center[1],this.center[2]]

      var mtx = m4.identity()
      mtx = m4.multiply(mtx, m4.copy(this.chassis.getMatrix()))
      mtx = m4.translate(mtx, 0.0,0.0,0.0)
      mtx = m4.scale(mtx, 1.0, 1.0, 1.0)
      mtx = m4.translate(mtx, this.shift_chassis, 0.0, 0.0)
      this.collisionBox.box.setMatrix(mtx)

      this.collisionBox.updateVertices(mtx)
    }
  }

  // setCollisionBox(component){
  //   var temp = computeDimensions(component.vertices)
  //   var width = temp[0]
  //   var length = temp[1]
  //   var heigth = temp[2]
  //
  //   readMesh('collisionBox/box.obj')
  //   .then((mesh)=>{
  //     var w1 = width;   var l1 = length;   var h1 = heigth; var c1 = this.center
  //     var cbox = new CollisionBox(c1, w1, l1, h1, component.getMatrix())
  //     // cbox.updateVertices(initMatrix)
  //     this.collisionBox = cbox
  //     console.log("collision box loaded")
  //   })
  // }

  draw(view_mtx, projection_matrix, mode){
    this.chassis.draw(view_mtx, projection_matrix, mode)
    this.w0.draw(view_mtx, projection_matrix, mode)
    this.w1.draw(view_mtx, projection_matrix, mode)
    this.w2.draw(view_mtx, projection_matrix, mode)
    this.w3.draw(view_mtx, projection_matrix, mode)

    if (this.collisionBox!== undefined)
      this.collisionBox.draw(view_mtx, projection_matrix, gl.LINES)
  }
}
