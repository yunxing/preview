gen = function() {
  var file = document.getElementById('filebox').files[0];
  reader = new FileReader();
  reader.readAsDataURL(file);
  var log = document.querySelector('[data-log]');
  log.innerHTML = ""
  var widths = [2048, 1024, 512, 256, 128];
  var total = 0;
  reader.onload = function() {
    var img = new Image();
    img.onload = function() {
      for (var i = 0; i < widths.length; ++i ) {
        if (img.width < widths[i]) continue;
        var before = (new Date).getTime();
        var canvas = document.getElementById("canvas");
        canvas.width = widths[i];
        canvas.height = canvas.width * img.height / img.width;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0, canvas.width, canvas.height);
        compressed_data = canvas.toDataURL("image/jpeg", 1);
        var after = (new Date).getTime();
        total += (after - before);
        log.innerHTML = log.innerHTML + "generating preview for : " + canvas.width  + " * " + canvas.height + "</br>";
        log.innerHTML = log.innerHTML + "size before: " + reader.result.length + " bytes </br>";
//      log.innerHTML = log.innerHTML + "size after: " + compressed_data.length + " bytes</br>";
        log.innerHTML = log.innerHTML + "time taken: " + (after - before) + " ms</br>";
//      log.innerHTML = log.innerHTML + "compress ratio: " + (compressed_data.length/reader.result.length * 100).toFixed(2) + "%</br></br>";
      }
      log.innerHTML = log.innerHTML + "Total time taken: " + total + " ms</br></br>";
    };
    img.src = reader.result;
  }
}
