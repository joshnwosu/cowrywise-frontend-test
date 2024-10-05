<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fetchImages } from '../services/api';
import SkeletonLoader from './SkeletonLoader.vue';
import ImageCard from './ImageCard.vue';
import { UnsplashImage } from '../types/unsplashImage';

export default defineComponent({
    components: { SkeletonLoader, ImageCard },
    setup() {
        const images = ref<UnsplashImage[]>([]); // Ensure you use the UnsplashImage type
        const query = ref('');
        const modalVisible = ref(false);
        const selectedImage = ref<UnsplashImage | null>(null);
        const loading = ref(false);

        const loadImages = async (searchQuery = 'African') => {
            try {
                loading.value = true;
                const data = await fetchImages(searchQuery);
                images.value = data;
                console.log('images: ', data);
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                loading.value = false;
            }
        };

        loadImages();

        const showImage = (image: UnsplashImage) => {
            selectedImage.value = image;
            modalVisible.value = true;

            console.log('selected image: ', image)
        };

        const closeModal = () => {
            modalVisible.value = false;
            selectedImage.value = null;
        };

        return {
            images,
            query,
            modalVisible,
            selectedImage,
            loadImages,
            showImage,
            closeModal,
            loading,
        };
    },
});
</script>

<template>
    <div class="gallery">
        <ImageCard v-for="image in images" :key="image.id" :image="image" @click="showImage(image)" />

        <!-- Skeleton loader for loading state -->
        <div v-if="loading">
            <SkeletonLoader v-for="n in 8" :key="n" />
        </div>

        <!-- Modal to display the selected image -->
        <div v-if="modalVisible" class="modal" @click="closeModal">
            <img :src="selectedImage?.urls.regular" alt="Selected Image" class="modal-image" />
        </div>
    </div>
</template>

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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-image {
    max-width: 90%;
    max-height: 90%;
}
</style>
