<template>
    <div class="draw-container noselect">
        <div class="panel">
            <div class="draw-toolbar">
                <button title="Erase" class="swatch" :class="{selected: isPencil(null)}" style="background: url('/img/transparency.png')" @click="pencil = null">Eraser</button>
                <button v-for="swatch in palette" :title="swatch.name" class="swatch" :class="{selected: isPencil(swatch.color)}" :style="{background: 'rgb(' + swatch.color.join() + ')'}" @click="pencil = swatch.color">{{swatch.name}}</button>

                <button class="button fill" @click="fill">Fill</button>
                <button class="button clear" @click="clear">Clear</button>
            </div>
        </div>

        <div class="panel panel-canvas">
            <vue-phantom ref="feedbackPhantom" />

            <div class="canvas-container" ref="container">
                <canvas :width="width" :height="height" ref="feedback" class="feedback"></canvas>
                <canvas :width="width" :height="height" ref="draw" class="draw" @mousedown="drawing = true" @touchstart="drawing = true" @click="draw"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapState} from 'vuex';

    import palette from './palette.js';

    export default {
        data() {
            return {
                container: null,
                feedbackCanvas: null,
                feedbackCtx: null,
                drawCanvas: null,
                drawCtx: null,
                phantomWidth: 1,
                phantomHeight: 1,
                width: 1,
                height: 1,
                drawing: false,
                palette,
                pencil: null
            };
        },
        methods: {
            draw(event) {
                if(this.drawing || event.type === 'click') {
                    if(this.drawing) {
                        event.preventDefault();
                    }

                    const clientX = event.clientX || (event.touches ? event.touches[0].clientX : null);
                    const clientY = event.clientY || (event.touches ? event.touches[0].clientY : null);

                    const pixelWidth = this.width / this.feedbackPhantomCanvas.width;
                    const pixelHeight = this.height / this.feedbackPhantomCanvas.height;

                    const x = Math.floor((clientX - this.left) / pixelWidth);
                    const y = Math.floor((clientY - this.top) / pixelHeight);

                    const xCapped = Math.max(Math.min(x, this.feedbackPhantomCanvas.width - 1), 0);
                    const yCapped = Math.max(Math.min(y, this.feedbackPhantomCanvas.height - 1), 0);

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
            },
            isPencil(value) {
                if(value && this.pencil) {
                    return this.pencil[0] === value[0] && this.pencil[1] === value[1] && this.pencil[2] === value[2];
                }

                return value === this.pencil;
            }
        },
        mounted() {
            this.container = this.$refs.container;

            this.feedbackPhantomCanvas = this.$refs.feedbackPhantom.$el.querySelector('#phantomFeedback');
            this.feedbackPhantomCtx = this.feedbackPhantomCanvas.getContext('2d')

            this.drawPhantomCanvas = this.$refs.feedbackPhantom.$el.querySelector('#phantomDraw');
            this.drawPhantomCtx = this.drawPhantomCanvas.getContext('2d')

            this.feedbackCanvas = this.$refs.feedback;
            this.feedbackCtx = this.feedbackCanvas.getContext('2d');

            this.drawCanvas = this.$refs.draw;
            this.drawCtx = this.drawCanvas.getContext('2d');

            this.phantomWidth = this.feedbackPhantomCanvas.width;
            this.phantomHeight = this.feedbackPhantomCanvas.height;

            const dimensions = this.feedbackCanvas.getBoundingClientRect();

            this.width = dimensions.width;
            this.height = dimensions.height;

            document.addEventListener('mouseup', event => this.drawing = false);
            document.addEventListener('touchend', event => this.drawing = false);

            document.addEventListener('mousemove', this.draw);
            document.addEventListener('touchmove', this.draw);

            this.$root.$on('draw', () => {
                this.drawCtx.clearRect(0, 0, this.width, this.height);

                this.drawCtx.imageSmoothingEnabled = false;
                this.drawCtx.mozImageSmoothingEnabled = false;
                this.drawCtx.msImageSmoothingEnabled = false;

                this.drawCtx.drawImage(this.drawPhantomCanvas, 0, 0, this.width, this.height);
            });

            this.$root.$on('feedback', () => {
                if(this.feedbackCtx) {
                    this.feedbackCtx.imageSmoothingEnabled = false;
                    this.feedbackCtx.mozImageSmoothingEnabled = false;
                    this.feedbackCtx.msImageSmoothingEnabled = false;

                    this.feedbackCtx.drawImage(this.feedbackPhantomCanvas, 0, 0, this.width, this.height);

                    const {width, height, top, left} = this.container.getBoundingClientRect();

                    this.pixelSize = width / this.feedbackPhantomCanvas.width;

                    while(this.feedbackPhantomCanvas.height * this.pixelSize > height) {
                        this.pixelSize--;
                    }

                    this.width = this.feedbackPhantomCanvas.width * this.pixelSize;
                    this.height = this.feedbackPhantomCanvas.height * this.pixelSize;
                    this.phantomWidth = this.feedbackPhantomCanvas.width;
                    this.phantomHeight = this.feedbackPhantomCanvas.height;
                    this.top = top;
                    this.left = left;
                }
            });
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

    .canvas-container {
        width: 100%;
        flex-grow: 1;
        position: relative;
    }

    .feedback,
    .draw {
        max-width: 100%;
        min-height: 2rem;
        border: solid 1px $border;
    }

    .feedback {
        position: absolute;
        z-index: -1;
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
        margin: 0 .5rem .5rem 0;
        text-indent: -1000rem;

        &.selected {
            border: solid 1px $primary;
        }
    }
</style>
