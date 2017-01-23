<template>
    <div class="feedback-container">
        <vue-phantom ref="phantom" />
        <canvas :width="feedbackWidth" :height="feedbackHeight" ref="feedback" class="feedback">{{pixels}}</canvas>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                feedback: null,
                feedbackCtx: null,
                feedbackWidth: 1,
                feedbackHeight: 1
            }
        },
        computed: {
            ...mapState({
                pixels(state) {
                    if(this.feedbackCtx) {
                        this.feedbackCtx.drawImage(this.phantom, 0, 0, this.feedbackWidth, this.feedbackHeight);

                        this.feedbackCtx.imageSmoothingEnabled = false;
                        this.feedbackCtx.mozImageSmoothingEnabled = false;
                        this.feedbackCtx.msImageSmoothingEnabled = false;
                    }

                    return state.meta.pixels;
                }
            })
        },
        mounted() {
            this.phantom = this.$refs.phantom.$el;
            this.phantomCtx = this.phantom.getContext('2d')

            this.feedback = this.$refs.feedback;
            this.feedbackCtx = this.feedback.getContext('2d');

            this.feedbackDimensions = this.$refs.feedback.getBoundingClientRect();
            this.feedbackWidth = this.feedbackDimensions.width;
            this.feedbackHeight = this.feedbackDimensions.height;
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

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
