<template>
    <div>
        <canvas :width="width" :height="height" ref="feedback" id="phantomFeedback" class="phantom"></canvas>
        <canvas :width="width" :height="height" ref="draw" id="phantomDraw" class="phantom"></canvas>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                feedbackCtx: null,
            }
        },
        computed: {
            ...mapState({
                width(state) { return state.meta.width || 1; }, // default to 1 to prevent InvalidStateError for canvases with 0 width or height in Firefox
                height(state) { return state.meta.height || 1; },
            })
        },
        mounted() {
            this.feedback = this.$refs.feedback;
            this.feedbackCtx = this.feedback.getContext('2d')

            this.draw = this.$refs.draw;
            this.drawCtx = this.draw.getContext('2d');

            this.$store.subscribe((mutation, state) => {
                if(mutation.type === 'pixels') {
                    if(this.feedbackCtx) {
                        state.meta.pixels.forEach(pixel => {
                            this.feedbackCtx.fillStyle = 'rgb(' + pixel.values.map(Math.round).join() + ')';
                            this.feedbackCtx.fillRect(pixel.x, pixel.y, 1, 1);
                        });

                        this.$root.$emit('feedback');
                        this.$root.$emit('draw');
                    }
                }

                if(mutation.type === 'draw' || mutation.type === 'fill' || mutation.type === 'canvas') {
                    if(this.drawCtx) {
                        this.drawCtx.clearRect(0, 0, this.width, this.height);

                        state.draw.canvas.forEach((column, x) => {
                            column.forEach((pencil, y) => {
                                if(pencil) {
                                    this.drawCtx.fillStyle = 'rgb(' + pencil.map(Math.round).join() + ')';
                                    this.drawCtx.fillRect(x, y, 1, 1);
                                }
                            });
                        });

                        this.$root.$emit('draw');
                    }
                }
            });
        }
    };
</script>

<style lang="sass">
    @import '../../css/theme';

    .phantom {
        display: none;
    }
</style>
