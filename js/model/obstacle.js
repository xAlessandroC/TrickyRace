class Obstacle {
  constructor(mesh, name, angle, multiplier, translation1, translation2) {
    this.id = name
    this.environment = 0
    this.obstacle = mesh

    this.anim_angle = 0
    this.angle = angle
    this.multiplier = multiplier

    var mesh_mtx = mesh.getMatrix()

    mesh_mtx = m4.scale(mesh_mtx, 3,3,3)
    mesh_mtx = m4.translate(mesh_mtx, translation1, 0.3, translation2)

    mesh.setMatrix(mesh_mtx)

    this.original_shift = [this.obstacle.getMatrix()[12],this.obstacle.getMatrix()[13],this.obstacle.getMatrix()[14]]
  }

  obstacleStep(){
    var obstacle_mtx = this.obstacle.getMatrix()
    var value = this.multiplier * Math.sin(degToRad(this.anim_angle))
    var angle = this.angle
    obstacle_mtx[12] = this.original_shift[0] + value*Math.cos(degToRad(angle))
    obstacle_mtx[14] = this.original_shift[2] + value*Math.sin(degToRad(angle))
    this.obstacle.setMatrix(obstacle_mtx)
    this.collisionBox.update(this.obstacle.getMatrix())
    this.anim_angle += 10
  }

  setEnvironment(){
    this.environment = 1
  }

  setCollisionBox(){
    var dimensions = computeDimensions([this.obstacle])

    var box = new CollisionBox(dimensions[0]/2, dimensions[1]/2, dimensions[2]/2, this, 'box')
    this.collisionBox = box

    this.collisionBox.update(this.obstacle.getMatrix())
  }

  hasCollisionBox(){
    return this.collisionBox !== undefined
  }

  onCollision(tag){
    if(tag === 'car'){
      delete game_env[this.id]
      score -= 900
      if(score<0) score = 0
    }
  }

  draw(view_mtx, projection_matrix, mode){
    this.obstacle.draw(view_mtx, projection_matrix, mode, this.environment)

    if(this.hasCollisionBox() === true && activeBox === true)
      this.collisionBox.draw(view_mtx, projection_matrix, mode, 0)
  }
}
