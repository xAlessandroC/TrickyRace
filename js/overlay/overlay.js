var resourcesDict = new Object()

function drawGameOverlay(){
  var digits = []

  ctx_2d.font = "bold 14px Arial";
  ctx_2d.textAlign = "center";
  ctx_2d.textBaseline = "middle";
  ctx_2d.strokeStyle = "black";
  ctx_2d.fillStyle = "black";

  // score
  if(resourcesDict['score'] !== undefined){
    ctx_2d.drawImage(resourcesDict['score'].img, overlay.width*0.00, overlay.height*0.0, 64*resourcesDict['score'].ar, 64)
    var offset = 0
    digits = separateNumber(score)
    digits.forEach((digit)=>{
      ctx_2d.drawImage(resourcesDict[digit].img, overlay.width*0.015+offset, overlay.height*0.02, 32*resourcesDict[digit].ar, 32)
      offset += 25
    })
  }

  ctx_2d.fillText("SCORE", overlay.width*0.05, overlay.height*0.12);

  // funzioni utente
  ctx_2d.font = "italic 16px Arial";
  ctx_2d.textAlign = "start";
  ctx_2d.strokeRect(overlay.width*0.008, overlay.height*0.74, overlay.width*0.25, overlay.height*0.25);
  ctx_2d.fillText("Tasto centrale del mouse: cambio camera", overlay.width*0.01, overlay.height*0.76);
  ctx_2d.fillText("Tasto sinistro del mouse: attivazione boost", overlay.width*0.01, overlay.height*0.80);
  ctx_2d.fillText("W: movimento in avanti", overlay.width*0.01, overlay.height*0.84);
  ctx_2d.fillText("S: movimento indietro", overlay.width*0.01, overlay.height*0.88);
  ctx_2d.fillText("D: sterzo a destra", overlay.width*0.01, overlay.height*0.92);
  ctx_2d.fillText("A: sterzo a sinistra", overlay.width*0.01, overlay.height*0.96);


  // numero speedBoost
  if(resourcesDict['boost'] !== undefined){
    ctx_2d.drawImage(resourcesDict['boost'].img, overlay.width*0.88, overlay.height*0.03, 64*resourcesDict['boost'].ar, 64)

    var offset = 0
    digits = separateNumber(speedBoost_number)
    digits.forEach((digit)=>{
      ctx_2d.drawImage(resourcesDict[digit].img, overlay.width*0.934+offset, overlay.height*0.055, 32*resourcesDict[digit].ar, 32)
      offset += 25
    })
  }
}

function drawLoadingOverlay(){
  ctx_2d.font = "bold 56px Arial";
  ctx_2d.textAlign = "center";
  ctx_2d.textBaseline = "middle";
  ctx_2d.strokeStyle = "white";
  ctx_2d.fillStyle = "orange";
  ctx_2d.fillRect(0, 0, overlay.width, overlay.height);
  ctx_2d.fillStyle = "white";
  ctx_2d.fillText("TRICKY RACE", overlay.width*0.5, overlay.height*0.3);
  ctx_2d.font = "bold 22px Arial";
  ctx_2d.fillText("Loading " + Math.round(completion/toComplete*100) + "%", overlay.width*0.5, overlay.height*0.6);
}

function readResource(name){
  var image = new Image();
  var name_p = name
  image.src = "resources/images/" + name + ".png"
  image.addEventListener('load', function() {
    resourcesDict[name_p] = {
      img : image,
      ar : image.naturalWidth/image.naturalHeight
    }
    incrementLoading()
  });
}

function setUpOverlayResources(){
  resourcesDict['boost'] = undefined
  resourcesDict['score'] = undefined
  resourcesDict['0'] = undefined
  resourcesDict['1'] = undefined
  resourcesDict['2'] = undefined
  resourcesDict['3'] = undefined
  resourcesDict['4'] = undefined
  resourcesDict['5'] = undefined
  resourcesDict['6'] = undefined
  resourcesDict['7'] = undefined
  resourcesDict['8'] = undefined
  resourcesDict['9'] = undefined

  readResource('boost')
  readResource('score')
  readResource('0')
  readResource('1')
  readResource('2')
  readResource('3')
  readResource('4')
  readResource('5')
  readResource('6')
  readResource('7')
  readResource('8')
  readResource('9')
}

setUpOverlayResources()
