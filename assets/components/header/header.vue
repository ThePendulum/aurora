<template>
    <div class="header noselect">
        <span class="header-logo" v-html="logo"></span>

        <vue-navigation />
        <vue-modulation />
        <vue-feedback />
    </div>
</template>

<script>
    import logo from '../../img/logo.svg';
    import Navigation from '../navigation/navigation.vue';
    import Modulation from '../modulation/modulation.vue';
    import Feedback from '../feedback/feedback.vue';

    export default {
        components: {
            'vue-navigation': Navigation,
            'vue-modulation': Modulation,
            'vue-feedback': Feedback
        },
        data() {
            return {
                logo
            };
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
    }
</style>

<style lang="sass">
    .header-logo,
    .header-logo svg {
        width: 3rem;
        height: 3rem;
    }
</style>
