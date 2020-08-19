function drawOverlay(){
  ctx_2d.clearRect(0, 0, overlay.width, overlay.height);

  // score
  ctx_2d.font = "italic 28px Arial";
  ctx_2d.textAlign = "center";
  ctx_2d.textBaseline = "middle";
  ctx_2d.strokeStyle = "black";
  ctx_2d.fillText("SCORE:"+score, overlay.width*0.07, overlay.height*0.05);

  // funzioni utente
  ctx_2d.font = "italic 16px Arial";
  ctx_2d.textAlign = "start";
  ctx_2d.fillText("Tasto centrale del mouse: cambio camera", overlay.width*0.01, overlay.height*0.3);
  ctx_2d.fillText("Tasto sinistro del mouse: attivazione boost", overlay.width*0.01, overlay.height*0.34);
  ctx_2d.fillText("W: movimento in avanti", overlay.width*0.01, overlay.height*0.38);
  ctx_2d.fillText("S: movimento indietro", overlay.width*0.01, overlay.height*0.42);
  ctx_2d.fillText("D: sterzo a destra", overlay.width*0.01, overlay.height*0.46);
  ctx_2d.fillText("A: sterzo a sinistra", overlay.width*0.01, overlay.height*0.50);


  // numero speedBoost
  ctx_2d.font = "italic 28px Arial";
  ctx_2d.textAlign = "center";
  ctx_2d.fillText("BOOST:"+speedBoost_number, overlay.width*0.93, overlay.height*0.05);
}
