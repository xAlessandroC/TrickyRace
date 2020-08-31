class Light {
  constructor(position, diffuse, specular, name) {
    this.name = name
    this.update(position)
    this.diffuse = diffuse
    this.specular = specular
  }

  update(position){
    this.light = position
    this.mtx = m4.translate(m4.identity(), position[0], position[1], position[2])

    if(this.collisionBox !== undefined){
      this.collisionBox.update(this.mtx)
    }
  }

  setCollisionBox(){
    var box = new CollisionBox(1, 1, 1, this, 'box')
    this.collisionBox = box

    this.collisionBox.update(this.mtx)
  }

  hasCollisionBox(){
    return this.collisionBox !== undefined
  }

  onCollision(tag){

  }

  draw(view_mtx, projection_matrix, mode){
    if(this.hasCollisionBox() === true && activeBox === true)
      this.collisionBox.draw(view_mtx, projection_matrix, mode)
  }
}
