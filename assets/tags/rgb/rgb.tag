<ri-rgb>
    <section class="panel panel-rgb">
        <div class="picker-container">
            <div class="color-label">R</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={red} onchange={updatered}>

                <div class="color-container red-container" style={redGradient}>
                    <input type="range" min="0" max="255" value={red} class="picker red" oninput={updatered}>
                </div>
            </div>
        </div>

        <div class="picker-container">
            <div class="color-label">G</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={green} onchange={updategreen}>

                <div class="color-container green-container" style={greenGradient}>
                    <input type="range" min="0" max="255" value={green} class="picker green" oninput={updategreen}>
                </div>
            </div>
        </div>

        <div class="picker-container">
            <div class="color-label">B</div>

            <div class="value-container">
                <input type="text" class="input-text color-value" value={blue} onchange={updateblue}>

                <div class="color-container blue-container" style={blueGradient}>
                    <input type="range" min="0" max="255" value={blue} class="picker blue" oninput={updateblue}>
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

            const redFixed = isNaN(this.red) ? 255 : this.red;
            const greenFixed = isNaN(this.green) ? 255 : this.green;
            const blueFixed = isNaN(this.blue) ? 255 : this.blue;

            if(Number.isNaN(this.red)) {
                this.red = 'Calculated';
            }

            if(Number.isNaN(this.green)) {
                this.green = 'Calculated';
            }

            if(Number.isNaN(this.blue)) {
                this.blue = 'Calculated';
            }

            this.redGradient = 'background: linear-gradient(to right, rgb(0, ' + greenFixed + ', ' + blueFixed + '), rgb(255, ' + greenFixed + ', ' + blueFixed + '))';
            this.greenGradient = 'background: linear-gradient(to right, rgb(' + redFixed + ', 0, ' + blueFixed + '), rgb(' + redFixed + ', 255, ' + blueFixed + '))';
            this.blueGradient = 'background: linear-gradient(to right, rgb(' + redFixed + ', ' + greenFixed + ', 0), rgb(' + redFixed + ', ' + greenFixed + ', 255))';

            this.update();
        };

        updateValues();
        store.subscribe(updateValues);

        this.updatered = event => {
            store.dispatch(updateRed(event.target.value, socket));
        };

        this.updategreen = event => {
            store.dispatch(updateGreen(event.target.value, socket));
        };

        this.updateblue = event => {
            store.dispatch(updateBlue(event.target.value, socket));
        };
    </script>
</ri-rgb>
