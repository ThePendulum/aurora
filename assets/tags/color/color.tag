<ri-color>
  <ri-sample rgb={rgb} updatefromcolor={updateFromColor}></ri-sample>

  <ri-rgb rgb={rgb} hsv={hsv} updatered={updateRed} updategreen={updateGreen} updateblue={updateBlue}></ri-rgb>
  <ri-hsv hsv={hsv} rgb={rgb} updatehue={updateHue} updatesaturation={updateSaturation} updatevalue={updateValue}></ri-hsv>

  <style>
    .picker-container {
      display: flex;
    }

    .picker-container:not(:last-child) {
      margin: 0 0 1rem;
    }

    .color-label {
      color: #aaa;
      width: 2rem;
      display: inline-block;
      display: flex;
      align-items: center;
      font-size: .8rem;
      font-weight: bold;
    }

    .value-container {
      flex-grow: 1;
    }

    .color-value {
      width: 100%;
      padding: .5rem;
      box-sizing: border-box;
    }

    .color-container {
      width: 100%;
      height: 1rem;
      box-sizing: border-box;
      border: solid 1px #ddd;
      border-top: none;
    }

    .picker {
      -webkit-appearance: none;
      background: none;
      width: calc(100% + .4rem);
      height: 1rem;
      margin: 0 0 0 -.2rem;
      cursor: crosshair;
    }

    .picker:focus {
      outline: none;
    }

    .picker:focus {
      outline: none;
    }

    .picker::-webkit-slider-thumb {
      height: 0;
      width: 0;
      border-bottom: solid .4rem #333;
      border-left: solid .3rem transparent;
      border-right: solid .3rem transparent;
      margin: 1rem 0 0;
      -webkit-appearance: none;
    }

    .picker::-moz-range-track {
      background: none;
    }

    .picker::-moz-range-thumb {
      background: none;
      height: 0;
      width: 0;
      border-radius: 0;
      border-bottom: solid .4rem #333;
      border-left: solid .3rem transparent;
      border-right: solid .3rem transparent;
      margin: 3rem 0 0;
    }

    .picker::-ms-track {
      width: 100%;
      height: 1rem;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    .picker::-ms-fill-lower {
      border-radius: 0px;
    }

    .picker::-ms-fill-upper {
      border-radius: 0px;
    }

    .picker::-ms-thumb {
      background: #fff;
      width: 3px;
      height: 1rem;
      border: 1px solid rgba(0, 0, 0, .4);
      border-radius: 0px;
    }
  </style>

  <script>
    const riot = require('riot');
    const socket = this.opts.socket;

    riot.mount('ri-rgb, ri-hsv, ri-sample');

    const hsvToRgb = require('../js/hsvToRgb.js');
    const rgbToHsv = require('../js/rgbToHsv.js');

    this.hsvToRgb = hsvToRgb;

    this.rgb = {
      red: 255,
      green: 0,
      blue: 0
    };

    this.hsv = rgbToHsv(...Object.values(this.rgb));

    const updateRgb = target => {
      this.rgb = hsvToRgb(this.hsv.hue, this.hsv.saturation, this.hsv.value);

      this.update();

      socket.send(JSON.stringify(['hsv', {hue: this.hsv.hue, saturation: this.hsv.saturation, value: this.hsv.value}]));
      socket.send(JSON.stringify(['rgb', {red: this.rgb.red, green: this.rgb.green, blue: this.rgb.blue}]));
      socket.send(JSON.stringify(['mode', 'hsv']));
    };

    const updateHsv = target => {
      this.hsv = rgbToHsv(this.rgb.red, this.rgb.green, this.rgb.blue);

      this.update();

      socket.send(JSON.stringify(['rgb', {red: this.rgb.red, green: this.rgb.green, blue: this.rgb.blue}]));
      socket.send(JSON.stringify(['hsv', {hue: this.hsv.hue, saturation: this.hsv.saturation, value: this.hsv.value}]));
      socket.send(JSON.stringify(['mode', 'rgb']));
    };

    this.updateRed = event => {
      this.rgb.red = event.target.value;

      updateHsv(event.target);
    }

    this.updateGreen = event => {
      this.rgb.green = event.target.value;

      updateHsv(event.target);
    }

    this.updateBlue = event => {
      this.rgb.blue = event.target.value;

      updateHsv(event.target);
    }

    this.updateHue = event => {
      this.hsv.hue = event.target.value;

      updateRgb(event.target);
    }

    this.updateSaturation = event => {
      this.hsv.saturation = event.target.value;

      updateRgb(event.target);
    }

    this.updateValue = event => {
      this.hsv.value = event.target.value;

      updateRgb(event.target);
    }

    this.updateFromColor = event => {
      this.rgb.red = parseInt(event.target.value.slice(1,3), 16);
      this.rgb.green = parseInt(event.target.value.slice(3,5), 16);
      this.rgb.blue = parseInt(event.target.value.slice(5,7), 16);

      updateHsv(event.target);
    };

    socket.addEventListener('message', message => {
      const data = JSON.parse(message.data);

      if(data[0] === 'rgb') {
        this.rgb = data[1];

        this.update();
      }

      if(data[0] === 'hsv') {
        this.hsv = data[1];

        this.update();
      }
    });
  </script>
</ri-color>
