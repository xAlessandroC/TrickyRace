function initialize_position_track(mesh){
  mesh_mtx = mesh.getMatrix()

  mesh_mtx = m4.translate(mesh_mtx, 0.0, 0.0, 0.0)
  mesh_mtx = m4.scale(mesh_mtx, 0.2,0.2,0.2)
  mesh_mtx = m4.yRotate(mesh_mtx, degToRad(-50))
  mesh_mtx = m4.zRotate(mesh_mtx, degToRad(190))

  mesh.setMatrix(mesh_mtx)
}
