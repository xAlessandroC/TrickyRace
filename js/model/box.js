class Box {
  constructor(width, length, height, name) {
    this.id = name

    this.width = width
    this.length = length
    this.height = height

    this.min_X = 0; this.max_X = 0;
    this.min_Y = 0; this.max_Y = 0;
    this.min_Z = 0; this.max_Z = 0;

    this.vertices = []
    this.vertices.push([-1.0, -1.0, -1.0])
    this.vertices.push([-1.0, -1.0, 1.0])
    this.vertices.push([-1.0, 1.0, -1.0])
    this.vertices.push([-1.0, 1.0, 1.0])
    this.vertices.push([1.0, -1.0, -1.0])
    this.vertices.push([1.0, -1.0, 1.0])
    this.vertices.push([1.0, 1.0, -1.0])
    this.vertices.push([1.0, 1.0, 1.0])

    collisionBoxIndices = []
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

    collisionBoxMaterial = []
    collisionBoxMaterial["material"] = {
      "Ka": [1,1,1],
      "Kd": [0.8,0.8,0.8],
      "Ks": [0.5,0.5,0.5],
      "Ns": 323.999994
    }

    collisionBoxTexture = [0.1, 0.1,
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

    this.box = new GL_Mesh(this.vertices.flat(),collisionBoxTexture,[],collisionBoxIndices,collisionBoxMaterial,gl,gl.LINES)
    this.clean()
    this.box.setMatrix(m4.scale(this.box.getMatrix(),this.width,this.height,this.length))
    this.updateBox()
    console.log("")
  }

  clean(){
    gl.bindTexture(gl.TEXTURE_2D, this.box.material_idx["material"].texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 255, 0, 255]));
  }

  collided(){
    gl.bindTexture(gl.TEXTURE_2D, this.box.material_idx["material"].texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
  }

  update(mtx){
    this.box.setMatrix(mtx)
    this.box.setMatrix(m4.scale(this.box.getMatrix(),this.width,this.height,this.length))
    this.updateBox()
    console.log("")
  }

  updateBox(){
    var i = 0
    var vertex = [this.vertices[0][0],this.vertices[0][0],this.vertices[0][0],1.0]
    var init = m4.multiply(this.box.getMatrix(),vertex).slice(0,3)

    var min_x = init[0], max_x = init[0]
    var min_y = init[1], max_y = init[1]
    var min_z = init[2], max_z = init[2]


    for(i=1;i<this.vertices.length;i++){
      var vertex = [this.vertices[i][0],this.vertices[i][0],this.vertices[i][0],1.0]
      var temp = m4.multiply(this.box.getMatrix(),vertex).slice(0,3)

      if(temp[0]>max_x) max_x = temp[0]
      if(temp[0]<min_x) min_x = temp[0]

      if(temp[1]>max_y) max_y = temp[1]
      if(temp[1]<min_y) min_y = temp[1]

      if(temp[2]>max_z) max_z = temp[2]
      if(temp[2]<min_z) min_z = temp[2]
    }

    this.min_X = min_x; this.max_X = max_x
    this.min_Y = min_y; this.max_Y = max_y
    this.min_Z = min_z; this.max_Z = max_z
  }

  hasCollided(box){
    var r =  (this.min_X <= box.max_X && this.max_X >= box.min_X) &&
           (this.min_Y <= box.max_Y && this.max_Y >= box.min_Y) &&
           (this.min_Z <= box.max_Z && this.max_Z >= box.min_Z);

    console.log(r)

    if(r===true){
      this.collided()
      box.collided()
    }else{
      this.clean()
      box.clean()
    }
  }

  draw(view_mtx, projection_matrix, mode){
    this.box.draw(view_mtx, projection_matrix, gl.LINES)
  }
}
