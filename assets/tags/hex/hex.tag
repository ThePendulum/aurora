<ri-hex>
    <section class="panel">
        <div class="picker-container">
            <div class="color-label" title="Hex">#</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={hex} onclick={focus} onchange={updateHex}>

                <ul show={focused} class="value-presets">
                    <li each={preset in hexPresets}><button value={preset.value} class="preset {preset.value === hex ? 'preset-applied' : ''}" onclick={updateHex}>{preset.name}</button></li>
                </ul>

                <input type="color" class="color-container sample" value={hex} onchange={updateHex}>
            </div>
        </div>
    </section>

    <script>
        const store = require('../../js/store.js');
        const socket = require('../../js/socket.js');

        const updateRed = require('../../js/actions/updateRed.js');
        const updateGreen = require('../../js/actions/updateGreen.js');
        const updateBlue = require('../../js/actions/updateBlue.js');
        const hexToRgb = require('../../js/hexToRgb.js');

        const updateValues = () => {
            const state = store.getState();
            const rgb = state.get('color').get('rgb');
            const presets = state.get('presets');

            this.red = rgb.get('red');
            this.green = rgb.get('green');
            this.blue = rgb.get('blue');

            if(Number.isNaN(this.red) || Number.isNaN(this.green) || Number.isNaN(this.blue)) {
                this.hex = 'Calculated';
            } else {
                this.hex = '#' + ('0' + Number(isNaN(this.red) ? 0 : this.red).toString(16)).slice(-2) + ('0' + Number(isNaN(this.green) ? 0 : this.green).toString(16)).slice(-2) + ('0' + Number(isNaN(this.blue) ? 0 : this.blue).toString(16)).slice(-2);
            }

            this.hexPresets = presets.filter(preset => preset.target === 'hex').toArray();

            this.update();
        };

        updateValues();
        store.subscribe(updateValues);

        this.updateHex = event => {
            const rgb = hexToRgb(event.target.value);

            store.dispatch(updateRed(rgb[0], socket));
            store.dispatch(updateGreen(rgb[1], socket));
            store.dispatch(updateBlue(rgb[2], socket));
        };

        this.focus = event => {
            event.stopPropagation();

            this.focused = true;
            this.update();
        };

        document.addEventListener('click', event => {
            this.focused = false;
            this.update();
        });
    </script>
</ri-hex>
