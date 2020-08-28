class GL_Mesh{
  constructor(vertices, texcoords, normals, faces, materials, gl, mode){
    this.vertices = vertices
    this.textcoords = texcoords
    this.normals = normals
    this.mode = mode
    this.materials = materials
    this.texture = []
    this.wireframe_text = []
    this.matrix = [1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      0,0,0,1]

    // Elaboro facce per derivare due strutture dati
    var indices = []
    this.material_idx = []
    for (const property in faces) {
      var len = Object.keys(this.material_idx).length
      var temp = faces[property].flat()
      indices.push(temp)
      var idx = 0
      if(len !=0){
        var last_key = (Object.keys(this.material_idx))[len-1]
        var last_idx = this.material_idx[last_key][1]
        // idx = last_idx + 1
        idx = last_idx
      }
      this.material_idx[property] = [idx, temp.length]
    }
    this.indices = indices.flat()
    var n_indices = ((mode === gl.LINES)?2:3)
    var arrays = {
      "position": { numComponents: 3, data: this.vertices },
      "texcoord": { numComponents: 2, data : this.textcoords},
      "normal": { numComponents: 3, data : this.normals},
      "indices":  { numComponents: n_indices, data: this.indices }
    }

    this.buffers = webglUtils.createBufferInfoFromArrays(gl, arrays)
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    for (const property in this.material_idx) {
      var t = gl.createTexture();
      this.material_idx[property]["texture"] = t
      gl.bindTexture(gl.TEXTURE_2D, this.material_idx[property]["texture"]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([Math.floor(Math.random(1231) * 256), Math.floor(Math.random(1231) * 256), Math.floor(Math.random(879) * 256), 255]));

      if( property !== "None" && property !== "default" && this.materials[property]["image"]!== undefined){// || Object.keys(this.materials).length !== 0){
        readImage(this.materials[property]["image"], this.material_idx[property]["texture"])
      }
    }

    //black texture for wireframe
    var w = gl.createTexture();
    this.wireframe_text = w
    gl.bindTexture(gl.TEXTURE_2D, this.wireframe_text);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
  }

  getMatrix(){
    return this.matrix
  }

  setMatrix(matrix){
    this.matrix = matrix
  }

  bindAttributes(gl, program){
    webglUtils.setBuffersAndAttributes(gl, program.attribSetters, this.buffers)
  }

  getUniforms(view_mtx, projection_matrix){
    this.bindAttributes(gl, program)

    view_mtx = m4.multiply(view_mtx, this.getMatrix())
    var mw = m4.copy(this.getMatrix())
    var res = m4.multiply(projection_matrix, view_mtx)

    var worldMatrix = mw;
    var worldInverseMatrix = m4.inverse(worldMatrix);
    var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);

    //lights
    var keys = (Object.keys(game_env)).filter(x => {if (x.startsWith("light")) return x})
    var lightPos = (keys.map(x => game_env[x].light)).flat()

    var uniforms = {
      u_matrix: res,
      u_modelview: mw,
      u_cameraPosition: cameraPosition,
      u_world: this.getMatrix(),
      u_worldInverseTranspose: worldInverseTransposeMatrix,
      u_lightWorldPosition2: game_env['carlight'].light,
      u_lights: lightPos,
      u_viewWorldPosition: cameraPosition,
      u_color: [0.2, 1, 0.2, 1],
      u_shininess: 2,
      u_ka: [1.0, 1.0, 1.0],
      u_kd: [1.0, 1.0, 1.0],
      u_ks: [1.0, 1.0, 1.0],
      u_lightColor: m4.normalize([1.0, 1.0, 1.0]),
      u_ambientColor: m4.normalize([1.0, 1.0, 1.0]),
      u_specularColor: m4.normalize([1.0, 1.0, 1.0]),
      u_lightColor2: m4.normalize([1.0, 0.75, 0.0]),
      u_specularColor2: m4.normalize([1.0, 0.75, 0.0]),
      u_texture: this.texture[0],
      u_textureCube: environment_texture,
      u_mode: 1,
      u_enabled : 1
    };

    return uniforms
  }

  draw(view_mtx, projection_matrix, mode, environmentEnabled){
    var uniforms = this.getUniforms(view_mtx, projection_matrix)
    uniforms["u_enabled"] = environmentEnabled
    // console.log("LIGHT: " + uniforms.u_lightWorldPosition)

    if(Object.keys(this.materials).length == 0){
        uniforms["u_texture"] = this.material_idx["default"]["texture"]
        webglUtils.setUniforms(program.uniformSetters, uniforms)

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers["indices"]);
        gl.drawElements(mode || this.mode, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }
    else{
      for (const property in this.materials) {
        uniforms["u_texture"] = this.material_idx[property]["texture"]
        uniforms["u_shininess"] =  this.materials[property]["Ns"]
        uniforms["u_ka"] =  this.materials[property]["Ka"]
        uniforms["u_kd"] =  this.materials[property]["Kd"]
        uniforms["u_ks"] =  this.materials[property]["Ks"]
        webglUtils.setUniforms(program.uniformSetters, uniforms)

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers["indices"]);
        var start = this.material_idx[property][0]
        var len = this.material_idx[property][1]
        gl.drawElements(mode || this.mode, len, gl.UNSIGNED_SHORT, start * 2);

        //draw wire
        // uniforms["u_texture"] = this.wireframe_text
        // webglUtils.setUniforms(program.uniformSetters, uniforms)
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers["indices"]);
        // gl.drawElements(gl.LINES, this.indices.length, gl.UNSIGNED_SHORT, 0);
      }
    }
  }
}
