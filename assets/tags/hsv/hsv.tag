<ri-hsv>
  <section class="panel panel-hsv">
    <div class="sync-container channels">
      <svg class="icon sync {sync ? ' sync-active' : ''}" onclick={updateSync}>
        <use xlink:href="img/icons.svg#loop">
          <title>Sync</title>
        </use>
      </svg>
    </div>

    <div class="picker-container">
      <div class="color-label">H</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={hue} onchange={updateHue}>

        <div class="color-container hue-container" style={hueGradient}>
          <input type="range" min="0" max="360" value={hue} class="picker hue" oninput={updateHue}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">S</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={saturation} onchange={updateSaturation}>

        <div class="color-container saturation-container" style={saturationGradient}>
          <input type="range" min="0" max="1" step="0.01" value={saturation} class="picker saturation" oninput={updateSaturation}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">V</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={value} onchange={updateValue}>

        <div class="color-container value-container" style={valueGradient}>
          <input type="range" min="0" max="1" step="0.01" value={value} class="picker value" oninput={updateValue}>
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

    const hsvToRgb = require('../../js/hsvToRgb.js');

    const updateValues = () => {
      const color = store.getState().get('color');
      const hsv = color.get('hsv');

      const hue = hsv.get('hue');
      const saturation = hsv.get('saturation');
      const value = hsv.get('value');

      const hueFixed = isNaN(this.hue) ? 0 : this.hue;
      const saturationFixed = isNaN(this.saturation) ? 1 : this.saturation;
      const valueFixed = isNaN(this.value) ? 1 : this.value;

      this.hue = hue;
      this.saturation = saturation;
      this.value = value;

      this.sync = color.get('sync');

      const hueToRgb = hue => {
        return hsvToRgb(hue, saturationFixed, valueFixed).string;
      };

      const saturationToRgb = saturation => {
        return hsvToRgb(hueFixed, saturation, valueFixed).string;
      };

      const valueToRgb = value => {
        return hsvToRgb(hueFixed, saturationFixed, value).string;
      };

      this.hueGradient = `background: linear-gradient(to right, ${hueToRgb(0)}, ${hueToRgb(60)}, ${hueToRgb(120)}, ${hueToRgb(180)}, ${hueToRgb(240)}, ${hueToRgb(300)}, ${hueToRgb(360)})`;
      this.saturationGradient = `background: linear-gradient(to right, ${saturationToRgb(0)}, ${saturationToRgb(1)})`;
      this.valueGradient = `background: linear-gradient(to right, ${valueToRgb(0)}, ${valueToRgb(1)})`;

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

    this.updateHue = event => {
      store.dispatch(updateHue(event.target.value, socket));
    };

    this.updateSaturation = event => {
      store.dispatch(updateSaturation(event.target.value, socket));
    };

    this.updateValue = event => {
      store.dispatch(updateValue(event.target.value, socket));
    };

    this.updateSync = event => {
      store.dispatch(updateSync());
    };
  </script>
</ri-hsv>
