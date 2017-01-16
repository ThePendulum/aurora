<template>
    <nav class="nav">
        <router-link :to="{name: 'pattern'}" class="nav-item" :class="{selected: selected === 'pattern'}">Pattern</router-link>
        <router-link :to="{name: 'draw'}" class="nav-item" :class="{selected: selected === 'draw'}">Draw</router-link>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                selected: null
            };
        },
        watch: {
            $route: function(to, from) {
                this.selected = this.$route.name;
            }
        },
        mounted() {
            this.selected = this.$route.name;
        }
    }
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .nav {
        flex-grow: 1;
        white-space: nowrap;
    }

    .nav-item {
        display: inline-block;
        padding: 1.5rem;
        margin: 0;

        &:hover,
        &.selected {
            color: $primary;
            background: $background;
        }
    }
</style>
