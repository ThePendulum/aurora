<template>
    <div class="header">
        <span class="header-logo" v-html="logo"></span>
        <h1 class="header-title">aurora</h1>
    </div>
</template>

<script>
    import logo from '../../img/logo.svg';

    export default {
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
        padding: .5rem 1rem;
    }

    .header-logo {
        margin: 0 .5rem 0 0;
    }

    .header-title {
        display: inline-block;
        margin: -.75rem 0 0 0;
    }
</style>

<style lang="sass">
    .header-logo svg {
        width: 3rem;
        height: 3rem;
    }
</style>
