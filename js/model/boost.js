class Boost {
  constructor(mesh, name, translation1, translation2, angle) {
    this.id = name
    this.boost = mesh

    var mesh_mtx = this.boost.getMatrix()

    mesh_mtx = m4.scale(mesh_mtx, 1,1,1)
    mesh_mtx = m4.translate(mesh_mtx, translation1, 1.0, translation2)
    // mesh_mtx = m4.xRotate(mesh_mtx, degToRad(90))
    // mesh_mtx = m4.zRotate(mesh_mtx, degToRad(angle))

    this.boost.setMatrix(mesh_mtx)

    this.angle = 0
  }

  boostStep(){
    var mesh_mtx = this.boost.getMatrix()
    mesh_mtx = m4.yRotate(mesh_mtx, degToRad(this.angle))
    this.boost.setMatrix(mesh_mtx)

    this.angle += 0.1
    this.collisionBox.update(mesh_mtx)
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
    speedBoost_number += 1
    delete game_env[this.id]
  }

  draw(view_mtx, projection_matrix, mode){
    this.boost.draw(view_mtx, projection_matrix, mode)
    this.collisionBox.draw(view_mtx, projection_matrix, mode)
  }
}