<template>
    <div class="modulation noselect" ref="modulation" @mousemove="modulate" @touchmove.prevent="modulate">
        <div class="modulation-pointer" :style="{top: x * width, left: y * height}"></div>
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
            y() { return this.modulation.y; }
        },
        methods: {
            modulate(event) {
                if(this.modulating || event.type === 'touchmove') {
                    const {top, left, width, height} = this.$refs.modulation.getBoundingClientRect();

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
            document.addEventListener('mousedown', event => this.modulating = true);
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
    }

    .modulation-pointer {
        width: .25rem;
        height: .25rem;
        position: absolute;
        border: solid 1px $edge;
        border-radius: 50%;
    }
</style>
