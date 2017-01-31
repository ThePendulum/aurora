<template>
    <div class="panel">
        <span class="filter-label">Smoothing</span>
        <input type="range" min="0" max="0.99" step="0.01" :value="smoothing" class="slider" @input="updateSmoothing"> {{smoothing.toFixed(2)}}
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                smoothing(state) {
                    return state.filters.smoothing;
                }
            })
        },
        methods: {
            updateSmoothing(event) {
                this.$store.dispatch('smoothing', event.target.value);
            }
        }
    };
</script>
