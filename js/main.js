var schemer = function (n, saturation) {
    var scheme, distance, start_hue, i, h, s;

    scheme = [];
    distance = 20; // Separate the colors evenly across the hue spectrum
    start_hue = Math.floor(Math.random() * 360); // Start at a random hue as to get a unique scheme

    for (i = 0; i < n; i += 1) {
      h = (start_hue + (distance * i)) % 360;
      s = saturation;

      scheme.push(Please.make_color({
        golden: false, //disable default
        hue: h, //set your hue manually
        saturation: s,
        value: 0.85 //set your saturation manually
      }));
    }
    return scheme;
  };

(function() {
  var n = 2;
  var s = 0.75;

  $("#n").val(n);
  $("#saturation").val(s);

  var scheme = schemer(n, s);
  var direction = "circle at bottom center";
  var outer = scheme[0];
  var inner = scheme[1];
  var percentage = "50";

  var parameters = "(" + direction + ", " + outer + ", " + inner + " " + percentage + "%)";
  var types = ["radial-gradient", "-webkit-radial-gradient", "-moz-radial-gradient", "-o-radial-gradient", "-ms-radial-gradient"];

  for (var i = 0; i < types.length; i++) {
      $('body').css("background", (types[i] + parameters));
  }
}());
