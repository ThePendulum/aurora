<ri-hex>
  <section class="panel">
    <div class="picker-container">
      <div class="color-label">#</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={'#' + ('0' + Number(isNaN(red) ? 0 : red).toString(16)).slice(-2) + ('0' + Number(isNaN(green) ? 0 : green).toString(16)).slice(-2) + ('0' + Number(isNaN(blue) ? 0 : blue).toString(16)).slice(-2)} onchange={updatehex}>

        <input type="color" class="color-container sample" value={'#' + ('0' + Number(isNaN(red) ? 0 : red).toString(16)).slice(-2) + ('0' + Number(isNaN(green) ? 0 : green).toString(16)).slice(-2) + ('0' + Number(isNaN(blue) ? 0 : blue).toString(16)).slice(-2)} onchange={updatehex}>
      </div>
    </div>
  </section>

  <script>
    const store = require('../../js/store.js');
    const socket = require('../../js/socket.js');

    const updateRed = require('../../js/actions/updateRed.js');
    const updateGreen = require('../../js/actions/updateGreen.js');
    const updateBlue = require('../../js/actions/updateBlue.js');
    const hexToRgb = require('../../js/hexToRgb.js');

    const updateValues = () => {
      const rgb = store.getState().get('color').get('rgb');

      this.red = rgb.get('red');
      this.green = rgb.get('green');
      this.blue = rgb.get('blue');

      this.update();
    };

    updateValues();
    store.subscribe(updateValues);

    this.updatehex = event => {
      const rgb = hexToRgb(event.target.value);

      store.dispatch(updateRed(rgb[0], socket));
      store.dispatch(updateGreen(rgb[1], socket));
      store.dispatch(updateBlue(rgb[2], socket));
    };
  </script>
</ri-hex>
