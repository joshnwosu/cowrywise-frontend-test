<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    setup() {
        // Define a random height class to simulate varying image heights
        const randomHeightClass = computed(() => {
            const heightClasses = ['height-small', 'height-medium', 'height-large'];
            const randomIndex = Math.floor(Math.random() * heightClasses.length);
            return heightClasses[randomIndex];
        });

        return {
            randomHeightClass
        };
    }
});
</script>

<template>
    <div :class="['skeleton-loader', randomHeightClass]">
        <div class="skeleton-image"></div>
        <div class="skeleton-info">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.skeleton-loader {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: #f6f6f6;
    border-radius: 10px;
    height: 300px;
}

.skeleton-info {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 20px;
}

.skeleton-line {
    height: 20px;
    width: 60%;
    background-color: #e7e7e7;
    margin-bottom: 10px;
    border-radius: 4px;
}

.skeleton-line.short {
    width: 30%;
}


/* Add variations for different heights */
// .height-small {
//     height: 200px;
// }

// .height-medium {
//     height: 250px;
// }

// .height-large {
//     height: 300px;
// }</style>