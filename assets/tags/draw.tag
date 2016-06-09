<ri-draw>
  <section class="panel">
    <canvas id="phantom" class="phantom"></canvas>
    <canvas id="draw" class="draw"></canvas>

    <input type="color" value="#ff0000" id="draw-colorpicker" class="draw-colorpicker">
    <input type="button" value="Pencil" id="draw-pencil">
    <input type="button" value="Fill" id="draw-fill">
    <input type="button" value="Eraser" id="draw-eraser">
    <input type="button" value="Clear" id="draw-clear">
    <label>Opacity <input type="range" min="0" max="1" step="0.01" value={opacity} id="draw-opacity"></label>
  </section>

  <style>
    .phantom {
      display: none;
    }

    .draw {
      background: #000;
      width: 50%;
      cursor: crosshair;
    }
  </style>

  <script>
    const updatePixel = require('../js/actions/updatePixel.js');

    const hexToRgb = require('../js/hexToRgb.js');
    let mousedown = false;

    this.opacity = 1;

    window.addEventListener('mousedown', event => {
      mousedown = true;
    });

    window.addEventListener('mouseup', event => {
      mousedown = false;
    });

    this.on('mount', () => {
    /*
      const phantomCanvas = document.querySelector('#phantom');
      const phantomCtx = phantomCanvas.getContext('2d');

      const drawCanvas = document.querySelector('#draw');
      const drawCtx = drawCanvas.getContext('2d');

      const colorpicker = document.querySelector('#draw-colorpicker');
      const pencil = document.querySelector('#draw-pencil');
      const fill = document.querySelector('#draw-fill');
      const eraser = document.querySelector('#draw-eraser');
      const clear = document.querySelector('#draw-clear');
      const opacity = document.querySelector('#draw-opacity');

      let value = hexToRgb(colorpicker.value);

      const update = function() {
        drawCtx.drawImage(phantomCanvas, 0, 0, drawCanvas.width, drawCanvas.height);
      };

      const draw = event => {
        if(mousedown || event.type === 'click' || event.type === 'touchmove') {
          const drawCanvasRect = drawCanvas.getBoundingClientRect();

          const cursorX = phantomCanvas.width - 1 - Math.floor(((event.clientX || event.touches[0].clientX) - drawCanvasRect.left) / (drawCanvasRect.width / phantomCanvas.width));
          const cursorY = Math.floor(((event.clientY || event.touches[0].clientY) - drawCanvasRect.top) / (drawCanvasRect.height / phantomCanvas.height));

          phantomCtx.fillStyle = 'rgba(' + hexToRgb(colorpicker.value).concat(this.opacity).toString() + ')';
          phantomCtx.fillRect(phantomCanvas.width - 1 - cursorX, cursorY, 1, 1);

          update();

          socket.send(JSON.stringify(['draw', {
            x: cursorX,
            y: cursorY,
            values: value,
            opacity: this.opacity
          }]));
        }
      };

      drawCanvas.addEventListener('mousemove', event => {
        draw(event);
      });

      drawCanvas.addEventListener('touchmove', event => {
        event.preventDefault();

        draw(event);
      });

      drawCanvas.addEventListener('click', event => {
        draw(event);
      });

      colorpicker.addEventListener('input', event => {
        value = hexToRgb(event.target.value);
      });

      pencil.addEventListener('click', event => {
        value = hexToRgb(colorpicker.value);
        this.opacity = opacity.value;
      });

      fill.addEventListener('click', event => {
        this.opacity = opacity.value;

        socket.send(JSON.stringify(['fill', {
          values: hexToRgb(colorpicker.value),
          opacity: this.opacity
        }]));
      });

      eraser.addEventListener('click', event => {
        this.opacity = 0;
      });

      clear.addEventListener('click', event => {
        socket.send(JSON.stringify(['fill', {
          values: [0, 0, 0],
          opacity: 0
        }]));
      });

      opacity.addEventListener('input', event => {
        this.opacity = event.target.value;
      });

      socket.addEventListener('message', message => {
        const data = JSON.parse(message.data);

        if(data[0] === 'meta') {
          phantomCanvas.width = data[1].size[0];
          phantomCanvas.height = data[1].size[1];

          const drawCanvasRect = drawCanvas.getBoundingClientRect();
          const pixelWidth = drawCanvasRect.width / data[1].size[0];
          drawCanvas.width = pixelWidth * data[1].size[0];
          drawCanvas.height = pixelWidth * data[1].size[1];

          drawCtx.imageSmoothingEnabled = false;
          drawCtx.mozImageSmoothingEnabled = false;
          drawCtx.msImageSmoothingEnabled = false;

          const deregulator = 1 / (data[1].regulator || 1);

          data[1].pixels.forEach(pixel => {
            const r = ('0' + Math.floor(pixel.values[0] * deregulator).toString(16)).slice(-2);
            const g = ('0' + Math.floor(pixel.values[1] * deregulator).toString(16)).slice(-2);
            const b = ('0' + Math.floor(pixel.values[2] * deregulator).toString(16)).slice(-2);

            phantomCtx.fillStyle = '#' + r + g + b;
            phantomCtx.fillRect(phantomCanvas.width - 1 - pixel.x, pixel.y, 1, 1);

            update();
          });
        }
      });
    */
    });
  </script>
</ri-draw>
