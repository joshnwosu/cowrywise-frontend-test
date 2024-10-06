<template>
    <OverlapBG />
    <Container>
        <h1 class="search-title">Search Results for <span class="search-title-query"> "{{ $route.params.query }}"
            </span></h1>

        <!-- Check if images array is empty -->
        <template v-if="images.length === 0 && !loading">
            <p class="no-results">No results found. Please try a different search!</p>
        </template>

        <gallery-wrapper>
            <template v-if="loading">
                <skeleton-loader v-for="n in 8" :key="n" />
            </template>
        </gallery-wrapper>

        <masonry-wall v-if="!loading" :items="images" :ssr-columns="1" :column-width="250" :gap="30" class="masonry">
            <template #default="{ item, index }">
                <image-card-masonry :image="item" :index="index" @open-modal="showImage(item)" />
            </template>
        </masonry-wall>

        <ImageModal :visible="modalVisible" :image="selectedImage" @close="closeModal" />
    </Container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { fetchImages } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { UnsplashImage } from '../types/unsplashImage';
import { useRoute } from 'vue-router';
import OverlapBG from '../components/shared/OverlapBG.vue';
import GalleryWrapper from '../components/shared/GalleryWrapper.vue';
import Container from '../components/shared/Container.vue';
import ImageModal from '../components/ImageModal.vue';
import ImageCardMasonry from '../components/ImageCardMasonry.vue';

export default defineComponent({
    components: { SkeletonLoader, OverlapBG, GalleryWrapper, Container, ImageModal, ImageCardMasonry },
    props: ['query'],
    setup() {
        const modalVisible = ref(false);
        const images = ref<UnsplashImage[]>([]);
        const selectedImage = ref<UnsplashImage | null>(null);
        const loading = ref(false);
        const route = useRoute();

        const loadImages = async (query: string) => {
            try {
                loading.value = true;
                const data = await fetchImages(query);
                images.value = data;
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                loading.value = false;
            }
        };

        const showImage = (image: UnsplashImage) => {
            selectedImage.value = image;
            modalVisible.value = true
        };

        const closeModal = () => {
            modalVisible.value = false;
            selectedImage.value = null;
        };

        // Watch for changes in the route params and reload images when the query changes
        watch(
            () => route.params.query,
            (newQuery) => {
                const query = Array.isArray(newQuery) ? newQuery.join(', ') : newQuery;  // Ensure it's a string
                if (query) {
                    loadImages(query);
                }
            }
        );

        // Load images on component mount with the initial query
        onMounted(() => {
            const initialQuery = route.params.query;
            const query = Array.isArray(initialQuery) ? initialQuery.join(', ') : initialQuery;  // Ensure it's a string
            loadImages(query || 'Africa');  // Default to 'Africa' if no query
        });


        return {
            modalVisible,
            selectedImage,
            showImage,
            closeModal,
            images,
            loading,
        };
    },
});
</script>



<style lang="scss" scoped>
.masonry {
    margin-top: -50px;
}

.search-title {
    color: #2A385D;

    .search-title-query {
        color: #72788A
    }
}

.no-results {
    margin-top: 150px;
    font-size: 24px;
    text-align: center;
    font-weight: 700;
    color: #72788A
}
</style>