<template>
    <div class="panel">
        <span class="filter-label">Smoothing</span>

        <div class="filter-picker">
            <input type="number" min="0" max="0.99" step="0.01" :value="smoothing.toFixed(2)" class="input filter-value" @input="updateSmoothing">
            <input type="range" min="0" max="0.99" step="0.01" :value="smoothing" class="slider filter-input" @input="updateSmoothing">
        </div>
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
                this.$store.dispatch('smoothing', Math.max(0, Math.min(.99, event.target.value)));
            }
        }
    };
</script>

<style scoped lang="sass">
    @import '../../css/theme';

    .filter-label {
        color: $grey2;
        display: flex;
        align-items: center;
        padding: 0 1rem 0 0;
        margin: 0 0 .5rem 0;
        font-weight: bold;
        cursor: default;
    }

    .filter-picker {
        display: flex;
    }

    .filter-value {
        margin: 0 .5rem 0 0;
    }

    .filter-input {
        flex-grow: 1;
    }
</style>
