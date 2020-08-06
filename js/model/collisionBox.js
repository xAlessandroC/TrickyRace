class CollisionBox {
  constructor(center, width, length, height, mesh, game_obj, initMatrix) {
    this.center = center
    this.width = width
    this.length = length
    this.height = height

    this.box = mesh

    var collisionBoxVertices = [center[0] - width/2, center[1] - length/2, center[2] - height/2,
                            center[0] - width/2, center[1] - length/2, center[2] + height/2,
                            center[0] - width/2, center[1] + length/2, center[2] - height/2,
                            center[0] - width/2, center[1] + length/2, center[2] + height/2,
                            center[0] + width/2, center[1] - length/2, center[2] - height/2,
                            center[0] + width/2, center[1] - length/2, center[2] + height/2,
                            center[0] + width/2, center[1] + length/2, center[2] - height/2,
                            center[0] + width/2, center[1] + length/2, center[2] + height/2]

    this.vertices = []
    this.vertices.push([collisionBoxVertices[0],collisionBoxVertices[1],collisionBoxVertices[2]])
    this.vertices.push([collisionBoxVertices[3],collisionBoxVertices[4],collisionBoxVertices[5]])
    this.vertices.push([collisionBoxVertices[6],collisionBoxVertices[7],collisionBoxVertices[8]])
    this.vertices.push([collisionBoxVertices[9],collisionBoxVertices[10],collisionBoxVertices[11]])
    this.vertices.push([collisionBoxVertices[12],collisionBoxVertices[13],collisionBoxVertices[14]])
    this.vertices.push([collisionBoxVertices[15],collisionBoxVertices[16],collisionBoxVertices[17]])
    this.vertices.push([collisionBoxVertices[18],collisionBoxVertices[19],collisionBoxVertices[20]])
    this.vertices.push([collisionBoxVertices[21],collisionBoxVertices[22],collisionBoxVertices[23]])

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

    this.box = new GL_Mesh(collisionBoxVertices,collisionBoxTexture,[],collisionBoxIndices,collisionBoxMaterial,gl,gl.LINES)

    this.clean()

    var mtx = m4.identity()
    mtx = m4.multiply(mtx, initMatrix)
    mtx = m4.translate(mtx, 0.0,0.0,0.0)
    mtx = m4.scale(mtx, 1.0, 1.0, 1.0)
    this.box.setMatrix(mtx)

    this.updateVertices(mtx)
  }

  draw(view_mtx, projection_matrix, mode){
    this.box.draw(view_mtx, projection_matrix, mode)
  }

  clean(){
    gl.bindTexture(gl.TEXTURE_2D, this.box.material_idx["material"].texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 255, 0, 255]));
  }

  collided(){
    gl.bindTexture(gl.TEXTURE_2D, this.box.material_idx["material"].texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
  }

  updateVertices(mtx){
    for(var i = 0; i<this.vertices.length; i++){
      var t = [this.vertices[i][0],this.vertices[i][1],this.vertices[i][2], 1]
      var r = m4.multiply(mtx,t).slice(0,3)
      this.vertices[i] = r
    }
  }

  hasCollided(box){
    var minX_A = this.vertices[0][0]; var maxX_A = this.vertices[0][0];
    var minY_A = this.vertices[0][1]; var maxY_A = this.vertices[0][1];
    var minZ_A = this.vertices[0][2]; var maxZ_A = this.vertices[0][2];

    var minX_B = box.vertices[0][0]; var maxX_B = box.vertices[0][0];
    var minY_B = box.vertices[0][1]; var maxY_B = box.vertices[0][1];
    var minZ_B = box.vertices[0][2]; var maxZ_B = box.vertices[0][2];


    var r =  (minX_A <= maxX_B && maxX_A >= minX_B) &&
           (minY_A <= maxY_B && maxY_A >= minY_B) &&
           (minZ_A <= maxZ_B && maxZ_A >= minZ_B);

    console.log(r)
  }
}
