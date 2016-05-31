<ri-rgb>
  <section class="panel">
    <div class="picker-container">
      <div class="color-label">R</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={opts.rgb.red} onchange={opts.updatered}>

        <div class="color-container red-container" style={'background: linear-gradient(to right, rgb(0, ' + opts.rgb.green + ', ' + opts.rgb.blue + '), rgb(255, ' + opts.rgb.green + ', ' + opts.rgb.blue + '))'}>
          <input type="range" min="0" max="255" value={opts.rgb.red} class="picker red" oninput={opts.updatered}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">G</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={opts.rgb.green} onchange={opts.updategreen}>

        <div class="color-container green-container" style={'background: linear-gradient(to right, rgb(' + opts.rgb.red + ', 0, ' + opts.rgb.blue + '), rgb(' + opts.rgb.red + ', 255, ' + opts.rgb.blue + '))'}>
          <input type="range" min="0" max="255" value={opts.rgb.green} class="picker green" oninput={opts.updategreen}>
        </div>
      </div>
    </div>

    <div class="picker-container">
      <div class="color-label">B</div>

      <div class="value-container">
        <input type="text" class="input-text color-value" value={opts.rgb.blue} onchange={opts.updateblue}>

        <div class="color-container blue-container" style={'background: linear-gradient(to right, rgb(' + opts.rgb.red + ', ' + opts.rgb.green + ', 0), rgb(' + opts.rgb.red + ', ' + opts.rgb.green + ', 255))'}>
          <input type="range" min="0" max="255" value={opts.rgb.blue} class="picker blue" oninput={opts.updateblue}>
        </div>
      </div>
    </div>
  </section>
</ri-rgb>
