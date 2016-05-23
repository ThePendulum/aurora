<r-interval>
  <h1>Interval</h1>

  <input type="range" min="5" max="100" value={interval} oninput={updateInterval}>

  <script>
    const socket = this.opts.socket;

    this.interval = 5;

    this.updateInterval = event => {
      this.interval = event.target.value;

      socket.send(JSON.stringify(['interval', this.interval]));
    };
  </script>
</r-interval>
