<ri-hsv>
    <section class="panel panel-hsv">
        <div class="sync-container channels">
            <svg class="icon sync {sync ? ' sync-active' : ''}" onclick={updateSync}>
                <use xlink:href="img/icons.svg#loop">
                <title>Sync</title>
                </use>
            </svg>
        </div>

        <div class="picker-container">
            <div class="color-label" title="Hue">H</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={hue} onclick={focus.bind(null, 'hue')} onchange={updateHue}>

                <ul show={focused === 'hue'} class="value-presets">
                    <li><button value="0" class="preset {hue === '0' ? 'preset-applied' : ''}" onclick={updateHue}>Default</button></li>
                    <li each={preset in huePresets}><button value={preset.value} class="preset {preset.value === hue ? 'preset-applied' : ''}" onclick={updateHue}>{preset.name}</button></li>
                </ul>

                <div class="color-container hue-container" style={hueGradient}>
                    <input type="range" min="0" max="360" value={hueFixed} class="picker hue" oninput={updateHue}>
                </div>
            </div>
        </div>

        <div class="picker-container">
            <div class="color-label" title="Saturation">S</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={saturation} onclick={focus.bind(null, 'saturation')} onchange={updateSaturation}>

                <ul show={focused === 'saturation'} class="value-presets">
                    <li><button value="1" class="preset {saturation === '1' ? 'preset-applied' : ''}" onclick={updateSaturation}>Default</button></li>
                    <li each={preset in saturationPresets}><button value={preset.value} class="preset {preset.value === saturation ? 'preset-applied' : ''}" onclick={updateSaturation}>{preset.name}</button></li>
                </ul>

                <div class="color-container saturation-container" style={saturationGradient}>
                    <input type="range" min="0" max="1" step="0.01" value={saturationFixed} class="picker saturation" oninput={updateSaturation}>
                </div>
            </div>
        </div>

        <div class="picker-container">
            <div class="color-label" title="Value">V</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={value} onclick={focus.bind(null, 'value')} onchange={updateValue}>

                <ul show={focused === 'value'} class="value-presets">
                    <li><button value="1" class="preset {value === '1' ? 'preset-applied' : ''}" onclick={updateValue}>Default</button></li>
                    <li each={preset in valuePresets}><button value={preset.value} class="preset {preset.value === value ? 'preset-applied' : ''}" onclick={updateValue}>{preset.name}</button></li>
                </ul>

                <div class="color-container value-container" style={valueGradient}>
                    <input type="range" min="0" max="1" step="0.01" value={valueFixed} class="picker value" oninput={updateValue}>
                </div>
            </div>
        </div>
    </section>

    <script>
        const store = require('../../js/store.js');
        const socket = require('../../js/socket.js');

        const updateHue = require('../../js/actions/updateHue.js');
        const updateSaturation = require('../../js/actions/updateSaturation.js');
        const updateValue = require('../../js/actions/updateValue.js');
        const updateSync = require('../../js/actions/updateSync.js');

        const hsvToRgb = require('../../js/hsvToRgb.js');

        const updateValues = () => {
            const state = store.getState();
            const color = state.get('color');
            const presets = state.get('presets');
            const hsv = color.get('hsv');

            const hue = hsv.get('hue');
            const saturation = hsv.get('saturation');
            const value = hsv.get('value');

            this.hueFixed = isNaN(this.hue) ? 0 : this.hue;
            this.saturationFixed = isNaN(this.saturation) ? 1 : this.saturation;
            this.valueFixed = isNaN(this.value) ? 1 : this.value;

            this.hue = Number.isNaN(hue) ? 'Calculated' : hue;

            if(Number.isNaN(saturation)) {
                this.saturation = 'Calculated';
            } else if(isNaN(saturation)) {
                this.saturation = saturation;
            } else {
                this.saturation = Number(saturation).toFixed(2);
            }

            if(Number.isNaN(value)) {
                this.value = 'Calculated';
            } else if(isNaN(value)) {
                this.value = value;
            } else {
                this.value = Number(value).toFixed(2);
            }

            this.sync = color.get('sync');

            this.huePresets = presets.filter(preset => preset.target === 'hue').toArray();
            this.valuePresets = presets.filter(preset => preset.target === 'value').toArray();
            this.saturationPresets = presets.filter(preset => preset.target === 'saturation').toArray();

            const hueToRgb = hue => {
                return hsvToRgb(hue, this.saturationFixed, this.valueFixed).string;
            };

            const saturationToRgb = saturation => {
                return hsvToRgb(this.hueFixed, saturation, this.valueFixed).string;
            };

            const valueToRgb = value => {
                return hsvToRgb(this.hueFixed, this.saturationFixed, value).string;
            };

            this.hueGradient = `background: linear-gradient(to right, ${hueToRgb(0)}, ${hueToRgb(60)}, ${hueToRgb(120)}, ${hueToRgb(180)}, ${hueToRgb(240)}, ${hueToRgb(300)}, ${hueToRgb(360)})`;
            this.saturationGradient = `background: linear-gradient(to right, ${saturationToRgb(0)}, ${saturationToRgb(1)})`;
            this.valueGradient = `background: linear-gradient(to right, ${valueToRgb(0)}, ${valueToRgb(1)})`;

            this.update();
        };

        updateValues();
        store.subscribe(updateValues);

        this.updateHue = event => {
            store.dispatch(updateHue(event.target.value, socket));
        };

        this.updateSaturation = event => {
            store.dispatch(updateSaturation(event.target.value, socket));
        };

        this.updateValue = event => {
            store.dispatch(updateValue(event.target.value, socket));
        };

        this.updateSync = event => {
            store.dispatch(updateSync());
        };

        this.focus = (target, event) => {
            event.stopPropagation();

            this.focused = target;
            this.update();
        };

        document.addEventListener('click', event => {
            this.focused = null;
            this.update();
        });
    </script>
</ri-hsv>
