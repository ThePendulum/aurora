<ri-hsv>
  <section class="panel panel-hsv">
    <div class="picker-container">
      <div class="color-label">H</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={hue} onchange={updatehue}>

        <div class="color-container hue-container" style={'background: linear-gradient(to right, ' + hsvToRgb(0, saturationFixed, valueFixed).string + ', ' + hsvToRgb(60, saturationFixed, valueFixed).string + ', '  + hsvToRgb(120, saturationFixed, valueFixed).string + ', '  + hsvToRgb(180, saturationFixed, valueFixed).string + ', '  + hsvToRgb(240, saturationFixed, valueFixed).string + ', '  + hsvToRgb(300, saturationFixed, valueFixed).string + ', '  + hsvToRgb(360, saturationFixed, valueFixed).string + ')'}>
          <input type="range" min="0" max="360" value={hue} class="picker hue" oninput={updatehue}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">S</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={saturation} onchange={updatesaturation}>

        <div class="color-container saturation-container" style={'background: linear-gradient(to right, ' + hsvToRgb(isNaN(hue) ? 0 : hue, 0, isNaN(value) ? 1 : value).string + ', ' + hsvToRgb(isNaN(hue) ? 1 : hue, 1, isNaN(value) ? 1 : value).string + ')'}>
          <input type="range" min="0" max="1" step="0.01" value={saturation} class="picker saturation" oninput={updatesaturation}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">V</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={value} onchange={updatevalue}>

        <div class="color-container value-container" style={'background: linear-gradient(to right, ' + hsvToRgb(isNaN(hue) ? 0 : hue, isNaN(saturation) ? 1 : saturation, 0).string + ', ' + hsvToRgb(isNaN(hue) ? 0 : hue, isNaN(saturation) ? 1 : saturation, 1).string + ')'}>
          <input type="range" min="0" max="1" step="0.01" value={value} class="picker value" oninput={updatevalue}>
        </div>
      </div>
    </div>
  </section>

  <script>
    const store = require('../../js/store.js');
    const socket = require('../../js/socket.js');

    const updateHue = require('../../js/actions/updateHue.js');
    const updateSaturation = require('../../js/actions/updateSaturation.js');
    const updateValue = require('../../js/actions/updateValue.js');
    const updateSync = require('../../js/actions/updateSync.js');

    this.hsvToRgb = require('../../js/hsvToRgb.js');

    const updateValues = () => {
      const color = store.getState().get('color');
      const hsv = color.get('hsv');

      this.hue = hsv.get('hue');
      this.saturation = hsv.get('saturation');
      this.value = hsv.get('value');
      this.sync = color.get('sync');

      this.hueFixed = isNaN(this.hue) ? 0 : this.hue;
      this.saturationFixed = isNaN(this.saturation) ? 1 : this.saturation;
      this.valueFixed = isNaN(this.value) ? 1 : this.value;

      if(!isNaN(this.saturation)) {
        this.saturation = Number(this.saturation).toFixed(2);
      }

      if(!isNaN(this.value)) {
        this.value = Number(this.value).toFixed(2);
      }

      this.update();
    };

    updateValues();
    store.subscribe(updateValues);

    this.updatehue = event => {
      store.dispatch(updateHue(event.target.value, socket));
    };

    this.updatesaturation = event => {
      store.dispatch(updateSaturation(event.target.value, socket));
    };

    this.updatevalue = event => {
      store.dispatch(updateValue(event.target.value, socket));
    };

    this.updatesync = event => {
      store.dispatch(updateSync());
    };
  </script>
</ri-hsv>
