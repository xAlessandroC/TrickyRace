class Boost {
  constructor(mesh, name) {
    this.id = name
    this.boost = mesh

    var mesh_mtx = this.boost.getMatrix()

    mesh_mtx = m4.scale(mesh_mtx, 4,4,4)
    mesh_mtx = m4.translate(mesh_mtx, -5.5, -0.8, 10.0)
    mesh_mtx = m4.xRotate(mesh_mtx, degToRad(90))
    mesh_mtx = m4.zRotate(mesh_mtx, degToRad(-6))

    this.boost.setMatrix(mesh_mtx)

    this.angle = 0
  }

  setCollisionBox(){
    var dimensions = computeDimensions([this.boost])

    var box = new CollisionBox(dimensions[0]/2, dimensions[1]/2, dimensions[2]/2, this, 'boost')
    this.collisionBox = box

    this.collisionBox.update(this.boost.getMatrix())
  }

  hasCollisionBox(){
    return this.collisionBox !== undefined
  }

  onCollision(){
    game_env['car'].speedBoost(2, 2000)
  }

  draw(view_mtx, projection_matrix, mode){
    this.boost.draw(view_mtx, projection_matrix, mode)
    this.collisionBox.draw(view_mtx, projection_matrix, mode)
  }
}
