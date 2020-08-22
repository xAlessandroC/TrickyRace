function updateX(event, ui) {
  l_x = ui.value;
  render();
}
function updateY(event, ui) {
  l_y = ui.value;
  render();
}
function updateZ(event, ui) {
  l_z = ui.value;
  render();
}
function updateA(event, ui) {
  a = ui.value;
  render();
}
function updateB(event, ui) {
  b = ui.value;
  render();
}
function updateC(event, ui) {
  c = ui.value;
  render();
}

function updatePhi(event, ui) {
  phi = degToRad(ui.value);
  render();
}
function updateTheta(event, ui) {
  theta = degToRad(ui.value);
  render();
}
function updateR(event, ui) {
  radius = ui.value;
  render();
}
