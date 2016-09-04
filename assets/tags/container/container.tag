<ri-container>
    <ri-color if={location === 'color'}></ri-color>
    <ri-draw if={location === 'draw'}></ri-draw>

    <ri-phantom></ri-phantom>

  <script>
    riot.mount('ri-phantom, ri-interval, ri-color, ri-draw');

    riot.route.base('/');
    riot.route.start();

    riot.route((collection, id, action) => {
        if(collection) {
            this.location = collection;
        } else {
            riot.route('/color');
        }

        this.update();
    });

    riot.route.exec();
  </script>
</ri-container>
