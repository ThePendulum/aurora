<ri-interval>
  <section class="panel">
    <input type="range" min="5" max="100" value={interval} oninput={updateInterval}>
  </section>

  <script>
    const socket = this.opts.socket;

    socket.addEventListener('message', message => {
      const data = JSON.parse(message.data);

      if(data[0] === 'interval') {
        this.interval = data[1];

        this.update();
      }
    });

    this.updateInterval = event => {
      this.interval = event.target.value;

      socket.send(JSON.stringify(['interval', this.interval]));
    };
  </script>
</ri-interval>
