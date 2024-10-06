<template>
    <div :style="{ height: computedHeight }" class="image-container" @click="openModal">
        <img :src="image.urls.small" :alt="image.alt_description" class="image" />
        <div class="overlay"></div>
        <div class="image-info">
            <p class="author">{{ image.user.name }}</p>
            <p class="location" v-if="image.user.location">{{ image.user.location }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UnsplashImage } from '../types/unsplashImage';

export default defineComponent({
    name: 'ImageCardMasonry',
    props: {
        image: {
            type: Object as () => UnsplashImage,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        openModal() {
            // Emit event to open the full image in a modal
            this.$emit('open-modal', this.image);
        }
    },
    computed: {
        computedHeight() {
            // Compute height based on index for alternating heights
            return `${this.index % 2 === 0 ? 250 : 350}px`;
        }
    }
});
</script>

<style lang="scss" scoped>
.image-container {
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    transition: background-color 0.3s;
}

.image-info {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    z-index: 2;
    font-size: 14px;

    .author {
        font-weight: bold;
    }

    .location {
        font-size: 12px;
        opacity: 0.8;
    }
}
</style>
