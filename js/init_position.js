function initialize_position_track(mesh){
  mesh_mtx = mesh.getMatrix()

  // mesh_mtx = m4.translate(mesh_mtx, 0.0, 0.0, -30.0)
  // mesh_mtx = m4.scale(mesh_mtx, 0.7,0.7,0.7)
  // mesh_mtx = m4.yRotate(mesh_mtx, degToRad(-50))
  // mesh_mtx = m4.zRotate(mesh_mtx, degToRad(-80))

  // mesh_mtx = m4.zRotate(mesh_mtx, degToRad(10))
  // mesh_mtx = m4.xRotate(mesh_mtx, degToRad(30))
  // mesh_mtx = m4.yRotate(mesh_mtx, degToRad(20))

  // mesh_mtx = m4.translate(mesh_mtx, 0.0, 0.0, -20.0)

  //for cube track
  // mesh_mtx = m4.scale(mesh_mtx, 3.0, 0.2, 4.0)
  // mesh_mtx = m4.translate(mesh_mtx, 0.0, -18.0, 0.0)

  mesh.setMatrix(mesh_mtx)
}

function initialize_position_car(components){
  components.forEach((component)=>{
    mesh_mtx = component.getMatrix()

    mesh_mtx = m4.scale(mesh_mtx, 0.3,0.3,0.3)
    // // mesh_mtx = m4.xRotate(mesh_mtx, degToRad(30))
    // // mesh_mtx = m4.yRotate(mesh_mtx, degToRad(20))
    // mesh_mtx = m4.xRotate(mesh_mtx, degToRad(-90))
    // mesh_mtx = m4.zRotate(mesh_mtx, degToRad(-90))
    // // mesh_mtx = m4.zRotate(mesh_mtx, degToRad(190))
    // mesh_mtx = m4.translate(mesh_mtx, 57.0, -37.0, 1.5)
    // mesh_mtx = m4.zRotate(mesh_mtx, degToRad(-38))
    // // mesh_mtx = m4.yRotate(mesh_mtx, degToRad(20))

    // mesh_mtx = m4.yRotate(mesh_mtx, degToRad(-90))

    // mesh_mtx = m4.translate(mesh_mtx, -70.0, -4.8, 0.0)  //F1
    mesh_mtx = m4.translate(mesh_mtx, -92.0, -9.6, 20.0)  //Ronin
    mesh_mtx = m4.xRotate(mesh_mtx, degToRad(-90))
    mesh_mtx = m4.zRotate(mesh_mtx, degToRad(-85))

    component.setMatrix(mesh_mtx)
  })
}
