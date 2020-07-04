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
