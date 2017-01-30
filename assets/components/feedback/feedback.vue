<template>
    <div class="feedback-container">
        <vue-phantom ref="phantom" />
        <canvas :width="width" :height="height" ref="feedback" class="feedback"></canvas>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                feedback: null,
                feedbackCtx: null,
                width: 1,
                height: 1
            }
        },
        mounted() {
            this.phantom = this.$refs.phantom.$el.querySelector('#phantomFeedback');
            this.phantomCtx = this.phantom.getContext('2d')

            this.feedback = this.$refs.feedback;
            this.feedbackCtx = this.feedback.getContext('2d');

            const dimensions = this.$refs.feedback.getBoundingClientRect();

            this.width = dimensions.width;
            this.height = dimensions.height;

            this.$root.$on('feedback', () => {
                if(this.feedbackCtx) {
                    this.feedbackCtx.imageSmoothingEnabled = false;
                    this.feedbackCtx.mozImageSmoothingEnabled = false;
                    this.feedbackCtx.msImageSmoothingEnabled = false;

                    this.feedbackCtx.drawImage(this.phantom, 0, 0, this.width, this.height);
                }
            });
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
