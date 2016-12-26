<template>
    <div>
        <div class="panel">
            <div class="channel red">
                <span class="channel-label" title="Red">R</span>

                <div class="channel-value">
                    <form @submit.prevent="updateRed">
                        <input type="text" :value="redInterpreted" class="input channel-input" @blur="updateRed">
                    </form>

                    <div class="channel-picker" :style="redGradient">
                        <input type="range" min="0" max="255" :value="redFixed" class="channel-slider red" @input="updateRed">
                    </div>
                </div>
            </div>

            <div class="channel green">
                <span class="channel-label" title="Green">G</span>

                <div class="channel-value">
                    <form @submit.prevent="updateGreen">
                        <input type="text" :value="greenInterpreted" class="input channel-input" @blur="updateGreen">
                    </form>

                    <div class="channel-picker" :style="greenGradient">
                        <input type="range" min="0" max="255" :value="greenFixed" class="channel-slider green" @input="updateGreen">
                    </div>
                </div>
            </div>

            <div class="channel blue">
                <span class="channel-label" title="Blue">B</span>

                <div class="channel-value">
                    <form @submit.prevent="updateBlue">
                        <input type="text" :value="blueInterpreted" class="input channel-input" @blur="updateBlue">
                    </form>

                    <div class="channel-picker" :style="blueGradient">
                        <input type="range" min="0" max="255" :value="blueFixed" class="channel-slider blue" @input="updateBlue">
                    </div>
                </div>
            </div>
        </div>

        <div class="panel">
            <div class="channel hue">
                <span class="channel-label" title="Hue">H</span>

                <div class="channel-value">
                    <form @submit.prevent="updateHue">
                        <input type="text" :value="hueInterpreted" class="input channel-input" @blur="updateHue">
                    </form>

                    <div class="channel-picker" :style="hueGradient">
                        <input type="range" min="0" max="360" :value="hueFixed" class="channel-slider hue" @input="updateHue">
                    </div>
                </div>
            </div>

            <div class="channel saturation">
                <span class="channel-label" title="Saturation">S</span>

                <div class="channel-value">
                    <form @submit.prevent="updateSaturation">
                        <input type="text" :value="saturationInterpreted" class="input channel-input" @blur="updateSaturation">
                    </form>

                    <div class="channel-picker" :style="saturationGradient">
                        <input type="range" min="0" max="1" step="0.01" :value="saturationFixed" class="channel-slider saturation" @input="updateSaturation">
                    </div>
                </div>
            </div>

            <div class="channel value">
                <span class="channel-label" title="Value">V</span>

                <div class="channel-value">
                    <form @submit.prevent="updateValue">
                        <input type="text" :value="valueInterpreted" class="input channel-input" @blur="updateValue">
                    </form>

                    <div class="channel-picker" :style="valueGradient">
                        <input type="range" min="0" max="1" step="0.01" :value="valueFixed" class="channel-slider value" @input="updateValue">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import convert from 'color-convert';
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                red(state) { return state.pattern.red; },
                green(state) { return state.pattern.green; },
                blue(state) { return state.pattern.blue; },
                hue(state) { return state.pattern.hue; },
                saturation(state) { return state.pattern.saturation; },
                value(state) { return state.pattern.value; }
            }),
            redFixed() { return isNaN(this.red) ? 0 : Math.round(this.red); },
            greenFixed() { return isNaN(this.green) ? 0 : Math.round(this.green); },
            blueFixed() { return isNaN(this.blue) ? 0 : Math.round(this.blue); },
            hueFixed() { return isNaN(this.hue) ? 0 : this.hue; },
            saturationFixed() { return isNaN(this.saturation) ? 1 : this.saturation; },
            valueFixed() { return isNaN(this.value) ? 1 : this.value; },
            redInterpreted() { return Number.isNaN(this.red) ? 'Calculated' : Math.round(this.red); },
            greenInterpreted() { return Number.isNaN(this.green) ? 'Calculated' : Math.round(this.green); },
            blueInterpreted() { return Number.isNaN(this.blue) ? 'Calculated' : Math.round(this.blue); },
            hueInterpreted() { return Number.isNaN(this.hue) ? 'Calculated' : Math.round(this.hue); },
            saturationInterpreted() {
                if(Number.isNaN(this.saturation)) { return 'Calculated' };
                if(isNaN(this.saturation)) { return this.saturation; };

                return Number(this.saturation).toFixed(2);
            },
            valueInterpreted() {
                if(Number.isNaN(this.value)) { return 'Calculated' };
                if(isNaN(this.value)) { return this.value; };

                return Number(this.value).toFixed(2);
            },
            redGradient() {
                return {
                    background: `linear-gradient(to right, rgb(0, ${this.greenFixed}, ${this.blueFixed}), rgb(255, ${this.greenFixed}, ${this.blueFixed}))`
                };
            },
            greenGradient() {
                return {
                    background: `linear-gradient(to right, rgb(${this.redFixed}, 0, ${this.blueFixed}), rgb(${this.redFixed}, 255, ${this.blueFixed}))`
                };
            },
            blueGradient() {
                return {
                    background: `linear-gradient(to right, rgb(${this.redFixed}, ${this.greenFixed}, 0), rgb(${this.redFixed}, ${this.greenFixed}, 255))`
                };
            },
            hueGradient() {
                return {
                    background: `linear-gradient(to right, ${this.hueToHex(0)}, ${this.hueToHex(60)}, ${this.hueToHex(120)}, ${this.hueToHex(180)}, ${this.hueToHex(240)}, ${this.hueToHex(300)}, ${this.hueToHex(360)})`
                };
            },
            saturationGradient() {
                return {
                    background: `linear-gradient(to right, ${this.saturationToHex(0)}, ${this.saturationToHex(1)})`
                };
            },
            valueGradient() {
                return {
                    background: `linear-gradient(to right, ${this.valueToHex(0)}, ${this.valueToHex(1)})`
                };
            }
        },
        methods: {
            updateRed(event) { this.$store.dispatch('setRed', event.target.value); },
            updateGreen(event) { this.$store.dispatch('setGreen', event.target.value); },
            updateBlue(event) { this.$store.dispatch('setBlue', event.target.value); },
            updateHue(event) { this.$store.dispatch('setHue', event.target.value); },
            updateSaturation(event) { this.$store.dispatch('setSaturation', event.target.value); },
            updateValue(event) { this.$store.dispatch('setValue', event.target.value); },
            hueToHex(hue) { return '#' + convert.hsv.hex(hue, this.saturationFixed * 100, this.valueFixed * 100); },
            saturationToHex(saturation) { return '#' + convert.hsv.hex(this.hueFixed, saturation * 100, this.valueFixed * 100); },
            valueToHex(value) { return '#' + convert.hsv.hex(this.hueFixed, this.saturationFixed * 100, value * 100); }
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .channel {
        display: flex;

        &:not(:last-child) {
            margin: 0 0 1rem 0;
        }
    }

    .channel-label {
        color: $grey2;
        display: flex;
        align-items: center;
        padding: 0 1rem 0 0;
        font-size: .8rem;
        font-weight: bold;
    }

    .channel-value {
        flex-grow: 1;
    }

    .channel-input {
        width: 100%;
    }

    .channel-picker {
        border: solid 1px $border;
        border-top: none;
    }

    .channel-slider {
        width: calc(100% + .4rem); /* allow thumb center to touch end */
        -webkit-appearance: none;
        background: none;
        height: 1rem;
        margin: 0 0 0 -.2rem;
        cursor: crosshair;

        &::-moz-range-track {
            background: none;
        }

        &::-webkit-slider-thumb {
            width: 0;
            height: 0;
            -webkit-appearance: none;
            border-bottom: solid .4rem $text;
            border-left: solid .3rem transparent;
            border-right: solid .3rem transparent;
            margin: 1.1rem 0 0;
        }

        &::-moz-range-thumb {
            background: none;
            width: 0;
            height: 0;
            border-radius: 0;
            border-bottom: solid .4rem $text;
            border-left: solid .3rem transparent;
            border-right: solid .3rem transparent;
        }
    }
</style>
