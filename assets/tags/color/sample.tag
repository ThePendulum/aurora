<ri-sample>
  <section class="panel">
    <div class="picker-container">
      <div class="color-label">#</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={'#' + ('0' + Number(isNaN(opts.rgb.red) ? 0 : opts.rgb.red).toString(16)).slice(-2) + ('0' + Number(isNaN(opts.rgb.green) ? 0 : opts.rgb.green).toString(16)).slice(-2) + ('0' + Number(isNaN(opts.rgb.blue) ? 0 : opts.rgb.blue).toString(16)).slice(-2)} onchange={opts.updatefromcolor}>

        <input type="color" class="color-container sample" value={'#' + ('0' + Number(isNaN(opts.rgb.red) ? 0 : opts.rgb.red).toString(16)).slice(-2) + ('0' + Number(isNaN(opts.rgb.green) ? 0 : opts.rgb.green).toString(16)).slice(-2) + ('0' + Number(isNaN(opts.rgb.blue) ? 0 : opts.rgb.blue).toString(16)).slice(-2)} oninput={opts.updatefromcolor}>
      </div>
    </div>
  </section>

  <style>
    .sample {
      height: 1.5rem;
      padding: 0;
      border: solid 1px #ddd;
      border-top: none;
    }

    .sample::-webkit-color-swatch-wrapper {
      padding: 0;
      border: none;
    }

    .sample::-webkit-color-swatch {
      border: none;
    }

    .sample::-moz-color-swatch {
      border: none;
    }
  </style>
</ri-sample>
