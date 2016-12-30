<template>
    <div class="header">
        <span class="header-logo" v-html="logo"></span>

        <vue-navigation />
    </div>
</template>

<script>
    import logo from '../../img/logo.svg';
    import Navigation from '../navigation/navigation.vue';

    export default {
        components: {
            'vue-navigation': Navigation
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
        display: flex;
        align-items: center;
        padding: 0 1rem;
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
