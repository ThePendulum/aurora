<ri-rgb>
    <section class="panel panel-rgb">
        <div class="picker-container">
            <div class="color-label">R</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={red} onchange={updateRed}>

                <div class="color-container red-container" style={redGradient}>
                    <input type="range" min="0" max="255" value={this.redFixed} class="picker red" oninput={updateRed}>
                </div>
            </div>
        </div>

        <div class="picker-container">
            <div class="color-label">G</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={green} onchange={updateGreen}>

                <div class="color-container green-container" style={greenGradient}>
                    <input type="range" min="0" max="255" value={this.greenFixed} class="picker green" oninput={updateGreen}>
                </div>
            </div>
        </div>

        <div class="picker-container">
            <div class="color-label">B</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={blue} onchange={updateBlue}>

                <div class="color-container blue-container" style={blueGradient}>
                    <input type="range" min="0" max="255" value={this.blueFixed} class="picker blue" oninput={updateBlue}>
                </div>
            </div>
        </div>
    </section>

    <script>
        const riot = require('riot');

        const store = require('../../js/store.js');
        const socket = require('../../js/socket.js');

        const updateRed = require('../../js/actions/updateRed.js');
        const updateGreen = require('../../js/actions/updateGreen.js');
        const updateBlue = require('../../js/actions/updateBlue.js');

        riot.mount('ri-hex');

        const updateValues = () => {
            const rgb = store.getState().get('color').get('rgb');

            this.red = rgb.get('red');
            this.green = rgb.get('green');
            this.blue = rgb.get('blue');

            this.redFixed = isNaN(this.red) ? 0 : this.red;
            this.greenFixed = isNaN(this.green) ? 0 : this.green;
            this.blueFixed = isNaN(this.blue) ? 0 : this.blue;

            if(Number.isNaN(this.red)) {
                this.red = 'Calculated';
            }

            if(Number.isNaN(this.green)) {
                this.green = 'Calculated';
            }

            if(Number.isNaN(this.blue)) {
                this.blue = 'Calculated';
            }

            this.redGradient = 'background: linear-gradient(to right, rgb(0, ' + this.greenFixed + ', ' + this.blueFixed + '), rgb(255, ' + this.greenFixed + ', ' + this.blueFixed + '))';
            this.greenGradient = 'background: linear-gradient(to right, rgb(' + this.redFixed + ', 0, ' + this.blueFixed + '), rgb(' + this.redFixed + ', 255, ' + this.blueFixed + '))';
            this.blueGradient = 'background: linear-gradient(to right, rgb(' + this.redFixed + ', ' + this.greenFixed + ', 0), rgb(' + this.redFixed + ', ' + this.greenFixed + ', 255))';

            this.update();
        };

        updateValues();
        store.subscribe(updateValues);

        this.updateRed = event => {
            store.dispatch(updateRed(event.target.value, socket));
        };

        this.updateGreen = event => {
            store.dispatch(updateGreen(event.target.value, socket));
        };

        this.updateBlue = event => {
            store.dispatch(updateBlue(event.target.value, socket));
        };
    </script>
</ri-rgb>
