/* eslint-disable */
export const resizeImage = file =>
  new Promise((resolve, reject) => {
    // Create an image
    var img = document.createElement('img');
    // Create a file reader
    var reader = new FileReader();
    // Set the image once loaded into file reader
    reader.onload = function(e) {
      img.src = file;

      var canvas = document.createElement('canvas');
      //var canvas = $("<canvas>", {"id":"testing"})[0];
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      img.onload = function() {
        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 300;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        var dataurl = canvas.toDataURL('image/png');
        resolve(dataurl);
      };
    };
  });
