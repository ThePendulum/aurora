<template>
    <canvas :width="phantomWidth" :height="phantomHeight" ref="phantom" class="phantom">{{pixels}}</canvas>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                phantom: null,
                phantomCtx: null,
            }
        },
        computed: {
            ...mapState({
                phantomWidth(state) { return state.meta.width || 1; }, // default to 1 to prevent InvalidStateError for canvases with 0 width or height in Firefox
                phantomHeight(state) { return state.meta.height || 1; },
                pixels(state) {
                    if(this.phantomCtx) {
                        state.meta.pixels.forEach(pixel => {
                            this.phantomCtx.fillStyle = 'rgb(' + pixel.values.map(Math.round).join() + ')';
                            this.phantomCtx.fillRect(pixel.x, pixel.y, 1, 1);
                        });
                    }
                }
            })
        },
        mounted() {
            this.phantom = this.$refs.phantom;
            this.phantomCtx = this.phantom.getContext('2d')
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .phantom {
        display: none;
    }
</style>
