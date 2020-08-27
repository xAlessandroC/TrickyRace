class Light {
  constructor(x, y, z, name) {
    this.update(x, y, z)
  }

  update(x, y, z){
    this.light = [x,y,z]
    this.mtx = m4.translate(m4.identity(), x, y, z)
    
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
    if(this.collisionBox !== undefined)
      this.collisionBox.draw(view_mtx, projection_matrix, mode)
  }
}
