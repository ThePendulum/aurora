<ri-draw>
  <section class="panel">
    <canvas id="phantom" class="phantom"></canvas>
    <canvas width="512" height="512" id="draw" class="draw"></canvas>

    <input type="color" value="#ff0000" id="draw-colorpicker" class="draw-colorpicker">
    <input type="button" value="Eraser" id="draw-eraser">
  </section>

  <style>
    .draw-colorpicker {
      display: block;
    }

    .phantom {
      display: none;
    }

    .draw {
      background: #000;
      cursor: crosshair;
    }
  </style>

  <script>
    const socket = opts.socket;
    const hexToRgb = require('../js/hexToRgb.js');
    let mousedown = false;

    window.addEventListener('mousedown', event => {
      mousedown = true;
    });

    window.addEventListener('mouseup', event => {
      mousedown = false;
    });

    this.on('mount', () => {
      const drawCanvas = document.querySelector('#draw');
      const drawCtx = drawCanvas.getContext('2d');

      drawCtx.imageSmoothingEnabled = false;
      drawCtx.mozImageSmoothingEnabled = false;
      drawCtx.msImageSmoothingEnabled = false;

      const phantomCanvas = document.querySelector('#phantom');
      const phantomCtx = phantomCanvas.getContext('2d');

      const colorpicker = document.querySelector('#draw-colorpicker');
      const eraser = document.querySelector('#draw-eraser');

      let pencil = hexToRgb(colorpicker.value);

      const update = function() {
        drawCtx.drawImage(phantomCanvas, 0, 0, drawCanvas.width, drawCanvas.height);
      };

      const draw = function() {
        if(mousedown || event.type === 'click') {
          const position = event.target.getBoundingClientRect();
          const cursorX = Math.floor((event.clientX - position.left) / (drawCanvas.width / phantomCanvas.width));
          const cursorY = Math.floor((event.clientY - position.top) / (drawCanvas.height / phantomCanvas.height));

          /*
          phantomCtx.fillStyle = colorpicker.value;
          phantomCtx.fillRect(cursorX, cursorY, 1, 1);

          update();
          */

          socket.send(JSON.stringify(['draw', [cursorX, cursorY, pencil]]));
        }
      };

      drawCanvas.addEventListener('mousemove', event => {
        draw();
      });

      drawCanvas.addEventListener('click', event => {
        draw();
      });

      colorpicker.addEventListener('input', event => {
        pencil = hexToRgb(event.target.value);
      });

      eraser.addEventListener('click', event => {
        pencil = null;
      });

      socket.addEventListener('message', message => {
        const data = JSON.parse(message.data);

        if(data[0] === 'meta') {
          phantomCanvas.width = data[1].size[0];
          phantomCanvas.height = data[1].size[1];

          const deregulator = 1 / (data[1].regulator || 1);

          data[1].pixels.forEach(pixel => {
            const r = ('0' + Math.floor(pixel.values[0] * deregulator).toString(16)).slice(-2);
            const g = ('0' + Math.floor(pixel.values[1] * deregulator).toString(16)).slice(-2);
            const b = ('0' + Math.floor(pixel.values[2] * deregulator).toString(16)).slice(-2);

            phantomCtx.fillStyle = '#' + r + g + b;
            phantomCtx.fillRect(pixel.x, pixel.y, 1, 1);

            update();
          });
        }
      });
    });
  </script>
</ri-draw>
