class EnvironmentCube {
  constructor(name) {
    this.id = name
    this.environment = 1

    this.vertices = []
    this.vertices.push([-1.0, -1.0, -1.0])
    this.vertices.push([-1.0, -1.0, 1.0])
    this.vertices.push([-1.0, 1.0, -1.0])
    this.vertices.push([-1.0, 1.0, 1.0])
    this.vertices.push([1.0, -1.0, -1.0])
    this.vertices.push([1.0, -1.0, 1.0])
    this.vertices.push([1.0, 1.0, -1.0])
    this.vertices.push([1.0, 1.0, 1.0])

    var collisionBoxIndices = []
    collisionBoxIndices["material"] = [ [0, 1, 3],
      [0, 2, 3],
      [6, 7, 3],
      [6, 3, 2],
      [4, 5, 7],
      [4, 7, 6],
      [4, 0, 1],
      [4, 1, 5],
      [5, 1, 3],
      [5, 3, 7],
      [4, 0, 2],
      [4, 2, 6]]

    var collisionBoxMaterial = []
    collisionBoxMaterial["material"] = {
      "Ka": [1,1,1],
      "Kd": [1.0,1.0,1.0],
      "Ks": [1.0,1.0,1.0],
      "Ns": 1.999994
    }

    var collisionBoxTexture = [0.1, 0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1,
      0.1,0.1]

    this.environmentCube = new GL_Mesh(this.vertices.flat(),collisionBoxTexture,[],collisionBoxIndices,collisionBoxMaterial,gl,gl.TRIANGLES)
    this.environmentCube.setMatrix(m4.scale(this.environmentCube.getMatrix(),430,430,430))
  }

  hasCollisionBox(){
    return this.collisionBox !== undefined
  }

  draw(view_mtx, projection_matrix, mode){
    if(environmentBox === true)
      this.environmentCube.draw(view_mtx, projection_matrix, gl.TRIANGLES, 0, 1.0)
  }
}
