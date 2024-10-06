<template>
    <div class="image-card" @click="openModal">
        <div class="image-container">
            <img :src="image.urls.small" :alt="image.alt_description" class="image" />
            <div class="overlay"></div>
            <div class="image-info">
                <p class="author">{{ image.user.name }}</p>
                <p class="location" v-if="image.user.location">{{ image.user.location }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UnsplashImage } from '../types/unsplashImage';

export default defineComponent({
    name: 'ImageCard',
    props: {
        image: {
            type: Object as () => UnsplashImage,
            required: true
        }
    },
    methods: {
        openModal() {
            // Trigger a modal or parent function to open the full image
            this.$emit('open-modal', this.image);
        }
    }
});
</script>

<style lang="scss" scoped>
.image-card {
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
}

.image-container {
    position: relative;
    width: 100%;
    height: 350px;
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