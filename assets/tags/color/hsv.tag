<ri-hsv>
  <section class="panel">
    <div class="picker-container">
      <div class="color-label">H</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={opts.hsv.hue} onchange={opts.updatehue}>

        <div class="color-container hue-container" style={'background: linear-gradient(to right, ' + hsvToRgb(0, opts.hsv.saturation, opts.hsv.value).string + ', ' + hsvToRgb(60, opts.hsv.saturation, opts.hsv.value).string + ', '  + hsvToRgb(120, opts.hsv.saturation, opts.hsv.value).string + ', '  + hsvToRgb(180, opts.hsv.saturation, opts.hsv.value).string + ', '  + hsvToRgb(240, opts.hsv.saturation, opts.hsv.value).string + ', '  + hsvToRgb(300, opts.hsv.saturation, opts.hsv.value).string + ', '  + hsvToRgb(360, opts.hsv.saturation, opts.hsv.value).string + ')'}>
          <input type="range" min="0" max="360" value={opts.hsv.hue} class="picker hue" oninput={opts.updatehue}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">S</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={opts.hsv.saturation} onchange={opts.updatesaturation}>

        <div class="color-container saturation-container" style={'background: linear-gradient(to right, ' + hsvToRgb(isNaN(opts.hsv.hue) ? 0 : opts.hsv.hue, 0, isNaN(opts.hsv.value) ? 1 : opts.hsv.value).string + ', ' + hsvToRgb(isNaN(opts.hsv.hue) ? 1 : opts.hsv.hue, 1, isNaN(opts.hsv.value) ? 1 : opts.hsv.value).string + ')'}>
          <input type="range" min="0" max="1" step="0.01" value={opts.hsv.saturation} class="picker saturation" oninput={opts.updatesaturation}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">V</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={opts.hsv.value} onchange={opts.updatevalue}>

        <div class="color-container value-container" style={'background: linear-gradient(to right, ' + hsvToRgb(isNaN(opts.hsv.hue) ? 0 : opts.hsv.hue, isNaN(opts.hsv.saturation) ? 1 : opts.hsv.saturation, 0).string + ', ' + hsvToRgb(isNaN(opts.hsv.hue) ? 0 : opts.hsv.hue, isNaN(opts.hsv.saturation) ? 1 : opts.hsv.saturation, 1).string + ')'}>
          <input type="range" min="0" max="1" step="0.01" value={opts.hsv.value} class="picker value" oninput={opts.updatevalue}>
        </div>
      </div>
    </div>
  </section>

  <script>
    this.hsvToRgb = require('../../js/hsvToRgb.js');
  </script>
</ri-hsv>
