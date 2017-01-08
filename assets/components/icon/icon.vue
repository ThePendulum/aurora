<template>
    <div class="icon">
        <div :title="label" class="icon" :class="{active}" v-html="svg"></div>
    </div>
</template>

<script>
    export default {
        props: ['icon', 'label', 'active'],
        data() {
            return {
                svg: null
            };
        },
        beforeMount() {
            this.svg = require('../../img/' + this.icon + '.svg');
        }
    };
</script>

<style lang="sass">
    @import '../../css/theme';

    .icon {
        fill: $text;
        display: inline-block;

        svg {
            width: 1rem;
            height: 1rem;
        }
    }
</style>
