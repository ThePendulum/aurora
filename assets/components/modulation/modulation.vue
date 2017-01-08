<template>
    <div class="modulation noselect" ref="modulation" @mousemove="modulate" @mouseout="modulating = false">
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
                if(this.modulating) {
                    const {top, left, width, height} = this.$refs.modulation.getBoundingClientRect();

                    this.$store.dispatch('setModulation', {
                        x: (event.clientX - left) / width,
                        y: (event.clientY - top) / height
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
        width: 10rem;
        height: 2rem;
        display: inline-block;
        position: relative;
        border: solid 1px $edge;
        overflow: hidden;
        cursor: crosshair;
    }

    .modulation-pointer {
        width: .25rem;
        height: .25rem;
        position: absolute;
        border: solid 1px $edge;
        border-radius: 50%;
    }
</style>
