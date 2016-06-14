<ri-preview>
  <div class="preview-container">
    <canvas width={width} height={height} id="preview" class="preview"></canvas>
  </div>

  <script>
    const store = require('../../js/store.js');

    this.on('mount', () => {
      const previewCanvas = document.querySelector('#preview');
      const previewCtx = previewCanvas.getContext('2d');

      const updateValues = () => {
        const phantomCanvas = document.querySelector('#phantom');
        const canvas = store.getState().get('canvas');

        const previewDimensions = previewCanvas.getBoundingClientRect();

        this.width = previewDimensions.width;
        this.height = previewDimensions.height;

        if(phantomCanvas) {
          previewCtx.drawImage(phantomCanvas, 0, 0, previewDimensions.width, previewDimensions.height);

          previewCtx.imageSmoothingEnabled = false;
          previewCtx.mozImageSmoothingEnabled = false;
          previewCtx.msImageSmoothingEnabled = false;
        }

        this.update();
      };

      updateValues();
      store.subscribe(updateValues);
    });
  </script>
</ri-preview>
