<template>
    <div class="draw-container noselect">
        <div class="panel">
            <div class="draw-toolbar">
                <button class="button clear" @click="clear">Clear</button>
                <button class="button fill" @click="fill">Fill</button>
                <button class="button eraser" @click="pencil = null">Eraser</button>

                <button title="Black" class="swatch" style="background: rgb(0, 0, 0)" @click="pencil = [0, 0, 0]">Black</button>
                <button title="White" class="swatch" style="background: rgb(255, 255, 255)" @click="pencil = [255, 255, 255]">White</button>
                <button title="Red" class="swatch" style="background: rgb(255, 0, 0)" @click="pencil = [255, 0, 0]">Red</button>
                <button title="Green" class="swatch" style="background: rgb(0, 255, 0)" @click="pencil = [0, 255, 0]">Green</button>
                <button title="Blue" class="swatch" style="background: rgb(0, 0, 255)" @click="pencil = [0, 0, 255]">Blue</button>
                <button title="Yellow" class="swatch" style="background: rgb(255, 255, 0)" @click="pencil = [255, 255, 0]">Yellow</button>
                <button title="Cyan" class="swatch" style="background: rgb(0, 255, 255)" @click="pencil = [0, 255, 255]">Cyan</button>
                <button title="Magenta" class="swatch" style="background: rgb(255, 0, 255)" @click="pencil = [255, 0, 255]">Magenta</button>
                <button title="Orange" class="swatch" style="background: rgb(255, 127, 0)" @click="pencil = [255, 127, 0]">Orange</button>
                <button title="Chartreuse" class="swatch" style="background: rgb(127, 255, 0)" @click="pencil = [127, 255, 0]">Chartreuse</button>
                <button title="Spring Green" class="swatch" style="background: rgb(0, 255, 127)" @click="pencil = [0, 255, 127]">Spring Green</button>
                <button title="Azure" class="swatch" style="background: rgb(0, 127, 255)" @click="pencil = [0, 127, 255]">Azure</button>
                <button title="Violet" class="swatch" style="background: rgb(127, 0, 255)" @click="pencil = [127, 0, 255]">Violet</button>
                <button title="Rose" class="swatch" style="background: rgb(255, 0, 127)" @click="pencil = [255, 0, 127]">Rose</button>
            </div>
        </div>

        <div class="panel panel-canvas">
            <vue-phantom ref="phantom" />

            <div class="canvas-container" ref="container">
                <canvas :width="drawWidth" :height="drawHeight" ref="draw" class="draw" @mousedown="drawing = true" @touchstart="drawing = true" @click="draw">{{pixels}}</canvas>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                container: null,
                drawCanvas: null,
                drawCtx: null,
                drawWidth: 1,
                drawHeight: 1,
                drawing: false,
                pencil: null
            };
        },
        computed: {
            ...mapState({
                pixels(state) {
                    if(this.drawCtx) {
                        this.drawCtx.drawImage(this.phantom, 0, 0, this.drawWidth, this.drawHeight);

                        const {width, height, top, left} = this.container.getBoundingClientRect();

                        let pixelSize = width / this.phantom.width;

                        while(this.phantom.height * pixelSize > height) {
                            pixelSize--;
                        }

                        this.drawWidth = this.phantom.width * pixelSize;
                        this.drawHeight = this.phantom.height * pixelSize;
                        this.drawTop = top;
                        this.drawLeft = left;

                        this.drawCtx.imageSmoothingEnabled = false;
                        this.drawCtx.mozImageSmoothingEnabled = false;
                        this.drawCtx.msImageSmoothingEnabled = false;
                    }

                    return state.meta.pixels;
                }
            })
        },
        methods: {
            draw(event) {
                if(this.drawing || event.type === 'click') {
                    if(this.drawing) {
                        event.preventDefault();
                    }

                    const clientX = event.clientX || (event.touches ? event.touches[0].clientX : null);
                    const clientY = event.clientY || (event.touches ? event.touches[0].clientY : null);

                    const pixelWidth = this.drawWidth / this.phantom.width;
                    const pixelHeight = this.drawHeight / this.phantom.height;

                    const x = Math.floor((clientX - this.drawLeft) / pixelWidth);
                    const y = Math.floor((clientY - this.drawTop) / pixelHeight);

                    const xCapped = Math.max(Math.min(x, this.phantom.width - 1), 0);
                    const yCapped = Math.max(Math.min(y, this.phantom.height - 1), 0);

                    this.$store.dispatch('draw', {
                        x: xCapped,
                        y: yCapped,
                        pencil: this.pencil
                    });
                }
            },
            setPencil(event) {
                const red = parseInt(event.target.value.slice(1, 3), 16);
                const green = parseInt(event.target.value.slice(3, 5), 16);
                const blue = parseInt(event.target.value.slice(5, 7), 16);

                this.pencil = [red, green, blue];
            },
            clear(event) {
                this.$store.dispatch('clear');
            },
            fill(event) {
                this.$store.dispatch('fill', this.pencil);
            }
        },
        mounted() {
            this.phantom = this.$refs.phantom.$el;
            this.phantomCtx = this.phantom.getContext('2d')

            this.container = this.$refs.container;

            this.drawCanvas = this.$refs.draw;
            this.drawCtx = this.drawCanvas.getContext('2d');

            this.drawDimensions = this.drawCanvas.getBoundingClientRect();
            this.drawWidth = this.drawDimensions.width;
            this.drawHeight = this.drawDimensions.height;

            document.addEventListener('mouseup', event => this.drawing = false);
            document.addEventListener('touchend', event => this.drawing = false);

            document.addEventListener('mousemove', this.draw);
            document.addEventListener('touchmove', this.draw);
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .draw-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .panel-canvas {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .draw {
        min-height: 2rem;
    }

    .canvas-container {
        width: 100%;
        flex-grow: 1;
    }

    .swatch,
    .eraser {
        cursor: pointer;
    }

    .swatch {
        width: 2rem;
        height: 2rem;
        display: inline-block;
        border: solid 1px $border;
        margin: 0 0 .5rem 0;
        text-indent: -1000rem;
    }
</style>
