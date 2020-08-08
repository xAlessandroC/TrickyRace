function triangulate(faces){
  res = []

  for(var j=0; j< faces.length; j++){
    face_t = faces[j]
    if(face_t.length <= 3){
      res.push(face_t)
    }else{
      n_lines = face_t.length - 3

      res.push([face_t[0], face_t[1], face_t[2]])
      for(var i = 0; i<n_lines - 1; i++){
        res.push([face_t[0], face_t[2+i], face_t[3+i]])
      }
      res.push([face_t[0], face_t[face_t.length-2], face_t[face_t.length-1]])
    }
  }
  return res
}

function distinct_edges(faces){
  res = []
  for (var i=0;i<faces.length;i++) {
    l = faces[i].length
    for (var j=0; j<l; j++) {
      next_idx = (j + 1) % l

      v1 = faces[i][j]
      v2 = faces[i][next_idx]
      temp = res.filter(data => ((data[0] == v1 || data[0] == v2) && (data[1] == v1 || data[1] == v2)))
      if(temp.length == 0){
        res.push([v1, v2])
      }
    }
  }

  return res
}

function computeCenter(vertices){
  var center = [0,0,0]
  var i = 0
  vertices.forEach((vertex)=>{
    center[i] = center[i] + vertex
    i = (i + 1) % 3
  })
  center[0] = center[0]/(vertices.length/3)
  center[1] = center[1]/(vertices.length/3)
  center[2] = center[2]/(vertices.length/3)
  center[3] = 1

  return center
}

function computeDimensions(vertices){
  var max = [vertices[0],vertices[1],vertices[2]]
  var min = [vertices[0],vertices[1],vertices[2]]
  var i = 0
  vertices.forEach((vertex)=>{
    if(vertex>max[i]) max[i] = vertex
    if(vertex<min[i]) min[i] = vertex
    i = (i + 1) % 3
  })

  // dimensioni
  var width = max[0] - min[0]
  var length = max[1] - min[1]
  var height = max[2] - min[2]

  return [width, length, height]
}

function computeCenter(mesh, injectCollisionBox, initMatrix){
    var vertices = mesh.vertices
    var center = [0,0,0]
    var max = [vertices[0],vertices[1],vertices[2]]
    var min = [vertices[0],vertices[1],vertices[2]]
    var i = 0
    vertices.forEach((vertex)=>{
      center[i] = center[i] + vertex
      if(vertex>max[i]) max[i] = vertex
      if(vertex<min[i]) min[i] = vertex
      i = (i + 1) % 3
    })
    center[0] = center[0]/(vertices.length/3)
    center[1] = center[1]/(vertices.length/3)
    center[2] = center[2]/(vertices.length/3)
    center[3] = 1

  //collisionbox
  var width = max[0] - min[0]
  var length = max[1] - min[1]
  var height = max[2] - min[2]

  if(injectCollisionBox !== undefined){
    readMesh('collisionBox/box.obj')
    .then((mesh)=>{
      var w1 = width;   var l1 = length;   var h1 = height; var c1 = center
      cbox = new CollisionBox(c1, w1, l1, h1, mesh, injectCollisionBox, initMatrix)
      // cbox.updateVertices(initMatrix)
      injectCollisionBox.collisionBox = cbox
      console.log("collision box loaded")
    })
  }

  return center
}
