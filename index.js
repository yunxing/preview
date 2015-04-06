gen = function() {
  var file = document.getElementById('filebox').files[0];
  reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(reader);
  reader.onload = function() {
    var img = new Image();
    img.onload = function() {
      var before = (new Date).getTime();
      console.log("before " + before);
      var canvas = document.getElementById("canvas");
      canvas.width = 500;
      canvas.height = canvas.width * img.height / img.width;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img,0,0, canvas.width, canvas.height);
      compressed_data = canvas.toDataURL("image/jpeg", 0.3);
      var after = (new Date).getTime();
      console.log("time taken: " + (after - before) + " ms");
      console.log("compress ratio: " + (compressed_data.length/reader.result.length * 100).toFixed(2) + "%");
      var log = document.querySelector('[data-log]');
      log.innerHTML = "size before: " + reader.result.length + " bytes</br>";
      log.innerHTML = log.innerHTML + "size after: " + compressed_data.length + " bytes</br>";
      log.innerHTML = log.innerHTML + "time taken: " + (after - before) + " ms</br>";
      log.innerHTML = log.innerHTML + "compress ratio: " + (compressed_data.length/reader.result.length * 100).toFixed(2) + "%</br>";
    };
    img.src = reader.result;
  }
}
