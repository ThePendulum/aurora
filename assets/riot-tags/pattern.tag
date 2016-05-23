<r-pattern>
  <h1>Pattern</h1>

  <h2>RGB</h2>

  <section class="color-container">
    <div class="value-container">
      <input type="text" class="color-value" value={red} oninput={updateRed}>

      <div class="picker-container red-container" style={'background: linear-gradient(to right, rgb(0, ' + green + ', ' + blue + '), rgb(255, ' + green + ', ' + blue + '))'}>
        <input type="range" min="0" max="255" value={red} class="picker red" oninput={updateRed}>
      </div>
    </div>

    <div class="value-container">
      <input type="text" class="color-value" value={green} oninput={updateGreen}>

      <div class="picker-container green-container" style={'background: linear-gradient(to right, rgb(' + red + ', 0, ' + blue + '), rgb(' + red + ', 255, ' + blue + '))'}>
        <input type="range" min="0" max="255" value={green} class="picker green" oninput={updateGreen}>
      </div>
    </div>

    <div class="value-container">
      <input type="text" class="color-value" value={blue} oninput={updateBlue}>

      <div class="picker-container blue-container" style={'background: linear-gradient(to right, rgb(' + red + ', ' + green + ', 0), rgb(' + red + ', ' + green + ', 255))'}>
        <input type="range" min="0" max="255" value={blue} class="picker blue" oninput={updateBlue}>
      </div>
    </div>
  </section>

  <h2>HSV</h2>

  <section class="color-container">
    <div class="value-container">
      <input type="text" class="color-value" value={hue} oninput={updateHue}>

      <div class="picker-container hue-container" style={'background: linear-gradient(to right, ' + hsvToRgb(0, saturation, value).string + ', ' + hsvToRgb(60, saturation, value).string + ', '  + hsvToRgb(120, saturation, value).string + ', '  + hsvToRgb(180, saturation, value).string + ', '  + hsvToRgb(240, saturation, value).string + ', '  + hsvToRgb(300, saturation, value).string + ', '  + hsvToRgb(360, saturation, value).string + ')'}>
        <input type="range" min="0" max="360" value={hue} class="picker hue" oninput={updateHue}>
      </div>
    </div>

    <div class="value-container">
      <input type="text" class="color-value" value={Math.round(saturation * 100)} oninput={updateSaturation}>

      <div class="picker-container saturation-container" style={'background: linear-gradient(to right, ' + hsvToRgb(hue, 0, value).string + ', ' + hsvToRgb(hue, 1, value).string + ')'}>
        <input type="range" min="0" max="100" value={Math.round(saturation * 100)} class="picker saturation" oninput={updateSaturation}>
      </div>
    </div>

    <div class="value-container">
      <input type="text" class="color-value" value={Math.round(value * 100)} oninput={updateValue}>

      <div class="picker-container value-container" style={'background: linear-gradient(to right, ' + hsvToRgb(hue, saturation, 0).string + ', ' + hsvToRgb(hue, saturation, 1).string + ')'}>
        <input type="range" min="0" max="100" value={Math.round(value * 100)} class="picker value" oninput={updateValue}>
      </div>
    </div>
  </section>

  <div class="sample" id="sample" style={'background:rgb(' + red + ', ' + green + ', ' + blue + ')'}></div>

  <script>
    const self = this;

    const socket = this.opts.socket;

    const hsvToRgb = require('../js/hsvToRgb.js');
    const rgbToHsv = require('../js/rgbToHsv.js');

    self.hsvToRgb = hsvToRgb;

    self.red = 255;
    self.green = 0;
    self.blue = 0;

    Object.assign(self, rgbToHsv(self.red, self.green, self.blue));

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(['pattern', 'mode', 'rgb']));
      socket.send(JSON.stringify(['pattern', 'values', {red: self.red, green: self.green, blue: self.blue}]));
    });

    const updateRgb = target => {
      const position = target.selectionStart;

      Object.assign(self, hsvToRgb(self.hue, self.saturation, self.value));
      self.update();

      target.selectionStart = target.selectionEnd = position;

      socket.send(JSON.stringify(['pattern', 'mode', 'hsv']));
      socket.send(JSON.stringify(['pattern', 'values', {hue: self.hue, saturation: self.saturation, value: self.value}]));
    };

    const updateHsv = target => {
      const position = target.selectionStart;

      Object.assign(self, rgbToHsv(self.red, self.green, self.blue));
      self.update();

      target.selectionStart = target.selectionEnd = position;

      socket.send(JSON.stringify(['pattern', 'mode', 'rgb']));
      socket.send(JSON.stringify(['pattern', 'values', {red: self.red, green: self.green, blue: self.blue}]));
    };

    self.updateRed = function(event) {
      self.red = event.target.value;

      updateHsv(event.target);
    }

    self.updateGreen = function(event) {
      self.green = event.target.value;

      updateHsv(event.target);
    }

    self.updateBlue = function(event) {
      self.blue = event.target.value;

      updateHsv(event.target);
    }

    self.updateHue = function(event) {
      self.hue = event.target.value;

      updateRgb(event.target);
    }

    self.updateSaturation = function(event) {
      self.saturation = event.target.value / 100;

      updateRgb(event.target);
    }

    self.updateValue = function(event) {
      self.value = event.target.value / 100;

      updateRgb(event.target);
    }
  </script>
</r-pattern>
