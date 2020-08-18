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
  document.getElementById("a-b-c").innerHTML = ""+a+"/"+b+"/"+c
}
function updateB(event, ui) {
  b = ui.value;
  render();
  document.getElementById("a-b-c").innerHTML = ""+a+"/"+b+"/"+c
}
function updateC(event, ui) {
  c = ui.value;
  render();
  document.getElementById("a-b-c").innerHTML = ""+a+"/"+b+"/"+c
}
