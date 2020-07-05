class Car {
  constructor(components) {
    this.chassis = mesh[0]
    this.w0 = mesh[1]
    this.w1 = mesh[2]
    this.w2 = mesh[3]
    this.w3 = mesh[4]

    this.center = [0,0,0]
    var i = 0
    this.chassis.vertices.forEach((vertex)=>{
      this.center[i] = this.center[i] + vertex
      i = (i + 1) % 3
    })
    this.center[0] = this.center[0]/(this.chassis.vertices.length/3)
    this.center[1] = this.center[1]/(this.chassis.vertices.length/3)
    this.center[2] = this.center[2]/(this.chassis.vertices.length/3)
  }

  draw(view_mtx, projection_matrix, mode){
    this.chassis.draw(view_mtx, projection_matrix, mode)
    this.w0.draw(view_mtx, projection_matrix, mode)
    this.w1.draw(view_mtx, projection_matrix, mode)
    this.w2.draw(view_mtx, projection_matrix, mode)
    this.w3.draw(view_mtx, projection_matrix, mode)
  }
}
