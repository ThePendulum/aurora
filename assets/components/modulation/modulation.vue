<template>
    <div class="modulation noselect" ref="modulation" @mousedown="modulating = true" @mousemove="modulate" @touchmove.prevent="modulate">
        <div class="modulation-pointer" :style="{top: y * height + 'px', left: x * width + 'px'}"><div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                width: 0,
                height: 0,
                modulating: false
            };
        },
        computed: {
            ...mapState({
                modulation(state) {
                    return state.pattern.modulation;
                }
            }),
            x() { return this.modulation.x; },
            y() { return this.modulation.y; },
        },
        methods: {
            modulate(event) {
                if(this.modulating || event.type === 'touchmove') {
                    const {top, left, width, height} = this.$refs.modulation.getBoundingClientRect();

                    this.width = width;
                    this.height = height;

                    const clientX = event.clientX || event.touches[0].clientX;
                    const clientY = event.clientY || event.touches[0].clientY;

                    this.$store.dispatch('setModulation', {
                        x: (clientX - left) / width,
                        y: (clientY - top) / height
                    });
                }
            }
        },
        mounted() {
            document.addEventListener('mouseup', event => this.modulating = false);

            const {width, height} = this.$refs.modulation.getBoundingClientRect();

            this.width = width;
            this.height = height;
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .modulation {
        width: 100%;
        height: 3rem;
        display: inline-block;
        position: relative;
        border: solid 1px $border;
        overflow: hidden;
        cursor: crosshair;

        &:before {
            content: '';
            background: url('/img/dots.png');
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: .1;
            margin: 1px;
        }

        &:active {
            cursor: none;
        }
    }

    .modulation-pointer {
        background: $primary;
        width: .75rem;
        height: .75rem;
        position: absolute;
        box-sizing: border-box;
        border: solid 1px $background;
        border-radius: 50%;
        margin: -.375rem;
        box-shadow: 0 0 4px $primary;
    }
</style>
