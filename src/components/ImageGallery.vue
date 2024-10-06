<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetchImages } from '../services/api';
import SkeletonLoader from './SkeletonLoader.vue';
import ImageCard from './ImageCard.vue';
import { UnsplashImage } from '../types/unsplashImage';
import SearchBar from './SearchBar.vue';
import { useRouter } from 'vue-router';
import OverlapBG from './shared/OverlapBG.vue';
import GalleryWrapper from './shared/GalleryWrapper.vue';
import Container from "./shared/Container.vue"
import ImageModal from './ImageModal.vue';

export default defineComponent({
    components: { SkeletonLoader, ImageCard, SearchBar, OverlapBG, GalleryWrapper, Container, ImageModal },
    setup() {
        const images = ref<UnsplashImage[]>([]); // Ensure you use the UnsplashImage type
        const query = ref('');
        const modalVisible = ref(false);
        const selectedImage = ref<UnsplashImage | null>(null);
        const loading = ref(false);
        const router = useRouter();


        const loadImages = async (searchQuery = 'African') => {
            try {
                loading.value = true;
                const data = await fetchImages(searchQuery);
                images.value = data;
                // console.log('images: ', data);
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                loading.value = false;
            }
        };



        const showImage = (image: UnsplashImage) => {
            selectedImage.value = image;
            modalVisible.value = true;
        };

        const closeModal = () => {
            modalVisible.value = false;
            selectedImage.value = null;
        };

        const searchImages = (query: string) => {

            if (query.trim()) {
                router.push({ name: 'SearchResults', params: { query: query.trim() } });
            }
        };


        onMounted(() => {
            loadImages();
        });

        return {
            images,
            query,
            modalVisible,
            selectedImage,
            loading,
            loadImages,
            showImage,
            closeModal,
            searchImages


        };
    },
});
</script>

<template>
    <OverlapBG />
    <Container>
        <SearchBar @search="searchImages" />
        <gallery-wrapper>
            <ImageCard v-for="image in images" :key="image.id" :image="image" @click="showImage(image)" />

            <!-- Skeleton loader for loading state -->

            <template v-if="loading">
                <SkeletonLoader v-for="n in 8" :key="n" />
            </template>

            <!-- Modal to display the selected image -->
            <ImageModal :visible="modalVisible" :image="selectedImage" @close="closeModal" />
        </gallery-wrapper>
    </Container>
</template>

<style lang="scss" scoped></style>
