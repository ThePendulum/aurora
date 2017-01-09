<template>
    <div class="header noselect">
        <span class="header-logo" :class="{off: !on}" v-html="logo" @click="toggle"></span>

        <vue-navigation />
        <vue-feedback />
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    import logo from '../../img/logo.svg';
    import Navigation from '../navigation/navigation.vue';
    import Feedback from '../feedback/feedback.vue';

    export default {
        components: {
            'vue-navigation': Navigation,
            'vue-feedback': Feedback
        },
        data() {
            return {
                logo
            };
        },
        computed: {
            ...mapState({
                on(state) {
                    return state.meta.on;
                }
            })
        },
        methods: {
            toggle(event) {
                this.$store.dispatch('toggle', !this.on);
            }
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .header {
        color: $text-light;
        background: $primary;
        width: 100%;
        position: relative;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        box-sizing: border-box;
        padding: 0 4rem 0 1rem;
    }

    .header-logo {
        margin: .5rem 1rem .5rem 0;
        cursor: pointer;
    }
</style>

<style lang="sass">
    @import '../../css/theme';

    .header-logo {
        svg {
            fill: $text-light;
            width: 3rem;
            height: 3rem;
        }

        &.off svg {
            fill: $shadow;
        }
    }
</style>
