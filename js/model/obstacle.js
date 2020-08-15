class Obstacle {
  constructor(mesh, name) {
    this.id = name
    this.obstacle = mesh

    initialize_position_obstacle(mesh);
  }

  setCollisionBox(){
    var dimensions = computeDimensions(this.obstacle)

    var box = new CollisionBox(dimensions[0]/2, dimensions[1]/2, dimensions[2]/2, this, 'box')
    this.collisionBox = box

    this.collisionBox.update(this.obstacle.getMatrix())
  }

  hasCollisionBox(){
    return this.collisionBox !== undefined
  }

  draw(view_mtx, projection_matrix, mode){
    this.obstacle.draw(view_mtx, projection_matrix, mode)
    this.collisionBox.draw(view_mtx, projection_matrix, mode)
  }
}
