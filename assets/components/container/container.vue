<template>
    <div class="container">
        <vue-header />

        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
    import Header from '../header/header.vue';

    export default {
        components: {
            'vue-header': Header
        }
    };
</script>

<style scoped lang="sass">
    .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .content {
        flex-grow: 1;
        overflow-y: auto;
    }
</style>
