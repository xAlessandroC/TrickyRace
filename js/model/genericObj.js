class GenericObj {
  constructor(mesh, id) {
    this.id = id
    this.environment = 0
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

  setEnvironment(){
    this.environment = 1
  }

  setCollisionBox(){
    var dimensions = computeDimensions([this.track])

    var box = new CollisionBox(dimensions[0], dimensions[1]/2, dimensions[2]/2, this, 'box')
    this.collisionBox = box

    this.collisionBox.update(this.track.getMatrix())
  }

  hasCollisionBox(){
    return this.collisionBox !== undefined
  }

  onCollision(tag){
    if(this.id === 'finish' && tag === 'car'){
      finished = true
    }
  }

  draw(view_mtx, projection_matrix, mode){
    this.track.draw(view_mtx, projection_matrix, mode, this.environment)

    if(this.hasCollisionBox() === true && activeBox === true)
      this.collisionBox.draw(view_mtx, projection_matrix, mode)
  }
}
