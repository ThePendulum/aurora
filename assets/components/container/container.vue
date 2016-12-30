<template>
    <div class="container">
        <vue-header />
        <router-view />
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
