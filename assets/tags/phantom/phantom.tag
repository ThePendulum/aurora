<ri-phantom>
  <canvas width={width} height={height} id="phantom" class="phantom"></canvas>

  <script>
    const store = require('../../js/store.js');

    this.on('mount', () => {
      const phantom = document.querySelector('#phantom');
      const phantomCtx = phantom.getContext('2d');

      const updateValues = () => {
        const spec = store.getState().get('spec');
        const deregulator = 1 / spec.get('regulator');

        spec.get('pixels').forEach(pixel => {
          phantomCtx.fillStyle = 'rgb(' + Math.round(pixel.values[0] * deregulator) + ', ' + Math.round(pixel.values[1] * deregulator) + ', ' + Math.round(pixel.values[2] * deregulator) + ')';
          phantomCtx.fillRect(pixel.x, pixel.y, 1, 1);
        });

        // defaulted to 1 to prevent InvalidStateError for canvases with 0 width or height (Firefox)
        this.width = spec.get('width') || 1;
        this.height = spec.get('height') || 1;

        this.update();
      };

      updateValues();
      store.subscribe(updateValues);
    });
  </script>
</ri-phantom>
