<template>
    <div>
        <div class="panel">
            <div class="channel master">
                <span class="channel-label" title="Master">M</span>

                <div class="channel-value">
                    <input type="text" :value="Number.isNaN(hex) ? '' : hex" class="input channel-input" :placeholder="Number.isNaN(hex) ? 'Calculated' : ''" @click.stop="focus('master')" @blur="updateHex" @keyup.enter="updateHex">

                    <ul v-if="focused === 'master'" class="channel-presets">
                        <li v-for="preset in masterPresets" class="preset" @click="applyPreset(preset)">{{preset.name}}</li>
                    </ul>

                    <input type="color" :value="Number.isNaN(hex) ? '#ffffff' : hex" class="channel-color channel-input" @input="updateHex">
                </div>
            </div>
        </div>

        <div class="panel">

            <div class="channel red">
                <span class="channel-label" title="Red">R</span>

                <div class="channel-value">
                    <input type="text" :value="Number.isNaN(redInterpreted) ? '' : redInterpreted" :placeholder="Number.isNaN(redInterpreted) ? 'Calculated' : ''" class="input channel-input" @click.stop="focus('red')" @blur="updateRed" @keyup.enter="updateRed">

                    <ul v-if="focused === 'red'" class="channel-presets">
                        <li v-for="preset in redPresets" class="preset" @click="applyPreset(preset, 'red')">{{preset.name}}</li>
                    </ul>

                    <div class="channel-picker" :style="redGradient">
                        <input type="range" min="0" max="255" :value="redFixed" class="channel-slider red" @input="updateRed">
                    </div>
                </div>
            </div>

            <div class="channel green">
                <span class="channel-label" title="Green">G</span>

                <div class="channel-value">
                    <input type="text" :value="Number.isNaN(greenInterpreted) ? '' : greenInterpreted" :placeholder="Number.isNaN(greenInterpreted) ? 'Calculated' : ''" class="input channel-input" @click.stop="focus('green')" @blur="updateGreen" @keyup.enter="updateGreen">

                    <ul v-if="focused === 'green'" class="channel-presets">
                        <li v-for="preset in greenPresets" class="preset" @click="applyPreset(preset, 'green')">{{preset.name}}</li>
                    </ul>

                    <div class="channel-picker" :style="greenGradient">
                        <input type="range" min="0" max="255" :value="greenFixed" class="channel-slider green" @input="updateGreen">
                    </div>
                </div>
            </div>

            <div class="channel blue">
                <span class="channel-label" title="Blue">B</span>

                <div class="channel-value">
                    <input type="text" :value="Number.isNaN(blueInterpreted) ? '' : blueInterpreted" :placeholder="Number.isNaN(blueInterpreted) ? 'Calculated' : ''" class="input channel-input" @click.stop="focus('blue')" @blur="updateBlue" @keyup.enter="updateBlue">

                    <ul v-if="focused === 'blue'" class="channel-presets">
                        <li v-for="preset in bluePresets" class="preset" @click="applyPreset(preset, 'blue')">{{preset.name}}</li>
                    </ul>

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
                    <input type="text" :value="Number.isNaN(hueInterpreted) ? '' : hueInterpreted" :placeholder="Number.isNaN(hueInterpreted) ? 'Calculated' : ''" class="input channel-input" @click.stop="focus('hue')" @blur="updateHue" @keyup.enter="updateHue">

                    <ul v-if="focused === 'hue'" class="channel-presets">
                        <li v-for="preset in huePresets" class="preset" @click="applyPreset(preset, 'hue')">{{preset.name}}</li>
                    </ul>

                    <div class="channel-picker" :style="hueGradient">
                        <input type="range" min="0" max="360" :value="hueFixed" class="channel-slider hue" @input="updateHue">
                    </div>
                </div>
            </div>

            <div class="channel saturation">
                <span class="channel-label" title="Saturation">S</span>

                <div class="channel-value">
                    <input type="text" :value="Number.isNaN(saturationInterpreted) ? '' : saturationInterpreted" :placeholder="Number.isNaN(saturationInterpreted) ? 'Calculated' : ''" class="input channel-input" @click.stop="focus('saturation')" @blur="updateSaturation" @keyup.enter="updateSaturation">

                    <ul v-if="focused === 'saturation'" class="channel-presets">
                        <li v-for="preset in saturationPresets" class="preset" @click="applyPreset(preset, 'saturation')">{{preset.name}}</li>
                    </ul>

                    <div class="channel-picker" :style="saturationGradient">
                        <input type="range" min="0" max="1" step="0.01" :value="saturationFixed" class="channel-slider saturation" @input="updateSaturation">
                    </div>
                </div>
            </div>

            <div class="channel value">
                <span class="channel-label" title="Value">V</span>

                <div class="channel-value">
                    <input type="text" :value="Number.isNaN(valueInterpreted) ? '' : valueInterpreted" :placeholder="Number.isNaN(valueInterpreted) ? 'Calculated' : ''" class="input channel-input" @click.stop="focus('value')" @blur="updateValue" @keyup.enter="updateValue">

                    <ul v-if="focused === 'value'" class="channel-presets">
                        <li v-for="preset in valuePresets" class="preset" @click="applyPreset(preset, 'value')">{{preset.name}}</li>
                    </ul>

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

    import debounce from '../../js/utils/debounce.js';

    const methodMap = {
        hex: 'updateHex',
        red: 'updateRed',
        green: 'updateGreen',
        blue: 'updateBlue',
        hue: 'updateHue',
        saturation: 'updateSaturation',
        value: 'updateValue'
    };

    // proxy value from event or value argument, do not fire if value is falsy (prevents defaulting to black when defocusing from calculated, thus empty, channel)
    const checkValue = function(func) {
        return function(event, customValue) {
            const context = this;
            const value = event ? event.target.value : customValue;

            if(value !== undefined) {
                func.apply(context, [value]);
            }
        };
    };

    export default {
        data() {
            return {
                focused: null
            };
        },
        computed: {
            ...mapState({
                red(state) { return state.pattern.red; },
                green(state) { return state.pattern.green; },
                blue(state) { return state.pattern.blue; },
                hue(state) { return state.pattern.hue; },
                saturation(state) { return state.pattern.saturation; },
                value(state) { return state.pattern.value; },
                masterPresets(state) { return state.presets.presets.filter(preset => preset.targets.includes('master')); },
                redPresets(state) { return state.presets.presets.filter(preset => preset.targets.includes('red')); },
                greenPresets(state) { return state.presets.presets.filter(preset => preset.targets.includes('green')); },
                bluePresets(state) { return state.presets.presets.filter(preset => preset.targets.includes('blue')); },
                huePresets(state) { return state.presets.presets.filter(preset => preset.targets.includes('hue')); },
                saturationPresets(state) { return state.presets.presets.filter(preset => preset.targets.includes('saturation')); },
                valuePresets(state) { return state.presets.presets.filter(preset => preset.targets.includes('value')); }
            }),
            hex() {
                if(Number.isNaN(this.red) || Number.isNaN(this.green) || Number.isNaN(this.blue)) {
                    return NaN;
                }

                return '#' + convert.rgb.hex(this.red, this.green, this.blue).toLowerCase();
            },
            redFixed() { return isNaN(this.red) ? 0 : Math.round(this.red); },
            greenFixed() { return isNaN(this.green) ? 0 : Math.round(this.green); },
            blueFixed() { return isNaN(this.blue) ? 0 : Math.round(this.blue); },
            hueFixed() { return isNaN(this.hue) ? 0 : this.hue; },
            saturationFixed() { return isNaN(this.saturation) ? 1 : this.saturation; },
            valueFixed() { return isNaN(this.value) ? 1 : this.value; },
            redInterpreted() {
                if(Number.isNaN(this.red)) { return NaN; }
                if(isNaN(this.red)) { return this.red; }

                return Math.round(this.red);
            },
            greenInterpreted() {
                if(Number.isNaN(this.green)) { return NaN; }
                if(isNaN(this.green)) { return this.green; }

                return Math.round(this.green);
            },
            blueInterpreted() {
                if(Number.isNaN(this.blue)) { return NaN; }
                if(isNaN(this.blue)) { return this.blue; }

                return Math.round(this.blue);
            },
            hueInterpreted() {
                if(Number.isNaN(this.hue)) { return NaN; }
                if(isNaN(this.hue)) { return this.hue; }

                return Math.round(this.hue);
            },
            saturationInterpreted() {
                if(Number.isNaN(this.saturation)) { return NaN; };
                if(isNaN(this.saturation)) { return this.saturation; };

                return Number(this.saturation).toFixed(2);
            },
            valueInterpreted() {
                if(Number.isNaN(this.value)) { return NaN; };
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
            focus(channel) { this.focused = channel; },
            updateHex: debounce(checkValue(function(value) {
                const rgb = convert.hex.rgb(value);

                this.$store.dispatch('setRed', rgb[0]);
                this.$store.dispatch('setGreen', rgb[1]);
                this.$store.dispatch('setBlue', rgb[2]);
            }), 10),
            updateRed: checkValue(function(value) { this.$store.dispatch('setRed', value); }),
            updateGreen: checkValue(function(value) { this.$store.dispatch('setGreen', value); }),
            updateBlue: checkValue(function(value) { this.$store.dispatch('setBlue', value); }),
            updateHue: checkValue(function(value) { this.$store.dispatch('setHue', value); }),
            updateSaturation: checkValue(function(value) { this.$store.dispatch('setSaturation', value); }),
            updateValue: checkValue(function(value) { this.$store.dispatch('setValue', value); }),
            applyPreset(preset, channel) {
                Object.keys(preset.values).forEach(key => {
                    // only apply to source channel, unless none is specified (master)
                    if(channel === undefined || key === channel) {
                        this[methodMap[key]](null, preset.values[key]);
                    }
                });
            },
            hueToHex(hue) { return '#' + convert.hsv.hex(hue, this.saturationFixed * 100, this.valueFixed * 100); },
            saturationToHex(saturation) { return '#' + convert.hsv.hex(this.hueFixed, saturation * 100, this.valueFixed * 100); },
            valueToHex(value) { return '#' + convert.hsv.hex(this.hueFixed, this.saturationFixed * 100, value * 100); }
        },
        mounted() {
            document.addEventListener('click', event => {
                this.focused = null;
            });
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
        cursor: default;
    }

    .channel-value {
        position: relative;
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

    .channel-color {
        height: 1.3rem;
        box-sizing: border-box;
        padding: 0;
        border: solid 1px $border;
        border-top: none;
        cursor: pointer;

        &::-webkit-color-swatch-wrapper {
            padding: 0;
            border: none;
        }

        &::-webkit-color-swatch {
            border: none;
        }

        &::moz-color-swatch {
            border: none;
        }
    }

    .channel-presets {
        background: $background;
        width: 100%;
        list-style: none;
        position: absolute;
        z-index: 1;
        padding: 0;
        margin: 0;
        box-shadow: 0 0 2px $shadow;

        .preset {
            padding: .5rem;

            &:hover {
                color: $text-light;
                background: $primary;
                cursor: pointer;
            }
        }
    }
</style>
