class GenericObj {
  constructor(mesh) {
    this.track = mesh

    // initialize_position_track(this.track)

    this.center = [0,0,0,1]
    var i = 0
    this.track.vertices.forEach((vertex)=>{
      this.center[i] = this.center[i] + vertex
      i = (i + 1) % 3
    })
    this.center[0] = this.center[0]/(this.track.vertices.length/3)
    this.center[1] = this.center[1]/(this.track.vertices.length/3)
    this.center[2] = this.center[2]/(this.track.vertices.length/3)

    this.center = (m4.multiply(this.track.getMatrix(), this.center)).slice(0, 3);
  }

  hasCollisionBox(){
    return this.collisionBox !== undefined
  }

  draw(view_mtx, projection_matrix, mode){
    this.track.draw(view_mtx, projection_matrix, mode)
  }
}
