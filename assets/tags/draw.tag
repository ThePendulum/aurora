<ri-draw>
  <section class="panel">
    <canvas id="fathom" class="fathom"></canvas>
    <canvas width="512" height="512" id="draw" class="draw"></canvas>

    <input type="color" value="#ff0000" id="draw-colorpicker" class="draw-colorpicker">
  </section>

  <style>
    .draw-colorpicker {
      display: block;
    }

    .fathom {
      display: none;
    }

    .draw {
      background: #000;
      cursor: crosshair;
    }
  </style>

  <script>
    const socket = opts.socket;
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

      const fathomCanvas = document.querySelector('#fathom');
      const fathomCtx = fathomCanvas.getContext('2d');

      const colorpicker = document.querySelector('#draw-colorpicker');

      const update = function() {
        drawCtx.drawImage(fathomCanvas, 0, 0, drawCanvas.width, drawCanvas.height);
      };

      const draw = function() {
        if(mousedown || event.type === 'click') {
          const position = event.target.getBoundingClientRect();
          const cursorX = Math.floor((event.clientX - position.left) / (drawCanvas.width / fathomCanvas.width));
          const cursorY = Math.floor((event.clientY - position.top) / (drawCanvas.height / fathomCanvas.height));

          fathomCtx.fillStyle = colorpicker.value;

          fathomCtx.fillRect(cursorX, cursorY, 1, 1);
          update();
        }
      };

      drawCanvas.addEventListener('mousemove', event => {
        draw();
      });

      drawCanvas.addEventListener('click', event => {
        draw();
      });

      socket.addEventListener('message', message => {
        const data = JSON.parse(message.data);

        if(data[0] === 'meta') {
          fathomCanvas.width = data[1].size[0];
          fathomCanvas.height = data[1].size[1];

          const deregulator = 1 / (data[1].regulator || 1);

          data[1].pixels.forEach(pixel => {
            const r = ('0' + Math.floor(pixel.values[0] * deregulator).toString(16)).slice(-2);
            const g = ('0' + Math.floor(pixel.values[1] * deregulator).toString(16)).slice(-2);
            const b = ('0' + Math.floor(pixel.values[2] * deregulator).toString(16)).slice(-2);

            fathomCtx.fillStyle = '#' + r + g + b;
            fathomCtx.fillRect(pixel.x, pixel.y, 1, 1);

            update();
          });
        }
      });
    });
  </script>
</ri-draw>
