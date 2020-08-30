var environment_texture

function setUpEnvironmentMapping(){
  var faceInfos = [
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      url: 'resources/images/environment/x+.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      url: 'resources/images/environment/x-.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      url: 'resources/images/environment/y+.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      url: 'resources/images/environment/y-.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      url: 'resources/images/environment/z+.jpg',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
      url: 'resources/images/environment/z-.jpg',
    }
  ];

  environment_texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, environment_texture);

  faceInfos.forEach((faceInfo) => {
    const {target, url} = faceInfo;

    gl.texImage2D(target, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    const image = new Image();
    image.src = url;
    image.addEventListener('load', function() {
      console.log("loaded " + image.src)
      // Now that the image has loaded upload it to the texture.
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, environment_texture);
      gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    });
  });
  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
}
