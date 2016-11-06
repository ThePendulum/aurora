<ri-draw>
  <section class="panel">
    <div id="drawContainer" class="draw-container">
      <canvas id="drawCanvas" class="draw"></canvas>
    </div>
  </section>

  <script>
    const store = require('../../js/store.js');

    let mousedown = false;

    let lastPosition = {
      x: 0,
      y: 0
    };

    let offset = {
      x: 0,
      y: 0
    };

    this.on('mount', () => {
      const phantomCanvas = document.querySelector('#phantom');
      const drawContainer = document.querySelector('#drawContainer');
      const drawCanvas = document.querySelector('#drawCanvas');
      const drawCanvasCtx = drawCanvas.getContext('2d');

      drawCanvas.addEventListener('mousedown', event => {
        mousedown = true;

        drawCanvas.style.cursor = '-webkit-grabbing';
      });

      drawCanvas.addEventListener('mouseup', event => {
        mousedown = false;

        drawCanvas.style.cursor = '-webkit-grab';
      });

      drawCanvas.addEventListener('mousemove', event => {
        if(mousedown) {
          const offsetX = phantomCanvas.width > 30 ? event.pageX - lastPosition.x : 0;
          const offsetY = phantomCanvas.height > 30 ? event.pageY - lastPosition.y : 0;

          drawCanvasCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
          drawCanvasCtx.translate(offsetX, offsetY);
          drawCanvasCtx.drawImage(phantomCanvas, 0, 0, drawCanvas.width, drawCanvas.height);

          offset = {
            x: offset.x + offsetX,
            y: offset.y + offsetY
          };

          console.log(offset);
        }

        lastPosition = {
          x: event.pageX,
          y: event.pageY
        };
      });

      const updateValues = () => {
        const spec = store.getState().get('spec');
        const width = spec.get('width');
        const height = spec.get('height');

        const newCanvasWidth = width * 32;
        const newCanvasHeight = height * 32;

        if(drawCanvas.width !== newCanvasWidth) {
          drawCanvas.width = newCanvasWidth;
        }

        if(drawCanvas.height !== newCanvasHeight) {
          drawCanvas.height = newCanvasHeight;
        }

        drawCanvasCtx.imageSmoothingEnabled = false;
        drawCanvasCtx.mozImageSmoothingEnabled = false;
        drawCanvasCtx.msImageSmoothingEnabled = false;

        drawCanvasCtx.drawImage(phantomCanvas, 0, 0, drawCanvas.width, drawCanvas.height);
      };

      store.subscribe(updateValues);
    });
  </script>
</ri-draw>
