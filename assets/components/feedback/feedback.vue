<template>
    <div class="feedback-container">
        <canvas :width="phantomWidth" :height="phantomHeight" ref="phantom" class="phantom">{{pixels}}</canvas>
        <canvas :width="feedbackWidth" :height="feedbackHeight" ref="feedback" class="feedback"></canvas>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                phantom: null,
                phantomCtx: null,
                feedback: null,
                feedbackCtx: null
            }
        },
        computed: {
            ...mapState({
                phantomWidth(state) { return state.meta.width || 1; },
                phantomHeight(state) { return state.meta.height || 1; },
                pixels(state) {
                    state.meta.pixels.forEach(pixel => {
                        this.phantomCtx.fillStyle = 'rgb(' + pixel.values.map(Math.round).join() + ')';
                        this.phantomCtx.fillRect(pixel.x, pixel.y, 1, 1);
                    });

                    if(this.feedbackCtx) {
                        this.feedbackCtx.drawImage(this.phantom, 0, 0, this.feedbackWidth, this.feedbackHeight);

                        this.feedbackCtx.imageSmoothingEnabled = false;
                        this.feedbackCtx.mozImageSmoothingEnabled = false;
                        this.feedbackCtx.msImageSmoothingEnabled = false;
                    }
                }
            }),
            feedbackWidth() {
                return this.phantomWidth;
            },
            feedbackHeight() {
                return this.phantomHeight;
            }
        },
        mounted() {
            this.phantom = this.$refs.phantom;
            this.phantomCtx = this.phantom.getContext('2d')

            this.feedback = this.$refs.feedback;
            this.feedbackCtx = this.feedback.getContext('2d');
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .phantom {
        display: none;
    }

    .feedback-container {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 1;
    }

    .feedback {
        height: 2rem;
        width: 2rem;
        border: solid 1px $edge;
        cursor: pointer;
        transition: all .2s ease;

        &:hover {
            width: 15rem;
            height: 15rem;
            border: solid 1px $background;
            box-shadow: 0 0 2px $shadow;
        }
    }
</style>
