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

    this.center = (m4.multiply(this.chassis.getMatrix(), this.center)).slice(0, 3);

    this.acceleration = 0.6
    this.attritoZ = 0.991; this.attritoX = 0.8; this.attritoY = 1.0
    this.vx = 0; this.vy = 0; this.vz = 0
    this.facing = 0; this.grip = 0.45
    this.sterzo = 0; this.vsterzo = 1.4; this.rsterzo = 0.75
  }

  carStep(){
    // console.log("[CAR STEP]:\nFORWARD:" + key_forward + "\nBACKWARD:" + key_backward + "\nLEFT:" + key_left + "\nRIGHT:" + key_right)
    if (key_forward === true)
      this.vx -= this.acceleration
    if (key_backward === true)
      this.vx += this.acceleration

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

    console.log("[CAR STEP]: position ["+this.vx+","+this.vy+","+this.vz+","+this.facing+"]")
    this.updatePosition()

    // px += vx
    // py += vy
    // pz += vz
  }

  updatePosition(){
    var mtx = m4.translate(this.chassis.getMatrix(), this.vx, this.vy, this.vz)

    // chassis
    var mtx_c = m4.copy(mtx)
    mtx_c=m4.zRotate(mtx_c, degToRad(this.facing));
    this.chassis.setMatrix(mtx_c)

    // wheel 1
    this.w0.setMatrix(m4.copy(mtx))

    // wheel 2
    this.w1.setMatrix(m4.copy(mtx))

    // wheel 3
    this.w2.setMatrix(m4.copy(mtx))

    // wheel 4
    this.w3.setMatrix(m4.copy(mtx))
  }

  draw(view_mtx, projection_matrix, mode){
    this.chassis.draw(view_mtx, projection_matrix, mode)
    this.w0.draw(view_mtx, projection_matrix, mode)
    this.w1.draw(view_mtx, projection_matrix, mode)
    this.w2.draw(view_mtx, projection_matrix, mode)
    this.w3.draw(view_mtx, projection_matrix, mode)
  }
}
