class Car {
  constructor(components) {
    this.chassis = components[0]
    this.w0 = components[1]
    this.w1 = components[2]
    this.w2 = components[3]
    this.w3 = components[4]

    initialize_position_car(components);

    this.center = [0,0,0,1]
    var i = 0
    this.chassis.vertices.forEach((vertex)=>{
      this.center[i] = this.center[i] + vertex
      i = (i + 1) % 3
    })
    this.center[0] = this.center[0]/(this.chassis.vertices.length/3)
    this.center[1] = this.center[1]/(this.chassis.vertices.length/3)
    this.center[2] = this.center[2]/(this.chassis.vertices.length/3)

    this.centerw0 = [0,0,0,1]
    this.w0.vertices.forEach((vertex)=>{
      this.centerw0[i] = this.centerw0[i] + vertex
      i = (i + 1) % 3
    })
    this.centerw0[0] = this.centerw0[0]/(this.w0.vertices.length/3)
    this.centerw0[1] = this.centerw0[1]/(this.w0.vertices.length/3)
    this.centerw0[2] = this.centerw0[2]/(this.w0.vertices.length/3)

    this.center = (m4.multiply(this.chassis.getMatrix(), this.center)).slice(0, 3);
    this.centerw0 = (m4.multiply(this.w0.getMatrix(), this.centerw0)).slice(0, 3);

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
      this.vx -= this.acceleration
    if (key_backward === true)
      this.vx += this.acceleration

    if (key_left === true)
      this.sterzo -= this.vsterzo;
    if (key_right === true)
      this.sterzo += this.vsterzo;
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

    // chassis
    var mtx_c = m4.copy(mtx)
    mtx_c = m4.zRotate(mtx_c, degToRad(this.facing));
    this.chassis.setMatrix(mtx_c)

    this.center = [0,0,0,1]
    this.center = (m4.multiply(this.chassis.getMatrix(), this.center)).slice(0, 3);

    // wheel 1
    // var mtx_w0 = m4.identity()
    var mtx_w0 = m4.copy(this.chassis.getMatrix())
    // mtx_w0 = m4.zRotate(mtx_w0, degToRad(this.facing));
    // mtx_w0 = m4.translate(mtx_w0, -this.center[0], -this.center[1], 0)
    mtx_w0 = m4.translate(mtx_w0, -5.65785, 3.09398, 0.437695)
    // mtx_w0 = m4.yRotate(mtx_w0, degToRad(this.mozzo));
    mtx_w0 = m4.zRotate(mtx_w0, degToRad(-this.sterzo));
    mtx_w0 = m4.translate(mtx_w0, 5.65785, -3.09398, -0.437695)
    this.w0.setMatrix(m4.copy(mtx_w0))

    // this.centerw0 = [this.centerw0[0],this.centerw0[1],this.centerw0[2],1]
    // this.centerw0 = (m4.multiply(this.w0.getMatrix(), this.centerw0)).slice(0, 3);

    // wheel 2
    var mtx_w1 = m4.copy(this.chassis.getMatrix())
    // mtx_w1 = m4.translate(mtx_w1, this.vx, this.vy, this.vz)
    // mtx_w1 = m4.zRotate(mtx_w1, degToRad(this.facing));
    // // mtx_w1 = m4.zRotate(mtx_w1, degToRad(this.sterzo));
    // // mtx_w1 = m4.yRotate(mtx_w1, degToRad(this.mozzo));
    this.w1.setMatrix(m4.copy(mtx_w1))

    // wheel 3
    var mtx_w2 = m4.copy(this.chassis.getMatrix())
    // mtx_w2 = m4.translate(mtx_w2, this.vx, this.vy, this.vz)
    // mtx_w2 = m4.zRotate(mtx_w2, degToRad(this.facing));
    // // mtx_w2 = m4.zRotate(mtx_w2, degToRad(this.sterzo));
    // // mtx_w2 = m4.yRotate(mtx_w2, degToRad(this.mozzo));
    this.w2.setMatrix(m4.copy(mtx_w2))

    // wheel 4
    var mtx_w3 = m4.copy(this.chassis.getMatrix())
    // mtx_w3 = m4.translate(mtx_w3, this.vx, this.vy, this.vz)
    // mtx_w3 = m4.zRotate(mtx_w3, degToRad(this.facing));
    mtx_w3 = m4.translate(mtx_w3, -5.65785, -3.09398, 0.437695)
    mtx_w3 = m4.zRotate(mtx_w3, degToRad(-this.sterzo));
    mtx_w3 = m4.translate(mtx_w3, 5.65785, 3.09398, -0.437695)
    // mtx_w3 = m4.yRotate(mtx_w3, degToRad(this.mozzo));
    this.w3.setMatrix(m4.copy(mtx_w3))
  }

  draw(view_mtx, projection_matrix, mode){
    this.chassis.draw(view_mtx, projection_matrix, mode)
    this.w0.draw(view_mtx, projection_matrix, mode)
    this.w1.draw(view_mtx, projection_matrix, mode)
    this.w2.draw(view_mtx, projection_matrix, mode)
    this.w3.draw(view_mtx, projection_matrix, mode)
  }
}
