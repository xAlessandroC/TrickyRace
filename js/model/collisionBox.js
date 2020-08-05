class CollisionBox {
  constructor(center, width, length, height, mesh, game_obj, initMatrix) {
    this.center = center
    this.width = width
    this.length = length
    this.height = height

    this.box = mesh

    var mtx = m4.identity()
    mtx = m4.multiply(mtx, initMatrix)
    mtx = m4.translate(mtx, 0.0,0.0,0.0)
    mtx = m4.scale(mtx, width/1.8, length/1.8, height/1.8)
    this.box.setMatrix(mtx)

    var collisionBoxVertices = [center - width/2, center - length/2, center - height/2,
                            center - width/2, center - length/2, center + height/2,
                            center - width/2, center + length/2, center - height/2,
                            center - width/2, center + length/2, center + height/2,
                            center + width/2, center - length/2, center - height/2,
                            center + width/2, center - length/2, center + height/2,
                            center + width/2, center + length/2, center - height/2,
                            center + width/2, center + length/2, center + height/2]

    var collisionBoxIndices = []
    collisionBoxIndices["material"] = [ [0, 1],
      [1, 3],
      [3, 2],
      [0, 2],
      [4, 5],
      [5, 7],
      [7, 6],
      [4, 6],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7]]

    var collisionBoxMaterial = []
    collisionBoxMaterial["material"] = {
      "Ka": 1,
      "Kd": 0.8,
      "Ks": 0.5,
      "Ns": 323.999994
    }

    // this.box = new GL_Mesh(collisionBoxVertices,[],[],collisionBoxIndices,collisionBoxMaterial,gl,gl.LINES)
    // var mtx = m4.identity()
    // mtx = m4.multiply(mtx, initMatrix)
    // mtx = m4.translate(mtx, 0.0,0.0,10.0)
    // mtx = m4.scale(mtx, width/1.8, length/1.8, height/1.8)
    // this.box.setMatrix(mtx)
  }

  draw(view_mtx, projection_matrix, mode){
    this.box.draw(view_mtx, projection_matrix, mode)
  }
}
