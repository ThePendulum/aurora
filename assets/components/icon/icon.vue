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
            this.logo = require('../../img/' + this.icon + '.svg');
        }
    };
</script>
