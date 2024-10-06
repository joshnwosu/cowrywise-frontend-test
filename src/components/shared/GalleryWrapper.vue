<template>
    <div class="gallery">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Gallery',
};
</script>

<style scoped>
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Responsive columns */
    grid-gap: 30px;
    width: 100%;
    margin: 0 auto;
    padding: 50px 20px;
}
</style>