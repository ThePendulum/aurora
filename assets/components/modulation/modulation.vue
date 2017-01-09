<template>
    <div ref="modulation" class="modulation" :style="{height: enlarged ? '20rem' : '3rem'}" @mousedown="modulating = true" @touchstart="modulating = true" @click="modulate">
        <span class="modulation-label modulation-y">
            y: {{y.toFixed(2)}}

            <vue-icon v-show="lockedY" icon="lock" label="Unlock axis" class="modulation-lock locked" @click.native.stop="lockedY = false" />
            <vue-icon v-show="!lockedY" icon="unlocked" label="Lock axis" class="modulation-lock" @click.native.stop="lockedY = true" />
        </span>

        <span class="modulation-label modulation-x">
            x: {{x.toFixed(2)}}

            <vue-icon v-show="lockedX" icon="lock" label="Unlock axis" class="modulation-lock locked" @click.native.stop="lockedX = false" />
            <vue-icon v-show="!lockedX" icon="unlocked" label="Lock axis" class="modulation-lock" @click.native.stop="lockedX = true" />
        </span>

        <vue-icon v-show="enlarged" icon="shrink" label="Shrink modulation pad" class="modulation-enlarge enlarged" @click.native.stop="enlarge(false)" />
        <vue-icon v-show="!enlarged" icon="enlarge" label="Enlarge modulation pad" class="modulation-enlarge" @click.native.stop="enlarge(true)" />

        <div class="modulation-pointer noselect" :style="{top: y * height + 'px', left: x * width + 'px'}"><div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    import Icon from '../icon/icon.vue';

    export default {
        components: {
            'vue-icon': Icon
        },
        data() {
            return {
                width: 0,
                height: 0,
                modulating: false,
                lockedX: false,
                lockedY: false,
                enlarged: false
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
                if(this.modulating || event.type === 'click') {
                    if(this.modulating) {
                        event.preventDefault();
                    }

                    const {top, left, width, height} = this.$refs.modulation.getBoundingClientRect();

                    this.width = width;
                    this.height = height;

                    const clientX = event.clientX || (event.touches ? event.touches[0].clientX : null);
                    const clientY = event.clientY || (event.touches ? event.touches[0].clientY : null);

                    const x = this.lockedX ? this.x : (clientX - left) / width;
                    const y = this.lockedY ? this.y : (clientY - top) / (height - 2); // compensate for border? unexplained .02 offset without

                    const xCapped = Math.max(Math.min(x, 1), 0);
                    const yCapped = Math.max(Math.min(y, 1), 0);

                    this.$store.dispatch('setModulation', {
                        x: xCapped,
                        y: yCapped
                    });
                }
            },
            enlarge(enlarged, event) {
                this.enlarged = enlarged;

                this.$nextTick(() => {
                    const {width, height} = this.$refs.modulation.getBoundingClientRect();

                    this.width = width;
                    this.height = height;
                });
            }
        },
        mounted() {
            const {width, height} = this.$refs.modulation.getBoundingClientRect();

            this.width = width;
            this.height = height;

            document.addEventListener('mouseup', event => this.modulating = false);
            document.addEventListener('touchend', event => this.modulating = false);

            document.addEventListener('mousemove', this.modulate);
            document.addEventListener('touchmove', this.modulate);
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .modulation {
        width: 100%;
        height: 3rem;
        display: flex;
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
            z-index: -1;
            opacity: .1;
            margin: 1px;
        }

        &:active {
            cursor: none;
        }
    }

    .modulation-label {
        color: $grey2;
        flex-grow: 1;
        padding: .25rem;
        font-size: .75rem;
        text-shadow: 0 0 1px $background;
        user-select: none;
    }

    .modulation-y {
        align-self: center;
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

<style lang="sass">
    @import '../../css/theme';

    .modulation-lock,
    .modulation-enlarge  {
        cursor: pointer;

        &.icon {
            svg {
                fill: $grey2;
                width: .75rem;
                height: .75rem;
            }

            &.locked svg,
            &.enlarged svg {
                fill: $primary;
            }
        }
    }

    .modulation-enlarge {
        padding: .25rem;
    }
</style>
