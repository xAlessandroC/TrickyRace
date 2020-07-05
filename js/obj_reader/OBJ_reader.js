var meshes = []
var canvas, gl

// Legge un file in maniera asincrona, il file deve trovarsi nella sottocartella data
// La lettura asincrona avviene attraverso Ajax, dopo aver letto il file viene invocata
// la callback sul testo
function readFile(filename, callback){
  return new Promise((res, rej)=>{
    path = "resources/models/"+filename
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        res(callback(this.responseText));
      }
    };
    xhttp.open("GET", path, true);
    try{
      xhttp.send();
    }catch(e){
      res([])
    }
  })
}

// Legge in sequenza prima l'obj e poi il file mtllib
// La lettura asincrona avviene attraverso le promise
function readMesh(file){
  return new Promise((res, rej)=>{
    var mesh = {}
    readFile(file, parseObj) //file.name
    .then((obj_str)=>{
      mesh = obj_str
      prefix = file.split('/')[0]
      return readFile(prefix+'/'+obj_str["mtl"], parseMaterial)
    })
    .then((obj_str2)=>{
      mesh["materials"] = obj_str2

      // costruisco mesh
      var temp = new GL_Mesh(mesh["vertices"],mesh["texcoord"],mesh["normals"],
                              mesh["faces"],mesh["materials"],mesh["gl"],mesh["mode"])

      res(temp)
    })
  })
}

// Funzione per il parsing del file mtl
function parseMaterial(mtl_text){
  var lines = mtl_text.split('\n');
  var material = []
  var current_mtl = ""
  for(var i = 0; i<lines.length; i++){
    if ( lines[i].trim().startsWith("newmtl ")){
      mtl = (lines[i].trim().split(" "))[1]
      current_mtl = mtl
      material[mtl] = []
    }
    if ( lines[i].trim().startsWith("Ns ")){
      material[current_mtl]["Ns"] = Number((lines[i].trim().split(" "))[1])
    }
    if ( lines[i].trim().startsWith("Ka ")){
      material[current_mtl]["Ka"] = Number((lines[i].trim().split(" "))[1])
    }
    if ( lines[i].trim().startsWith("Kd ")){
      material[current_mtl]["Kd"] = Number((lines[i].trim().split(" "))[1])
    }
    if ( lines[i].trim().startsWith("Ks ")){
      material[current_mtl]["Ks"] = Number((lines[i].trim().split(" "))[1])
    }
    if ( lines[i].trim().startsWith("map_Kd ")){
      material[current_mtl]["image"] = (lines[i].trim().split(" "))[1]
    }
  }

  return material
}

// funzione per il parsing del file obj
function parseObj(text){
  var lines = text.split('\n');
  var vertices = []
  var faces = []
  var texcoords = [], temp_textcoords = []
  var normals = []
  var mtl = ""
  var n_mtl = 0
  var mode = -1
  var triang = 0
  var texture_active = false
  var dict = Object()

  var max = 0

  var current_mtl = ""
  for(var i = 0; i<lines.length; i++){
    if ( lines[i].startsWith("mtllib ")){
      texture_active=true
      mtl = (lines[i].trim().split(" "))[1]
    }
    if ( lines[i].startsWith("v ")){
      vertices.push((lines[i].trim().split(" ").slice(1)).map(Number))
      texcoords.push([])
    }
    if ( lines[i].startsWith("vt ")){
      temp_textcoords.push((lines[i].trim().split(" ").slice(1)).map(Number))
    }
    if ( lines[i].startsWith("vn ")){
      normals.push((lines[i].trim().split(" ").slice(1)).map(Number))
    }
    if ( lines[i].startsWith("usemtl ")){
      n_mtl ++
      current_mtl = (lines[i].trim().split(" "))[1]
      if(current_mtl === "(null)")
        current_mtl = "default"

      if(faces[current_mtl] === undefined)
        faces[current_mtl] = []
    }
    if ( lines[i].startsWith("f ")){
      delim="//"
      if(lines[i].indexOf("//")<0){
        if(lines[i].indexOf("/")<0){
          delim = " "
        }else{
          delim = "/"
        }
      }

      if(delim == " ")
        temp = (lines[i].trim().split(" ").slice(1)).map(Number).map(x => x - 1)
      else
        temp = (lines[i].trim().split(" ").slice(1)).map(x => x.split(delim)[0]).map(Number).map(x => x - 1)

      if(texture_active){
        couples = (lines[i].trim().split(" ").slice(1)).map(x => [x.split(delim)[0],x.split(delim)[1]]).map(x => [Number(x[0])-1, Number(x[1])-1])
        var k = 0
        couples.forEach(element => {
          if(dict[element[0]] === undefined)
            dict[element[0]] = []

          if(texcoords[element[0]].length === 0){
            texcoords[element[0]] = temp_textcoords[element[1]]
          }else{
            if(texcoords[element[0]] !== temp_textcoords[element[1]]){
              var entry = Object()
              entry.value = element[1]
              entry.material = current_mtl
              entry.f_idx = faces[current_mtl].length
              entry.v_idx = k
              dict[element[0]].push(entry)
            }
          }
          k++
        })
      }

      if(temp.length>max)
        max = temp.length

      if ( current_mtl === ""){
        current_mtl = "default"
        if(faces[current_mtl]!==[])
          faces[current_mtl] = []
      }
      faces[current_mtl].push(temp)
    }
  }

  if(max===3){
    mode = gl.TRIANGLES
  }
  if(max===2){
    mode = gl.LINES
  }
  if(max>=4){
    mode = gl.TRIANGLES
    triang = 1
  }

  // Aggiungere vertici duplicati
  if(texture_active){
    for (const property in dict) {
      var entries = dict[property]
      for (const property2 in entries) {
        var entry = entries[property2]

        vertices.push(vertices[Number(property)])
        texcoords.push(temp_textcoords[entry.value])
        idx = vertices.length - 1

        var t1 = faces[entry.material]
        var t2 = t1[entry.f_idx]
        t2[entry.v_idx] = idx
      }
    }
  }

  if(triang === 1){
    for (const property in faces) {
      faces[property] = triangulate(faces[property])
    }
  }


  _vertices = vertices.flat()
  _texcoord = texcoords.flat()
  _normals = normals.flat()

  return {
    "vertices" : _vertices,
    "faces" : faces,
    "texcoord" : _texcoord,
    "normals" : _normals,
    "gl" : gl,
    "mode" : mode,
    "mtl" : mtl
  }
}

// Legge in maniera asincrona un immagine (deve trovarsi nella sottocartella data)
// dopodichè setta la texture giusta e infine invoca la callback
function readImage(src, texture, callback){
  var image = new Image();
  image.src = "resources/models/" + src
  image.addEventListener('load', function() {
    console.log("loaded " + image.src)
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

    // Check if the image is a power of 2 in both dimensions.
    if (isPowerOf2(this.width) && isPowerOf2(this.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
       console.log('mipmap');
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    } else {
       // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    callback()
  });
}
