<template>
    <nav class="nav">
        <router-link :to="{name: 'pattern'}" class="nav-item">Pattern</router-link>
    </nav>
</template>

<style scoped lang="sass">
    @import '../../css/theme';

    .nav {
        background: $grey;
    }

    .nav-item {
        display: inline-block;
        padding: 1rem;
    }
</style>
