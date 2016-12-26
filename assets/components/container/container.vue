<template>
    <div class="container">
        <vue-header />
        <vue-navigation />
        <router-view />
    </div>
</template>

<script>
    import Header from '../header/header.vue';
    import Navigation from '../navigation/navigation.vue';

    export default {
        components: {
            'vue-header': Header,
            'vue-navigation': Navigation
        }
    };
</script>
