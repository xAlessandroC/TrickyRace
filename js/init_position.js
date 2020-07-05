function initialize_position_track(mesh){
  mesh_mtx = mesh.getMatrix()

  mesh_mtx = m4.translate(mesh_mtx, 0.0, 0.0, 0.0)
  mesh_mtx = m4.scale(mesh_mtx, 0.5,0.5,0.5)
  mesh_mtx = m4.yRotate(mesh_mtx, degToRad(-50))
  mesh_mtx = m4.zRotate(mesh_mtx, degToRad(190))

  mesh.setMatrix(mesh_mtx)
}

function initialize_position_car(components){
  components.forEach((component)=>{
    mesh_mtx = component.getMatrix()

    mesh_mtx = m4.scale(mesh_mtx, 0.2,0.2,0.2)
    mesh_mtx = m4.yRotate(mesh_mtx, degToRad(-45))
    // mesh_mtx = m4.zRotate(mesh_mtx, degToRad(190))
    mesh_mtx = m4.translate(mesh_mtx, -31.0, 31.0, 11.0)

    component.setMatrix(mesh_mtx)
  })
}
